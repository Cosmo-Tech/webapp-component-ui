#!/bin/bash

# In order to test the UI components in this module, we need to install some
# dependencies (such as React) that are declared as PEER dependencies. This
# can not be done with YARN, this scripts thus uses NPM to install peer
# dependencies (if option --install is set), run tests and then remove the peer
# dependencies (if option --clear is set).

# Since both NPM and YARN seem to modify the yarn.lock file when they are called
# and we do not want the test command to modify the content of this file, a copy
# of the file is made before running the tests and restored afterwards


# Parse arguments
while :; do
    case $1 in
        -i|--install) OPT_INSTALL="SET"
        ;;
        -c|--clear) OPT_CLEAR="SET"
        ;;
        *) if [ ! -z ${1+x} ];
          then
            echo "Unexpected option $1"; exit 1;
          else
            break
          fi
    esac
    shift
done


function install()
{
  # Install peer dependencies to be able to run tests with jest
  if [ ! -z ${OPT_INSTALL+x} ];
  then
    npm install --no-save $DEPS;
  fi
}

function run_tests()
{
  # Run jest tests
  jest
}

function uninstall()
{
  # Clear dependencies installed with NPM
  if [ ! -z ${OPT_CLEAR+x} ];
  then
    npm uninstall --no-save $DEPS;
    PACKAGE_LOCK_FILE="package-lock.json";
    if [ -f "$PACKAGE_LOCK_FILE" ]; then
        rm "$PACKAGE_LOCK_FILE";
    fi
  fi
}

function cleanup()
{
  # Restore yarn.lock file from backup
  if [ -f "$YARN_LOCK_BACKUP_FILE" ]; then
    mv $YARN_LOCK_BACKUP_FILE $YARN_LOCK_FILE;
  fi
}

# Create a backup of the file yarn.lock
YARN_LOCK_FILE="yarn.lock";
YARN_LOCK_BACKUP_FILE="yarn.lock.bak";
if [ -f "$YARN_LOCK_FILE" ]; then
    cp $YARN_LOCK_FILE $YARN_LOCK_BACKUP_FILE;
fi
# Clean up on error
trap cleanup EXIT;


# List of peer dependencies to temporarily install
DEPS="
  react
  react-dom
  react-i18next
  @material-ui/core
  @material-ui/icons
  "

install;
run_tests;
uninstall;

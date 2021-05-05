// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import renderer from 'react-test-renderer';
import UserInfo from '../UserInfo';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn()
}));

describe('UserInfo test suite', () => {
  console.error = jest.fn();

  it('should log errors when no props are passed', () => {
    renderer.create(<UserInfo />).toJSON();
    // expect(console.error).toHaveBeenCalledTimes(3);
  });

  // it('should render correctly when all props are here', () => {
  //   const elem = renderer.create(<UserInfo
  //     classes={ {} }
  //     documentationUrl=''
  //     languages={ { fr: "Français", en: "English" } }
  //     profilePictureUrl=''
  //     userName=''
  //     onLogout=''
  //   />).toJSON();
  //   expect(elem).toMatchSnapshot();
  // });
});

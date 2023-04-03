// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { SimpleTwoActionsDialog } from './SimpleTwoActionsDialog';
import { renderInMuiThemeProvider } from '../../../tests/utils';
import { ButtonTesting, DialogTesting } from '../../../tests/MuiComponentsTesting';

import userEvent from '@testing-library/user-event';

const mockOnButton1Click = jest.fn();
const mockOnButton2Click = jest.fn();

const dialogId = 'dialog-test';

const TwoActionsDialog = new DialogTesting({ labelledby: `${dialogId}-dialog-title` });
const Button1 = new ButtonTesting({ dataCy: `${dialogId}-button1` });
const Button2 = new ButtonTesting({ dataCy: `${dialogId}-button2` });

const defaultProps = {
  id: dialogId,
  open: true,
  handleClickOnButton1: mockOnButton1Click,
  handleClickOnButton2: mockOnButton2Click,
};

const setUp = (props) => {
  renderInMuiThemeProvider(<SimpleTwoActionsDialog {...props} />);
};

describe('SimpleTwoActionsDialog', () => {
  beforeEach(() => {
    mockOnButton1Click.mockClear();
    mockOnButton2Click.mockClear();
  });

  describe('On Close', () => {
    test('ESC key calls button1 Click', async () => {
      setUp(defaultProps);
      await userEvent.keyboard('{Escape}');
      expect(mockOnButton1Click).toHaveBeenCalled();
    });

    test(`By default, click on backdrop doesn't call button1 click`, async () => {
      setUp(defaultProps);
      await userEvent.click(TwoActionsDialog.Backdrop);
      expect(mockOnButton1Click).not.toHaveBeenCalled();
    });

    test('with closeOnBackdropClick, click on backdrop calls button1 click', async () => {
      const props = {
        ...defaultProps,
        closeOnBackdropClick: true,
      };

      setUp(props);
      await userEvent.click(TwoActionsDialog.Backdrop);
      expect(mockOnButton1Click).toHaveBeenCalled();
    });
  });

  describe('Custom props', () => {
    describe('buttonsProps', () => {
      test(`by default, buttons haven't error color`, () => {
        setUp(defaultProps);
        expect(Button1.Button).not.toHaveClass('MuiButton-textError');
        expect(Button2.Button).not.toHaveClass('MuiButton-textError');
      });

      test('force error color on button1', () => {
        const props = {
          ...defaultProps,
          button1Props: {
            color: 'error',
          },
        };

        setUp(props);
        expect(Button1.Button).toHaveClass('MuiButton-textError');
      });

      test('force error color on button2', () => {
        const props = {
          ...defaultProps,
          button2Props: {
            color: 'error',
          },
        };

        setUp(props);
        expect(Button2.Button).toHaveClass('MuiButton-textError');
      });
    });

    describe('dialogProps', () => {
      test('by default dialog has xs size', () => {
        setUp(defaultProps);
        expect(TwoActionsDialog.Dialog).toHaveClass('MuiDialog-paperWidthXs');
      });

      test('force sm size on dialog', () => {
        const props = {
          ...defaultProps,
          dialogProps: {
            maxWidth: 'sm',
          },
        };

        setUp(props);
        expect(TwoActionsDialog.Dialog).toHaveClass('MuiDialog-paperWidthSm');
      });
    });
  });
});

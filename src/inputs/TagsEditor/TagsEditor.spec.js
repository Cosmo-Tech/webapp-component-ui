// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import { queryByTestId } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { TagsEditor } from '.';
import { ChipTesting, ContainerTesting, TextFieldTesting } from '../../../tests/MuiComponentsTesting';
import { renderInMuiThemeProvider } from '../../../tests/utils';

const onChangeMockFunction = jest.fn();

const propsWithReadOnlyEmptyList = {
  onChange: onChangeMockFunction,
  readOnly: true,
};

const propsWithReadOnlyValues = {
  onChange: onChangeMockFunction,
  values: ['tag1', 'tag2', 'tag3'],
  readOnly: true,
};

const propsWithValues = {
  onChange: onChangeMockFunction,
  values: ['tag1', 'tag2', 'tag3'],
};

const setUp = (props) => {
  renderInMuiThemeProvider(<TagsEditor {...props} />);
};

const tagsEditorContainer = new ContainerTesting({ dataCy: 'tags-container' });
const newTagTextField = new TextFieldTesting({ dataCy: 'new-tag-textfield', id: 'new-tag-input' });
const chips = [
  new ChipTesting({ dataCy: 'tags-editor-tag-0' }),
  new ChipTesting({ dataCy: 'tags-editor-tag-1' }),
  new ChipTesting({ dataCy: 'tags-editor-tag-2' }),
];

describe('TagsEditor', () => {
  beforeEach(() => {
    onChangeMockFunction.mockClear();
  });

  describe('in read-only mode', () => {
    test('should display no chips when tags list is empty', () => {
      setUp(propsWithReadOnlyEmptyList);
      expect(chips[0].Chip).not.toBeInTheDocument();
      expect(chips[1].Chip).not.toBeInTheDocument();
      expect(chips[2].Chip).not.toBeInTheDocument();
      expect(newTagTextField.TextField).not.toBeInTheDocument();
    });

    test('should show chips without "delete" button', () => {
      setUp(propsWithReadOnlyValues);
      expect(chips[0].Chip).toBeVisible();
      expect(chips[1].Chip).toBeVisible();
      expect(chips[2].Chip).toBeVisible();

      expect(chips[0].CancelIcon).not.toBeInTheDocument();
      expect(chips[1].CancelIcon).not.toBeInTheDocument();
      expect(chips[2].CancelIcon).not.toBeInTheDocument();

      expect(newTagTextField.TextField).not.toBeInTheDocument();
    });

    test('should not show the "add tag" icon on hover', async () => {
      setUp(propsWithReadOnlyValues);
      expect(tagsEditorContainer.Container).toBeInTheDocument();
      await tagsEditorContainer.hover();
      expect(queryByTestId(document, 'EditIcon')).not.toBeInTheDocument();
      expect(newTagTextField.TextField).not.toBeInTheDocument();
    });
  });

  describe('in edition mode', () => {
    beforeEach(() => {
      setUp(propsWithValues);
    });

    test('should be able to delete tags', async () => {
      expect(chips[0].Chip).toBeVisible();
      expect(chips[1].Chip).toBeVisible();
      expect(chips[2].Chip).toBeVisible();

      expect(chips[0].CancelIcon).toBeInTheDocument();
      expect(chips[1].CancelIcon).toBeInTheDocument();
      expect(chips[2].CancelIcon).toBeInTheDocument();

      await chips[0].cancel();
      expect(onChangeMockFunction).toHaveBeenCalledWith(['tag2', 'tag3']);
    });

    test('should be able to add tags', async () => {
      await tagsEditorContainer.hover();
      expect(queryByTestId(document, 'EditIcon')).toBeVisible();

      expect(newTagTextField.TextField).not.toBeInTheDocument();
      await userEvent.click(queryByTestId(document, 'EditIcon'));

      expect(newTagTextField.TextField).toBeVisible();
      await newTagTextField.type('new{enter}');
      expect(onChangeMockFunction).toHaveBeenCalledWith(['tag1', 'tag2', 'tag3', 'new']);
      expect(newTagTextField.TextField).not.toBeInTheDocument();
    });

    test('should not create a new tag if input field is empty or only contains spaces', async () => {
      await tagsEditorContainer.hover();

      await userEvent.click(queryByTestId(document, 'EditIcon'));
      expect(newTagTextField.TextField).toBeVisible();
      await newTagTextField.type('{enter}');
      expect(onChangeMockFunction).not.toHaveBeenCalled();
      expect(newTagTextField.TextField).not.toBeInTheDocument();

      await userEvent.click(queryByTestId(document, 'EditIcon'));
      expect(newTagTextField.TextField).toBeVisible();
      await newTagTextField.type('  {enter}');
      expect(onChangeMockFunction).not.toHaveBeenCalled();
      expect(newTagTextField.TextField).not.toBeInTheDocument();
    });

    test('should hide new tag input on Escape and when focus is lost', async () => {
      await tagsEditorContainer.hover();

      await userEvent.click(queryByTestId(document, 'EditIcon'));
      expect(newTagTextField.TextField).toBeVisible();
      await newTagTextField.type('{escape}');
      expect(onChangeMockFunction).not.toHaveBeenCalled();
      expect(newTagTextField.TextField).not.toBeInTheDocument();

      await userEvent.click(queryByTestId(document, 'EditIcon'));
      expect(newTagTextField.TextField).toBeVisible();
      await userEvent.click(document.body);
      expect(onChangeMockFunction).not.toHaveBeenCalled();
      expect(newTagTextField.TextField).not.toBeInTheDocument();
    });
  });
});

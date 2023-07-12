/* eslint-disable no-console */
import { Meta, Story } from "@storybook/react";
import { DynamicFromProps, DynamicForm, RADIO, DATE, SELECT, TEXT, TEXTAREA, AUTOCOMPLETE_WITH_SINGLE_SELECTION } from "./DynamicForm";

const meta: Meta = {
  title: "DynamicForm",
  component: DynamicForm,
};
export default meta;

const Template: Story<DynamicFromProps> = (args) => <DynamicForm {...args} />;

export const DynamicFormExample = Template.bind({});

DynamicFormExample.args = {
  config: [
    {
      sectionTitle: "test section title",
      key: "test",
      description: "test description",
      formFields: [
        {
          type: RADIO,
          label: 'test radio',
          id: 'testRadio',
          value: 'test1',
          columnCount: 12,
          error: true,
          options: [
            {
              value: 'test1',
              label: 'test1'
            },
            {
              value: 'test2',
              label: 'test2'
            }
          ]
        },
        {
          type: DATE,
          label: 'test date',
          id: 'testDate',
          value: '',
          columnCount: 6,
        },
        {
          type: DATE,
          label: 'test date2',
          id: 'testDate2',
          value: new Date(2014, 4, 6),
          columnCount: 6,
        },
        {
          type: DATE,
          label: 'test date',
          id: 'testDate',
          value: '',
          columnCount: 6,
          disabled: true
        },
        {
          type: SELECT,
          label: "Select Label",
          id: "testSelect",
          value: undefined,
          placeholder: "Please select an option",
          columnCount: 12,
          required: true,
          disabled: true,
          options: [{value: "value", label: "label"}],
        },
        {
          type: SELECT,
          label: "Select Label",
          id: "testSelect",
          value: undefined,
          placeholder: "Please select an option",
          columnCount: 12,
          required: true,
          disabled: false,
          options: [{value: "value", label: "label"}],
        },
        {
          type: TEXT,
          label: 'test Text',
          id: 'testText',
          value: '',
          disabled: true,
          columnCount: 12,
        },
        {
          type: TEXT,
          label: 'test Text2',
          id: 'testText2',
          value: '',
          disabled: false,
          columnCount: 12,
          endAdornment: "kg"
        },
        {
          type: TEXTAREA,
          label: 'test Textarea',
          id: 'testTextarea',
          value: '',
          disabled: true,
          columnCount: 12,
        },
        {
          type: SELECT,
          label: 'test select',
          id: 'testSelect',
          value: '',
          disabled: false,
          options: [{label: 'open', value: 'open'}],
          columnCount: 12,
        },
        {
          type: SELECT,
          label: 'test select',
          id: 'testSelect2',
          value: '',
          disabled: true,
          options: [{label: 'open', value: 'open'}],
          columnCount: 12,
        },
        {
          type: SELECT,
          label: 'test select error',
          id: 'testSelect2',
          value: '',
          disabled: false,
          error: true,
          required: true,
          options: [{label: 'open', value: 'open'}],
          columnCount: 12,
        },
        {
          type: AUTOCOMPLETE_WITH_SINGLE_SELECTION,
          label: 'test single selection autocomplete',
          id: 'testSingleSelectionAutocomplete',
          value: '',
          disabled: false,
          error: false,
          required: false,
          options: [
            {label: 'open', value: 'open'},
            {label: 'close', value: 'close'},
            {label: 'in progress', value: 'inProgress'}
          ],
          columnCount: 12,
        },
        {
          type: AUTOCOMPLETE_WITH_SINGLE_SELECTION,
          label: 'test single selection autocomplete',
          id: 'testSingleSelectionAutocomplete2',
          value: '',
          disabled: false,
          error: true,
          required: true,
          options: [
            {label: 'open', value: 'open'},
            {label: 'close', value: 'close'},
            {label: 'in progress', value: 'inProgress'}
          ],
          columnCount: 12,
        },
      ]
    }
  ],
  onValueChange: (newValue) => {
    console.log({newValue});
  },
  formData: {
    testRadio: 'test1',
    testDate2: new Date(2014, 4, 6),
  }
};

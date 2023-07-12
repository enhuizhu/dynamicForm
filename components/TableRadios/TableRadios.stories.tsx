/* eslint-disable react/jsx-props-no-spreading */
import { Meta, Story } from "@storybook/react";
import { TableRadios, TableRadiosProps } from "./index";

const meta: Meta = {
  title: "TableRadios",
  component: TableRadios,
};
export default meta;

const Template: Story<TableRadiosProps> = (args) => <TableRadios {...args} />;

export const tableRadios = Template.bind({});

// Needs config?
// tableRadios.args = {
//    }

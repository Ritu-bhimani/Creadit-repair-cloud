import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DataTable } from './DataTable';

export default {
  title: 'Data Table',
  component: DataTable
} as ComponentMeta<typeof DataTable>;

const Template: ComponentStory<typeof DataTable> = (args) => (
  <DataTable {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  checkboxSelection: true,
  columnData: [],
  tableData: [],
  hideFooter: true,
  height: '220px'
};

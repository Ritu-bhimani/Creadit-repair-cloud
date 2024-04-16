import { useArgs } from '@storybook/client-api';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ActionButtons } from './ActionButtons';

export default {
  title: 'Action Buttons',
  component: ActionButtons
} as ComponentMeta<typeof ActionButtons>;

const Template: ComponentStory<typeof ActionButtons> = (args) => {
  const [, updateArgs] = useArgs();

  return (
    <ActionButtons
      {...args}
      handleDropDown={(v: any) => {
        updateArgs({ selectedOption: v });
      }}
    />
  );
};

export const Primary = Template.bind({});

Primary.args = {
  refreshIcon: true,
  importExportIcon: true,
  printIcon: true,
  searchField: true,
  selectDropdown: false,
  options: [
    { value: 1, label: 'Africa' },
    { value: 2, label: 'India' },
    { value: 3, label: 'Pakistan' },
    { value: 4, label: 'France' }
  ],
  selectedOption: 3,
  button: true,
  buttonLabel: 'Add New Event'
};

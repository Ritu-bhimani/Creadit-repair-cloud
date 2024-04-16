import { useArgs } from '@storybook/client-api';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { SelectDropdown } from './SelectDropdown';

export default {
  title: 'Select Dropdown',
  component: SelectDropdown
} as ComponentMeta<typeof SelectDropdown>;

const Template: ComponentStory<typeof SelectDropdown> = (args) => {
  const [, updateArgs] = useArgs();

  return (
    <SelectDropdown {...args} onChange={v => {

      updateArgs({ selectedOption: v })
    }} />
  );
}
export const Primary = Template.bind({});

Primary.args = {
  options: [
    { value: 1, label: 'Africa' },
    { value: 2, label: 'India' },
    { value: 3, label: 'Pakistan' },
    { value: 4, label: 'France' }
  ],
  selectedOption: 3,
  customIcon: true
};

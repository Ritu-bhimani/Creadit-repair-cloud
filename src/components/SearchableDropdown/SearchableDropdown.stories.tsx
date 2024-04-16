import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useArgs } from '@storybook/client-api';


import { SearchableDropdown } from './SearchableDropdown';

export default {
  title: 'Searchable Dropdown',
  component: SearchableDropdown
} as ComponentMeta<typeof SearchableDropdown>;

const Template: ComponentStory<typeof SearchableDropdown> = (args) => {
  const [, updateArgs] = useArgs();

  return (
    <SearchableDropdown {...args} onChange={v => {

      updateArgs({ value: v })
    }} />
  );
}

export const Primary = Template.bind({});

const options = ["Clients", "Active Clients", "Referrals", "Others"].map(s => ({
  label: s, value: s
}))


Primary.args = {
  options,
  value: "Referrals"
};

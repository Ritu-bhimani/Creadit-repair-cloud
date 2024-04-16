import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CheckBox } from './CheckBox';

export default {
  title: 'CheckBox',
  component: CheckBox
} as ComponentMeta<typeof CheckBox>;

const Template: ComponentStory<typeof CheckBox> = (args) => (
  <CheckBox {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  label: 'CheckBox',
  checked: false
};

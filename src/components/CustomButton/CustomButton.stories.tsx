import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CustomButton } from './CustomButton';

export default {
  title: 'CustomButton',
  component: CustomButton
} as ComponentMeta<typeof CustomButton>;

const Template: ComponentStory<typeof CustomButton> = (args) => (
  <CustomButton {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  label: 'Primary',
  variant: 'contained',
  color: 'primary',
  size: 'medium',
  onClick: () => {}
};

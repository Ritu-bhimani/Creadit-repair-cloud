// create story book for radio button
import { Meta, Story } from '@storybook/react/types-6-0';
import { RadioButton, RadioButtonProps } from './RadioButton';

export default {
  title: 'RadioButton',
  component: RadioButton
} as Meta;

const Template: Story<RadioButtonProps> = (args) => <RadioButton {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary',
  // value: 'primary',
  checked: true,
  onChange: () => { }
};

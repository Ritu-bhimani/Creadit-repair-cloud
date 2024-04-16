import { ComponentMeta, ComponentStory } from '@storybook/react';
import { LoginHeader } from './LoginHeader';

export default {
  title: 'Login Header',
  component: LoginHeader
} as ComponentMeta<typeof LoginHeader>;

const Template: ComponentStory<typeof LoginHeader> = (args) => (
  <LoginHeader {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  altText: '',
  imageSrc: '',
  loginType: ''
};

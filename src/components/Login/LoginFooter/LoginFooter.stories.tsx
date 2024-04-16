import { ComponentMeta, ComponentStory } from '@storybook/react';
import { LoginFooter } from './LoginFooter';

export default {
  title: 'Login Footer',
  component: LoginFooter
} as ComponentMeta<typeof LoginFooter>;

const Template: ComponentStory<typeof LoginFooter> = (args) => (
  <LoginFooter {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  trainingLink: ''
};

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QuickStartLinks } from './QuickStartLinks';

export default {
  title: 'Quick Start Links',
  component: QuickStartLinks
} as ComponentMeta<typeof QuickStartLinks>;

const Template: ComponentStory<typeof QuickStartLinks> = (args) => (
  <QuickStartLinks {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  orderNumber: 1,
  title: 'Add a New Client',
  description: 'Sign up a new client and add to database'
};

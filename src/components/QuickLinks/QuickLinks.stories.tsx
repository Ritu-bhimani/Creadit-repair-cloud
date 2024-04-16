import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QuickLinks } from './QuickLinks';
import DomainIcon from '@mui/icons-material/Domain';

export default {
  title: 'Quick Links',
  component: QuickLinks
} as ComponentMeta<typeof QuickLinks>;

const Template: ComponentStory<typeof QuickLinks> = (args) => (
  <QuickLinks {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  LinkDescription: 'Configure users, permissions, billing',
  LinkName: 'My Company',
  href: '',
  isExternal: false,
  Icon: <DomainIcon sx={{ fontSize: 40 }} />
};

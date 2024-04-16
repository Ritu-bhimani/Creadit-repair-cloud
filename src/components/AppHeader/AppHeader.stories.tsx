import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AppHeader } from './AppHeader';

export default {
  title: 'App Header',
  component: AppHeader
} as ComponentMeta<typeof AppHeader>;

const Template: ComponentStory<typeof AppHeader> = (args) => (
  <AppHeader {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  logo: (
    <img
      src={'/assets/images/creditrepaircloud_logo.png'}
      width={208}
      height={42}
    />
  ),
  mainTabLinks: [
    {
      href: '/iframe.html',
      text: 'Home'
    },
    {
      href: '/myclients/clientlist',
      text: 'Clients'
    },
    {
      href: '/calendar',
      text: 'Schedule'
    },
    {
      href: '/mycompany',
      text: 'My Company'
    },
    {
      href: '/invoices',
      text: 'Invoices'
    },
    {
      href: '/mediacenter',
      text: 'Library'
    },
    {
      href: '/affiliate',
      text: 'Affiliates'
    },
    {
      href: '/furnishers',
      text: 'Creditors / Furnishers'
    },
    {
      href: '/everything',
      text: 'Everything'
    },
    {
      href: '/dashboard',
      text: 'Dashboard'
    }
  ]
};

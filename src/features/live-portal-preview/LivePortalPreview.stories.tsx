import { ComponentMeta, ComponentStory } from '@storybook/react';
import { LivePortalPreview } from './LivePortalPreview';

export default {
  title: 'LivePortalPreview',
  component: LivePortalPreview
} as ComponentMeta<typeof LivePortalPreview>;

const Template: ComponentStory<typeof LivePortalPreview> = (args) => (
  <LivePortalPreview />
);

export const Primary = Template.bind({});

Primary.args = {};

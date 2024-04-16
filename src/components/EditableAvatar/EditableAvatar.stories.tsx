// create storybook for EdiatbleAvatar component

import { Meta, Story } from '@storybook/react/types-6-0';
import { EditableAvatar, EditableAvatarProps } from './EditableAvatar';

export default {
  title: 'Components/EditableAvatar',
  component: EditableAvatar
} as Meta;

const Template: Story<EditableAvatarProps> = (args) => (
  <EditableAvatar {...args} />
);
export const Default = Template.bind({});
Default.args = {
  src: '/assets/images/cloud_logo.png'
};

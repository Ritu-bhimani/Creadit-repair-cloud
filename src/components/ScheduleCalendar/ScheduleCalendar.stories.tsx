import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ScheduleCalendar } from './ScheduleCalendar';

export default {
  title: 'Schedule Calendar',
  component: ScheduleCalendar
} as ComponentMeta<typeof ScheduleCalendar>;

const Template: ComponentStory<typeof ScheduleCalendar> = (args) => (
  <ScheduleCalendar {...args} />
);

export const Primary = Template.bind({});

Primary.args = {};

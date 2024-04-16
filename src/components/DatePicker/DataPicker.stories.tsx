import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { CustomDatePicker } from './DatePicker';

export default {
    title: 'Date Picker',
    component: CustomDatePicker
} as ComponentMeta<typeof CustomDatePicker>;

const Template: ComponentStory<typeof CustomDatePicker> = (args) => (
    <CustomDatePicker {...args} />
);
const handleDate = (val: any | undefined) => {
};
export const Primary = Template.bind({});

Primary.args = {
    value: '',
    setStartDate: '',
    getSelectedDate: handleDate,
    label: 'Due Date'
};
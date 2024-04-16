import { useArgs } from '@storybook/client-api';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { Select2Dropdown } from './Select2Dropdown';

export default {
    title: 'Select2 Dropdown',
    component: Select2Dropdown
} as ComponentMeta<typeof Select2Dropdown>;

const Template: ComponentStory<typeof Select2Dropdown> = (args) => {
    const [, updateArgs] = useArgs();

    return (
        <Select2Dropdown {...args} onChange={v => {

            updateArgs({ selectedOption: v })
        }} />
    );
}
export const Primary = Template.bind({});

Primary.args = {
    options: [
        { value: 1, label: 'Africa' },
        { value: 2, label: 'India' },
        { value: 3, label: 'Pakistan' },
        { value: 4, label: 'France' }
    ],
    selectedOption: '',
};

import { useArgs } from '@storybook/client-api';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { CustomizedTooltip } from './CustomizedTooltip';
export default {
    title: 'Tool Tip',
    component: CustomizedTooltip
} as ComponentMeta<typeof CustomizedTooltip>;



const Template: ComponentStory<typeof CustomizedTooltip> = (args) => (
    <CustomizedTooltip {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
    title: "Test",
    placement: 'top'

};

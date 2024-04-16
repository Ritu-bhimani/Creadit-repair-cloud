import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AutoCompleteAddress } from './AutoCompleteAddress';

export default {
    title: 'Auto Complete Address',
    component: AutoCompleteAddress
} as ComponentMeta<typeof AutoCompleteAddress>;

const Template: ComponentStory<typeof AutoCompleteAddress> = (args) => <AutoCompleteAddress {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    label: 'Address'
};

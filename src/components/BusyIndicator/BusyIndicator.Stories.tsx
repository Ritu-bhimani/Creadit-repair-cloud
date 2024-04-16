import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BusyIndicator } from './BusyIndicator';

export default {
  title: 'Busy Indicator',
  component: BusyIndicator
} as ComponentMeta<typeof BusyIndicator>;

const Template: ComponentStory<typeof BusyIndicator> = (args) => (
  <BusyIndicator {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  isBusy: true
};

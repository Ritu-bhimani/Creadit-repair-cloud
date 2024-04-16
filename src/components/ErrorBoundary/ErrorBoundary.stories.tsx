import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ErrorBoundary } from './ErrorBoundary';

export default {
  title: 'Error Boundary',
  component: ErrorBoundary
} as ComponentMeta<typeof ErrorBoundary>;

const Template: ComponentStory<typeof ErrorBoundary> = (args) => (
  <ErrorBoundary {...args} />
);

const ExampleErrorComponent = () => {
  throw new Error('Simulated error.');
};

export const Primary = Template.bind({});

Primary.args = {
  children: <ExampleErrorComponent />
};

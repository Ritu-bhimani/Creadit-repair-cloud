import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Modal } from './Modal';

import { Button, Stack } from '@mui/material';
import { useArgs } from '@storybook/client-api';
import { Fragment } from 'react';

export default {
  title: 'Modal',
  component: Modal
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
  const [, updateArgs] = useArgs();
  return (
    <Fragment>
      <Button
        onClick={() => {
          updateArgs({ open: !args.open });
        }}
      >
        Toggle Modal
      </Button>
      <Modal
        {...args}
        onClose={() => {
          updateArgs({ open: !args.open });
        }}
      >
        Hey there!
      </Modal>
    </Fragment>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  title: 'New Task',
  closeOnEscape: true,
  showDividers: true,
  footer: (
    <Stack direction="row" gap={2}>
      <Button>Cancel</Button>
      <Button variant="contained">Save</Button>
    </Stack>
  )
};

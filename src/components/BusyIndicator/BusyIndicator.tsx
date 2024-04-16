import Backdrop from '@mui/material/Backdrop';
import CircularProgress, {
  circularProgressClasses
} from '@mui/material/CircularProgress';
import { FC, ReactNode } from 'react';

type BusyIndicatorProps = {
  isBusy: boolean;
  children?: ReactNode;
};

export const BusyIndicator: FC<BusyIndicatorProps> = (
  props: BusyIndicatorProps
) => {
  const { isBusy } = props;
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isBusy}
      >
        <CircularProgress
          variant="indeterminate"
          sx={{
            color: (theme) =>
              theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
            animationDuration: '550ms',
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: 'round'
            }
          }}
          size={60}
          thickness={4}
        />
      </Backdrop>
    </>
  );
};
BusyIndicator.defaultProps = {
  isBusy: false
};

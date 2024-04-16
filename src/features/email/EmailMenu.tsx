import { Mail } from '@mui/icons-material';
import {
  Badge,
  ClickAwayListener,
  IconButton,
  SxProps,
  Theme
} from '@mui/material';
import { get } from 'lodash-es';
import {
  bindPopover,
  bindTrigger,
  usePopupState
} from 'material-ui-popup-state/hooks';
import { FC } from 'react';
import { ArrowPopover, ErrorBoundary } from '../../components';
import { EmailTabs } from './EmailTabs';
import { useErrorsQuery, useMessagesQuery } from './mail.api';

const Icons: SxProps<Theme> = {
  fill: '#8fadd1',
  ':hover': {
    fill: '#fff'
  }
};

export const EmailMenu: FC = () => {
  const { data, isFetching, isError } = useErrorsQuery(null);
  const { data: pendingBatchPrintData, isFetching: pendingBatchPrintFerching, isError: pendingBatchPrintError } = useMessagesQuery(null);
  const mailBadgeCount = get(data, 'count', 0);
  const pendingBatchPrintBadgeCount = get(pendingBatchPrintData, 'count', 0);
  const badgeCount = mailBadgeCount + pendingBatchPrintBadgeCount;
  const popupState = usePopupState({
    variant: 'popper',
    popupId: 'email-menu'
  });
  return (
    <>
      <IconButton
        color="error"
        sx={{ fill: '#8fadd1' }}
        {...bindTrigger(popupState)}
      >
        <Badge
          badgeContent={badgeCount}
          className="headerbadge"
          color="secondary"
          max={99999}
        >
          <Mail color="action" fontSize="large" sx={Icons} />
        </Badge>
      </IconButton>
      <ErrorBoundary>
        <ArrowPopover
          placement="bottom"
          popoverBinder={bindPopover(popupState)}
        >
          <ClickAwayListener onClickAway={() => popupState.close()}>
            <div>
              <EmailTabs
                errorBadgeCount={mailBadgeCount}
                mailErrors={data?.mail_errors}
                pendingLetters={pendingBatchPrintData?.pendingLetters}
                pendingBatchPrintBadgeCount={pendingBatchPrintBadgeCount}
              />
            </div>
          </ClickAwayListener>
        </ArrowPopover>
      </ErrorBoundary>
    </>
  );
};

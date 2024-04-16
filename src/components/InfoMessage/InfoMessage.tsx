import { InsertComment, Warning } from '@mui/icons-material';
import { Box, CardContent, Grid, styled } from '@mui/material';
import { FC, ReactNode } from 'react';

type MessageType = 'info' | 'warning' | 'error';

type MessageCardProps = {
  type?: MessageType;
};

const border = (type: MessageType) => {
  switch (type) {
    case 'info':
      return '1px solid #b2e0f2';
    case 'warning':
      return '1px solid #ed6c02';
    case 'error':
      return '1px solid #f44336';
    default:
      return '1px solid #b2e0f2';
  }
};

const MessageCard = styled(Box)(({ type }: MessageCardProps) => ({
  backgroundColor: type === 'info' ? '#f1f8ff' : '',
  border: border(type ? type : 'info'),
  borderRadius: '8px',
  width: '100%'
}));

const MessageBody = styled('div')(({}) => ({
  color: '#244894',
  fontFamily: 'Latofont',
  fontSize: '14px',
  lineHeight: '24px'
}));

type InfoMessageProps = {
  type?: MessageType;
  message: ReactNode;
};

export const InfoMessage: FC<InfoMessageProps> = ({
  message,
  type = 'info'
}: InfoMessageProps) => {
  return (
    <MessageCard type={type}>
      <CardContent className="textinfobox">
        <Grid container alignContent="center">
          <Grid item xs={0.6}>
            {type === 'info' && (
              <InsertComment color="primary" sx={{ fontSize: '2.5rem' }} />
            )}
            {type === 'warning' && (
              <Warning color="warning" sx={{ fontSize: '2.5rem' }} />
            )}
          </Grid>
          <Grid item xs={11.4} sx={{ alignSelf: 'center' }}>
            <MessageBody>{message}</MessageBody>
          </Grid>
        </Grid>
      </CardContent>
    </MessageCard>
  );
};

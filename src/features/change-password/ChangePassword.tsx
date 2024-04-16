import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Button, css, Stack } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useChangePasswordMutation } from './changePassword.api';
import { get } from 'lodash-es';
import { Input } from '../../components';
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
interface changePwdProps {
  showModal?: any;
}
const ChangePassword = (props: changePwdProps) => {
  const { t } = useTranslation();
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const currentPasswordChange = (name: string, value: string) => {
    if (name === 'Current Password') {
      setCurrentPwd(value);
    } else if (name === 'New Password') {
      setNewPwd(value);
    } else if (name === 'Confirm Password') {
      setConfirmPwd(value);
    }
  };
  const validatePassword = async () => {
    if (currentPwd === '') {
      toast.error(t('enterCurrentPassword'), {
        icon: <CancelIcon />,
        toastId: 'currentPassword'
      });
    } else if (newPwd === '') {
      toast.error(t('enterNewPassword'), {
        icon: <CancelIcon />,
        toastId: 'newPassword'
      });
    } else if (confirmPwd === '') {
      toast.error(t('enterConfirmPassword'), {
        icon: <CancelIcon />,
        toastId: 'confirmPassword'
      });
    } else if (newPwd !== confirmPwd) {
      toast.error(t('newAndConfirmPasswordShouldBeTheSame'), {
        icon: <CancelIcon />,
        toastId: 'newAndConfirmPasswordShouldBeTheSame'
      });
    } else {
      const old_password = currentPwd;
      const new_password = newPwd;
      const confirm_password = confirmPwd;
      const result = await changePassword({
        old_password,
        new_password,
        confirm_password
      });
      if ('error' in result) {
        const errorMsg: any = get(result.error, 'data.message');
        const errorMessage: any = Object.values(errorMsg)[0];
        toast.error(errorMessage[0], {
          icon: <CancelIcon />,
          toastId: 'errorMsg'
        });
      } else {
        props.showModal(false);
        toast.success(result.data?.message, {
          icon: <CheckCircleIcon />,
          toastId: 'successMsg'
        });
      }
    }
  };
  const inputCotainer = css`
    input {
      margin-bottom: 24px !important;
      height: 20px;
      line-height: 21px;
      color: #666666;
      width: 100% !important;
      border: 1px solid #dedede;
      padding: 6px 12px !important;
      font-size: 14px !important;
      border-radius: 4px;
      background-color: #fff !important;
      :focus {
        border-color: transparent !important;
      }
    }
    label {
      font-weight: 500;
      display: inline-block;
      margin-bottom: 0.5rem;
      color: #5b626b !important;
      font-size: 14px;
      transform: none !important;
    }
  `;
  const footerStyle = css`
    justify-content: end;
  `;
  const cancelButtomStyle = css`
    background: transparent;
    :hover {
      background: transparent;
      text-decoration: underline;
      color: #244894;
    }
  `;
  const submitButtomStyle = css`
    padding: 11px 12px;
    border-radius: 4px;
    background-color: #00a650;
    font-size: 14px;
    min-width: 144px;
    font-weight: 600;
    color: #fff;
    text-align: center;
    height: 40px !important;
  `;
  return (
    <Box>
      <div css={inputCotainer}>
        <Input
          placeholder="Enter Current Password"
          type="password"
          name="Current Password"
          value={currentPwd}
          onChange={(e) => currentPasswordChange(e.target.name, e.target.value)}
          showRequired={true}
          label={t('currentPassword')}
        />
        <Input
          placeholder="Enter New Password"
          type="password"
          name="New Password"
          value={newPwd}
          onChange={(e) => currentPasswordChange(e.target.name, e.target.value)}
          showRequired={true}
          label={t('newPassword')}
        />
        <Input
          placeholder="Confirm New Password"
          type="password"
          name="Confirm Password"
          value={confirmPwd}
          onChange={(e) => currentPasswordChange(e.target.name, e.target.value)}
          showRequired={true}
          label={t('confirmPassword')}
          required
        />
      </div>
      <Stack direction="row" gap={2} css={footerStyle}>
        <Button
          sx={{ textTransform: 'none', background: 'transparent !important' }}
          css={cancelButtomStyle}
          onClick={() => props.showModal(false)}
        >
          {t('cancel')}
        </Button>
        <Button
          sx={{
            textTransform: 'none',
            fontWeight: 'normal',
            minWidth: '110px !important'
          }}
          variant="contained"
          color="success"
          css={submitButtomStyle}
          onClick={validatePassword}
          disabled={isLoading}
        >
          {t('submit')}
        </Button>
      </Stack>
    </Box>
  );
};

export default ChangePassword;

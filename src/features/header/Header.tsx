import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { AppHeader, Modal, HelpAndSupportLink } from '../../components';
import { NewLeadsMenu } from '../leads/NewLeadsMenu';
import { useAuth } from '../../hooks';
import { RootState } from '../../store';
import { routes } from '../../utils';
import { HeaderState } from './headerSlice';
import { MessagesMenu } from '../messages';
import ChangePassword from '../change-password/ChangePassword';
import { TaskMenu } from '../notification-task';
import { EmailMenu } from '../email';
const helpAndSupportLinks: HelpAndSupportLink[] = [
  {
    text: 'Support Center',
    href: 'https://help.creditrepaircloud.com/'
  },
  {
    text: 'Resource Videos',
    href: 'https://www.creditrepaircloud.com/resources'
  },
  {
    text: 'Training Academy',
    href: 'https://training.creditrepaircloud.com/'
  },
  {
    text: 'Podcast Tips & Tricks',
    href: 'https://www.creditrepaircloud.com/blog'
  },
  {
    text: 'New Feature Requests',
    href: 'https://feedback.creditrepaircloud.com/feature-requests'
  },
  {
    text: 'Get your Free Shirt',
    href: ''
  },
  {
    text: 'Enable Onboarding',
    href: 'https://www.creditrepaircloud.com/security/'
  },
  {
    text: 'Swag Store',
    href: 'https://shop.creditrepaircloud.com/'
  }
];

export const Header: FC = () => {
  const { mainTabLinks }: HeaderState = useSelector<RootState, HeaderState>(
    (state) => state.header
  );
  const { getUserDetails, removeToken } = useAuth();
  const curr_user = getUserDetails();
  const navigate = useNavigate();
  const [openChangePasswordModel, setOpenChangePasswordModel] = useState(false);
  const location = useLocation();

  const onLogout = () => {
    removeToken();
    localStorage.clear();
    window.location.href = routes.PATH;
  };
  const onTabChange = (value: string) => {
    navigate(value);
  };
  const pathName = location.pathname;
  const slashCount = (pathName.match(/\//g) || []).length; // count number of "/" in the string
  const activeTab =
    slashCount > 1 ? pathName.split('/').slice(0, 3).join('/') : pathName;
  return (
    <>
      <Modal
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'flex-start'
          },
          marginTop: ' 20vh',
          '& .MuiDialog-paper': {
            maxWidth: '22vw'
          }
        }}
        width={'sm'}
        open={openChangePasswordModel}
        closeIconVisible
        title={'Change Password'}
        onClose={() => setOpenChangePasswordModel(!openChangePasswordModel)}
      >
        <ChangePassword showModal={() => setOpenChangePasswordModel(false)} />
      </Modal>

      <AppHeader
        onTabChange={onTabChange}
        activeTab={activeTab}
        mainTabLinks={mainTabLinks}
        helpAndSupportLinks={helpAndSupportLinks}
        menuItems={[
          <NewLeadsMenu key={'newLeadsMenu'} />,
          <MessagesMenu key={'messagesMenu'} />,
          <TaskMenu key={'tasksMenu'} />,
          <EmailMenu key={'emailMenu'} />
        ]}
        accountMenuProps={{
          userName: `${curr_user.fname}`,
          role: curr_user.usertype,
          accountLinks: [
            {
              text: 'Change Password',
              onClick: () => {
                setOpenChangePasswordModel(true);
              }
            },
            {
              text: 'Logout',
              onClick: () => {
                onLogout();
              }
            }
          ]
        }}
        logo={
          <img
            src={'/assets/images/creditrepaircloud_logo.png'}
            css={{
              height: 'auto',
              width: '15vw',
              cursor: 'pointer',
              '@media only screen and (max-width:600px)': {
                width: '20vh',
                marginBottom: '10px'
              }
            }}
            onClick={() => navigate(routes.APP_HOME)}
          />
        }
      />
    </>
  );
};

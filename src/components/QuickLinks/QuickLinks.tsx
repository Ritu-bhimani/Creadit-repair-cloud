import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { QuickLinkStyles } from './styles';

export type QuickLinkProps = {
  href: string;
  LinkName: string;
  Icon: JSX.Element;
  LinkDescription: string;
  isExternal?: boolean;
  isActive?: boolean;
};
export const QuickLinks: FC<QuickLinkProps> = (props: QuickLinkProps) => {
  const { Icon, LinkDescription, LinkName, href, isExternal, isActive } = props;
  return (
    <Link
      to={href}
      css={{ textDecoration: 'none' }}
      target={isExternal && isActive ? '_blank' : '_self'}
    >
      <List css={QuickLinkStyles.container}>
        <ListItemIcon css={QuickLinkStyles.LinkIcon}>{Icon}</ListItemIcon>
        <ListItem css={QuickLinkStyles.ListItems}>
          <ListItemText sx={{ marginBottom: '0px' }}>
            <span id="link-name" css={QuickLinkStyles.LinkName}>
              {LinkName}
            </span>
          </ListItemText>
          <ListItemText sx={{ marginTop: '0px' }}>
            <span id="link-desc" css={QuickLinkStyles.LinkDesc}>
              {LinkDescription}
            </span>
          </ListItemText>
        </ListItem>
      </List>
    </Link>
  );
};
QuickLinks.defaultProps = {
  isActive: true
};

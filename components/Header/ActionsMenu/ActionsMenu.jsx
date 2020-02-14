import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch, MdNotificationsNone } from 'react-icons/md';
import Avatar from '../../Avatar';
import {
  ActionsMenuWrapper,
  ActionItem,
  ProfileSection,
  UserInfo,
  Name,
  // Email,
} from './ActionsMenu.styles';

const ActionsMenu = ({ active }) => (
  <ActionsMenuWrapper>
    {/* <ActionItem><MdSearch /></ActionItem>
    <ActionItem><MdNotificationsNone /></ActionItem> */}
    <ProfileSection>
      <Avatar margin="15px" />
      <UserInfo>
        <Name>User9877</Name>
      </UserInfo>
    </ProfileSection>
  </ActionsMenuWrapper>
);

ActionsMenu.propTypes = {
  active: PropTypes.bool,
};

ActionsMenu.defaultProps = {
  active: false,
};

export default ActionsMenu;

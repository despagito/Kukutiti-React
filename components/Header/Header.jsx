import React from 'react';
import HeaderMenu from './HeaderMenu';
import ActionsMenu from './ActionsMenu';
import {
  HeaderWrapper,
  Logo,
  LogoArea,
  LogoText,
} from './Header.styles';
import LogoImage from '../../static/assets/images/logo.svg';

const Header = () => (
  <HeaderWrapper>
    <LogoArea>
      <Logo>
        <LogoImage />
      </Logo>
      <LogoText>KuKuTiTi</LogoText>
    </LogoArea>
    <HeaderMenu activeItem="popular" />
    <ActionsMenu />
  </HeaderWrapper>
);

export default Header;

import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  padding: 2px 10px;
  border: 1px solid #ededed;
`;

export const LogoArea = styled.div`
  width: 140px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
`
export const LogoText = styled.div`
  font-size: 20px;
  line-height: 46px;
  margin-left: 10px;
`

export const Logo = styled.div`
  height: 46px;
  width: 46px;
`;

export const HeaderTitle = styled.h1`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
`;

export const HeaderSubtitle = styled.h2`
  font-size: 14px;
  font-weight: 400;
`;
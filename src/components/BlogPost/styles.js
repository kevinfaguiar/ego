import styled from 'styled-components';
import { theme } from 'styled-tools';

export default styled.div`
  flex: 1;
  min-height: 100px;
  padding: 80px 0 50px;
  width: 100%;
  background-color: ${theme('colors.backgroundSecondary')};
`;

export const StyledContent = styled.div`
  text-align: justify;
  color: ${theme('colors.textPrimary')};
  padding: 0 20%;
  font-size: 21px;
  @media (max-width: 576px) {
    padding: 0 5%;
    font-size: 18px;
  }
`;

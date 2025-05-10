import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.background};
    font-family: 'Noto Sans KR', 'Apple SD Gothic Neo', Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  * {
    box-sizing: inherit;
  }
`;

export default GlobalStyle;

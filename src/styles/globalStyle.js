import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    color: ${ ( {theme} ) => theme.colors.textGray}
}

`
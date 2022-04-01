import styled from 'styled-components';

const media = {
    desktop: '@media(min-width: 1000px)'
}

export const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    background-color: ${ ( {theme} ) => theme.colors.primaryPurple};
`

export const SecondContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    background-color: white;
    ${media.desktop} {
        width: 700px;  
        align-self: center;
    }
`
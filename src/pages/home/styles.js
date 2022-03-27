import styled from 'styled-components';

const media = {
    desktop: '@media(min-width: 1000px)'
}

export const HomeContainer = styled.div`
    ${media.desktop} {
        width: 900px;
        align-self: center;
    }
    width: 100%;
    height: 100vh;
    padding: 50px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    background-color: ${ ( {theme} ) => theme.colors.primaryPurple};

    p {
        color: ${ ( {theme} ) => theme.colors.secondPink};
        font-family: 'Montserrat', sans-serif;
        text-align: center;
        font-weight: 400;
    }

    .buttonWrap {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`
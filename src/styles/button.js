import styled from 'styled-components';

export const CleanButton = styled.button`
    background: none;
    cursor: pointer;
    border:none;
`

const Button = styled.button`
    background-color: white;
    cursor: pointer;
    padding: 15px 32px;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    border-radius: 10px;
`

export const WhiteButton = styled(Button)`
    background-color: white;
    color: ${ ( {theme} ) => theme.colors.primaryPurple};
`

export const TransButton = styled(Button)`
    background-color: transparent;
    color: ${ ( {theme} ) => theme.colors.primaryPurple};
    border: 1px solid ${ ( {theme} ) => theme.colors.primaryPurple};
`

export const PurpleButton = styled(Button)`
    color: white;
    background-color: ${ ( {theme} ) => theme.colors.primaryPurple};
`

export const GreenButton = styled(Button)`
    color: ${ ( {theme} ) => theme.colors.primaryPurple};
    background-color: ${ ( {theme} ) => theme.colors.primaryGreen};
    a {
        text-decoration: none;
        color: ${ ( {theme} ) => theme.colors.primaryPurple};
    }
`
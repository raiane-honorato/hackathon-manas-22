import { TextField } from '@mui/material';
import styled from 'styled-components';

const media = {
    desktop: '@media(min-width: 1000px)'
}

export const PopUpContainer = styled.div`
    width: 80vw;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    border: 1px solid black;
    position: absolute;
    min-height: 60vh;
    top: 20vh;
    right: 10vw;
    padding: 16px;

    ${media.desktop} {
        width: 40vw;  
        align-self: center;
        right: 30vw;
    }

    .close-btn-wrapper {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    h3 {
        margin-top: 40px;
        text-align: center;
    }
    
    span{
        display: block;
    }

    .link-wrapper {
        width: calc(100% - 10px);
        
        padding: 0 10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        div {
            margin-top: 10px;
            display: flex;
            align-items: center;
            width: 100%;
        }

        button {
            margin-top: 10px;
        }
    }

    .go-page-btn {
        margin-top: 120px;
    }

    .has-list-btn {
        margin-top: 20px;
    }

    .other-list-wrapp {
        display: flex;
        flex-direction: column;

        h3 {
            margin-bottom: 10px;
        }

        a {
            color: ${ ( {theme} ) => theme.colors.primaryPurple};
            font-weight: bold;
            padding: 10px 0px;
            text-align: center;
        }
    }
`

export default styled(TextField)`
    color: blue;
`
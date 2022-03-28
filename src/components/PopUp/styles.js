import styled from 'styled-components';

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
    height: 60vh;
    top: 20vh;
    right: 10vw;
    padding: 16px;

    .close-btn-wrapper {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    h2 {
        margin-top: 40px;
        text-align: center;
    }
    
    span{
        display: block;
    }

    .link-wrapper {
        width: calc(100% - 10px);
        margin-top: 30px;
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
`
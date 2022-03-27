import styled from 'styled-components';

export const ListWrapper = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .add-btn {
        width: 200px;
        margin-top: 6rem;

        a {
            color: white;
            text-decoration: none;
        }
    }
`

export const Navbar = styled.div`
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px;
    background-color: rgba(242, 189, 214, 0.24);

    img {
        height: 50px;
    }

    div {
        display: flex;
        gap: 30px;
    }

`

export const ListName = styled.div`
    width: 100%;
    height: 90px;
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 5px 15px;

    img {
        height: 50px;
    }

    span {
        text-transform: uppercase;
        color: ${ ( {theme} ) => theme.colors.primaryPurple};
        font-weight: bold;
    }

`

export const ToDoWrapper = styled.div`
    width: 100%;
    height: 90px;
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 5px 15px;

`

export const ToDoItemWrap = styled.div`
    width: 100%;
    height: 90px;
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 5px 15px;
    background-color: ${ ( {theme} ) => theme.colors.primaryGray};
    border-radius: 15px;

    .avatar-wrapp {
        width: 60px;
        display: flex;
        align-items: center;
        img {
            height: 25px;
        }
    }

    .doubt-btn {
        width: 25px;
        height: 25px;
        background-color: ${ ( {theme} ) => theme.colors.softGreen};
        color: ${ ( {theme} ) => theme.colors.primaryPurple};
        font-weight: bolder;
        font-size: 15px;
        border-radius: 100%;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        justify-self: end;
    }



    /* The checkbox-container */
    .checkbox-container {
    width: 250px;
    display: block;
    position: relative;
    padding-left: 35px;
    cursor: pointer;
    font-size: 20px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    }

    /* Hide the browser's default checkbox */
    .checkbox-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    }

    /* Create a custom checkbox */
    .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    border-radius: 5px;
    background-color: #eee;
    }

    /* On mouse-over, add a grey background color */
    .checkbox-container:hover input ~ .checkmark {
    background-color: #ccc;
    }

    /* When the checkbox is checked, add a blue background */
    .checkbox-container input:checked ~ .checkmark {
    background-color: ${ ( {theme} ) => theme.colors.primaryPurple};
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
    content: "";
    position: absolute;
    display: none;
    }

    /* Show the checkmark when checked */
    .checkbox-container input:checked ~ .checkmark:after {
    display: block;
    }

    /* Style the checkmark/indicator */
    .checkbox-container .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    }
`
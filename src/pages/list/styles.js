import styled from 'styled-components';

export const ListWrapper = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .add-btn {
        width: 220px;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 15px;

`

export const ToDoItemTutorialWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${ ( {theme} ) => theme.colors.primaryGray};
`

export const ToDoItemWrap = styled.div`
    width: 100%;
    height: 90px;
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 5px 15px;
    /* background-color: ${ ( {theme} ) => theme.colors.primaryGray};
    border-radius: 15px; */
    justify-content: space-between;

    .avatar-name-wrapp{
        display: flex;
        .avatar-wrapp {
            width: 60px;
            display: flex;
            align-items: center;
        }
    }

    .doubt-btn {
        width: 30px;
        height: 30px;
        background-color: ${ ( {theme} ) => theme.colors.softGreen};
        color: ${ ( {theme} ) => theme.colors.primaryPurple};
        font-weight: bolder;
        font-size: 16px;
        border-radius: 100%;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    }

`
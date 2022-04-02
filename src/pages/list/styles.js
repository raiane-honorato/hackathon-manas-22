import styled from 'styled-components';

export const ListWrapper = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${ ( {theme} ) => theme.colors.softPink};

    .add-btn {
        width: 220px;
        margin-top: 6rem;
        margin-bottom: 6rem;

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
    justify-content: center;
    align-items: center;
    margin: 15px;

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
    padding: 5px 25px;
    justify-content: space-between;

    div {
        display: flex;
        align-items: center;
        .list-icon {
            height: 50px;
        }
    
        input {
            height: 35px;
            text-transform: uppercase;
            color: ${ ( {theme} ) => theme.colors.primaryPurple};
            font-weight: bold;
            background-color: transparent;
            border: none;
            font-size: 18px;
            padding: 10px;
            width: 60vw;
    
            ::placeholder {
                color:${ ( {theme} ) => theme.colors.softGray}
            }
            
            :focus {
                outline-color: ${ ( {theme} ) => theme.colors.primaryPurple};
            }
        }
    }

`

export const ToDoWrapper = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    padding: 5px 15px;
    margin-top: 19px;

`

export const ToDoItemTutorialWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const ToDoItemWrap = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 10px;
    align-items: center;
    justify-items: start;
    padding: 5px 15px;
    background-color: ${ ( {theme} ) => theme.colors.primaryPurple};
    border-radius: 15px;
    color: white;
    cursor: pointer;
    filter: brightness(${props => props.done ? "50%" : "100%"});

    span {
        color: white;
    }

    .checkbox-label {
        color: white;
    }

    .avatar-name-wrapp{
        display: flex;
        flex-direction: column;
        gap: 5px;
        span {
            color: white;
            font-weight: 600;
        }

        .avatar-wrapp {
            width: 60px;
            display: flex;
            align-items: center;
        }
    }

    .task-checkbox {
        justify-self: end;
        z-index: 2000;
    }

    .doubt-btn {
        width: 30px;
        height: 30px;
        background-color: white;
        color: ${ ( {theme} ) => theme.colors.primaryPurple};
        font-weight: bolder;
        font-size: 16px;
        border-radius: 100%;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        justify-self: end;
        margin: 9px;
    }

`
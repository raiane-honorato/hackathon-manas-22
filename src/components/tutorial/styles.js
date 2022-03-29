import styled from 'styled-components';

export const TutorialWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${ ( {theme} ) => theme.colors.softGreen};
    padding: 30px;
    transform: translateY(-12px);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    transition: all 1s ease 1s;
    position: relative;

    .balloon-div{
      width: 25px;
      height: 25px;
      background-color: blue;
      position: absolute;
      top: -8px;
      right: 20px;
      transform: rotate(45deg);
      background-color: ${ ( {theme} ) => theme.colors.softGreen};
    }

    iframe {
      min-width: 80%;
      min-height: 30vw;
    }

    div {
      width: 100%;
      margin-bottom: 10px;
    }

`

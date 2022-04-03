import styled from 'styled-components';

export const TutorialWrapper = styled.div`
    margin-top: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 30px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    transition: all 1s ease 1s;
    position: relative;
    border-radius: 10px;

    .balloon-div{
      width: 25px;
      height: 25px;
      background-color: blue;
      position: absolute;
      top: -8px;
      right: 25px;
      transform: rotate(45deg);
      background-color: white;
      border-radius: 4px;
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

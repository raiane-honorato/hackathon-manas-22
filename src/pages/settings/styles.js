import styled from 'styled-components';
import { TransButton } from '../../styles/button';

export const SettingsWrapper = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${ ( {theme} ) => theme.colors.softPink};

    .go-back {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      background-color: white;
      padding: 16px 20px 0px 16px;
      gap: 10px;

      span {
        text-transform: uppercase;
        color: ${ ( {theme} ) => theme.colors.primaryPurple};
        font-weight: bolder;
        font-size: 20px;
        margin-bottom: 10px;
      }

    }
`

export const AccordionWrapper = styled.div`
  padding: 30px 15px;


  .settings-title-wrapp {
    display: flex;
    align-items: center;
    gap: 10px;

    span {
        text-transform: uppercase;
        color: ${ ( {theme} ) => theme.colors.primaryPurple};
        font-weight: bolder;
        font-size: 20px;
      }
  }

  .person-wrapp, .reward-wrapp {
    padding: 0px 5px;
  }

  .reward-wrapp {
    display: flex;
    flex-direction: column;
    gap: 10px;

    textarea {
      min-height: 80px;
      border: 1px solid ${ ( {theme} ) => theme.colors.softGray};
      border-radius: 10px;
      resize: none;
      padding: 10px;
      font-size: 14px;

      :focus {
        outline-color: ${ ( {theme} ) => theme.colors.primaryPurple};
      }
    }
  }

  .settings-btn-action{
        color: ${ ( {theme} ) => theme.colors.primaryPurple};
        font-weight: bold;
        text-decoration: underline;
        font-size: 16px;
        margin-top: 30px;
        margin-left: auto;
        width: 100%;
      }

`

export const PersonItemWrapper = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .person-avatar {
    width: 30px;
  }
`

export const DeleteButton =styled(TransButton)`
    color: ${ ( {theme} ) => theme.colors.mainRed};
    border: 1px solid ${ ( {theme} ) => theme.colors.mainRed};
    width: 100%;
    margin-top: 30px;
`
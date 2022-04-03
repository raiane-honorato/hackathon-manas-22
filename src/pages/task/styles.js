import styled from 'styled-components';

export const TaskWrapper = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${ ( {theme} ) => theme.colors.softPink};

    .go-back-categories-wrapp {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      background-color: white;
      padding: 16px 20px 0px 0px;
      gap: 10px;

      a {
        margin-left: 16px;
      }

      span {
        text-transform: uppercase;
        color: ${ ( {theme} ) => theme.colors.primaryPurple};
        font-weight: bolder;
        font-size: 20px;
        margin-left: 16px;
        margin-bottom: 10px;
      }

      .category {
        border: 1px solid ${ ( {theme} ) => theme.colors.primaryPurple};
        border-radius: 10px 10px 0px 0px;
        font-size: 18px;
        width: 160px;
      }

      .cat-active {
        border: 1px solid ${ ( {theme} ) => theme.colors.softPink};
        background-color: ${ ( {theme} ) => theme.colors.softPink};
      }
    }

    .label-form {
      width: 100%;
      padding: 25px 0px 0px 20px;
      color: ${ ( {theme} ) => theme.colors.primaryPurple};
      font-weight: 600;
    }

    .form-wrapp {
      padding: 15px 20px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      button, a{
        color: ${ ( {theme} ) => theme.colors.primaryPurple};
        font-weight: bold;
        text-decoration: underline;
        font-size: 13px;
      }

    }
  
    .recurrent-wrap {
      padding: 20px;
      width: 100%;
      margin-bottom: 10px;
      label {
        font-size: 16px;
      }
      span {
        height: 20px;
        width: 20px;
      }
      .checkmark:after{
        top: 0px;
        left: 7px;
      }

      .description-recurrent-wrap{
        .desc-recurrent, .question-recurrent{
          display: block;
          width: 100%;
          height: 100%;
          margin: 0px 0px;

          :nth-child(1) {
            font-size: 14px;
            padding: 8px;
            margin-bottom: 20px;
            margin-top: 4px;
          }
          :nth-child(2) {
            margin-bottom: 25px;
          }
        }
        
      }
    }

    .add-task-btn {
      margin-top: 80px;
    }

    .delete-task-btn {
      margin-top: 20px;
    }
`
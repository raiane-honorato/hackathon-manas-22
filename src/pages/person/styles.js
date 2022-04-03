import styled from 'styled-components';

export const PersonWrapper = styled.div`
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

    .person-fields {
      width: 100%;
      padding: 35px;
      display: flex;
      flex-direction: column;
      gap: 40px;

      .person-field-div {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      span {
        text-transform: uppercase;
        color: ${ ( {theme} ) => theme.colors.primaryPurple};
        font-weight: bold;
      }


      .avatar-fields {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;

        li {
          list-style-type: none;
        }

        .avatar-img {
          width: 80px;
        }

        .avatar-active {
          border: 5px solid ${ ( {theme} ) => theme.colors.primaryPurple};
          border-radius: 100%;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
      }
    }

    .person-buttons{
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
`
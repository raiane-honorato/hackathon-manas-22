import { ThemeProvider } from "styled-components";
import MyRoutes from "./routes";
import { GlobalStyle } from "./styles/globalStyle";
import { PageContainer, SecondContainer } from "./styles/pageContainer";
import { theme } from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme = {theme}>
      <GlobalStyle />
      <PageContainer>
        <SecondContainer>
          <MyRoutes />
        </SecondContainer>
      </PageContainer>
    </ThemeProvider>
  );
};

export default App;

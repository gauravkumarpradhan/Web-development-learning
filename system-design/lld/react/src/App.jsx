import { ThemeProvider } from "./questions/DarkMode/mode";
import RouterContainer from "./questions/DarkMode/routes";


function App() {
  return (
    <>
      <ThemeProvider>
        <RouterContainer />
      </ThemeProvider>
    </>
  );
}

export default App;

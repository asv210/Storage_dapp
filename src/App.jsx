import { Toaster } from "react-hot-toast";
import Home from "./components/Home.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";
function App() {
  return (
    <>
     
      
        <Home />
        <Toaster />
      
    </>
  );
}

export default App;

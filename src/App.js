import AllRoutes from "./components/AllRoutes";
import './App.css';
import { useEffect } from "react";

function App() {

  useEffect(() => {
    document.title = 'BTL OOP 2023';
  }, [])

  return (
    <AllRoutes/>
  );
}

export default App;

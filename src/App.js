import AllRoutes from "./components/AllRoutes";
import './App.css';
import { useEffect } from "react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {

  useEffect(() => {
    document.title = 'BTL OOP 2023';
  }, [])

  return (
    <AllRoutes/>
  );
}

export default App;

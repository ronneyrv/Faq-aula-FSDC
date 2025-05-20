import { BrowserRouter } from "react-router-dom";
import MainRaoutes from "./routes";
import Header from "./components/Header";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <MainRaoutes />
    </BrowserRouter>
  );
}

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Faq from "./pages/Faq";

export default function MainRaoutes() {
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/novo-faq" element={<Faq/>} />
        </Routes>
    )
}
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Faq from "./pages/Faq";
import Edit from "./pages/Edit";

export default function MainRaoutes() {
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/novo-faq" element={<Faq/>} />
            <Route path="/edit-faq/:id" element={<Edit />} />
        </Routes>
    )
}
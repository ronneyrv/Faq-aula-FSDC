import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Edit from "./pages/Edit";

export default function MainRaoutes() {
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/add-faq" element={<Add/>} />
            <Route path="/edit-faq/:id" element={<Edit />} />
        </Routes>
    )
}
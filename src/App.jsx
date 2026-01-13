import ContactFormV2 from "./contact-us/ContactFormV2";
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./routes/Home";
import ContactUs from "./routes/ContactUs";
import Header from "./components/Header";
import AboutMe from "./components/AboutMe.jsx";
import Gallery from "./components/Gallery.jsx";
import ToDo from "./components/ToDo.jsx";


function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
               <Route index element={<Home/>}/>
                <Route path="/contact-us" element={<ContactUs/>}/>
                <Route path="/about" element={<AboutMe/>}/>
                <Route path="/gallery" element={<Gallery/>}/>
                <Route path="/todo" element={<ToDo/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App

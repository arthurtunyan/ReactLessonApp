import ContactFormV2 from "./contact-us/ContactFormV2";
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./routes/Home";
import ContactUs from "./routes/ContactUs";
import Header from "./components/Header";


function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
               <Route index element={<Home/>}/>
                <Route path="/contact-us" element={<ContactUs/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App

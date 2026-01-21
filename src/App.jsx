import {BrowserRouter, Route, Routes} from "react-router";
import Header from "./components/Header";
import {lazy, Suspense} from "react";

const ToDo = lazy(() => import("./routes/ToDo.jsx"))
const Gallery = lazy(() => import("./routes/Gallery.jsx"))
const AboutMe = lazy(() => import("./routes/AboutMe.jsx"))
const ContactUs = lazy(() => import("./routes/ContactUs"))
const Home = lazy(() => import("./routes/Home"))

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path="/contact-us" element={<ContactUs/>}/>
                    <Route path="/about" element={<AboutMe/>}/>
                    <Route path="/gallery" element={<Gallery/>}/>
                    <Route path="/todo" element={<ToDo/>}/>
                </Routes>
            </Suspense>

        </BrowserRouter>
    )
}

export default App

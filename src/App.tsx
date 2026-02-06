import {BrowserRouter, Route, Routes} from "react-router";
import Header from "./components/Header";
import {lazy, Suspense} from "react";
import {ThemeProvider} from "./Context/ThemeContext";
import Counter from "./routes/Counter";

const ToDo = lazy(() => import("./routes/ToDo"))
const Gallery = lazy(() => import("./routes/Gallery"))
const AboutMe = lazy(() => import("./routes/AboutMe"))
const ContactUs = lazy(() => import("./routes/ContactUs"))
const Home = lazy(() => import("./routes/Home"))

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Header/>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route index element={<Home/>}/>
                        <Route path="/contact-us" element={<ContactUs/>}/>
                        <Route path="/about" element={<AboutMe/>}/>
                        <Route path="/gallery" element={<Gallery/>}/>
                        <Route path="/todo" element={<ToDo/>}/>
                        <Route path = "/counter" element={<Counter/>}/>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App

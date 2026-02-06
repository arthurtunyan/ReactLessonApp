import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./components/Header";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "./Context/ThemeContext";
const ToDo = lazy(() => import("./routes/ToDo.jsx"));
const Gallery = lazy(() => import("./routes/Gallery.jsx"));
const AboutMe = lazy(() => import("./routes/AboutMe.jsx"));
const ContactUs = lazy(() => import("./routes/ContactUs"));
const Home = lazy(() => import("./routes/Home"));
function App() {
    return (_jsx(ThemeProvider, { children: _jsxs(BrowserRouter, { children: [_jsx(Header, {}), _jsx(Suspense, { fallback: _jsx("div", { children: "Loading..." }), children: _jsxs(Routes, { children: [_jsx(Route, { index: true, element: _jsx(Home, {}) }), _jsx(Route, { path: "/contact-us", element: _jsx(ContactUs, {}) }), _jsx(Route, { path: "/about", element: _jsx(AboutMe, {}) }), _jsx(Route, { path: "/gallery", element: _jsx(Gallery, {}) }), _jsx(Route, { path: "/todo", element: _jsx(ToDo, {}) })] }) })] }) }));
}
export default App;
//# sourceMappingURL=App.js.map
//# sourceMappingURL=App.js.map
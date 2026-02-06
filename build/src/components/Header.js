import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router";
import { useState } from "react";
function Header() {
    const [active, setActive] = useState("home");
    const linkStyle = (isActive) => ({
        textDecoration: "none",
        color: isActive ? "#007bff" : "#333",
        fontWeight: isActive ? "600" : "400",
        paddingBottom: "4px",
        borderBottom: isActive ? "2px solid #007bff" : "2px solid transparent",
        marginRight: "16px"
    });
    return (_jsxs("nav", { style: {
            background: "#fff",
            padding: "16px 28px",
            borderBottom: "1px solid #ddd",
        }, children: [_jsx(Link, { to: "/", style: linkStyle(active === "home"), onClick: () => setActive("home"), children: "Home" }), _jsx(Link, { to: "/contact-us", style: linkStyle(active === "contact"), onClick: () => setActive("contact"), children: "Contact Us" }), _jsx(Link, { to: "/about", style: linkStyle(active === "about"), onClick: () => setActive("about"), children: "About Me" }), _jsx(Link, { to: "/gallery", style: linkStyle(active === "gallery"), onClick: () => setActive("gallery"), children: "Gallery" }), _jsx(Link, { to: "todo", style: linkStyle(active === "todo"), onClick: () => setActive("todo"), children: "To Do" })] }));
}
export default Header;
//# sourceMappingURL=Header.js.map
//# sourceMappingURL=Header.js.map
import {Link} from "react-router";
import {useState} from "react";

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

    return (
        <nav
            style={{
                background: "#fff",
                padding: "16px 28px",
                borderBottom: "1px solid #ddd",
            }}
        >

            <Link
                to="/"
                style={linkStyle(active === "home")}
                onClick={() => setActive("home")}
            >
                Home
            </Link>

            <Link
                to="/contact-us"
                style={linkStyle(active === "contact")}
                onClick={() => setActive("contact")}
            >
                Contact Us
            </Link>

        </nav>
    );
}

export default Header;
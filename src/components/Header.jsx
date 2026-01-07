import {Link} from "react-router";

function Header(){
    return(
        <nav>
            <Link to="/">Home</Link>
            <Link to="/contact-us">Contact Us</Link>
        </nav>
    )
}

export default Header;
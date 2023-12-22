import {NavLink} from 'react-router-dom';

export default function Navbar(){
    return (
        <nav className="navbar">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/books">Books</NavLink>
            <NavLink to = "/addBook">Add Book</NavLink>
        </nav>
    )
    
}
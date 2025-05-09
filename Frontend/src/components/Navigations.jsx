import { Link } from "react-router-dom";

export default function Navigation({ token, setToken }) {
    const isLoggedIn = !!token;
  
    function handleLogout() {
      setToken(null); // 
    }

    return (
        <nav className="main-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
    
            {isLoggedIn ? (
              <>
                <li><Link to="/account">Account</Link></li>
                <li><Link to="/reservations">Reservations</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      );
    }
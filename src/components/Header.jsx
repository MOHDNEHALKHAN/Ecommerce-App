import { Link, useNavigate } from 'react-router'
import { useCart } from '../context/CartContext' // if using
import { useAuth } from '../context/AuthContext'
import './Header.css';


const Header = () => {
  const { token, logout } = useAuth()
  const { cartItems } = useCart() || { cartItems: [] }
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="header"  >
      {token ? (
        <>
          <Link to="/" className="nav-btn" >Home</Link>
          <Link to="/cart" className="nav-btn">
            Cart ({cartItems.length})
          </Link>
          <button onClick={handleLogout} className="nav-btn">
            Logout
          </button>
        </>
      ) : (
        <Link to="/login" style={{ color: '#fff' }}>Login</Link>
      )}
    </header>
  )
}

export default Header

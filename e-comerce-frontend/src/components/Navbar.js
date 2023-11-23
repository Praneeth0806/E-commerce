import './Navbar.css'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useMemo, useState} from 'react'
import {logout} from '../utils/localstorage'
import {setInitialState} from '../redux/actions/userAction'


const Navbar = ({click}) => {
  const cart = useSelector(state => state.cart)
  const items = useSelector(state => state.getProducts)
  const history = useHistory()
  const user = useSelector(state => state.user)
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch()
  // console.log({user})

  const {cartItems} = cart

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
  }

  const _handleLogout = () => {
    // console.log('click')
    dispatch(setInitialState())
    logout()
    history.push('/')
  }

  const handleSearch = () => {
    const searchResult = items.products.find(
      (item) => item.name.toLowerCase() === searchQuery.toLowerCase()
    );

    if (searchResult) {
      console.log('Found object:', searchResult);
      console.log(searchResult._id);
      history.push(`/product/${searchResult._id}`);
    } else {
      console.log('Object not found');
      alert('Object not found')
    }
  };

  const handleInputChange = (e) => {
    // Function to update the input state
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    // Check if the Enter key is pressed (key code 13)
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <h2>JSOM-E-COMERCE</h2>
      </div>

      <ul className="navbar__links">
        <li>
        <input type='text' className='searchBar' onChange={handleInputChange}  onKeyPress={handleKeyPress} />
        </li>
        <li>
          <Link to="/cart" className="cart__link">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart <span className="cartlogo__badge">{getCartCount()}</span>
            </span>
          </Link>
        </li>

        <li>
          <Link to="/">Shop</Link>
        </li>

        {!user.userInfo.isLogin ? (
          <li>
            <Link to="/signin">Login</Link>
          </li>
        ) : (
          <li>
            <p onClick={_handleLogout}>Logout</p>
          </li>
        )}
      </ul>

      <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  )
}

export default Navbar

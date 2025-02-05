import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <div className="header-container">
    <Link to="/">
      <img
        className="header-logo"
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
      />
    </Link>
    <ul className="header-items">
      <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
        <li>Home</li>
      </Link>
      <Link to="/jobs" style={{textDecoration: 'none', color: 'white'}}>
        <li>Jobs</li>
      </Link>
    </ul>
    <button className="home-btn" type="button">
      Logout
    </button>
  </div>
)

export default Header

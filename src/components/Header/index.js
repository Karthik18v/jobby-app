import {Link} from 'react-router-dom'
import {IoHome} from 'react-icons/io5'
import {GiSuitcase} from 'react-icons/gi'
import {IoIosLogOut} from 'react-icons/io'

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
    <button className="logout-btn" type="button">
      Logout
    </button>
    <div className="mobile-view-nav-items">
      <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
        <IoHome size={20} />
      </Link>

      <Link to="/jobs">
        <GiSuitcase
          size={25}
          style={{textDecoration: 'none', color: 'white'}}
        />
      </Link>
      <button type="button" className="mobile-logout-btn">
        <IoIosLogOut size={25} />
      </button>
    </div>
  </div>
)

export default Header

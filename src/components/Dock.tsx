import { Link, useLocation } from '@tanstack/react-router'
import Home from 'icons/Home'
import OK from 'icons/OK'
import Users from 'icons/Users'

export default function Dock() {
  // Get active path
  const location = useLocation()
  return (
    <div className="dock dock-xs">
      <Link to="/" className={location.pathname === '/' ? 'dock-active' : ''}>
        <button className="dock-active">
          <OK />
        </button>
      </Link>
      <Link
        to="/merv"
        className={location.pathname === '/merv' ? 'dock-active' : ''}
      >
        <button>
          <Home />
        </button>
      </Link>
      <Link
        to="/users"
        className={location.pathname === '/users' ? 'dock-active' : ''}
      >
        <button>
          <Users />
        </button>
      </Link>
    </div>
  )
}

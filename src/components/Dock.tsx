import { Link, useLocation } from '@tanstack/react-router'
import Home from 'icons/Home'
import OK from 'icons/OK'
import Users from 'icons/Users'

export default function Dock() {
  const location = useLocation()
  return (
    <div className="dock dock-xs">
      <Link to="/" className={location.pathname === '/' ? 'dock-active' : ''}>
        <button className="cursor-pointer">
          <OK />
        </button>
      </Link>
      <Link
        to="/merv"
        className={location.pathname === '/merv' ? 'dock-active' : ''}
      >
        <button className=" cursor-pointer">
          <Home />
        </button>
      </Link>
      <Link
        to="/accounts"
        className={location.pathname === '/accounts' ? 'dock-active' : ''}
      >
        <button>
          <Users />
        </button>
      </Link>
    </div>
  )
}

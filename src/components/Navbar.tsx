import { Link } from '@tanstack/react-router'

export default function Navbar() {
  return (
    <div class="navbar bg-primary text-primary-content sticky top-0">
      <Link to="/">
        <button class="btn btn-ghost text-xl">merv</button>
      </Link>
    </div>
  )
}

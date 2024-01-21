import './index.css'

const Header = props => {
  const {heading} = props
  return (
    <nav className="nav-bar">
      <p>{heading}</p>
      <p>My Orders</p>
    </nav>
  )
}
export default Header

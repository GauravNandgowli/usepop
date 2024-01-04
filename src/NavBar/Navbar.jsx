import Logo from "./Logo";
import Search from "./Search";

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo></Logo>

      {children}
    </nav>
  );
}

export default Navbar;

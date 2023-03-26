import NavbarLink from "./NavbarLink";

export default function Header() {
  return <div className="topnav">
    <NavbarLink url="/" name="Home" />
    <NavbarLink url="/new" name="Create new event" />
    {/* <img className="logo" src="./logo.jpg" alt="logo" /> */}
  </div>;
}
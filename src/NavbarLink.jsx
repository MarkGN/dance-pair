import { Link, useLocation } from 'react-router-dom';

export default function NavbarLink(props) {
  const location = useLocation();
  return <Link to={props.url} className={location.pathname === props.url ? "active" : ""}>{props.name}</Link>
}
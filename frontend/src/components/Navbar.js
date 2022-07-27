import {Link} from 'react-router-dom';
import "./Navbar.scss"

const Navbar = () => {
  return ( 
    <nav>
      <h2>Die Checker</h2>
      <ul>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/createchecklist'}>Add Checklist</Link></li>
      </ul>
    </nav>
   );
}
 
export default Navbar;
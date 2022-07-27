import {Link} from 'react-router-dom';

const Navbar = () => {
  return ( 
    <nav>
      <h2>Check de Check check</h2>
      <ul>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/createchecklist'}>Add Checklist</Link></li>
      </ul>
    </nav>
   );
}
 
export default Navbar;
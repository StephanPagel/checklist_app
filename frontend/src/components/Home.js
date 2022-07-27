import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import apiLink from "./api"

const Home = () => {

    const [checklists, setChecklists] = useState([])
    
    useEffect(() => {
        fetch(`${apiLink}/checklists`)
        .then(response => response.json())
        .then(data => setChecklists(data))
    },[])

    return (
      <div>
        <h1>Checklists</h1>

        {checklists.map((list) => (
          <div key={list.id}>
            <Link to={`/checklistdetails/${list.id}`}>{list.title}</Link>
          </div>
        ))}
      </div>
    );
}
 
export default Home;
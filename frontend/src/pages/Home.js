import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import apiLink from "../components/api"
import "./Home.scss"

const Home = () => {

    const [checklists, setChecklists] = useState([])
    
    useEffect(() => {
        fetch(`${apiLink}/checklists`)
        .then(response => response.json())
        .then(data => setChecklists(data))
    },[])

    return (
      <div className="home">
        <img src="image/surja-sen-das-raj-cM94J4lOSU0-unsplash.jpg" alt="todo" />
        <h1>Checklists</h1>

        <section>
          {checklists.map((list) => (
            <div key={list.id}>
              <Link to={`/checklistdetails/${list.id}`}>{list.title}</Link>
            </div>
          ))}
        </section>
      </div>
    );
}
 
export default Home;
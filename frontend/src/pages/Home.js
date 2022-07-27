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

    const styler = (i) => {
      let divStyle = {}
      switch(i % 4) {
        case 0: 
        divStyle.backgroundColor = '#2b6777';
        divStyle.color = 'white'
        break;
        case 1: 
        divStyle.backgroundColor = '#c8d8e4';
        divStyle.color = '#212529'
        break;
        case 2: 
        divStyle.backgroundColor = '#C7F0EC';
        divStyle.color = '#212529'
        break;
        case 3: 
        divStyle.backgroundColor = '#52ab98';
        divStyle.color = 'white';
        break;
      }
      return divStyle;
    }

    return (
      <div className="home">
        <img src="image/surja-sen-das-raj-cM94J4lOSU0-unsplash.jpg" alt="todo" />
        <h1>Checklists</h1>

        <section>
          {checklists.map((list, index) => (
            <Link to={`/checklistdetails/${list.id}`}>
            <div key={list.id} style={styler(index)}>
              <span>{list.title}</span>
            </div>
            </Link>
          ))}
        </section>
      </div>
    );
}
 
export default Home;
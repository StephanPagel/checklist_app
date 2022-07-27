import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import apiLink from "./api"

const ChecklistDetails = () => {

    const {id} = useParams()
    const [checklistDetails, setChecklistDetails] = useState([])

console.log(checklistDetails)

    useEffect(() => {
        fetch(`${apiLink}/checklistdetails/`+id)
          .then((response) => response.json())
          .then((checklistObject) => setChecklistDetails(checklistObject));
    },[id])
    
    if(checklistDetails) return ( 
    <div>
        <img src={`${apiLink}/${checklistDetails.imgPath}`} alt="img" />
        <h1>{checklistDetails.title}</h1>

        {/* <ul>
            {
                checklistDetails.map(detail => 
                <li key={detail.id}>
                    {detail.checked?"☐":"☑︎"}{detail.title}
                    </li>
                    )
            }
        </ul> */}
    </div>
    )
    else return (
        <h1>Loading...</h1>
    )
}
 
export default ChecklistDetails;
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiLink from '../components/api';

const ChecklistDetails = () => {
	const { id } = useParams();
	const [checklistDetails, setChecklistDetails] = useState([]);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const navigator = useNavigate();

	useEffect(() => {
		fetch(`${apiLink}/checklistdetails/` + id)
			.then((response) => response.json())
			.then((checklistObject) => setChecklistDetails(checklistObject));
	}, [id]);

	const toggleCheckpoint = (listId, checkPointId) => {
		fetch(`${apiLink}/togglechecked/${listId}/${checkPointId}`, {
			method: 'PUT',
		})
			.then((response) => response.json())
			.then((updatedDetails) => {
				setChecklistDetails(updatedDetails);
			})
			.catch((err) => console.log(err));
	};

    const deleteList = () => {
        fetch(apiLink + `/deletelist/${checklistDetails.id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(() => navigator('/'))
        .catch(err => console.log(err));
    }

	if (checklistDetails)
		return (
			<div>
                <div>
                    {!deleteConfirm && <button onClick={()=> setDeleteConfirm(true)}>DELETE</button>}
                
                {deleteConfirm && <div>
                    <span>Are u sure u want to delete the list?</span>
                    <div><button onClick={deleteList}>Hell yeah</button><button onClick={() => setDeleteConfirm(false)}>Cancel</button></div>
                    </div>} 
                </div>

				<img src={`${apiLink}/${checklistDetails.imgPath}`} alt='img' />
				<h1>{checklistDetails.title}</h1>
				<ul>
					{checklistDetails.checkPoints?.map((detail) => (
						<li
							key={detail.id}
							onClick={() => toggleCheckpoint(checklistDetails.id, detail.id)}
						>
							{detail.checked ? '☑︎' : '☐'}
							{detail.title}
						</li>
					))}
				</ul>
				<Link to={'/'}> Back to Home</Link>
			</div>
		);
	else return <h1>Loading...</h1>;
};

export default ChecklistDetails;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiLink from '../components/api';

const CreateChecklist = () => {
	const navigator = useNavigate();

	const [listTitle, setListTitle] = useState('');
	const [currentCheckpoint, setCurrentCheckpoint] = useState('');
	const [checkPointArray, setCheckPointArray] = useState([]);
	const [imgFile, setImgFile] = useState('');

	const addCheckpoint = (e) => {
		e.preventDefault();
		if (currentCheckpoint) {
			checkPointArray.push(currentCheckpoint);
			setCurrentCheckpoint('');
			return;
		}
		return;
	};

	const createChecklist = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('title', listTitle);
		formData.append('titlesArray', JSON.stringify(checkPointArray));
		formData.append('titleImage', imgFile);

		fetch(apiLink + '/createlist', {
			method: 'POST',
			body: formData,
		})
			.then((res) => res.json())
			.then((newChecklist) => {
				navigator(`/checklistdetails/${newChecklist.id}`);
			})
			.catch((err) => console.log(err));
	};

	const onFileChange = (e) => {
		const imgFile = e.target.files[0];
		setImgFile(imgFile);
	};

	return (
		<div>
			<h1>Create a Checklist my friend</h1>
			<form onSubmit={createChecklist}>
				<div>
					<label htmlFor='listTitle'>Checklist Title</label>
					<input
						type='text'
						id='listTitle'
						value={listTitle}
						onChange={(e) => setListTitle(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor='listImg'>Choose Checklist Image</label>
					<input type='file' id='listImg' onChange={onFileChange} />
				</div>
				<h2>Create Your Checkpoints</h2>
				<ul>
					{checkPointArray.map((checkPoint, index) => (
						<li key={index}>{checkPoint}</li>
					))}
				</ul>
				<div>
					<label htmlFor='checkPointTitle'>Add another Checkpoint</label>
					<input
						type='text'
						id='checkPointTitle'
						value={currentCheckpoint}
						onChange={(e) => setCurrentCheckpoint(e.target.value)}
					/>
				</div>
				<button onClick={addCheckpoint}>Add Checkpoint</button>
				<button type='submit'>Add Checklist</button>
			</form>
		</div>
	);
};

export default CreateChecklist;

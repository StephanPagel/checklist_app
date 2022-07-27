import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiLink from '../components/api';
import './CreateChecklist.scss';

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
		<div className='create-checklist'>
			<img src='/image/thomas-bormans-pcpsVsyFp_s-unsplash.jpeg' alt='' />
			<h1>Create Checklist</h1>
			<form onSubmit={createChecklist}>
				<div className='input-container'>
					<label htmlFor='listTitle'>Checklist Title</label>
					<input
						type='text'
						id='listTitle'
						value={listTitle}
						onChange={(e) => setListTitle(e.target.value)}
					/>
				</div>
				<div className='input-container'>
					<label htmlFor='listImg'>Choose Checklist Image</label>
					<input type='file' id='listImg' onChange={onFileChange} />
				</div>
				<h2>Create Your Checkpoints</h2>
				<div className='input-container'>
					<input
						type='text'
						id='checkPointTitle'
						value={currentCheckpoint}
						onChange={(e) => setCurrentCheckpoint(e.target.value)}
					/>
				</div>
				<div className='btn-add-checkpoint'>
					<button onClick={addCheckpoint}>Add Checkpoint</button>
				</div>
				<div className='entered-checkpoints'>
					{checkPointArray.length > 0 && <h2>Entered Checkpoints</h2>}
					<ul>
						{checkPointArray.map((checkPoint, index) => (
							<li key={index}>
								<span>☐</span>
								<span>{checkPoint}</span>
							</li>
						))}
					</ul>
				</div>
				<div className='btn-add-checklist'>
					<button type='submit'>Confirm Checklist</button>
				</div>
			</form>
		</div>
	);
};

export default CreateChecklist;

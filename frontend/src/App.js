import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import CreateChecklist from './pages/CreateChecklist';
import ChecklistDetails from './pages/ChecklistDetails';

function App() {
	return (
		<div className='App'>
      <Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/createchecklist' element={<CreateChecklist />} />
				<Route path='/checklistdetails/:id' element={<ChecklistDetails />} />
			</Routes>
		</div>
	);
}

export default App;
import logo from './logo.svg';
import './App.css';
import {Route, Routes} from 'react-router-dom'
import Home from "./components/Home"
import CreateChecklist from "./components/CreateChecklist"
import ChecklistDetails from "./components/ChecklistDetails"

function App() {
  return (
    <div className="App">
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/createchecklist" element={<CreateChecklist/>}/>
    <Route path="/checklistdetails/:id" element={<ChecklistDetails/>}/>
   </Routes>
    </div>
  );
}

export default App;

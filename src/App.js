
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Signin from './components/Signin';
import AddTrainer from './components/AddTrainer';
import UserList from './components/UserList';
import EditUser from './components/EditUser';
import Trainer from './components/Trainer'
import SingleLearner from './components/SingleLearner';
import PlacmentOfficer from './components/PlacmentOfficer';
import Home from './components/Home';
import Csvupload from './components/Csvupload';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Home />}></Route>
        <Route path='/login' exact element={<Signin />}></Route>
        <Route path='/trainplace/:query' exact element={<UserList />}></Route>
        <Route path='/addtrainer' exact element={<AddTrainer />}></Route>
        <Route path='/edituser/:empid' exact element={<EditUser />}></Route>
        <Route path='/placementOfficer' exact element={<PlacmentOfficer/>}/>
        <Route path='/traindash' exact element={<Trainer />}></Route>
        <Route path='/single-learner' exact element={<SingleLearner />} />
        <Route path='/csvupload' exact element={<Csvupload/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

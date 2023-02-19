
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Signin from './components/Signin';
import AddTrainer from './components/AddTrainer';
import UserList from './components/UserList';
import EditUser from './components/EditUser';
import TrainerDashboard from './components/TrainerDashboard';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Home/>}></Route>
        <Route path='/login' exact element={<Signin />}></Route>
        <Route path='/trainplace/:query' exact element={<UserList />}></Route>
        <Route path='/addtrainer' exact element={<AddTrainer />}></Route>
        <Route path='/edituser/:empid' exact element={<EditUser />}></Route>
        <Route path='/traindash' exact element={<TrainerDashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

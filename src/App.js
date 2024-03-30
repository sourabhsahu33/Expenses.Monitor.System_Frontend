import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import './index.css'
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
   <div className='app'> 
   <Routes>
    <Route path='/' element={
       <ProtectedRoutes> 
        <HomePage/> 
        </ProtectedRoutes>
      }
    />
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
   </Routes></div>
  
  );
}

export function ProtectedRoutes(props){
 if(localStorage.getItem('user')){
  return props.children;
 }else{
  return <Navigate to='/login' />;
 }
}

export default App;

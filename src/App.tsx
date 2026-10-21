import './App.css';
import {Routes, Route, Outlet} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import TaskPage from './pages/TasksPage';
import AddTaskPage from './pages/AddTaskPage';

function AppLayout() {
  return <>
<div className="app-shell">
  <Navbar/>
  <Outlet/>
  <Footer/>
</div>
  </>
 
}

function App(){
  return (
    <Routes>
      <Route element={<AppLayout/>}>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/tasks" element={<TaskPage/>} />
      <Route path="/tasks/new" element={<AddTaskPage/>}></Route>
      </Route>
     
    </Routes>
  )
}
export default App



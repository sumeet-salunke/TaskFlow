import './App.css';
import {Routes, Route, Outlet} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import TaskPage from './pages/TasksPage';
import AddTaskPage from './pages/AddTaskPage';
import EditTaskPage from "./pages/EditTaskPage";
import TaskDetailsPage from './pages/TaskDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

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
      <Route path="/tasks/:id" element={<TaskDetailsPage/>}/>
      <Route path="/tasks/:id/edit" element={<EditTaskPage/>} />
      <Route path="*" element={<NotFoundPage/>} />
      </Route>
    </Routes>
  )
}
export default App

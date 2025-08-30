import {Route, Routes, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TodoPage from './pages/TodoPage';
import Navbar from './components/Navbar';
import { useAuthStore } from '../src/store/useAuthStore';
import { useEffect } from 'react';
import {Home, Loader} from 'lucide-react'
import LowerNavbar from './components/LowerNavbar';
import { Toaster } from 'react-hot-toast';
import CreateTodo from './pages/CreateTodo';
function App() {
  const {authUser, isCheckingAuth, checkAuth} = useAuthStore() 

  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  if (isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className='size-10 animate-spin' />
    </div>
  )
  return (
    <div>
    <Toaster  reverseOrder={false} />
    <Navbar />
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/login' element={authUser ? <Navigate to='/todo' /> : <LoginPage />} />
      <Route path='/signup' element={authUser ? <Navigate to='/todo' /> :<SignupPage />}/>
      <Route path='/todo' element={authUser ? <TodoPage /> : <Navigate to='/login' />}/>
      <Route path='/create-todo' element={authUser ? <CreateTodo /> : <Navigate to='/login' />}/>
    </Routes>
    <LowerNavbar />
    </div>
  );
}

export default App;

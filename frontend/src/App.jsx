import FormReservation from './components/FormReservation';
import Calendar from './components/Calendar';
import AnnualStatistics from './components/AnnualStatistics';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react';
import NavBar from './components/NavBar';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Logout from './components/Logout';
import Landingpage from './pages/Landingpage';
import HuespedDetail from './pages/huespedes/HuespedDetail';
import Habitaciones from './pages/menu/menuHabitaciones';
import Reservas from './pages/menu/menuReservas';

const App = () => {

  const [user, setUser] = useState(null);
  const location = useLocation();

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  }

  const showNavBar = !['/login', '/'].includes(location.pathname);

  return (
    <div>
      {showNavBar && <NavBar username={user} onLogout={handleLogout}/>}
     <Routes> 
      <Route path='/' element={<Landingpage />}/>
      <Route path='/login' element={<Login onLogin={handleLogin} />}/>
      <Route path='/logout' element={<Logout onLogout={handleLogout} />}/>
      <Route element={<ProtectedRoute isAuthenticated={!!user} />} />
      <Route path='/home' element={<Home />} />;
      <Route path='/habitaciones' element={<Habitaciones />} />;
      <Route path='/reservas' element={<Reservas/>} />;
      <Route path='/calendar' element={<Calendar />} />;
      <Route path='/formreservation' element={<FormReservation />} />;
      <Route path='/dashboard' element={<AnnualStatistics />} />;  
      <Route path='/huesped/:huespedId' element={<HuespedDetail />} />              
      </Routes>
    </div>
  );
}

export default App;

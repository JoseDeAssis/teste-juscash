import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DefaultPage from './views/DefaultPage';
import SignInController from './controllers/SignInController';
import SignUpController from './controllers/SignUpController';
import PrivateRoute from './routes/PrivateRoute';
import LeadsController from './controllers/LeadsController';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultPage />}>
          <Route index element={<SignUpController />} />
          <Route path="/login" element={<SignInController />} />
          <Route element={<PrivateRoute />}>
            <Route path="/leads" element={<LeadsController />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

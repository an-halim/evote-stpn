import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import OtpVerify from '../pages/OtpVerify';
import Regist from '../pages/Register';
import ForgotPassword from '../pages/Forgot';
import SetNewPass from '../pages/SetNewPass';
import RegistSuccess from '../pages/RegistSuccess';
import Dashboard from '../pages/dashboard/Home';
import Period from '../pages/dashboard/Period';
import UserManagement from '../pages/dashboard/UserManagement';
import ConfirmUser from '../pages/dashboard/confirmUser';
import PasanganCalon from '../pages/dashboard/PasanganCalon';
import DetailVote from '../pages/dashboard/DetailVote';
import SuccessVote from '../pages/SuccessVote';
import NotFound from '../pages/NotFound';

export default function Router(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/success" element={<SuccessVote />} />
      <Route path="/login" element={<Login />} />
      <Route path="/regist" element={<Regist />} />
      <Route path="/regist-success" element={<RegistSuccess />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp-verify" element={<OtpVerify />} />
      <Route path="/set-new-password" element={<SetNewPass />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/periode" element={<Period />} />
      <Route path="/dashboard/paslon" element={<PasanganCalon />} />
      <Route path="/dashboard/user-management" element={<UserManagement />} />
      <Route path="/dashboard/user-management/confirm-user" element={<ConfirmUser />} />
      <Route path="/dashboard/detail-vote" element={<DetailVote />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
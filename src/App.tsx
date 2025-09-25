import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import FiribgarAdd from "./pages/Forms/FiribgarAdd";
import FormElements from "./pages/Forms/FormElements";
import BasicTables from "./pages/Tables/BasicTables";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfiles from "./pages/UserProfiles";
import NasiyaUsers from "./pages/Nasiya/NasiyaUsers";
import DetailNasiya from "./pages/Nasiya/DetailNasiya";
import DetailFraudster from "./pages/Fraudster/DetailFraudster";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Auth sahifalar */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/nasiya-add" element={<FormElements />} />
            <Route path="/firibgar-add" element={<FiribgarAdd />} />
            <Route path="/basic-tables" element={<BasicTables />} />
            <Route path="/nasiya" element={<NasiyaUsers />} />
            <Route path="/nasiya/:id" element={<DetailNasiya />} />
            <Route path="/firibgar/:id" element={<DetailFraudster />} />
            <Route path="/profile" element={<UserProfiles />} />
            {/* boshqa routelar ham shu yerga qo‘shiladi */}
          </Route>
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./app/features/auth/loginPage";
import LandingPage from "./app/features/landingPage/landingPage";
import Cruise from "./app/Pages/Cruise";
import Activity from "./app/Pages/Activity";
import Package from "./app/Pages/Package";
import SignupPage from "./app/features/auth/signupPage";
import CruiseBooking from "./app/components/CruiseBooking";
import ActivityBooking from "./app/components/ActivityBooking";
import PackageBooking from "./app/components/PackageBooking";
import AdminDashboard from "./app/admin/adminDashboard";
import TravelAgentRegister from "./app/admin/travelAgentRegister";
import TravelAgentEdit from "./app/admin/travelAgentEdit";
import AddNewData from "./app/backoffice/addNewData";
import CruiseDetails from "./app/backoffice/cruiseDetails";
import ActivityDetails from "./app/backoffice/activityDetails";
import PackageDetails from "./app/backoffice/packageDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<LandingPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
      </Routes>
      <Routes>
        <Route exact path="/cruise" element={<Cruise />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/package" element={<Package />} />
        <Route path="/cruise-booking" element={<CruiseBooking />} />
        <Route path="/activity-booking" element={<ActivityBooking />} />
        <Route path="/package-booking" element={<PackageBooking />} />
      </Routes>
      <Routes>
        <Route exact path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/agent-register" element={<TravelAgentRegister />} />
        <Route path="/agent-edit" element={<TravelAgentEdit />} />
      </Routes>
      <Routes>
        <Route exact path="/addNewData" element={<AddNewData />} />
        <Route exact path="/cruise-details" element={<CruiseDetails />} />
        <Route exact path="/activity-details" element={<ActivityDetails />} />
        <Route exact path="/package-details" element={<PackageDetails />} />
      </Routes>
    </>
  );
}

export default App;

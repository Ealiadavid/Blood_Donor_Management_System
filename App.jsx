import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddDonor from "./pages/AddDonor";
import ViewDonor from "./pages/ViewDonor";
import SearchDonor from "./pages/SearchDonor";
import EditDonor from "./pages/EditDonor";
import Layout from "./components/Layout";
import EmergencyRequest from "./pages/EmergencyRequest";

function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* Login Page */}

        <Route path="/" element={<Login />} />



        {/* Dashboard Layout */}

        <Route element={<Layout />}>


          <Route 
            path="/dashboard" 
            element={<Dashboard />} 
          />


          <Route 
            path="/add-donor" 
            element={<AddDonor />} 
          />


          <Route 
            path="/donors" 
            element={<ViewDonor />} 
          />


          <Route 
            path="/search" 
            element={<SearchDonor />} 
          />
<Route 
  path="/edit-donor/:id"
  element={<EditDonor />}
/>

        </Route>
          <Route
            path="/emergency-request"
            element={<EmergencyRequest />}
          />

      </Routes>


    </BrowserRouter>

  );

}


export default App;
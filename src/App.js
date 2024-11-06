import React from 'react';
import Sidebar from './components/Sidebar.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import './style.css';
import Signup from './pages/SignUp';
import Customers from './pages/Customers';
import AddCustomer from './pages/AddCustomer';
import Devices from './pages/Devices';
import District from './pages/District';
import Taluk from './pages/Taluk';
import Village from './pages/Village';
import PropertyRegistration from './pages/PropertyRegistration';
import AddProperty  from './pages/PropertyAdd';
import Properties from './pages/properties';
import PropertyGeolocation from './pages/PropertyGeolocation';
import DevicePropertyGeopoint from './pages/DevicePropertyGeopoint';
import AddDevicePropertyGeopoint from './pages/AddDevicePropertyGeoPoint';

import ProjectRegistration from './pages/ProjectRegistration';
import ProjectGeolocation from './pages/ProjectGeolocation';
import DeviceGeopoint from './pages/DeviceGeopoint';
import AddDeviceGeoPoint from './pages/AddDeviceGeoPoint';
import AddDevice from './pages/AddDevice';
import AddDistrict from './pages/AddDistrict';
import AddTaluk from './pages/AddTaluk';
import AddVillage from './pages/AddVillage';
import AddPropertyRegistration from './pages/AddPropertyRegistration';
import AddProjectRegistration from './pages/AddProjectRegistration';
import AddProjectGeolocation from './pages/AddProjectGeolocation';
import AddPropertyGeolocation from './pages/AddPropertyGeolocation';
import PropertyDevice from './pages/PropertyDevice';
import AddPropertyDevice from './pages/AddPropertyDevice';
import Dashboard from './pages/Dashboard';
import SurveyDetails from './pages/SurveyDetails';
import SurveyDetailsTwo from './pages/SurveyDetailsTwo';
import PropertySurveyDetails from './pages/PropertySurveyDetails';
import ProjectSurveyDetails from './pages/ProjectSurveyDetails';


function App() {
  return (
    <BrowserRouter basename="/web/landshield/">
      <Sidebar>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/master/devices" element={<Devices />} />
          <Route path="/master/district" element={<District />} />
          <Route path="/master/taluk" element={<Taluk />} />
          <Route path="/master/village" element={<Village />} />
          <Route
            path="/property-registration"
            element={<PropertyRegistration />}
          />
          <Route
            path="/properties"
            element={<Properties />}
          />
           <Route
            path="/property-geolocation"
            element={<PropertyGeolocation />}
          />
            <Route
            path="/device-property-geopoint"
            element={<DevicePropertyGeopoint />}
          />
           <Route path="/device-property-geopoint/add-devicegeopoint" element={<AddDevicePropertyGeopoint />} />
         
          <Route
            path="/property-geolocation/add-propertygeolocation"
            element={<AddPropertyGeolocation />} />
          <Route
            path="/project-registration"
            element={<ProjectRegistration />}
          />
          <Route
            path="/project-geolocation"
            element={<ProjectGeolocation />}
          />
           <Route
            path="/device-geopoint"
            element={<DeviceGeopoint />}
          />  <Route
            path="/project-geolocation/add-projectgeolocation"
            element={<AddProjectGeolocation />}
          />
          <Route path="/device-geopoint/add-devicegeopoint" element={<AddDeviceGeoPoint />} />
          <Route path="/property-device" element={<PropertyDevice />} />
          <Route path="/master/devices/add-device" element={<AddDevice />} />
          <Route
            path="/master/district/add-district"
            element={<AddDistrict />}
          />
          <Route path="/master/taluk/add-taluk" element={<AddTaluk />} />
          <Route path="/master/village/add-village" element={<AddVillage />} />
          <Route path="/customers/add-customer" element={<AddCustomer />} />
          <Route path="/property/add-property" element={<AddProperty />} />
          <Route
            path="/project-registration/add-project-registration"
            element={<AddProjectRegistration />}
          />
           <Route
            path="/project-geolocation/add-projectgeolocation"
            element={<AddProjectGeolocation />}
          />
         
          
          <Route
            path="/property-registration/add-property-registration"
            element={<AddPropertyRegistration />}
          />
          <Route
            path="/property-device/add-property-device"
            element={<AddPropertyDevice />}
          />
          <Route
            path="/property-device/survey-details"
            element={<SurveyDetails />}
          />
          <Route
            path="/property-device/survey-details/:id"
            element={<SurveyDetails />}
          />
           <Route
            path="/property/survey-details/:id"
            element={<PropertySurveyDetails />}
          />
           <Route
            path="/project/survey-details/:id"
            element={<ProjectSurveyDetails />}
          />
      
          {/* Updated path for SurveyDetails component */}
          <Route
            path="/property-device/survey-details2"
            element={<SurveyDetailsTwo />}
          />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;

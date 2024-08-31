import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./home/Home";
import Products from "./products/Products";
import Sales from "./sales/Sales";
import Categories from "./categories/Categories";
import Settings from "./settings/Settings";
import { Auth, SignIn, SignUp,RequireAuth,ForgotPassword , Authentic,ResetPassword,EmailSent} from "./auth";
import { CreateCompony,Company, } from "./companies";
import Batches from "./batches/Batches";
import ProfilePage from "./profile/Profile";
import ProductForm from "./products/components/ProductForm";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/auth" element={<Auth />}>
            <Route path="" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="reset" element={<ForgotPassword />} />
            <Route path="email-sent" element={<EmailSent />} />
            <Route path="reset/:token" element={<ResetPassword />} />
          </Route>
          <Route path="/company" element={<RequireAuth><Company /></RequireAuth>}>
            <Route path="" element={<CreateCompony />} />
            <Route path="create" element={<CreateCompony />} />
          </Route>
          <Route path="/" element={<RequireAuth><MainLayout /></RequireAuth>}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="sales" element={<Sales />} />
            <Route path="categories" element={<Categories />} />
            <Route path="settings" element={<Settings />} />
            <Route path="batches" element={<Batches />} />
            <Route path={"profile"} element={<ProfilePage/>}/>
            
          </Route>
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;

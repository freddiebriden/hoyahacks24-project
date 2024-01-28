import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import BusinessForm from "./BusinessForm";
import InvestorForm from "./InvestorForm";
import Business from "./Business";
import Investor from "./Investor";
import Main from "./Main";
import Login from "./Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="/newhome" element={<Home />} />
          <Route path="/businessform" element={<BusinessForm />} />
          <Route path="/investorform" element={<InvestorForm />} />
          <Route path="/business" element={<Business />} />
          <Route path="/investor" element={<Investor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

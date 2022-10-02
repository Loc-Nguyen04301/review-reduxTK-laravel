import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import WithoutNav from "./WithoutNav";
import WithNav from "./WithNav";
import Login from "./components/Login";
import Review from "./components/Review";
import ReviewList from "./components/ReviewList";
import Register from './components/Register'
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<WithoutNav />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
        </Route>
        <Route element={<WithNav />}>
          <Route path="/" element={<ReviewList />} />
          <Route path="/reviews" element={<ReviewList />} />
          <Route path="/reviews/search/keyword=:search" element={<ReviewList />} />
          <Route path="/reviews/:id" element={<Review />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

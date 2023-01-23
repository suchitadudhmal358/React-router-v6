import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/myapps" element={<Navigate replace to="/learn" />} />
      <Route path="/learn" element={<Learn />}>
        <Route path="courses" element={<Courses />}>
          <Route path=":courseid" element={<CourseID />} />
        </Route>
        <Route path="bundles" element={<Bundle />} />
      </Route>
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
);

function Home() {
  return (
    <div>
      <h1>Home Route</h1>
    </div>
  );
}

function Learn() {
  return (
    <div>
      <h1>Learn</h1>
      <h4>Learn all course listed here</h4>
      <Link className="btn btn-success" to="/learn/courses">
        Courses
      </Link>{" "}
      |
      <Link className="btn btn-primary" to="/learn/bundles">
        Bundles
      </Link>
      <Outlet />
    </div>
  );
}

function Courses() {
  const courses = ["React", "Angular", "Vue", "NodeJs"];
  const randomCourse = courses[Math.floor(Math.random() * courses.length)];
  return (
    <div>
      <h1>Course List</h1>
      <h4>Course Card</h4>
      <p>More tests : Navlinks</p>
      <NavLink
        style={({ isActive }) => ({
          backgroundColor: isActive ? "pink" : "yellow",
        })}
        className="ms-2 p-2"
        to={`/learn/courses/${randomCourse}`}
      >
        {randomCourse}
      </NavLink>
      <NavLink className="ms-4 p-2 " to={`/learn/courses/test`}>
        test
      </NavLink>
      <div className="mt-3">
        <Outlet />
      </div>
    </div>
  );
}

function CourseID() {
  const { courseid } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <h4>URL Params is : {courseid} </h4>

      {/* Carry this courseid information to next page i.e Dashboard  */}
      {/* one way is use hooks like useNavigate and useLocation */}
      <button
        className="btn btn-warning"
        onClick={() => {
          navigate("/dashboard", { state: courseid });
        }}
      >
        Price
      </button>
      {/* Second way is using Link by passing state as props */}
      <Link to="/dashboard" state={`Using Link : ${courseid}`}>
        Pass Course using Link
      </Link>
    </div>
  );
}

function Bundle() {
  return (
    <div>
      <h1>Bundle List</h1>
      <h4>Bundle Card</h4>
    </div>
  );
}

function Dashboard() {
  const loaction = useLocation();
  return (
    <div>
      <h4>
        I got this info from last Component:{" "}
        <span className="text-info"> {loaction.state} </span>
      </h4>
    </div>
  );
}
reportWebVitals();

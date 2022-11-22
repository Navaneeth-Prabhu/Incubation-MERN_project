import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Apply from "../components/Body/Apply";

function Home() {
  const navigate = useNavigate();
  const [cookies, setcookies, removecookies] = useCookies([]);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:3001",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removecookies("jwt");
          navigate("/login");
        } else {
          toast(`welcome.... ${data.user} `, {
            theme: "dark",
          });
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removecookies]);

  const logOut = () => {
    removecookies("jwt");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link disabled"
                  href="#"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  Disabled
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <link rel="stylesheet" href="" />
      <div className="row d-flex justify-content-center">
        <h1>home</h1>
        <Apply />

        <button className="btn btn-primary" style={{ width: "10rem" }} onClick={logOut}>Log out</button>
        <ToastContainer />
      </div>
    </>
  );
}

export default Home;

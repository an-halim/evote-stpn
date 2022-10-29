import React, { useEffect } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link } from "react-router-dom";
import logoPPu from "../assets/images/logo_ppu.png";
import { capitalize } from "@mui/material";

export default function Sidebar({ active: activePage, ...props }) {
  const active = (page) => {
    return activePage === page ? "active" : "";
  };

  const handelLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const title = (str) => {
    return str.replace('-', ' ').split(' ').map((s) => capitalize(s)).join(' ')
  }

  useEffect(() => {
    const navToggler = document.querySelector(".navbar-toggler");
    const sidebar = document.querySelector(".sidebar");

    // show sidebar on nav toggler click
    navToggler.addEventListener("click", function () {
      sidebar.classList.toggle("active");
    });
    document.title = title(activePage) + " | EVOTE BEM STPN";
  });

  return (
    <>
      <div
        className={
          props.sideBar
            ? "sidebar position-relative active"
            : "sidebar position-relative"
        }
        id='side_nav'>
        <div className='header-box px-3 py-4 d-flex justify-content-center me-4'>
          <img src={logoPPu} alt='logo-ppu' height={50} />
          <h1 className='fs-5 text-center text-white ms-3'>
            EVOTE <br />
            BST STPN
          </h1>
        </div>
        <ul className='list-unstyled px-2'>
          <li
            className={active("dashboard") + " d-flex align-items-center my-2"}>
            <Link to='/dashboard' className='text-decoration-none'>
              <div className='text-decoration-none d-flex px-3 py-2 d-block'>
                <span className='material-symbols-outlined fs-5 d-flex align-items-center me-3'>
                  {" "}
                  <HomeOutlinedIcon />{" "}
                </span>{" "}
                Dashboard
              </div>
            </Link>
          </li>
          <li className={active("periode") + " d-flex align-items-center my-2"}>
            <Link to='/dashboard/periode' className='text-decoration-none'>
              <div className='text-decoration-none d-flex px-3 py-2 d-block'>
                <span className='material-symbols-outlined fs-5 d-flex align-items-center me-3'>
                  {" "}
                  <HowToRegOutlinedIcon />{" "}
                </span>{" "}
                Periode &amp; Paslon
              </div>
            </Link>
          </li>
          <li
            className={
              active("User Management") + " d-flex align-items-center my-2"
            }>
            <Link
              to='/dashboard/user-management'
              className='text-decoration-none'>
              <div className='text-decoration-none d-flex px-3 py-2 d-block'>
                <span className='material-symbols-outlined fs-5 d-flex align-items-center me-3'>
                  {" "}
                  <PeopleAltOutlinedIcon />{" "}
                </span>{" "}
                User Management
              </div>
            </Link>
          </li>
          <hr className='h-color mx-3' />
          <li className='mt-auto'>
            <Link
              onClick={handelLogout}
              to='/login'
              className='text-decoration-none'>
              <div className='text-decoration-none d-flex px-3 py-2 d-block'>
                <span className='material-symbols-outlined fs-5 d-flex align-items-center me-3'>
                  {" "}
                  <LogoutOutlinedIcon />{" "}
                </span>{" "}
                Logout
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

import React, {useEffect} from "react";
import "./home.css"
import imgKetua from "../../assets/images/img-ketua-1.png";
import axios from "axios";
import Sidebar from "../../component/Sidebar";

export default function Home() {
  const navToggler = document.querySelector(".navbar-toggler");
  const sidebar = document.querySelector(".sidebar");
  const base = process.env.REACT_APP_BASE_URL;
  // show sidebar on nav toggler click
  // navToggler.addEventListener("click", function () {
  //   sidebar.classList.toggle("active");
  // });

  const getDetail = () => {
    const token = localStorage.getItem('token');


    axios
    .get(base + '/detail', {
      WithCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      window.location.href = '/login'
    });
  }

  useEffect(() => {
    document.title = "Dashboard";
    getDetail();
  });

  return (
    <>
      <div className='main-container d-flex'>
        {/* SIDEBAR */}
        <Sidebar active={'dashboard'} />
        {/* CONTENT */}
        <div className='content'>
          {/* Dashboard */}
          <div className='dashboard' id='dashboard'>
            <nav className='navbar d-md-none bg-dark navbar-dark'>
              <div className='container-fluid'>
                <button className='navbar-toggler' type='button'>
                  <span className='navbar-toggler-icon' />
                </button>
              </div>
            </nav>
            {/* breadcrumb */}
            <div className='main-content px-lg-5 px-4 py-4'>
              <nav aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                  <li className='breadcrumb-item active' aria-current='page'>
                    Dashboard
                  </li>
                </ol>
              </nav>
              <div className='content-title'>
                <h2 className='fw-bold'>Dashboard</h2>
                <p className='fs-5'>
                  Summary pemilihan ketua dan wakil BEM periode 2022/2023.
                </p>
              </div>
              <div className='paslon-container container-fluid'>
                <div className='row'>
                  {/* PASLON 01 */}
                  <div className='paslon__card col-lg-3 mt-3 me-lg-4 pb-4 px-0'>
                    <div className='paslon__img'>
                      <img
                        src={imgKetua}
                        alt='img__ketua'
                        width='50%'
                      />
                      <img
                        src={imgKetua}
                        alt='img__wakil'
                        width='50%'
                      />
                      <div className='img__overlay'>
                        <h1>01</h1>
                      </div>
                    </div>
                    <div className='paslon__desc mt-4 px-3'>
                      <div className='d-flex justify-content-between'>
                        <p className='text-black-50'>Ketua</p>
                        <p className='text-end'>Muhammad Yusuf</p>
                      </div>
                      <div className='d-flex justify-content-between'>
                        <p className='text-black-50'>Wakil</p>
                        <p className='text-end'>Ridwan Ahmad</p>
                      </div>
                      <div className='d-flex justify-content-between'>
                        <p className='text-black-50'>Persentase</p>
                        <p className='text-success fw-semibold'>60%</p>
                      </div>
                      <div className='d-flex justify-content-between'>
                        <p className='text-black-50'>Total Vote</p>
                        <p>144/240</p>
                      </div>
                    </div>
                  </div>
                  {/* PASLON 02 */}
                  <div className='paslon__card col-lg-3 mt-3 me-lg-4 pb-4 px-0'>
                    <div className='paslon__img'>
                      <img
                        src={imgKetua}
                        alt='img__ketua'
                        width='50%'
                      />
                      <img
                        src={imgKetua}
                        alt='img__wakil'
                        width='50%'
                      />
                      <div className='img__overlay'>
                        <h1>02</h1>
                      </div>
                    </div>
                    <div className='paslon__desc mt-4 px-3'>
                      <div className='d-flex justify-content-between'>
                        <p className='text-black-50'>Ketua</p>
                        <p className='text-end'>Arifiyanto Hadinegoro</p>
                      </div>
                      <div className='d-flex justify-content-between'>
                        <p className='text-black-50'>Wakil</p>
                        <p className='text-end'>Zidan Ainul</p>
                      </div>
                      <div className='d-flex justify-content-between'>
                        <p className='text-black-50'>Persentase</p>
                        <p className='text-danger fw-semibold'>40%</p>
                      </div>
                      <div className='d-flex justify-content-between'>
                        <p className='text-black-50'>Total Vote</p>
                        <p>96/240</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

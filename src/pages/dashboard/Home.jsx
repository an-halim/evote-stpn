import React, { useEffect } from "react";
import "./home.css";
import axios from "axios";
import Sidebar from "../../component/Sidebar";
import { capitalize } from "@mui/material";


export default function Home() {
  const [sideBar, setSideBar] = React.useState(false);
  const base = process.env.REACT_APP_BASE_URL;
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const token = localStorage.getItem("token");

  const getDetail = () => {
    axios
      .get(base + "/detail", {
        WithCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.data.role !== "admin") {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err);
        window.location.href = "/login";
      });
  };

  const getData = () => {
    axios
      .get(`${base}/result?status=active`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    document.title = "Dashboard";
    getDetail();
    getData();
  }, []);

  return (
    <>
      <div className='main-container d-flex'>
        {/* SIDEBAR */}
        <Sidebar active={"dashboard"} />
        {/* CONTENT */}
        <div className='content'>
          {/* Dashboard */}
          <div className='dashboard' id='dashboard'>
            <nav className='navbar d-md-none bg-dark navbar-dark'>
              <div className='container-fluid'>
                <button
                  className='navbar-toggler'
                  type='button'
                  onClick={() => setSideBar(!sideBar)}>
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
                  {
                    data.length < 1
                    ? "Tidak ada periode yang aktif"
                    : "Summary pemilihan ketua dan wakil BEM periode " + data[0]?.period
                  }
                </p>
              </div>
              <div className='paslon-container container-fluid'>
                <div className='row'>
                  {/* PASLON 01 */}
                  {loading ? (
                    <div className='d-flex justify-content-center align-items-center'>
                      <div
                        className='spinner-border text-primary'
                        role='status'>
                        <span className='visually-hidden'>Loading...</span>
                      </div>
                    </div>
                  ) : (
                    data.map((item, index) => (
                      <div
                        key={item.candidate_id}
                        className='paslon__card col-lg-3 mt-3 me-lg-4 pb-4 px-0'>
                        <div className='paslon__img'>
                          <img
                            crossOrigin='anonymous'
                            src={`${base}/upload/${item.head_photo}`}
                            className='img-fluid'
                            alt='img__ketua'
                            width='50%'
                            height={200}
                          />
                          <img
                            crossOrigin='anonymous'
                            src={`${base}/upload/${item.deputy_photo}`}
                            className='img-fluid'
                            alt='img__wakil'
                            width='50%'
                            height={200}
                          />
                          <div className='img__overlay'>
                            <h1>{item.candidate_number}</h1>
                          </div>
                        </div>
                        <div className='paslon__desc mt-4 px-3'>
                          <div className='d-flex justify-content-between'>
                            <p className='text-black-50'>Ketua</p>
                            <p className='text-end'>{capitalize(item.head_name)}</p>
                          </div>
                          <div className='d-flex justify-content-between'>
                            <p className='text-black-50'>Wakil</p>
                            <p className='text-end'>{capitalize(item.deputy_name)}</p>
                          </div>
                          <div className='d-flex justify-content-between'>
                            <p className='text-black-50'>Persentase</p>
                            <p className={
                              item.percentage > 50 ? 'text-end text-success' : 'text-end text-danger'
                            }>{item.percentage.toFixed(2)}%</p>
                          </div>
                          <div className='d-flex justify-content-between'>
                            <p className='text-black-50'>Total Vote</p>
                            <p>{item.total}/{item.active_user}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

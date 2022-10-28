import React, { useEffect, useState } from "react";
import logoStpn from "../assets/images/stpn-logo.png";
import "./index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Offcanvas from "react-bootstrap/Offcanvas";
import {toast, ToastContainer} from 'react-toastify';
import { MyVerticallyCenteredModal } from "../component/Modal";

export default function Home() {
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const base = process.env.REACT_APP_BASE_URL;
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
        if (res.data.data.role === "admin") {
          window.location.href = "/dashboard";
        }
      })
      .catch((err) => {
        window.location.href = "/login";
      });
  };

  const getData = () => {
    axios
      .get(`${base}/candidate?status=active`, {
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

  const handleVote = (id) => {
    axios
      .post(
        `${base}/vote`,
        {
          candidate_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Berhasil memilih");
        setTimeout(() => {
          window.location = "/success";
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.response.data.errors === 'You have already voted' ? 'Anda sudah memilih' : 'Gagal memilih');
      });
  };
  const logout = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    document.title = "Home";
    getDetail();
    getData();
    const yearEl = document.querySelector("#year");
    yearEl.textContent = new Date().getFullYear();
  }, []);
  return (
    <div>
      <ToastContainer />
      <MyVerticallyCenteredModal

        show={modal}
        onHide={setModal}
        header={
          <h4 className='fw-bold mb-4'>PERHATIAN!</h4>
        }
        body={
        <p>
          Pemilihan ini hanya dapat dilakukan <b>sekali</b> dan tidak dapat
          diulang. Mohon berhati-hati menggunakan hak pilih anda, jangan sampai
          salah memilih dan
          <b>gunakan hak pilih anda dengan baik.</b>
        </p>
        }
        footer={
          <button
            onClick={() => setModal(false)}
           className='btn btn-secondary btn__mengerti w-100 rounded-5 d-block fw-bold'>
          OKE, MENGERTI
        </button>
        }

      />
      {/* <div className='overlay' /> */}
      {/* NAVBAR */}
      <header>
        <nav className='navbar bg-light fixed-top'>
          <div className='container p-0'>
            <div className='row w-100 m-0'>
              <div className='col-lg-7 mx-auto'>
                <div className='d-flex justify-content-between'>
                  <Link to='/' className='navbar-brand'>
                    <div className='d-flex'>
                      <img src={logoStpn} alt='logo__stpn' height={50} />
                      <h6 className='mt-2 ms-3 fw-bold'>
                        EVOTE BEM STPN
                        <br />
                        PERIODE 2022/2023
                      </h6>
                    </div>
                  </Link>
                  <button
                    onClick={handleShow}
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='offcanvas'
                    data-bs-target='#offcanvasNavbar'
                    aria-controls='offcanvasNavbar'>
                    <span className='navbar-toggler-icon' />
                  </button>
                </div>
              </div>
            </div>
            <>
              <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>MENU</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <ul className='navbar-nav justify-content-end flex-grow-1 pe-3'>
                    <li className='nav-item'>
                      <Link
                        to='/'
                        className='nav-link active text-decoration-none'
                        aria-current='page'>
                        Home
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link
                        onClick={logout}
                        to='/login'
                        className='nav-link text-decoration-none'>
                        Log Out
                      </Link>
                    </li> 
                  </ul>
                </Offcanvas.Body>
              </Offcanvas>
            </>
          </div>
        </nav>
      </header>
      {/* CONTENT */}
      <section>
        <div className='container'>
          <div className='row justify-content-center mx-3'>
            <div className='text-center'>
              <h4 className='d-inline-block position-relative fw-bold'>VOTE</h4>
              <p>
                Sampaikan suara anda dengan memilih salah satu pasangan calon di
                bawah.
              </p>
            </div>

            {loading ? (
              <div className='text-center'>
                <div className='spinner-border text-primary' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </div>
              </div>
            ) : (
              data.map((item, index) => (
                <div className='paslon__card offset-lg-1 col-lg-3 my-4 p-0' key={index}>
                  {/* gambar */}
                  <div className='paslon__img'>
                    <img
                      crossOrigin='anonymous'
                      src={`${base}/upload/${item.head_photo}`}
                      alt='img__ketua'
                      width='50%'
                      height={200}
                    />
                    <img
                      crossOrigin='anonymous'
                      src={`${base}/upload/${item.deputy_photo}`}
                      alt='img__wakil'
                      width='50%'
                      height={200}
                    />
                    <div className='img__overlay'>
                      <h1>{item.candidate_number}</h1>
                    </div>
                  </div>
                  {/* deskripsi */}
                  <div className='paslon__desc mt-4 px-3'>
                    <div className='d-flex justify-content-between'>
                      <p className='text-black-50'>Ketua</p>
                      <p className='paslon__desc--value'>{item.head_name}</p>
                    </div>
                    <div className='d-flex justify-content-between'>
                      <p className='text-black-50'>Wakil</p>
                      <p className='paslon__desc--value'>{item.deputy_name}</p>
                    </div>
                  </div>
                  {/* button */}
                  <button
                    onClick={() => handleVote(item.candidate_id)}
                    className='btn btn-primary btn__vote rounded-5 d-block fw-bold'>
                    VOTE
                  </button>
                  <hr className='paslon__rule' />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer>
        <p className='text-center m-0'>
          © Copyright <span id='year'>2099</span> BEM STPN. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

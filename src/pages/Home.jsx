import React, { useEffect, useState } from "react";
import logoStpn from "../assets/images/stpn-logo.png";
import "./index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import imgKetua from "../assets/images/img-ketua-1.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <h4 className='fw-bold my-4 text-center'>PERHATIAN!</h4>
        <p className='text-center p-3'>
          Pemilihan ini hanya dapat dilakukan <b>sekali</b> dan tidak dapat
          diulang. Mohon berhati-hati menggunakan hak pilih anda, jangan sampai
          salah memilih dan
          <b>gunakan hak pilih anda dengan baik.</b>
        </p>
        <button
          onClick={props.onHide}
          className='btn btn-secondary btn__mengerti w-100 rounded-5 d-block fw-bold'>
          OKE, MENGERTI
        </button>
      </Modal.Body>
      {/* <Modal.Footer>
      </Modal.Footer> */}
    </Modal>
  );
}

export default function Home() {
  const [modalShow, setModalShow] = useState(true);
  const token = localStorage.getItem("token");

  const base = process.env.REACT_APP_BASE_URL;

  const getDetail = () => {
    axios
      .get(base+"/detail", {
        WithCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        window.location.href = "/login";
      });
  };

  useEffect(() => {
    document.title = "Home";
    getDetail();
    const yearEl = document.querySelector("#year");
    const modalIntroEl = document.querySelector(".modal__intro");
    const overlayEl = document.querySelector(".overlay");
    const btnMengertiEl = document.querySelector(".btn__mengerti");

    yearEl.textContent = new Date().getFullYear();

    const hideModal = function () {
      modalIntroEl.classList.add("hidden");
      overlayEl.classList.add("hidden");
    };
    btnMengertiEl.addEventListener("click", hideModal);
  });
  return (
    <div>
      {/* MODAL */}
      {/* <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> */}
      {/* MODAL */}
      <div className='modal__intro'>
        <h4 className='fw-bold mb-4'>PERHATIAN!</h4>
        <p>
          Pemilihan ini hanya dapat dilakukan <b>sekali</b> dan tidak dapat
          diulang. Mohon berhati-hati menggunakan hak pilih anda, jangan sampai
          salah memilih dan
          <b>gunakan hak pilih anda dengan baik.</b>
        </p>
        <button className='btn btn-secondary btn__mengerti w-100 rounded-5 d-block fw-bold'>
          OKE, MENGERTI
        </button>
      </div>
      <div className='overlay' />
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
            <div
              className='offcanvas offcanvas-end'
              tabIndex={-1}
              id='offcanvasNavbar'
              aria-labelledby='offcanvasNavbarLabel'>
              <div className='offcanvas-header'>
                <h5 className='offcanvas-title' id='offcanvasNavbarLabel'>
                  MENU
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='offcanvas'
                  aria-label='Close'
                />
              </div>
              <div className='offcanvas-body'>
                <ul className='navbar-nav justify-content-end flex-grow-1 pe-3'>
                  <li className='nav-item'>
                    <a className='nav-link active' aria-current='page' href='#'>
                      Home
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link' href='/index.html'>
                      Log Out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
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
            {/* PASLON 01 */}
            <div className='paslon__card col-lg-3 my-4 p-0'>
              {/* gambar */}
              <div className='paslon__img'>
                <img src={imgKetua} alt='img__ketua' width='50%' />
                <img src={imgKetua} alt='img__wakil' width='50%' />
                <div className='img__overlay'>
                  <h1>01</h1>
                </div>
              </div>
              {/* deskripsi */}
              <div className='paslon__desc mt-4 px-3'>
                <div className='d-flex justify-content-between'>
                  <p className='text-black-50'>Ketua</p>
                  <p className='paslon__desc--value'>Muhammad Yusuf</p>
                </div>
                <div className='d-flex justify-content-between'>
                  <p className='text-black-50'>Wakil</p>
                  <p className='paslon__desc--value'>Ridwan Ahmad</p>
                </div>
              </div>
              {/* button */}
              <a
                className='btn btn-primary btn__vote rounded-5 d-block fw-bold'
                href='success.html'>
                VOTE
              </a>
            </div>
            <hr className='paslon__rule' />
            {/* PASLON 02 */}
            <div className='paslon__card offset-lg-1 col-lg-3 my-4 p-0'>
              {/* gambar */}
              <div className='paslon__img'>
                <img src={imgKetua} alt='img__ketua' width='50%' />
                <img src={imgKetua} alt='img__wakil' width='50%' />
                <div className='img__overlay'>
                  <h1>02</h1>
                </div>
              </div>
              {/* deskripsi */}
              <div className='paslon__desc mt-4 px-3'>
                <div className='d-flex justify-content-between'>
                  <p className='text-black-50'>Ketua</p>
                  <p className='paslon__desc--value'>Arifiyanto Hadinegoro</p>
                </div>
                <div className='d-flex justify-content-between'>
                  <p className='text-black-50'>Wakil</p>
                  <p className='paslon__desc--value'>Zidan Ainul</p>
                </div>
              </div>
              {/* button */}
              <a
                className='btn btn-primary btn__vote rounded-5 d-block fw-bold'
                href='success.html'>
                VOTE
              </a>
            </div>
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

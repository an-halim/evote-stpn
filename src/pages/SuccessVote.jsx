import React, {useState} from "react";
import logoPPU from "../assets/images/logo_ppu.png";
import { Link } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function SuccessVote() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
      <div>
        {/* NAVBAR */}
        <header>
          <nav className='navbar bg-light fixed-top'>
            <div className='container p-0'>
              <div className='row w-100 m-0'>
                <div className='col-lg-7 mx-auto'>
                  <div className='d-flex justify-content-between'>
                    <Link to='/' className='navbar-brand'>
                      <div className='d-flex'>
                        <img
                          src={logoPPU}
                          alt='logo_ppu'
                          height={50}
                        />
                        <h6 className='mt-2 ms-3 fw-bold'>
                          EVOTE BST STPN
                          <br />
                          PERIODE {
                            new Date().getFullYear() + "/" + (new Date().getFullYear() + 1)
                          }
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
          <div className="container content-wrapper">
          <div className='position-absolute top-50 start-50 translate-middle text-center w-100'>
            <h4 className='fw-bold'>TERIMA KASIH!</h4>
            <p>Anda telah berhasil menggunakan hak pilih anda.</p>
            <Link
              to='/'
              className='btn btn-light mt-2 py-2 px-4 rounded-5 fw-semibold'
              >
              RETURN TO HOMEPAGE
            </Link>
          </div>
          </div>
        </section>
        <footer>
        <p className='text-center m-0'>
          © Copyright <span id='year'>
            {new Date().getFullYear()}
          </span> BST STPN. All rights reserved.
        </p>
      </footer>
      </div>
    </>
  );
}

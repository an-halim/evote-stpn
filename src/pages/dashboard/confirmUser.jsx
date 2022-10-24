import React from "react";
import Sidebar from "../../component/Sidebar";
import {Link} from "react-router-dom";  
export default function confirmUser() {
  return (
    <>
      <div className='main-container d-flex'>
        {/* SIDEBAR */}
        <Sidebar active={'user-management'}/>
        {/* CONTENT */}
        <div className='content'>
          {/* User Management */}
          <div id='user-management'>
            <nav className='navbar d-md-none bg-dark navbar-dark'>
              <div className='container-fluid'>
                <button className='navbar-toggler' type='button'>
                  <span className='navbar-toggler-icon' />
                </button>
              </div>
            </nav>
            <div className='main-content px-lg-5 px-4 py-4'>
              {/* breadcrumb */}
              <nav aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                  <li className='breadcrumb-item'>
                    <Link to='/dashboard/user-management'>User Management</Link>
                  </li>
                  <li className='breadcrumb-item active' aria-current='page'>
                    Konfirmasi
                  </li>
                </ol>
              </nav>
              <div className='content-title'>
                <h2 className='fw-bold'>Konfirmasi User</h2>
                <p className='fs-5'>Terima atau tolak akun user.</p>
              </div>
              <div className='container-fluid p-0'>
                <div className='row'>
                  <div className='col-12 table-responsive'>
                    <table className='table table-bordered table-striped mt-3'>
                      <thead className='table-dark'>
                        <tr>
                          <th scope='col'>No</th>
                          <th scope='col'>NIM</th>
                          <th scope='col'>Nama Lengkap</th>
                          <th scope='col'>Jurusan</th>
                          <th scope='col'>Email</th>
                          <th scope='col'>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope='row'>1</th>
                          <td>20293469</td>
                          <td>Rizal Saefudin Supratman</td>
                          <td>Diploma IV Pertanahan</td>
                          <td>rizal_saefudin@gmail.com</td>
                          <td className='d-flex'>
                            <button
                              type='button'
                              className='btn btn-success d-flex me-1'>
                              <span className='material-symbols-outlined d-flex align-items-center'>
                                {" "}
                                check{" "}
                              </span>
                            </button>
                            <button
                              type='button'
                              className='btn btn-danger me-1'
                              data-bs-toggle='modal'
                              data-bs-target='#rejectUserModal'>
                              <i className='far fa-trash-alt'>
                                <span className='material-symbols-outlined d-flex align-items-center'>
                                  {" "}
                                  close{" "}
                                </span>
                              </i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <th scope='row'>2</th>
                          <td>20293469</td>
                          <td>Kucing Basefont</td>
                          <td>Diploma I PPK</td>
                          <td>kucing_basement@gmail.com</td>
                          <td className='d-flex'>
                            <button
                              type='button'
                              className='btn btn-success d-flex me-1'>
                              <span className='material-symbols-outlined d-flex align-items-center'>
                                {" "}
                                check{" "}
                              </span>
                            </button>
                            <button
                              type='button'
                              className='btn btn-danger me-1'
                              data-bs-toggle='modal'
                              data-bs-target='#rejectUserModal'>
                              <i className='far fa-trash-alt'>
                                <span className='material-symbols-outlined d-flex align-items-center'>
                                  {" "}
                                  close{" "}
                                </span>
                              </i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <th scope='row'>3</th>
                          <td>20293351</td>
                          <td>Garrett Winters</td>
                          <td>Prodiksus PPAT</td>
                          <td>garret_winters@gmail.com</td>
                          <td className='d-flex'>
                            <button
                              type='button'
                              className='btn btn-success d-flex me-1'>
                              <span className='material-symbols-outlined d-flex align-items-center'>
                                {" "}
                                check{" "}
                              </span>
                            </button>
                            <button
                              type='button'
                              className='btn btn-danger me-1'
                              data-bs-toggle='modal'
                              data-bs-target='#deleteUserModal'>
                              <i className='far fa-trash-alt'>
                                <span className='material-symbols-outlined d-flex align-items-center'>
                                  {" "}
                                  close{" "}
                                </span>
                              </i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <th scope='row'>4</th>
                          <td>20293167</td>
                          <td>Ashton Cox</td>
                          <td>Diploma I PPK</td>
                          <td>ashton_cox@gmail.com</td>
                          <td className='d-flex'>
                            <button
                              type='button'
                              className='btn btn-success d-flex me-1'>
                              <span className='material-symbols-outlined d-flex align-items-center'>
                                {" "}
                                check{" "}
                              </span>
                            </button>
                            <button
                              type='button'
                              className='btn btn-danger me-1'
                              data-bs-toggle='modal'
                              data-bs-target='#rejectUserModal'>
                              <i className='far fa-trash-alt'>
                                <span className='material-symbols-outlined d-flex align-items-center'>
                                  {" "}
                                  close{" "}
                                </span>
                              </i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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

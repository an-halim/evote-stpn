import React from "react";
import Sidebar from "../../component/Sidebar";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function Period() {
  return (
    <>
      <div>
        <div className='main-container d-flex'>
          {/* SIDEBAR */}
          <Sidebar active={'periode'}/>
          {/* CONTENT */}
          <div className='content'>
            {/* Periode & Paslon */}
            <div id='periode-paslon'>
              {/* mobile nav */}
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
                    <li className='breadcrumb-item active' aria-current='page'>
                      List Periode
                    </li>
                  </ol>
                </nav>
                <div className='content-title'>
                  <h2 className='fw-bold'>Periode Pemilihan</h2>
                  <p className='fs-5'>Periode pemilihan</p>
                </div>
                <div className='container-fluid p-0'>
                  <div className='row'>
                    <div className='col-12 mb-3'>
                      <button
                        className='btn btn-primary d-flex ms-auto'
                        data-bs-toggle='modal'
                        data-bs-target='#addPeriodModal'>
                        <span className='material-symbols-outlined d-flex align-items-center'>
                          {" "}
                          <AddOutlinedIcon />{" "}
                        </span>
                        Tambah Periode
                      </button>
                    </div>
                    <div className='col-12 table-responsive'>
                      <table className='table table-bordered table-striped'>
                        <thead className='table-dark'>
                          <tr>
                            <th scope='col'>No</th>
                            <th scope='col'>Periode</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope='row'>1</th>
                            <td>2021/2022</td>
                            <td>Selesai</td>
                            <td className='d-flex'>
                              <button
                                type='button'
                                className='btn btn-success d-flex disabled me-1'>
                                <span className='material-symbols-outlined d-flex align-items-center'>
                                  {" "}
                                  <PlayArrowOutlinedIcon />{""}
                                </span>
                                Mulai Polling
                              </button>
                              <a
                                href='pasangan-calon.html'
                                className='btn btn-primary me-1 d-flex align-items-center'>
                                <span className='material-symbols-outlined'>
                                  <VisibilityOutlinedIcon />
                                </span>
                              </a>
                              <button
                                type='button'
                                className='btn btn-danger me-1'
                                data-bs-toggle='modal'
                                data-bs-target='#deletePeriodModal'>
                                <i className='far fa-trash-alt'>
                                  <span className='material-symbols-outlined d-flex align-items-center'>
                                    {" "}
                                    <DeleteOutlineOutlinedIcon /> {" "}
                                  </span>
                                </i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <th scope='row'>2</th>
                            <td>2022/2023</td>
                            <td>Aktif</td>
                            <td className='d-flex'>
                              <button
                                type='button'
                                className='btn btn-success d-flex me-1'>
                                <span className='material-symbols-outlined d-flex align-items-center'>
                                  {" "}
                                  <PlayArrowOutlinedIcon />{" "}
                                </span>
                                Mulai Polling
                              </button>
                              <a
                                href='pasangan-calon.html'
                                className='btn btn-primary me-1 d-flex align-items-center'>
                                <span className='material-symbols-outlined'>
                                <VisibilityOutlinedIcon />
                                </span>
                              </a>
                              <button
                                type='button'
                                className='btn btn-danger me-1'
                                data-bs-toggle='modal'
                                data-bs-target='#deletePeriodModal'>
                                <i className='far fa-trash-alt'>
                                  <span className='material-symbols-outlined d-flex align-items-center'>
                                    {" "}
                                    <DeleteOutlineOutlinedIcon /> {" "}
                                  </span>
                                </i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <th scope='row'>3</th>
                            <td>2023/2024</td>
                            <td>Non-Aktif</td>
                            <td className='d-flex'>
                              <button
                                type='button'
                                className='btn btn-success d-flex me-1'>
                                <span className='material-symbols-outlined d-flex align-items-center'>
                                  {" "}
                                  <PlayArrowOutlinedIcon />{" "}
                                </span>
                                Mulai Polling
                              </button>
                              <a
                                href='pasangan-calon.html'
                                className='btn btn-primary me-1 d-flex align-items-center'>
                                <span className='material-symbols-outlined'>
                                <VisibilityOutlinedIcon />
                                </span>
                              </a>
                              <button
                                type='button'
                                className='btn btn-danger me-1'
                                data-bs-toggle='modal'
                                data-bs-target='#deletePeriodModal'>
                                <i className='far fa-trash-alt'>
                                  <span className='material-symbols-outlined d-flex align-items-center'>
                                    {" "}
                                    <DeleteOutlineOutlinedIcon /> {" "}
                                  </span>
                                </i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <th scope='row'>4</th>
                            <td>2024/2025</td>
                            <td>Non-Aktif</td>
                            <td className='d-flex'>
                              <button
                                type='button'
                                className='btn btn-success d-flex me-1'>
                                <span className='material-symbols-outlined d-flex align-items-center'>
                                  {" "}
                                  <PlayArrowOutlinedIcon />{" "}
                                </span>
                                Mulai Polling
                              </button>
                              <a
                                href='pasangan-calon.html'
                                className='btn btn-primary me-1 d-flex align-items-center'>
                                <span className='material-symbols-outlined'>
                                <VisibilityOutlinedIcon />
                                </span>
                              </a>
                              <button
                                type='button'
                                className='btn btn-danger me-1'
                                data-bs-toggle='modal'
                                data-bs-target='#deletePeriodModal'>
                                <i className='far fa-trash-alt'>
                                  <span className='material-symbols-outlined d-flex align-items-center'>
                                    {" "}
                                    <DeleteOutlineOutlinedIcon /> {" "}
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
        {/* MODALS */}
        {/* modal tambah periode */}
        <div
          className='modal fade'
          id='addPeriodModal'
          tabIndex={-1}
          aria-labelledby='addPeriodModalLabel'
          aria-hidden='true'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5' id='addPeriodModalLabel'>
                  Tambah Periode
                </h1>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                />
              </div>
              <div className='modal-body'>
                <form action>
                  <div className='form-group'>
                    <label htmlFor='tahun-periode' className='form-label'>
                      Pilih Tahun Periode
                    </label>
                    <div className='input-group'>
                      <select className='form-select' id='tahun-periode'>
                        <option value='2021/2022'>2021/2022</option>
                        <option value='2022/2023' selected>
                          2022/2023
                        </option>
                        <option value='2023/2024'>2023/2024</option>
                        <option value='2024/2025'>2024/2025</option>
                        <option value='2024/2025'>2025/2026</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'>
                  Batal
                </button>
                <button type='button' className='btn btn-primary'>
                  Tambah
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* modal hapus periode */}
        <div
          className='modal fade'
          id='deletePeriodModal'
          tabIndex={-1}
          aria-labelledby='deletePeriodModalLabel'
          aria-hidden='true'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5' id='deletePeriodModalLabel'>
                  Hapus Periode
                </h1>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                />
              </div>
              <div className='modal-body'>
                Apakah anda yakin ingin menghapus periode "<b>2022/2023</b>"?
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'>
                  Batal
                </button>
                <button type='button' className='btn btn-danger'>
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

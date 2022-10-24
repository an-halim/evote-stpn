import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Sidebar from "../../component/Sidebar";
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import imgKetua from "../../assets/images/img-ketua-1.png";


export default function PasanganCalon(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [periode, setPeriode] = React.useState(searchParams.get("tahun"));

  return (
    <>
      <div>
        <div className='main-container d-flex'>
          {/* SIDEBAR */}
          <Sidebar active={'periode'} />
          {/* CONTENT */}
          <div className='content'>
            {/* Periode & Paslon */}
            <div id='periode-paslon'>
              {/* mobile navbar */}
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
                      <Link to='/dashboard/periode'>List Periode</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                      {periode}
                    </li>
                  </ol>
                </nav>
                <div className='content-title'>
                  <h2 className='fw-bold'>Periode {periode}</h2>
                  <p className='fs-5'>
                    Berikut pasangan calon Ketua dan Wakil BEM periode ini.
                  </p>
                </div>
                <div className='container-fluid p-0'>
                  <div className='row'>
                    <div className='col-12 mb-3 d-flex'>
                      <div className="ms-auto">
                      <Link to={`/dashboard/detail-vote?tahun=${periode}`}>
                        <div
                          className='btn btn-secondary d-flex align-items-center'>
                          <span className='material-symbols-outlined d-flex align-items-center fs-5 me-2'>
                            {" "}
                            <HistoryOutlinedIcon />{" "}
                          </span>{" "}
                          Detail Vote
                        </div>
                      </Link>
                      </div>
                      <button
                        className='btn btn-primary btn__tambah--calon d-flex align-items-center ms-2'
                        data-bs-toggle='modal'
                        data-bs-target='#addCandidateModal'>
                        <span className='material-symbols-outlined d-flex align-items-center fs-5 me-1'>
                          {" "}
                          <AddOutlinedIcon />{" "}
                        </span>{" "}
                        Tambah Calon
                      </button>
                    </div>
                    <div className='col-12 table-responsive'>
                      <table className='table table-bordered table-striped'>
                        <thead className='table-dark'>
                          <tr>
                            <th scope='col'>No</th>
                            <th scope='col'>Nama Calon</th>
                            <th scope='col'>Gambar</th>
                            <th scope='col'>Total Vote</th>
                            <th scope='col'>Persentase Vote</th>
                            <th scope='col'>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope='row'>1</th>
                            <td>Muhammad Yusuf &amp; Ridwan Ahmad</td>
                            <td>
                              <div className='d-flex'>
                                <img
                                  src={imgKetua}
                                  alt='img-ketua-1'
                                  height={35}
                                  className='rounded'
                                />
                                <img
                                  src={imgKetua}
                                  alt='img-wakil-1'
                                  height={35}
                                  className='ms-2 rounded'
                                />
                              </div>
                            </td>
                            <td>144/240</td>
                            <td>
                              <span className='text-success'>60%</span>
                            </td>
                            <td>
                              <div className='d-flex'>
                                <button
                                  type='button'
                                  className='btn btn-success me-1'
                                  data-bs-toggle='modal'
                                  data-bs-target='#addCandidateModal'>
                                  <span className='material-symbols-outlined d-flex align-items-center'>
                                  <ModeEditOutlineOutlinedIcon />
                                  </span>
                                </button>
                                <button
                                  type='button'
                                  className='btn btn-danger me-1'
                                  data-bs-toggle='modal'
                                  data-bs-target='#deleteCandidateModal'>
                                  <i className='far fa-trash-alt'>
                                    <span className='material-symbols-outlined d-flex align-items-center'>
                                      {" "}
                                      delete{" "}
                                    </span>
                                  </i>
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope='row'>2</th>
                            <td>Arifiyanto Hadinegoro &amp; Zidan Ainul</td>
                            <td>
                              <div className='d-flex'>
                                <img
                                  src={imgKetua}
                                  alt='img-ketua-1'
                                  height={35}
                                  className='rounded'
                                />
                                <img
                                  src={imgKetua}
                                  alt='img-wakil-1'
                                  height={35}
                                  className='ms-2 rounded'
                                />
                              </div>
                            </td>
                            <td>96/240</td>
                            <td>
                              <span className='text-danger'>40%</span>
                            </td>
                            <td>
                              <div className='d-flex'>
                                <button
                                  type='button'
                                  className='btn btn-success me-1'
                                  data-bs-toggle='modal'
                                  data-bs-target='#addCandidateModal'>
                                  <span className='material-symbols-outlined d-flex align-items-center'>
                                    <ModeEditOutlineOutlinedIcon />
                                  </span>
                                </button>
                                <button
                                  type='button'
                                  className='btn btn-danger me-1'
                                  data-bs-toggle='modal'
                                  data-bs-target='#deleteCandidateModal'>
                                  <i className='far fa-trash-alt'>
                                    <span className='material-symbols-outlined d-flex align-items-center'>
                                      {" "}
                                      delete{" "}
                                    </span>
                                  </i>
                                </button>
                              </div>
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
        {/* modal tambah calon */}
        <div
          className='modal modal-lg fade overlay'
          id='addCandidateModal'
          tabIndex={-1}
          aria-labelledby='addCandidateModalLabel'
          aria-hidden='true'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5' id='addCandidateModalLabel'>
                  Tambah Calon
                </h1>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                />
              </div>
              <div className='modal-body'>
                {/* FORM */}
                <form action='#'>
                  <div className='container-fluid'>
                    {/* KETUA */}
                    <h5 className='d-flex fw-bold'>
                      <span className='material-symbols-outlined fs-3 d-flex align-items-center me-2'>
                        {" "}
                        person{" "}
                      </span>
                      Ketua
                    </h5>
                    <hr />
                    <div className='row'>
                      <div className='col'>
                        {/* nim */}
                        <div className='form-group'>
                          <label htmlFor='nim-ketua' className='form-label'>
                            NIM
                          </label>
                          <div className='input-group'>
                            <input
                              type='text'
                              className='form-control'
                              id='nim-ketua'
                              autoComplete='off'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        {/* jurusan */}
                        <div className='form-group'>
                          <label htmlFor='jurusan' className='form-label'>
                            Jurusan
                          </label>
                          <div className='input-group'>
                            <select
                              className='form-select'
                              aria-label='Default select example'>
                              <option value='Diploma I PPK' selected>
                                Diploma I PPK
                              </option>
                              <option value='Diploma IV Pertanahan'>
                                Diploma IV Pertanahan
                              </option>
                              <option value='Prodiksus PPAT'>
                                Prodiksus PPAT
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col'>
                        {/* nama lengkap */}
                        <div className='form-group mt-3'>
                          <label htmlFor='nama-ketua' className='form-label'>
                            Nama Lengkap
                          </label>
                          <div className='input-group'>
                            <input
                              type='text'
                              className='form-control'
                              id='nama-ketua'
                              autoComplete='off'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        {/* File */}
                        <div className='mt-3'>
                          <label htmlFor='file-ketua' className='form-label'>
                            Foto
                          </label>
                          <input
                            className='form-control'
                            type='file'
                            id='file-ketua'
                          />
                        </div>
                      </div>
                    </div>
                    {/* WAKIL KETUA */}
                    <h5 className='mt-5 d-flex fw-bold'>
                      <span className='material-symbols-outlined fs-3 d-flex align-items-end me-2'>
                        {" "}
                        group{" "}
                      </span>
                      Wakil
                    </h5>
                    <hr />
                    <div className='row'>
                      <div className='col'>
                        {/* nim */}
                        <div className='form-group'>
                          <label htmlFor='nim-wakil' className='form-label'>
                            NIM
                          </label>
                          <div className='input-group'>
                            <input
                              type='text'
                              className='form-control'
                              id='nim-wakil'
                              autoComplete='off'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        {/* jurusan */}
                        <div className='form-group'>
                          <label htmlFor='jurusan-wakil' className='form-label'>
                            Jurusan
                          </label>
                          <div className='input-group'>
                            <select className='form-select' id='jurusan-wakil'>
                              <option value='Diploma I PPK' selected>
                                Diploma I PPK
                              </option>
                              <option value='Diploma IV Pertanahan'>
                                Diploma IV Pertanahan
                              </option>
                              <option value='Prodiksus PPAT'>
                                Prodiksus PPAT
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col'>
                        {/* nama lengkap */}
                        <div className='form-group mt-3'>
                          <label htmlFor='nama-wakil' className='form-label'>
                            Nama Lengkap
                          </label>
                          <div className='input-group'>
                            <input
                              type='text'
                              className='form-control'
                              id='nama-wakil'
                              autoComplete='off'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        {/* File */}
                        <div className='mt-3'>
                          <label htmlFor='file-wakil' className='form-label'>
                            Foto
                          </label>
                          <input
                            className='form-control'
                            type='file'
                            id='file-wakil'
                          />
                        </div>
                      </div>
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
        {/* modal hapus calon */}
        <div
          className='modal fade overlay'
          id='deleteCandidateModal'
          tabIndex={-1}
          aria-labelledby='deleteCandidateModalLabel'
          aria-hidden='true'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5' id='deleteCandidateModalLabel'>
                  Hapus Calon
                </h1>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                />
              </div>
              <div className='modal-body'>
                Apakah anda yakin ingin menghapus pasangan calon "
                <b>Muhammad Yusuf &amp; Ridwan Ahmad</b>"?
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

import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Sidebar from "../../component/Sidebar";


export default function DetailVote() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [periode, setPeriode] = React.useState(searchParams.get("tahun"));
  return (
    <>
      <div>
        <div className='main-container d-flex'>
          {/* SIDEBAR */}
          <Sidebar active={"periode"} />
          {/* CONTENT */}
          <div className='content'>
            {/* Periode & Paslon */}
            <div id='periode-paslon'>
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
                    <li className='breadcrumb-item'>
                      <Link to={`/dashboard/paslon?tahun=${periode}`}>{periode}</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                      Detail Vote
                    </li>
                  </ol>
                </nav>
                {/* title */}
                <div className='content-title'>
                  <h2 className='fw-bold'>Detail Vote</h2>
                  <p className='fs-5'>Periode {periode}</p>
                </div>
                {/* table */}
                <div className='container-fluid p-0'>
                  <div className='row'>
                    <div className='col-12 table-responsive'>
                      <table className='table table-bordered table-striped mt-3'>
                        <thead className='table-dark'>
                          <tr>
                            <th scope='col'>No</th>
                            <th scope='col'>NIM</th>
                            <th scope='col'>Nama</th>
                            <th scope='col'>Jurusan</th>
                            <th scope='col'>Vote</th>
                            <th scope='col'>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope='row'>1</th>
                            <td>20293469</td>
                            <td>Rizal Saefudin Supratman</td>
                            <td>Diploma IV Pertanahan</td>
                            <td>01</td>
                            <td>
                              <div className='d-flex'>
                                <button
                                  type='button'
                                  className='btn btn-success me-1'
                                  data-bs-toggle='modal'
                                  data-bs-target='#editVoteModal'>
                                  <span className='material-symbols-outlined d-flex align-items-center'>
                                    edit
                                  </span>
                                </button>
                                <button
                                  type='button'
                                  className='btn btn-danger me-1'
                                  data-bs-toggle='modal'
                                  data-bs-target='#deleteVoteModal'>
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
                            <td>20293470</td>
                            <td>Kucing Basefont</td>
                            <td>Diploma I PPK</td>
                            <td>02</td>
                            <td>
                              <div className='d-flex'>
                                <button
                                  type='button'
                                  className='btn btn-success me-1'
                                  data-bs-toggle='modal'
                                  data-bs-target='#editVoteModal'>
                                  <span className='material-symbols-outlined d-flex align-items-center'>
                                    edit
                                  </span>
                                </button>
                                <button
                                  type='button'
                                  className='btn btn-danger me-1'
                                  data-bs-toggle='modal'
                                  data-bs-target='#deleteVoteModal'>
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
                            <th scope='row'>3</th>
                            <td>20293351</td>
                            <td>Garrett Winters</td>
                            <td>Prodiksus PPAT</td>
                            <td>01</td>
                            <td>
                              <div className='d-flex'>
                                <button
                                  type='button'
                                  className='btn btn-success me-1'
                                  data-bs-toggle='modal'
                                  data-bs-target='#editVoteModal'>
                                  <span className='material-symbols-outlined d-flex align-items-center'>
                                    edit
                                  </span>
                                </button>
                                <button
                                  type='button'
                                  className='btn btn-danger me-1'
                                  data-bs-toggle='modal'
                                  data-bs-target='#deleteVoteModal'>
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
                            <th scope='row'>4</th>
                            <td>20293167</td>
                            <td>Ashton Cox</td>
                            <td>Diploma I PPK</td>
                            <td>02</td>
                            <td>
                              <div className='d-flex'>
                                <button
                                  type='button'
                                  className='btn btn-success me-1'
                                  data-bs-toggle='modal'
                                  data-bs-target='#editVoteModal'>
                                  <span className='material-symbols-outlined d-flex align-items-center'>
                                    edit
                                  </span>
                                </button>
                                <button
                                  type='button'
                                  className='btn btn-danger me-1'
                                  data-bs-toggle='modal'
                                  data-bs-target='#deleteVoteModal'>
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
                            <th scope='row'>5</th>
                            <td>20293111</td>
                            <td>Rizal Saefudin Supratman</td>
                            <td>Diploma IV Pertanahan</td>
                            <td>01</td>
                            <td>
                              <div className='d-flex'>
                                <button
                                  type='button'
                                  className='btn btn-success me-1'
                                  data-bs-toggle='modal'
                                  data-bs-target='#editVoteModal'>
                                  <span className='material-symbols-outlined d-flex align-items-center'>
                                    edit
                                  </span>
                                </button>
                                <button
                                  type='button'
                                  className='btn btn-danger me-1'
                                  data-bs-toggle='modal'
                                  data-bs-target='#deleteVoteModal'>
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
                            <th scope='row'>6</th>
                            <td>20293470</td>
                            <td>Cedric Kelly</td>
                            <td>Prodiksus PPAT</td>
                            <td>02</td>
                            <td>
                              <div className='d-flex'>
                                <button
                                  type='button'
                                  className='btn btn-success me-1'
                                  data-bs-toggle='modal'
                                  data-bs-target='#editVoteModal'>
                                  <span className='material-symbols-outlined d-flex align-items-center'>
                                    edit
                                  </span>
                                </button>
                                <button
                                  type='button'
                                  className='btn btn-danger me-1'
                                  data-bs-toggle='modal'
                                  data-bs-target='#deleteVoteModal'>
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
                            <th scope='row'>7</th>
                            <td>20293696</td>
                            <td>Airi Satou</td>
                            <td>Diploma IV Pertanahan</td>
                            <td>01</td>
                            <td>
                              <div className='d-flex'>
                                <button
                                  type='button'
                                  className='btn btn-success me-1'
                                  data-bs-toggle='modal'
                                  data-bs-target='#editVoteModal'>
                                  <span className='material-symbols-outlined d-flex align-items-center'>
                                    edit
                                  </span>
                                </button>
                                <button
                                  type='button'
                                  className='btn btn-danger me-1'
                                  data-bs-toggle='modal'
                                  data-bs-target='#deleteVoteModal'>
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
                            <th scope='row'>8</th>
                            <td>20293444</td>
                            <td>Herrod Chandler</td>
                            <td>Diploma I PPK</td>
                            <td>02</td>
                            <td>
                              <div className='d-flex'>
                                <button
                                  type='button'
                                  className='btn btn-success me-1'
                                  data-bs-toggle='modal'
                                  data-bs-target='#editVoteModal'>
                                  <span className='material-symbols-outlined d-flex align-items-center'>
                                    edit
                                  </span>
                                </button>
                                <button
                                  type='button'
                                  className='btn btn-danger me-1'
                                  data-bs-toggle='modal'
                                  data-bs-target='#deleteVoteModal'>
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
        {/* modal edit vote */}
        <div
          className='modal fade'
          id='editVoteModal'
          tabIndex={-1}
          aria-labelledby='editVoteModalLabel'
          aria-hidden='true'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5' id='editVoteModalLabel'>
                  Edit Vote
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
                    <div className='row'>
                      <div className='col'>
                        {/* nim */}
                        <div className='form-group'>
                          <label htmlFor='nim' className='form-label'>
                            NIM
                          </label>
                          <div className='input-group'>
                            <input
                              type='text'
                              className='form-control'
                              id='nim'
                              autoComplete='off'
                              defaultValue={20293469}
                              disabled
                            />
                          </div>
                        </div>
                        {/* nama lengkap */}
                        <div className='form-group mt-3'>
                          <label htmlFor='nama' className='form-label'>
                            Nama Lengkap
                          </label>
                          <div className='input-group'>
                            <input
                              type='text'
                              className='form-control'
                              id='nama'
                              autoComplete='off'
                              defaultValue='Rizal Saefudin Supratman'
                              disabled
                            />
                          </div>
                        </div>
                        {/* jurusan */}
                        <div className='form-group mt-3'>
                          <label htmlFor='jurusan' className='form-label'>
                            Jurusan
                          </label>
                          <div className='input-group'>
                            <input
                              type='text'
                              className='form-control'
                              id='jurusan'
                              autoComplete='off'
                              defaultValue='Diploma IV Pertanahan'
                              disabled
                            />
                          </div>
                        </div>
                        {/* Vote */}
                        <div className='form-group mt-3'>
                          <label htmlFor='jurusan' className='form-label'>
                            Vote
                          </label>
                          <div className='input-group'>
                            <select className='form-select'>
                              <option value="01" selected>
                                01
                              </option>
                              <option value="02">02</option>
                            </select>
                          </div>
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
        {/* modal hapus vote */}
        <div
          className='modal fade'
          id='deleteVoteModal'
          tabIndex={-1}
          aria-labelledby='deleteVoteModalLabel'
          aria-hidden='true'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5' id='deleteVoteModalLabel'>
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
                Apakah anda yakin ingin menghapus vote ini?
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

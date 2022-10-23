import React from "react";
import Sidebar from "../../component/Sidebar";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default function UserManagement() {
  const data = [
    {
      nim: "2011111111",
      name: "John Doe",
      major: "Teknik Informatika",
      email: "johndoe@gmail.com",
      role: "User",
    },
    {
      nim: "20293469",
      name: "Kucing Basefont",
      major: "Diploma I PPK",
      email: "kucing_basement@gmail.com",
      role: "Admin",
    },
    {
      nim: "20293351",
      name: "Garrett Winters",
      major: "Prodiksus PPAT",
      email: "garret_winters@gmail.com",
      role: "User",
    },
    {
      nim: "20293167",
      name: "Ashton Cox",
      major: "Diploma I PPK",
      email: "ashton_cox@gmail.com",
      role: "User",
    },
  ];
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
                  <li className='breadcrumb-item active' aria-current='page'>
                    User Management
                  </li>
                </ol>
              </nav>
              <div className='content-title'>
                <h2 className='fw-bold'>User Management</h2>
                <p className='fs-5'>Kelola pengguna aplikasi evote.</p>
              </div>
              <div className='container-fluid p-0'>
                <div className='row mt-4 flex-lg-row flex-column-reverse'>
                  <div className='col-lg-6 d-flex'>
                    <form
                      className='d-flex ms-lg-0 ms-auto mt-lg-0 mt-3'
                      role='search'>
                      <input
                        className='form-control me-lg-2'
                        type='search'
                        placeholder='Cari User'
                        aria-label='Search'
                        id='search'
                      />
                      <button className='btn btn-outline-success' type='submit'>
                        Cari
                      </button>
                    </form>
                  </div>
                  <div className='col-lg-6 d-flex'>
                    <a
                      href='konfirmasi-user.html'
                      type='button'
                      className='btn btn-success position-relative ms-auto me-4 d-flex align-items-center'>
                      <span className='material-symbols-outlined me-1 fs-5'>
                        {" "}
                        <CheckCircleOutlinedIcon />{" "}
                      </span>
                      Konfirmasi User
                      <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                        99+
                        <span className='visually-hidden'>unread messages</span>
                      </span>
                    </a>
                    <button
                      className='btn btn-primary d-flex align-items-center'
                      data-bs-toggle='modal'
                      data-bs-target='#addUserModal'>
                      <span className='material-symbols-outlined d-flex align-items-center fs-5 me-1'>
                        {" "}
                        <AddOutlinedIcon />{" "}
                      </span>
                      Tambah User
                    </button>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12 table-responsive mt-3'>
                    <table className='table table-bordered table-striped'>
                      <thead className='table-dark'>
                        <tr>
                          <th scope='col'>No</th>
                          <th scope='col'>NIM</th>
                          <th scope='col'>Nama Lengkap</th>
                          <th scope='col'>Jurusan</th>
                          <th scope='col'>Email</th>
                          <th scope='col'>Role</th>
                          <th scope='col'>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => (
                          <tr>
                            <th scope='row'>{index + 1}</th>
                            <td>{item.nim}</td>
                            <td>{item.name}</td>
                            <td>{item.major}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                            <td>
                              <div className='d-flex'>
                                <button
                                  className='btn btn-primary me-1'
                                  data-bs-toggle='modal'
                                  data-bs-target='#showUserModal'>
                                  <span className='material-symbols-outlined d-flex align-items-center'>
                                    <VisibilityOutlinedIcon />
                                  </span>
                                </button>
                                <button
                                  type='button'
                                  className='btn btn-success d-flex me-1'
                                  data-bs-toggle='modal'
                                  data-bs-target='#editUserModal'>
                                  <span className='material-symbols-outlined d-flex align-items-center'>
                                    {" "}
                                    <ModeEditOutlineOutlinedIcon />{" "}
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
                                      <DeleteOutlineOutlinedIcon />{" "}
                                    </span>
                                  </i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* MODALS */}
        {/* show user modal */}
        <div
          className='modal fade'
          id='showUserModal'
          tabIndex={-1}
          aria-labelledby='showUserModalLabel'
          aria-hidden='true'>
          Modal
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5' id='showUserLabel'>
                  Detail User
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
                        {/* Email */}
                        <div className='form-group mt-3'>
                          <label htmlFor='email' className='form-label'>
                            Email
                          </label>
                          <div className='input-group'>
                            <input
                              type='text'
                              className='form-control'
                              id='email'
                              autoComplete='off'
                              defaultValue='rizal_saefudin@gmail.com'
                              disabled
                            />
                          </div>
                        </div>
                        {/* Password */}
                        <div className='form-group mt-3'>
                          <label htmlFor='password' className='form-label'>
                            Password
                          </label>
                          <div className='input-group'>
                            <input
                              type='text'
                              className='form-control'
                              id='password'
                              autoComplete='off'
                              defaultValue='rizal1234'
                              disabled
                            />
                          </div>
                        </div>
                        {/* Role */}
                        <div className='form-group mt-3'>
                          <label htmlFor='role' className='form-label'>
                            Role
                          </label>
                          <div className='input-group'>
                            <input
                              type='text'
                              className='form-control'
                              id='role'
                              autoComplete='off'
                              defaultValue='User'
                              disabled
                            />
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
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* modal add user */}
        <div
          className='modal fade'
          id='addUserModal'
          tabIndex={-1}
          aria-labelledby='addUserModalLabel'
          aria-hidden='true'>
          Modal
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5' id='addUserLabel'>
                  Tambah User
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
                          <label htmlFor='nim-add' className='form-label'>
                            NIM
                          </label>
                          <div className='input-group'>
                            <input
                              type='text'
                              className='form-control'
                              id='nim-add'
                              autoComplete='off'
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
                            />
                          </div>
                        </div>
                        {/* jurusan */}
                        <div className='form-group mt-3'>
                          <label htmlFor='jurusan' className='form-label'>
                            Jurusan
                          </label>
                          <div className='form-group'>
                            <div className='input-group'>
                              <select
                                className='form-select'
                                aria-label='Default select example'>
                                <option value='Diploma I PPK'>
                                  Diploma I PPK
                                </option>
                                <option value='Diploma IV Pertanahan' selected>
                                  Diploma IV Pertanahan
                                </option>
                                <option value='Prodiksus PPAT'>
                                  Prodiksus PPAT
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                        {/* Email */}
                        <div className='form-group mt-3'>
                          <label htmlFor='email' className='form-label'>
                            Email
                          </label>
                          <div className='input-group'>
                            <input
                              type='text'
                              className='form-control'
                              id='email'
                              autoComplete='off'
                            />
                          </div>
                        </div>
                        {/* Password */}
                        <div className='form-group mt-3'>
                          <label htmlFor='password' className='form-label'>
                            Password
                          </label>
                          <div className='input-group'>
                            <input
                              type='text'
                              className='form-control'
                              id='password'
                              autoComplete='off'
                            />
                          </div>
                        </div>
                        {/* Role */}
                        <div className='form-group mt-3'>
                          <label htmlFor='role' className='form-label'>
                            Role
                          </label>
                          <div className='input-group'>
                            <select className='form-select'>
                              <option value='User' selected>
                                User
                              </option>
                              <option value='Admin'>Admin</option>
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
                <button
                  type='button'
                  className='btn btn-primary'
                  data-bs-dismiss='modal'>
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* modal edit user */}
        <div
          className='modal fade'
          id='editUserModal'
          tabIndex={-1}
          aria-labelledby='editUserModalLabel'
          aria-hidden='true'>
          Modal
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5' id='editUserLabel'>
                  Edit User
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
                            />
                          </div>
                        </div>
                        {/* jurusan */}
                        <div className='form-group mt-3'>
                          <label htmlFor='jurusan' className='form-label'>
                            Jurusan
                          </label>
                          <div className='form-group'>
                            <div className='input-group'>
                              <select
                                className='form-select'
                                aria-label='Default select example'>
                                <option value='Diploma I PPK'>
                                  Diploma I PPK
                                </option>
                                <option value='Diploma IV Pertanahan' selected>
                                  Diploma IV Pertanahan
                                </option>
                                <option value='Prodiksus PPAT'>
                                  Prodiksus PPAT
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                        {/* Email */}
                        <div className='form-group mt-3'>
                          <label htmlFor='email' className='form-label'>
                            Email
                          </label>
                          <div className='input-group'>
                            <input
                              type='text'
                              className='form-control'
                              id='email'
                              autoComplete='off'
                              defaultValue='rizal_saefudin@gmail.com'
                            />
                          </div>
                        </div>
                        {/* Password */}
                        <div className='form-group mt-3'>
                          <label htmlFor='password' className='form-label'>
                            Password
                          </label>
                          <div className='input-group'>
                            <input
                              type='text'
                              className='form-control'
                              id='password'
                              autoComplete='off'
                              defaultValue='rizal1234'
                            />
                          </div>
                        </div>
                        {/* Role */}
                        <div className='form-group mt-3'>
                          <label htmlFor='role' className='form-label'>
                            Role
                          </label>
                          <div className='input-group'>
                            <select className='form-select'>
                              <option value='User' selected>
                                User
                              </option>
                              <option value='Admin'>Admin</option>
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
                <button
                  type='button'
                  className='btn btn-primary'
                  data-bs-dismiss='modal'>
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* modal delete user */}
        <div
          className='modal fade'
          id='deleteUserModal'
          tabIndex={-1}
          aria-labelledby='deleteUserModalLabel'
          aria-hidden='true'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5' id='deleteUserModalLabel'>
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
                Apakah anda yakin ingin menghapus user ini?
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

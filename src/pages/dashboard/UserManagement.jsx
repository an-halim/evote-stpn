import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../../component/Sidebar";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { MyVerticallyCenteredModal } from "../../component/Modal";
import SearchIcon from "@mui/icons-material/Search";
import CustomTablePagination from "../../component/CustomTable";
import {toast, ToastContainer} from "react-toastify"

export default function UserManagement() {
  const [loading, setLoading] = useState(true);
  const [activeData, setActiveData] = useState([]);
  const [inactiveData, setInactiveData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalShowUser, setModalShowUser] = useState(false)
  const [sideBar, setSideBar] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [user, setUser] = useState({
    nim: "",
    name: "",
    email: "",
    major: "",
    password: "",
    role: "",
  });

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - activeData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let base = process.env.REACT_APP_BASE_URL;
  let token = localStorage.getItem("token");

  let fetchData = async () => {
    axios
      .get(base + "/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let activeUser = res.data.data.filter((item) => item.isActive === true);
        let userToActivate = res.data.data.filter(
          (item) => item.isActive === false
        );
        setActiveData(activeUser);
        setInactiveData(userToActivate);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
        window.location.href = "/login";
      });
  };

  const addUser = () => {
    setModalShow(false)
    const Toast = toast.loading("Please wait...")
    let data = user
    data.isActive = true
    axios
      .post(`${base}/user`, data, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then((res) => {
        toast.update(Toast, { render: "User has been added", type: "success", isLoading: false, autoClose: 2000 });
      })
      .catch((err) => {
        toast.update(Toast, { render: "Failed to add user", type: "error", isLoading: false, autoClose: 2000 });
      })
  }
  useEffect(() => {
    getDetail();
    fetchData();
  }, []);

  return (
    <>
      <div className='main-container d-flex'>
        <ToastContainer />
        {/* SIDEBAR */}
        <Sidebar active={"User Management"} />
        {/* CONTENT */}
        <div className='content'>
          {/* User Management */}
          <div id='user-management'>
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
                  <div className='col-lg-4 col-md-6 d-flex'>
                    <input
                      className='form-control me-lg-2 ms-lg-0 ms-auto mt-lg-0 mt-3'
                      type='search'
                      placeholder='Cari User'
                      aria-label='Search'
                      id='search'
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <SearchIcon
                      fontSize='large'
                      className='me-lg-2 ms-lg-0 ms-auto mt-lg-0 mt-3'
                    />
                  </div>
                  <div className='col-lg-4 col-md-6 d-flex ms-auto'>
                    <div className='position-relative d-flex ms-auto'>
                      <Link to='/dashboard/user-management/confirm-user'>
                        <div className='btn btn-success align-items-center'>
                          <span className='material-symbols-outlined me-1 fs-5'>
                            {" "}
                            <CheckCircleOutlinedIcon />{" "}
                          </span>
                          Konfirmasi User
                          <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                            {inactiveData.length >= 100
                              ? "99+"
                              : inactiveData.length}
                            <span className='visually-hidden'>
                              unread messages
                            </span>
                          </span>
                        </div>
                      </Link>
                    </div>
                    <button
                      className='btn btn-primary d-flex ms-auto'
                      onClick={() => setModalShow(true)}>
                      <span className='material-symbols-outlined d-flex align-items-center'>
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
                        {loading ? (
                          <tr>
                            <td colSpan='6' className='text-center'>
                              Loading...
                            </td>
                          </tr>
                        ) : activeData.length === 0 ? (
                          <tr>
                            <td colSpan='6' className='text-center'>
                              Tidak ada data
                            </td>
                          </tr>
                        ) : (
                          (rowsPerPage > 0
                            ? activeData.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : activeData
                          )
                            ?.filter((val) => {
                              if (search === "") {
                                return val;
                              } else if (
                                val.nim
                                  .toLowerCase()
                                  .includes(search.toLowerCase()) ||
                                val.name
                                  .toLowerCase()
                                  .includes(search.toLowerCase()) ||
                                val.email
                                  .toLowerCase()
                                  .includes(search.toLowerCase())
                              ) {
                                return val;
                              }
                            })
                            ?.map((item, index) => (
                              <tr key={index}>
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
                                      onClick={() => {
                                        setUser({
                                          nim: item.nim,
                                          name: item.name,
                                          major: item.major,
                                          email: item.email,
                                          role: item.role,
                                        });
                                        setModalShowUser(true);
                                      }}>
                                      <span className='material-symbols-outlined d-flex align-items-center'>
                                        <VisibilityOutlinedIcon />
                                      </span>
                                    </button>
                                    <button
                                      type='button'
                                      className='btn btn-success d-flex me-1'
                                      onClick={() => {
                                        setUser({
                                          nim: item.nim,
                                          name: item.name,
                                          major: item.major,
                                          email: item.email,
                                          role: item.role,
                                        });
                                        setModalEdit(true);
                                      }}>
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
                            ))
                        )}
                        {emptyRows > 0 && (
                          <tr style={{ height: 41 * emptyRows }}>
                            <td colSpan={3} />
                          </tr>
                        )}
                      </tbody>
                      <tfoot>
                        <tr>
                          <CustomTablePagination
                            rowsPerPageOptions={[
                              5,
                              10,
                              25,
                              { label: "All", value: -1 },
                            ]}
                            colSpan={7}
                            count={activeData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            slotProps={{
                              select: {
                                "aria-label": "rows per page",
                              },
                              actions: {
                                showFirstButton: true,
                                showLastButton: true,
                              },
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                          />
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* MODALS */}
        {/* show user modal */}
        <MyVerticallyCenteredModal
          show={modalShowUser}
          onHide={() => setModalShowUser(false)}
          header={
            <h1 className='modal-title fs-5' id='editUserLabel'>
              Detail User
            </h1>
          }
          body={
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
                          defaultValue={user.nim}
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
                          defaultValue={user.name}
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
                          disabled
                          defaultValue={user.email}
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
                          defaultValue={user.role}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          }
          footer={
            <>
              <button
                onClick={() => setModalShowUser(false)}
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'>
                Batal
              </button>
              <button
              onClick={() => setModalShowUser(false)}
                type='button'
                className='btn btn-primary'
                data-bs-dismiss='modal'>
                Simpan
              </button>
            </>
          }
        />
        {/* modal add user */}
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          header={
            <div>
              <h1 className='modal-title fs-5' id='addPeriodModalLabel'>
                Tambah User
              </h1>
            </div>
          }
          body={
            <form onSubmit={() => addUser()}>
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
                          required
                          onChange={(e) => setUser({...user, nim: e.target.value})}
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
                          required
                          onChange={(e) => setUser({...user, name: e.target.value})}
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
                            onChange={(e) => setUser({...user, major: e.target.value})}
                            defaultValue='default'
                            className='form-select'
                            aria-label='Default select example'>
                            <option value='Diploma I PPK'>Diploma I PPK</option>
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
                    {/* Email */}
                    <div className='form-group mt-3'>
                      <label htmlFor='email' className='form-label'>
                        Email
                      </label>
                      <div className='input-group'>
                        <input
                          type='email'
                          className='form-control'
                          id='email'
                          autoComplete='off'
                          required
                          onChange={(e) => setUser({...user, email: e.target.value})}
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
                          required
                          onChange={(e) => setUser({...user, password: e.target.value})}
                        />
                      </div>
                    </div>
                    {/* Role */}
                    <div className='form-group mt-3'>
                      <label htmlFor='role' className='form-label'>
                        Role
                      </label>
                      <div defaultValue={"User"} className='input-group'>
                        <select
                        onChange={(e) => setUser({...user, role: e.target.value.toLowerCase()})}
                         className='form-select'>
                          <option value='User'>User</option>
                          <option value='Admin'>Admin</option>
                        </select>
                      </div>
                    </div>
                    <div className='d-flex justify-content-end gap-3'>
                      <button
                        type='button'
                        className='btn btn-secondary mt-3 ms-auto'
                        onClick={() => setModalShow(false)}>
                        Batal
                      </button>
                      <button
                       type='submit' className='btn btn-primary mt-3'>
                        Simpan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          }
        />
        {/* modal edit user */}
        <MyVerticallyCenteredModal
          disabled={true}
          show={modalEdit}
          onHide={() => setModalEdit(false)}
          header={
            <h1 className='modal-title fs-5' id='editUserLabel'>
              Edit User
            </h1>
          }
          body={
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
                          defaultValue={user.nim}
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
                          defaultValue={user.name}
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
                            defaultValue={user.major}
                            className='form-select'
                            aria-label='Default select example'>
                            <option value='Diploma I PPK'>Diploma I PPK</option>
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
                          defaultValue={user.email}
                        />
                      </div>
                    </div>
                    {/* Role */}
                    <div className='form-group mt-3'>
                      <label htmlFor='role' className='form-label'>
                        Role
                      </label>
                      <div className='input-group'>
                        <select
                          defaultValue={user.role}
                          className='form-select'>
                          <option value='User'>User</option>
                          <option value='Admin'>Admin</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          }
          footer={
            <>
              <button
                onClick={() => setModalEdit(false)}
                type='button'
                className='btn btn-secondary'
                >
                Batal
              </button>
              <button
                type='button'
                className='btn btn-primary'
                >
                Simpan
              </button>
            </>
          }
        />

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

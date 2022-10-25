import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../component/Sidebar";
import { Link } from "react-router-dom";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { MyVerticallyCenteredModal } from "../../component/Modal";
import { toast, ToastContainer } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";
import CustomTablePagination from "../../component/CustomTable";

export default function ConfirmUser() {
  const [userToActivate, setUserToActivate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sideBar, setSideBar] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalReject, setModalReject] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [name, setName] = useState({
    name: "",
    nim: "",
  });

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - userToActivate.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const base = process.env.REACT_APP_BASE_URL;
  let token = localStorage.getItem("token");

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

  const fetchData = async () => {
    axios
      .get(base + "/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let userToActivate = res.data.data.filter(
          (item) => item.isActive === false
        );

        setUserToActivate(userToActivate);
      })
      .catch((err) => {
        alert("Failed to fetch data");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const activateUser = (id) => {
    setModalConfirm(false);
    const Toast = toast.loading("Please wait...")
    axios
      .put(
        base + `/user/${id}`,
        {
          isActive: true,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        fetchData();
        toast.update(Toast, { render: "User has been activated", type: "success", isLoading: false, autoClose: 2000 });
      })
      .catch((err) => {
        toast.update(Toast, { render: "Failed to activate user", type: "error", isLoading: false, autoClose: 2000 });
      })
  };

  React.useEffect(() => {
    getDetail();
    fetchData();
  }, []);

  return (
    <>
      <div className='main-container d-flex'>
        <ToastContainer />
        <MyVerticallyCenteredModal
          show={modalConfirm}
          onHide={() => setModalConfirm(false)}
          header={<h1 className='modal-title fs-5'>Konfirmasi</h1>}
          body={
            <p>Apakah anda yakin ingin mengaktifkan akun milik {name.name}?</p>
          }
          footer={
            <div className='d-flex justify-content-end'>
              <button
                className='btn btn-secondary me-2'
                onClick={() => setModalConfirm(false)}>
                Batal
              </button>
              <button
                onClick={() => activateUser(name.nim)}
                className='btn btn-primary'>
                Konfirmasi
              </button>
            </div>
          }
        />
        {/* SIDEBAR */}
        <Sidebar active={"user-management"} />
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
                <div className='row mt-4 flex-lg-row'>
                  <div className='col-lg-4 d-flex ms-auto'>
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
                </div>
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
                        {loading ? (
                          <tr>
                            <td colSpan='6' className='text-center'>
                              Loading...
                            </td>
                          </tr>
                        ) : userToActivate.length === 0 ? (
                          <tr>
                            <td colSpan='6' className='text-center'>
                              Tidak ada data
                            </td>
                          </tr>
                        ) : (
                          (rowsPerPage > 0
                            ? userToActivate.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : userToActivate
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
                            ?.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{item.nim}</td>
                                  <td>{item.name}</td>
                                  <td>{item.major}</td>
                                  <td>{item.email}</td>
                                  <td className='d-flex'>
                                    <button
                                      onClick={() => {
                                        setModalConfirm(true);
                                        setName({
                                          name: item.name,
                                          nim: item.nim,
                                        });
                                      }}
                                      type='button'
                                      className='btn btn-success d-flex me-1'>
                                      <span className='material-symbols-outlined d-flex align-items-center'>
                                        {" "}
                                        <CheckOutlinedIcon />{" "}
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
                                          <CloseOutlinedIcon />{" "}
                                        </span>
                                      </i>
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                        )}
                        {emptyRows > 0 && (
                          <tr style={{ height: 41 * emptyRows }}>
                            <td colSpan={7} />
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
                            count={userToActivate.length}
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
      </div>
    </>
  );
}

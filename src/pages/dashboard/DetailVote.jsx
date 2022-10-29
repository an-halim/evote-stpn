import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Sidebar from "../../component/Sidebar";
import axios from "axios";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { MyVerticallyCenteredModal } from "../../component/Modal";
import { toast, ToastContainer } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";
import CustomTablePagination from "../../component/CustomTable";

export default function DetailVote() {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  // eslint-disable-next-line no-unused-vars
  const [periode, setPeriode] = React.useState(searchParams.get("tahun"));
  const [sideBar, setSideBar] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [modalDelete, setModalDelete] = React.useState(false);
  const [choosedNim, setChoosedNim] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  let base = process.env.REACT_APP_BASE_URL;
  let token = localStorage.getItem("token");

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getDetail = () => {
    axios
      .get(base + "/detail", {
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

  let fetchData = async () => {
    axios
      .get(`${base}/vote?period=${periode}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        toast.error("Terjadi kesalahan");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteData = () => {
    setModalDelete(false);
    const Toast = toast.loading("Mohon tunggu...");

    const data = JSON.stringify({
      nim: choosedNim,
      period: periode,
    });

    const config = {
      method: "delete",
      url: `${base}/vote`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then((res) => {
        toast.update(Toast, {
          render: "Voting berhasil dihapus",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        fetchData();
      })
      .catch((err) => {
        toast.update(Toast, {
          render: "Voting gagal dihapus",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      });
  };

  React.useEffect(() => {
    getDetail();
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <div className='main-container d-flex'>
          <ToastContainer />
          {/* SIDEBAR */}
          <Sidebar active={"periode"} />
          {/* CONTENT */}
          <div className='content'>
            {/* Periode & Paslon */}
            <div id='periode-paslon'>
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
                      <Link to='/dashboard/periode'>List Periode</Link>
                    </li>
                    <li className='breadcrumb-item'>
                      <Link to={`/dashboard/paslon?tahun=${periode}`}>
                        {periode}
                      </Link>
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
                  <div className='row mt-4 flex-lg-row flex-column-reverse'>
                    <div className='col-lg-4 d-flex'>
                      <input
                        className='form-control me-lg-2 ms-lg-0 me-auto mt-lg-0 mt-3'
                        type='search'
                        placeholder='Cari User'
                        aria-label='Search'
                        id='search'
                        onChange={(e) => {
                          setSearch(e.target.value)
                          setRowsPerPage(-1)
                        }}
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
                            <th scope='col'>NIT</th>
                            <th scope='col'>Nama</th>
                            <th scope='col'>Jurusan</th>
                            <th scope='col'>Vote</th>
                            <th scope='col'>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <tr>
                              <td colSpan={6}>Loading...</td>
                            </tr>
                          ) : data.length === 0 ? (
                            <tr>
                              <td colSpan={6} className='text-center'>
                                Data Kosong
                              </td>
                            </tr>
                          ) : (
                          (rowsPerPage > 0
                            ? data.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : data
                          )
                            // eslint-disable-next-line array-callback-return
                            ?.filter((val) => {
                              if (search === "") {
                                return val;
                              } else if (
                                val.user.nim
                                  .toLowerCase()
                                  .includes(search.toLowerCase()) ||
                                val.user.name
                                  .toLowerCase()
                                  .includes(search.toLowerCase()) ||
                                val.user.email
                                  .toLowerCase()
                                  .includes(search.toLowerCase())
                              ) {
                                return val;
                              }
                            })
                            ?.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <th scope='row'>{index + 1}</th>
                                  <td>{item.user.nim}</td>
                                  <td>{item.user.name}</td>
                                  <td>{item.user.major}</td>
                                  <td>{item.candidate.candidate_number}</td>
                                  <td>
                                    <div className='d-flex'>
                                      <button
                                        onClick={() => {
                                          setChoosedNim(item.user.nim);
                                          setModalDelete(true);
                                        }}
                                        type='button'
                                        className='btn btn-danger me-1'>
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
                              );
                            })
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
                              count={data.length}
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
        {/* MODALS */}
        {/* modal hapus vote */}
        <MyVerticallyCenteredModal
          show={modalDelete}
          onHide={() => setModalDelete(false)}
          header={
            <h1 className='modal-title fs-5' id='deleteCandidateModalLabel'>
              Hapus Vote
            </h1>
          }
          body={<>Apakah anda yakin ingin menghapus vote ini?</>}
          footer={
            <>
              <button
                onClick={() => setModalDelete(false)}
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'>
                Batal
              </button>
              <button
                onClick={() => deleteData()}
                type='button'
                className='btn btn-danger'>
                Hapus
              </button>
            </>
          }
        />
      </div>
    </>
  );
}

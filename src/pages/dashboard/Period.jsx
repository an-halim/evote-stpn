import React, { useState, useEffect } from "react";
import Sidebar from "../../component/Sidebar";
import axios from "axios";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import StopOutlinedIcon from "@mui/icons-material/StopOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { MyVerticallyCenteredModal } from "../../component/Modal";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Period() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalHapus, setModalHapus] = useState(false);
  const [choosedPeriod, setChoosedPeriod] = useState("");
  const [sideBar, setSideBar] = useState(false);
  const [generatePeriod, setGeneratePeriod] = useState([]);
  const [period, setPeriod] = useState("");

  const base = process.env.REACT_APP_BASE_URL;
  let token = localStorage.getItem("token");

  let fetchData = async () => {
    axios
      .get(base + "/period", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let period = res.data.data;
        setData(period);
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
        console.log(err);
        window.location.href = "/login";
      });
  };

  const genPeriode = () => {
    let data = [];
    for (let i = 0; i < 5; i++) {
      let year = new Date().getFullYear();
      let period = "";
      if (i === 1) {
        period = `${year + 1}/${year + 2}`;
      } else {
        period = `${year + i}/${year + i + 1}`;
      }
      data.push(period);
    }
    setGeneratePeriod(data);
    setPeriod(data[0]);
  };

  const addPeriod = (period) => {
    axios
      .post(
        base + "/period",
        {
          period: period,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Berhasil menambahkan periode");
        fetchData();
      })
      .catch((err) => {
        toast.error(err.response.data.errors[0].includes('taken') ? "Periode sudah ada!" : "Gagal menambahkan periode");
        console.clear();
      });
  };

  const deletePeriod = (period) => {
    setModalHapus(false);
    const Toast = toast.loading("Please wait...");

    axios
      .delete(`${base}/period?year=${period}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.update(Toast, {
          render: "Berhasil menghapus periode",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });
        fetchData();
      })
      .catch((err) => {
        toast.update(Toast, {
          render: "Gagal menghapus periode",
          type: "error",
          isLoading: false,
          autoClose: 1500,
        });
        console.clear();
      });
  };

  const handleStatus = (periode, status) => {
    let token = localStorage.getItem("token");
    axios
      .put(
        `${base}/period?year=${periode}`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Status periode berhasil diubah");
        fetchData();
      })
      .catch((err) => {
        toast.error(err.response.data.errors);
        console.clear();
      });
  };

  useEffect(() => {
    getDetail();
    fetchData();
    genPeriode();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div>
        <ToastContainer />
        <div className='main-container d-flex'>
          {/* SIDEBAR */}
          <Sidebar active={"periode"} />
          {/* CONTENT */}
          <div className='content'>
            {/* Periode & Paslon */}
            <div id='periode-paslon'>
              {/* mobile nav */}
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
                        onClick={() => {
                          genPeriode();
                          setModalShow(true);
                        }}>
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
                          {loading ? (
                            <tr>
                              <td colSpan='6' className='text-center'>
                                Loading...
                              </td>
                            </tr>
                          ) : data.length === 0 ? (
                            <tr>
                              <td colSpan='6' className='text-center'>
                                Tidak ada data
                              </td>
                            </tr>
                          ) : (
                            data?.map((item, index) => (
                              <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{item.period}</td>
                                <td>
                                  {
                                    item.status === "active"
                                    ? "Aktif"
                                    : item.status === "inactive"
                                    ? "Nonaktif"
                                    : "Selesai"
                                  }
                                </td>
                                <td className='d-flex'>
                                  <button
                                    type='button'
                                    period={item.period}
                                    onClick={(e) => {
                                      setChoosedPeriod(
                                        e.target.getAttribute("period")
                                      );
                                      let status =
                                        item.status === "inactive"
                                          ? "active"
                                          : item.status === "active"
                                          ? "finished"
                                          : null;
                                      handleStatus(item.period, status);
                                    }}
                                    className={
                                      item.status === "active"
                                        ? "btn btn-success d-flex me-1"
                                        : item.status === "inactive"
                                        ? "btn btn-success d-flex me-1"
                                        : "btn btn-success d-flex me-1 disabled"
                                    }>
                                    <span className='material-symbols-outlined d-flex align-items-center'>
                                      {" "}
                                      {item.status === "active" ? (
                                        <StopOutlinedIcon />
                                      ) : (
                                        <PlayArrowOutlinedIcon />
                                      )}{" "}
                                      {""}
                                    </span>
                                    {item.status === "active"
                                      ? "Tutup Polling"
                                      : "Mulai Polling"}
                                  </button>
                                  <Link
                                    to={`/dashboard/paslon?tahun=${item.period}`}>
                                    <div className='btn btn-primary me-1 d-flex align-items-center'>
                                      <span className='material-symbols-outlined'>
                                        <VisibilityOutlinedIcon />
                                      </span>
                                    </div>
                                  </Link>
                                  <button
                                    type='button'
                                    className='btn btn-danger me-1'
                                    periode={item.period}
                                    onClick={(e) => {
                                      setChoosedPeriod(item.period);
                                      setModalHapus(true);
                                    }}>
                                    <i className='far fa-trash-alt'>
                                      <span className='material-symbols-outlined d-flex align-items-center'>
                                        {" "}
                                        <DeleteOutlineOutlinedIcon />{" "}
                                      </span>
                                    </i>
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
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
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          header={
            <div>
              <h1 className='modal-title fs-5' id='addPeriodModalLabel'>
                Tambah Periode
              </h1>
            </div>
          }
          body={
            <form>
              <div className='form-group'>
                <label htmlFor='tahun-periode' className='form-label'>
                  Pilih Tahun Periode
                </label>
                <div className='input-group'>
                  <select
                    onChange={(e) => {
                      setPeriod(e.target.value);
                      console.log(period);
                    }}
                    defaultChecked={generatePeriod[0]}
                    className='form-select'
                    id='tahun-periode'>
                    {generatePeriod.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
          }
          footer={
            <>
              <button
                onClick={() => setModalShow(false)}
                type='button'
                className='btn btn-secondary gap-3'
                data-bs-dismiss='modal'>
                Batal
              </button>
              <button
                onClick={() => {
                  addPeriod(period);
                  setModalShow(false);
                }}
                type='button'
                className='btn btn-primary'>
                Tambah
              </button>
            </>
          }
        />

        {/* modal hapus periode */}
        <MyVerticallyCenteredModal
          show={modalHapus}
          onHide={() => setModalHapus(false)}
          header={
            <h1 className='modal-title fs-5' id='deletePeriodModalLabel'>
              Hapus Periode
            </h1>
          }
          body={
            <div>
              Apakah anda yakin ingin menghapus periode "<b>{choosedPeriod}</b>
              "?
            </div>
          }
          footer={
            <>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={() => setModalHapus(false)}>
                Batal
              </button>
              <button
                onClick={() => deletePeriod(choosedPeriod)}
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

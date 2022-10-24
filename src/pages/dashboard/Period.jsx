import React, { useState, useEffect } from "react";
import Sidebar from "../../component/Sidebar";
import axios from "axios";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { MyVerticallyCenteredModal } from "../../component/Modal";
import { Link } from "react-router-dom";

export default function Period() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalHapus, setModalHapus] = useState(false);
  const [choosedPeriod, setChoosedPeriod] = useState("");

  const base = process.env.REACT_APP_BASE_URL;

  let fetchData = async () => {
    let token = localStorage.getItem("token");
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
        alert("Failed to fetch data");
      })
      .finally(() => {
        setLoading(false);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
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
                        onClick={() => setModalShow(true)}>
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
                          {loading
                            ? null
                            : data?.map((item, index) => (
                                <tr key={index}>
                                  <th scope='row'>{index + 1}</th>
                                  <td>{item.period}</td>
                                  <td>{item.status}</td>
                                  <td className='d-flex'>
                                    <button
                                      type='button'
                                      className='btn btn-success d-flex disabled me-1'>
                                      <span className='material-symbols-outlined d-flex align-items-center'>
                                        {" "}
                                        <PlayArrowOutlinedIcon />
                                        {""}
                                      </span>
                                      Mulai Polling
                                    </button>
                                    <Link to={`/dashboard/paslon?tahun=${item.period}`}>
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
                                        setChoosedPeriod(e.target.getAttribute("periode"));
                                        setModalHapus(true)}}
                                      >
                                      <i className='far fa-trash-alt'>
                                        <span className='material-symbols-outlined d-flex align-items-center'>
                                          {" "}
                                          <DeleteOutlineOutlinedIcon />{" "}
                                        </span>
                                      </i>
                                    </button>
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
              <button type='button' className='btn btn-primary'>
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
              Apakah anda yakin ingin menghapus periode "<b>{choosedPeriod}</b>"?
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
              <button type='button' className='btn btn-danger'>
                Hapus
              </button>
            </>
          }
        />
      </div>
    </>
  );
}

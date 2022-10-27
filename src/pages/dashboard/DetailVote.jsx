import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Sidebar from "../../component/Sidebar";
import axios from "axios";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { MyVerticallyCenteredModal } from "../../component/Modal";
import {toast, ToastContainer} from 'react-toastify';

export default function DetailVote() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [periode, setPeriode] = React.useState(searchParams.get("tahun"));
  const [sideBar, setSideBar] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [modalDelete, setModalDelete] = React.useState(false);
  const [choosedNim, setChoosedNim] = React.useState("")

  let base = process.env.REACT_APP_BASE_URL;
  let token = localStorage.getItem("token");

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
        alert("Failed to fetch data");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteData = () => {
    setModalDelete(false)
    const Toast = toast.loading("Deleting data...");

    const data = JSON.stringify({
      "nim": choosedNim,
      "period": periode
    });
    
    const config = {
      method: 'delete',
      url: `${base}/vote`,
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios(config)
    .then((res) => {
      toast.update(Toast, {
        render: "Data deleted",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      fetchData();
    })
    .catch((err) => {
      toast.update(Toast, {
        render: "Failed to delete data",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    })
  }

  React.useEffect(() => {
    getDetail();
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
                            data.map((item, index) => {
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
                                        type='button'
                                        className='btn btn-success me-1'
                                        data-bs-toggle='modal'
                                        data-bs-target='#editVoteModal'>
                                        <span className='material-symbols-outlined d-flex align-items-center'>
                                        <ModeEditOutlineOutlinedIcon />
                                        </span>
                                      </button>
                                      <button
                                        
                                        onClick={() => {
                                          setChoosedNim(item.user.nim)
                                          setModalDelete(true)
                                        }}
                                        type='button'
                                        className='btn btn-danger me-1'
                                        >
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
                            <select defaultValue={"01"} className='form-select'>
                              <option value='01'>01</option>
                              <option value='02'>02</option>
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
        <MyVerticallyCenteredModal
          show={modalDelete}
          onHide={() => setModalDelete(false)}
          header={
            <h1 className='modal-title fs-5' id='deleteCandidateModalLabel'>
              Hapus Vote
            </h1>
          }
          body={
            <>
              Apakah anda yakin ingin menghapus vote ini?
            </>
          }
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

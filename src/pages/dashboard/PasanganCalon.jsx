import React from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import Sidebar from "../../component/Sidebar";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { capitalize } from "@mui/material";
import { MyVerticallyCenteredModal } from "../../component/Modal";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { toast, ToastContainer } from "react-toastify";

export default function PasanganCalon(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [periode, setPeriode] = React.useState(searchParams.get("tahun"));
  const [sideBar, setSideBar] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [modalAdd, setModalAdd] = React.useState(false);
  const [modalDelete, setModalDelete] = React.useState(false);
  const [modalEdit, setModalEdit] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState({
    name: "",
    id: "",
  });
  const [candidate, setCandidate] = React.useState({
    candidate_id: "",
    candidate_number: "",
    head_nim: "",
    head_name: "",
    head_major: "",
    head_photo: "",
    deputy_nim: "",
    deputy_name: "",
    deputy_major: "",
    deputy_photo: "",
    period: periode,
  });

  const base = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");

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

  const getData = () => {
    axios
      .get(`${base}/result?period=${periode}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const validateSize = (e) => {
    const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 2) {
      toast.error("Foto tidak boleh lebih dari 2MB");
      e.target.value = null;
    } 

  }

  const postData = (e, method) => {
    e.preventDefault();

    let url = method.toLowerCase() === "post" ? `${base}/candidate` : `${base}/candidate/${candidate.candidate_id}`;
    let data = new FormData();
    data.append("head_nim", candidate.head_nim);
    data.append("head_name", candidate.head_name);
    data.append("head_major", candidate.head_major);
    data.append("head_photo", candidate.head_photo);
    data.append("deputy_nim", candidate.deputy_nim);
    data.append("deputy_name", candidate.deputy_name);
    data.append("deputy_major", candidate.deputy_major);
    data.append("deputy_photo", candidate.deputy_photo);
    data.append("period", candidate.period);
    data.append("candidate_number", candidate.candidate_number);

    let config = {
      method: method,
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    axios(config)
      .then((res) => {
        method.toLowerCase() === "post" ? toast.success("Data berhasil ditambahkan") : toast.success("Data berhasil diubah");
      })
      .catch((err) => {
        method.toLowerCase() === "post" ? toast.error("Data gagal ditambahkan") : toast.error("Data gagal diubah");
        console.log(err);
      })
      .finally(() => {
        getData();
        setModalAdd(false);
        setModalEdit(false);
      });
  };

  const deleteData = () => {
    const Toast = toast.loading("Please wait...")

    axios
      .delete(`${base}/candidate/${deleteId.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.update(Toast, { render: "Paslon berhasil dihapus", type: "success", isLoading: false, autoClose: 1500 });
      })
      .catch((err) => {
        toast.update(Toast, { render: "Paslon gagal dihapus", type: "error", isLoading: false, autoClose: 1500 });
      })
      .finally(() => {
        getData();
        setModalDelete(false);
      });
  };
  

  React.useEffect(() => {
    getDetail();
    getData();
  }, [periode]);
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
              {/* mobile navbar */}
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
                      <div className='ms-auto'>
                        <Link to={`/dashboard/detail-vote?tahun=${periode}`}>
                          <div className='btn btn-secondary d-flex align-items-center'>
                            <span className='material-symbols-outlined d-flex align-items-center fs-5 me-2'>
                              {" "}
                              <HistoryOutlinedIcon />{" "}
                            </span>{" "}
                            Detail Vote
                          </div>
                        </Link>
                      </div>
                      <button
                        onClick={() => setModalAdd(true)}
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
                          {loading ? (
                            <tr>
                              {" "}
                              <td colSpan={6} className='text-center'>
                                Loading...
                              </td>{" "}
                            </tr>
                          ) : data.length <= 0 ? (
                            <tr>
                              <td colSpan={6} className='text-center'>
                                Data Kosong
                              </td>
                            </tr>
                          ) : (
                            data.map((item, index) => (
                              <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>
                                  {capitalize(item.head_name)} &amp;{" "}
                                  {capitalize(item.deputy_name)}
                                </td>
                                <td>
                                  <div className='d-flex'>
                                    <img
                                      crossOrigin='anonymous'
                                      src={`${base}/upload/${item.head_photo}`}
                                      alt='img-ketua-1'
                                      height={35}
                                      width={35}
                                      className='rounded'
                                    />
                                    <img
                                      crossOrigin='anonymous'
                                      src={`${base}/upload/${item.deputy_photo}`}
                                      alt='img-wakil-1'
                                      height={35}
                                      width={35}
                                      className='ms-2 rounded'
                                    />
                                  </div>
                                </td>
                                <td>
                                  {item.total}/{item.active_user}
                                </td>
                                <td>
                                  <span
                                    className={
                                      item.percentage > 50
                                        ? "text-success"
                                        : "text-danger"
                                    }>
                                    {item.percentage.toFixed(2)}%
                                  </span>
                                </td>
                                <td>
                                  <div className='d-flex'>
                                    <button
                                      onClick={() => {
                                        setModalEdit(true);
                                        setCandidate(item)
                                      }}
                                      type='button'
                                      className='btn btn-success me-1'
                                      >
                                      <span className='material-symbols-outlined d-flex align-items-center'>
                                        <ModeEditOutlineOutlinedIcon />
                                      </span>
                                    </button>
                                    <button
                                      type='button'
                                      className='btn btn-danger me-1'
                                      onClick={() => {
                                        setModalDelete(true);
                                        setDeleteId({
                                          name: `${item.head_name} & ${item.deputy_name}`,
                                          id: item.candidate_id,
                                        });
                                      }}>
                                      <span className='material-symbols-outlined d-flex align-items-center'>
                                        {" "}
                                        <DeleteOutlineOutlinedIcon />{" "}
                                      </span>
                                    </button>
                                  </div>
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
        {/* modal tambah calon */}
        <MyVerticallyCenteredModal
          size='lg'
          show={modalAdd}
          onHide={() => setModalAdd(false)}
          header={
            <h1 className='modal-title fs-5' id='addCandidateModalLabel'>
              Tambah Calon
            </h1>
          }
          body={
            <form onSubmit={(e) => postData(e, 'POST')}>
              <div className='container-fluid'>
                {/* KETUA */}
                <h5 className='d-flex fw-bold'>
                  <span className='material-symbols-outlined fs-3 d-flex align-items-center me-2'>
                    {" "}
                    <Person2OutlinedIcon />{" "}
                  </span>
                  Ketua
                </h5>
                <hr />
                <div className='mb-4'>
                  <label htmlFor='nomor_candidate' className='form-label'>
                    NOMOR URUT
                  </label>
                  <input
                    onChange={(e) =>
                      setCandidate({
                        ...candidate,
                        candidate_number: e.target.value,
                      })
                    }
                    type='number'
                    className='form-control'
                    id='nomor_candidate'
                    autoComplete='off'
                    required
                  />
                </div>
                <div className='row'>
                  <div className='col'>
                    {/* nim */}
                    <div className='form-group'>
                      <label htmlFor='nim-ketua' className='form-label'>
                        NIM
                      </label>
                      <div className='input-group'>
                        <input
                          onChange={(e) =>
                            setCandidate({
                              ...candidate,
                              head_nim: e.target.value,
                            })
                          }
                          type='text'
                          className='form-control'
                          id='nim-ketua'
                          autoComplete='off'
                          required
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
                          required
                          defaultValue={"---"}
                          className='form-select'
                          onChange={(e) =>
                            setCandidate({
                              ...candidate,
                              head_major: e.target.value,
                            })
                          }>
                          <option value='Pilih Jurusan'>Pilih Jurusan</option>
                          <option value='Diploma I PPK'>Diploma I PPK</option>
                          <option value='Diploma IV Pertanahan'>
                            Diploma IV Pertanahan
                          </option>
                          <option value='Prodiksus PPAT'>Prodiksus PPAT</option>
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
                          onChange={(e) =>
                            setCandidate({
                              ...candidate,
                              head_name: e.target.value,
                            })
                          }
                          type='text'
                          className='form-control'
                          id='nama-ketua'
                          autoComplete='off'
                          required
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
                        onChange={(e) => {
                          validateSize(e)
                          setCandidate({
                            ...candidate,
                            head_photo: e.target.files[0],
                          })
                        }}
                        className='form-control'
                        type='file'
                        id='file-ketua'
                        accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                        required
                      />
                      {/* info limit file */}
                      <div className='form-text fst-italic'>
                        *Ukuran file maksimal 2MB
                      </div>
                    </div>
                  </div>
                </div>
                {/* WAKIL KETUA */}
                <h5 className='mt-5 d-flex fw-bold'>
                  <span className='material-symbols-outlined fs-3 d-flex align-items-end me-2'>
                    {" "}
                    <GroupOutlinedIcon />{" "}
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
                          onChange={(e) =>
                            setCandidate({
                              ...candidate,
                              deputy_nim: e.target.value,
                            })
                          }
                          type='text'
                          className='form-control'
                          id='nim-wakil'
                          autoComplete='off'
                          required
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
                        <select
                          required
                          defaultValue={"---"}
                          className='form-select'
                          onChange={(e) =>
                            setCandidate({
                              ...candidate,
                              deputy_major: e.target.value,
                            })
                          }>
                          <option value='Pilih Jurusan'>Pilih Jurusan</option>
                          <option value='Diploma I PPK'>Diploma I PPK</option>
                          <option value='Diploma IV Pertanahan'>
                            Diploma IV Pertanahan
                          </option>
                          <option value='Prodiksus PPAT'>Prodiksus PPAT</option>
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
                          onChange={(e) =>
                            setCandidate({
                              ...candidate,
                              deputy_name: e.target.value,
                            })
                          }
                          type='text'
                          className='form-control'
                          id='nama-wakil'
                          autoComplete='off'
                          required
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
                        onChange={(e) =>{
                          validateSize(e)
                          setCandidate({
                            ...candidate,
                            deputy_photo: e.target.files[0],
                          })                      
                        }}
                        className='form-control'
                        type='file'
                        id='file-wakil'
                        accept='.jpg, .png, .jpeg'
                        required
                      />
                      {/* info limit file */}
                      <div className='form-text fst-italic'>
                        *Ukuran file maksimal 2MB
                      </div>
                    </div>
                    <div className='d-flex justify-content-end gap-3 mt-4'>
                      <button
                        onClick={() => setModalAdd(false)}
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'>
                        Batal
                      </button>
                      <button
                        type='submit'
                        className='btn btn-primary'>
                        Tambah
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          }
        />
        {/* modal edit calon */}
        <MyVerticallyCenteredModal
          size='lg'
          show={modalEdit}
          onHide={() => setModalEdit(false)}
          header={
            <h1 className='modal-title fs-5' id='addCandidateModalLabel'>
              Edit Calon
            </h1>
          }
          body={
            <form onSubmit={(e) => postData(e, 'PUT')}>
              <div className='container-fluid'>
                {/* KETUA */}
                <h5 className='d-flex fw-bold'>
                  <span className='material-symbols-outlined fs-3 d-flex align-items-center me-2'>
                    {" "}
                    <Person2OutlinedIcon />{" "}
                  </span>
                  Ketua
                </h5>
                <hr />
                <div className='mb-4'>
                  <label htmlFor='nomor_candidate' className='form-label'>
                    NOMOR URUT
                  </label>
                  <input
                    onChange={(e) =>
                      setCandidate({
                        ...candidate,
                        candidate_number: e.target.value,
                      })
                    }
                    type='number'
                    className='form-control'
                    id='nomor_candidate'
                    autoComplete='off'
                    defaultValue={candidate.candidate_number}
                    required
                  />
                </div>
                <div className='row'>
                  <div className='col'>
                    {/* nim */}
                    <div className='form-group'>
                      <label htmlFor='nim-ketua' className='form-label'>
                        NIM
                      </label>
                      <div className='input-group'>
                        <input
                          onChange={(e) =>
                            setCandidate({
                              ...candidate,
                              head_nim: e.target.value,
                            })
                          }
                          type='text'
                          className='form-control'
                          id='nim-ketua'
                          autoComplete='off'
                          defaultValue={candidate.head_nim}
                          required
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
                         required
                          className='form-select'
                          defaultValue={candidate.head_major}
                          onChange={(e) =>
                            setCandidate({
                              ...candidate,
                              head_major: e.target.value,
                            })
                          }>
                          <option value='Pilih Jurusan'>Pilih Jurusan</option>
                          <option value='Diploma I PPK'>Diploma I PPK</option>
                          <option value='Diploma IV Pertanahan'>
                            Diploma IV Pertanahan
                          </option>
                          <option value='Prodiksus PPAT'>Prodiksus PPAT</option>
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
                          onChange={(e) =>
                            setCandidate({
                              ...candidate,
                              head_name: e.target.value,
                            })
                          }
                          type='text'
                          className='form-control'
                          id='nama-ketua'
                          autoComplete='off'
                          defaultValue={candidate.head_name}
                          required
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
                        onChange={(e) => {
                          validateSize(e)
                          setCandidate({
                            ...candidate,
                            head_photo: e.target.files[0],
                          })
                        }}
                        className='form-control'
                        type='file'
                        id='file-ketua'
                        accept='.jpg, .png, .jpeg'
                        required
                      />
                      {/* info limit file */}
                      <div className='form-text fst-italic'>
                        *Ukuran file maksimal 2MB
                      </div>
                    </div>
                  </div>
                </div>
                {/* WAKIL KETUA */}
                <h5 className='mt-5 d-flex fw-bold'>
                  <span className='material-symbols-outlined fs-3 d-flex align-items-end me-2'>
                    {" "}
                    <GroupOutlinedIcon />{" "}
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
                          onChange={(e) =>
                            setCandidate({
                              ...candidate,
                              deputy_nim: e.target.value,
                            })
                          }
                          type='text'
                          className='form-control'
                          id='nim-wakil'
                          autoComplete='off'
                          defaultValue={candidate.deputy_nim}
                          required
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
                        <select
                        required
                          defaultValue={candidate.deputy_major}
                          className='form-select'
                          onChange={(e) =>
                            setCandidate({
                              ...candidate,
                              deputy_major: e.target.value,
                            })
                          }>
                          <option value='Pilih Jurusan'>Pilih Jurusan</option>
                          <option value='Diploma I PPK'>Diploma I PPK</option>
                          <option value='Diploma IV Pertanahan'>
                            Diploma IV Pertanahan
                          </option>
                          <option value='Prodiksus PPAT'>Prodiksus PPAT</option>
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
                          onChange={(e) =>
                            setCandidate({
                              ...candidate,
                              deputy_name: e.target.value,
                            })
                          }
                          type='text'
                          className='form-control'
                          id='nama-wakil'
                          autoComplete='off'
                          defaultValue={candidate.deputy_name}
                          required
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
                        onChange={(e) => {
                          validateSize(e)
                          setCandidate({
                            ...candidate,
                            deputy_photo: e.target.files[0],
                          })
                        }}
                        className='form-control'
                        type='file'
                        id='file-wakil'
                        accept='.jpg, .png, .jpeg'
                        required
                      />
                      {/* info limit file */}
                      <div className='form-text fst-italic'>
                        *Ukuran file maksimal 2MB
                      </div>
                    </div>
                    <div className='d-flex justify-content-end gap-3 mt-4'>
                      <button
                        onClick={() => setModalEdit(false)}
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'>
                        Batal
                      </button>
                      <button
                        type='submit'
                        className='btn btn-primary'>
                        Tambah
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          }
        />
        {/* modal hapus calon */}
        <MyVerticallyCenteredModal
          show={modalDelete}
          onHide={() => setModalDelete(false)}
          header={
            <h1 className='modal-title fs-5' id='deleteCandidateModalLabel'>
              Hapus Calon
            </h1>
          }
          body={
            <>
              Apakah anda yakin ingin menghapus pasangan calon "
              <b>{deleteId.name}</b>"?
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

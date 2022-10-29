import React, {useState} from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import {toast, ToastContainer} from "react-toastify"; 

export default function SetNewPass() {
  const [password, setPassword] = useState("");
  const [confirmErr, setConfirmErr] = useState(false);

  const base = process.env.REACT_APP_BASE_URL;

  const validatePassword = (e) => {
    password === e.target.value 
    ? setConfirmErr(false)
    : setConfirmErr(true);
  }

  const updatePassword = (e) => {
    e.preventDefault();
    const Toast = toast.loading("Mohon tunggu...");

    const data = {
      password: password,
    };
    axios
      .put(base + "/set-password", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      })
      .then((res) => {
        toast.update(Toast, {
          render: "Password berhasil diubah!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast.update(Toast, {
            render: "Email tidak ditemukan!",

            type: "error",
            isLoading: false,
            autoClose: 1500,
          });
        } else if (err.response.status === 403) {
          toast.update(Toast, {
            render: "Mohon tunggu 5 menit untuk mengirim ulang kode verifikasi!",
            type: "error",
            isLoading: false,
            autoClose: 1500,
          });
        }
      }).finally(() => {
        localStorage.clear();
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      });
  };

  return (
    <div className='container vh-100 d-flex justify-content-center mt-5'>
      <ToastContainer />
      <div className='col-lg-4 col-10'>
      <Link to='/forgot-password' className='text-secondary fw-semibold text-decoration-none d-flex'>
          <ArrowBackIcon fontSize='medium' /> 
          <span className='d-flex align-items-center me-2'> Kembali</span>
        </Link>
        <hr />
        <div className='text-center mt-5'>
          <h4 className='my-3 fw-bold'>Buat Password Baru</h4>
          <p>Masukkan password baru Anda!</p>
        </div>
        {/* FORM */}
        <form onSubmit={updatePassword}>
          {/* nim */}
          <div className='form-group mt-4'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <div className='input-group'>
              <input
                type='password'
                className='form-control'
                id='password'
                autoComplete='off'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className='form-group mt-3'>
            <label htmlFor='password' className='form-label'>
              Konfirmasi Password
            </label>
            <div className='input-group'>
              <input
                type='password'
                className='form-control'
                id='password-confirm'
                autoComplete='off'
                onChange={validatePassword}
              />
            </div>
            {confirmErr && (<span className="text-danger">Your password doesn't match</span>) }
          </div>
          {/* submit */}
          <input
            type='submit'
            className='btn btn-primary btn-submit mt-4 w-100 rounded-5 py-2 fw-semibold'
            id='simpan'
            defaultValue='Buat Password'
          />
        </form>
      </div>
    </div>
  );
}

import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import logoStpn from '../assets/images/stpn-logo.png'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Alert } from 'react-bootstrap';
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

export default function Login() {
  const [error, setError] = useState(false);
  const base = process.env.REACT_APP_BASE_URL;  

  const getDetail = async () => {
    const token = localStorage.getItem('token');
     token && await axios.get(base + '/detail', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      if(res.data.status === 'success' && res.data.data.role === 'admin')
      {
        window.location.href = '/dashboard'
      } else {
        window.location.href = '/'
      }
    }).catch(err => {
      console.log(err)
    })
  }

  
  useEffect(() => {
    document.title = 'Login'
    getDetail()
    const nim = document.querySelector("#nim");
    nim.focus();
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nim = document.querySelector("#nim");
    const password = document.querySelector("#password");
    const btnSubmit = document.querySelector(".btn-submit");
    btnSubmit.innerHTML = "Loading...";
    btnSubmit.disabled = true;


    await axios.post(base + '/login', {
      nim: nim.value,
      password: password.value
    }, {
      WithCredentials: true
    })
    .then(res => {
      if (res.data.status === 'success') {
        localStorage.setItem('token', res.data.data.token);
        toast.success('Login Berhasil!', {
          position: "top-center"
        })
        setTimeout(() => {
          if(res.data.data.role === 'admin'){
            window.location.href = "/dashboard";
          } else {
            window.location.href = "/";
          }
        }, 1500);

      } else {
        alert(res.data.message)
      }
    })
    .catch(err => {
      setError(true)
      toast.error('Login Gagal!', {
        position: "top-center",
      })
    })
    .finally(() => {
      btnSubmit.innerHTML = "Login";
      btnSubmit.disabled = false;
      
    })
  }

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
    <ToastContainer />
        <div>
          <div className="text-center">
            <img src={logoStpn} alt="logo__stpn" height={173} width="auto" />
            <h4 className="my-3 fw-bold">LOGIN<br />EVOTE STPN 2022/2023</h4>
          </div>
          {/* FORM */}
          <form onSubmit={handleSubmit} method="POST">
            {/* nim */}
            <div className="form-group mt-4">
              <label htmlFor="nim" className="form-label">NIM</label>
              <div className="input-group">
                <span className="input-group-text material-icons fs-6 d-flex align-items-center text-muted">
                  <PersonIcon fontSize='small'/>
                </span>
                <input type="text" className="form-control" id="nim" autoComplete="off" required={true}/>
              </div>
            </div>
            {/* password */}
            <div className="form-group mt-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text material-icons fs-6 d-flex align-items-center text-muted">
                  <LockIcon fontSize="small"/>
                </span>
                <input type="password" className="form-control" id="password" autoComplete="off" required={true}/>
              </div>
              <div className="d-flex justify-content-end">
                <Link to="/forgot-password" className="mt-1 text-decoration-none text-muted">Lupa Password?</Link>
              </div>
            </div>
            {/* submit & daftar */}
            <input type="submit" className="btn btn-primary btn-submit mt-4 w-100 rounded-5 py-2 fw-semibold" defaultValue="LOGIN" />
            <p className="mt-3 text-center">Belum punya akun? 
              <Link to="/regist" className="text-decoration-underline text-primary fw-semibold"> Daftar sekarang</Link>
            </p>
          </form>
        </div>
      </div>
  )
}

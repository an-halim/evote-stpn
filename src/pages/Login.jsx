import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import logoStpn from '../assets/images/stpn-logo.png'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import {Cookies} from 'react-cookie';
import { toast } from 'react-toastify';

export default function Login() {
  const cookies = new Cookies();
  const base = process.env.REACT_APP_BASE_URL;  
  const getDetail = () => {
    const token = localStorage.getItem('token');
    const cok = cookies.get('token');
    console.log(cok)

    axios
    .get(base + '/detail', {
      WithCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((res) => {
      console.log(res.data);
      if(res.data.status === 'success' && res.data.data.role === 'admin')
      {
        window.location.href = '/dashboard'
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  useEffect(() => {
    document.title = 'Login'
    getDetail()
    const nim = document.querySelector("#nim");
    const btnSubmit = document.querySelector(".btn-submit");

      nim.focus();
      // btnSubmit.addEventListener("click", function (e) {
      //   e.preventDefault();
      //   if (nim.value === "admin") window.location.href = "/admin/index.html";
      //   else window.location.href = "/";
      // });
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const nim = document.querySelector("#nim");
    const password = document.querySelector("#password");
    const btnSubmit = document.querySelector(".btn-submit");
    btnSubmit.innerHTML = "Loading...";
    btnSubmit.disabled = true;
    axios.post(base + '/login', {
      nim: nim.value,
      password: password.value
    })
    .then(res => {
      console.log(res.data)
      if (res.data.status === 'success') {
        if(res.data.data.role == 'admin'){
          window.location.href = "/dashboard";
        }
        localStorage.setItem('token', res.data.data.token)
      } else {
        alert(res.data.message)
      }
    })
    .catch(err => {
      console.log(err)
      toast.error(JSON.stringify(err.response.data.errors), {
        position: toast.POSITION.TOP_CENTER
      })
    })
    .finally(() => {
      btnSubmit.innerHTML = "Login";
      btnSubmit.disabled = false;
    })
  }

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
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
              <Link to="/forgot-password" className="btn-lupa d-block text-end mt-1 text-decoration-none text-muted">Lupa Password?</Link>
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

import React, {useState, useEffect} from "react";
import logoStpn from "../assets/images/stpn-logo.png";
import axios from "axios";
import {Link} from "react-router-dom";
import './index.css'
import { toast, ToastContainer } from "react-toastify";



export default function Regist() {
  const base = process.env.REACT_APP_BASE_URL;

  const [confirmErr, setConfirmErr] = useState(false);
  const [data , setData] = useState({
    nim: "",
    name: "",
    major: "",
    email: "",
    password: "",
  });
  
  useEffect(() => {
    document.title = 'Register'
    const nim = document.querySelector("#nim");
    nim.focus();
  }, []);

  const validatePassword = (e) => {
    data.password === e.target.value 
    ? setConfirmErr(false)
    : setConfirmErr(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(base + "/regist", data)
      .then((res) => {
        if(res.status === 201){
          window.location.href = "/regist-success";
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast.error(err.response.data.err);
        }
        if (err.response.status === 403) {
          toast.error(err.response.data.errors[0])
        }
        if(err.response.status > 500){
          toast.error('An error occured, please try again later')
        }
      });
  };


  return (
    <div className='container py-5 d-flex justify-content-center align-items-center'>
      <ToastContainer />
      <div>
        <div className='form__header text-center d-flex align-items-center'>
          <img
            src={logoStpn}
            alt='logo__stpn'
            height={95}
            width='auto'
          />
          <h4 className='mt-3 ms-3 fw-bold'>
            DAFTAR EVOTE <br />
            STPN 2022/2023
          </h4>
        </div>
        {/* FORM */}
        <form onSubmit={handleSubmit} method="post">
          {/* nim */}
          <div className='form-group mt-3'>
            <label htmlFor='nim' className='form-label mt-3'>
              NIM
            </label>
            <div className='input-group'>
              <input
                type='text'
                className='form-control'
                id='nim'
                autoComplete='off'
                onChange={(e) => setData({...data, nim: e.target.value})}
                required={true}
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
                onChange={(e) => setData({...data, name: e.target.value})}
                required={true}
              />
            </div>
          </div>
          {/* jurusan */}
          <div className='form-group mt-3'>
            <label htmlFor='jurusan' className='form-label'>
              Jurusan
            </label>
            <div className='input-group'>
              <select
                className='form-select'
                aria-label='Default select example'
                onChange={(e) => setData({...data, major: e.target.value})}>  
                
                <option value='Pilih jurusan'>
                  Pilih jurusan
                </option>
                <option value='Diploma I PPK'>
                  Diploma I PPK
                </option>
                <option value='Diploma IV Pertanahan'>
                  Diploma IV Pertanahan
                </option>
                <option value='Prodiksus PPAT'>Prodiksus PPAT</option>
              </select>
            </div>
          </div>
          {/* email */}
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
                onChange={(e) => setData({...data, email: e.target.value})}
                required={true}
              />
            </div>
          </div>
          {/* password */}
          <div className='form-group mt-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <div className='input-group'>
              <input
                type='password'
                className='form-control'
                id='password'
                autoComplete='off'
                pattern=".{8,}" title="Eight or more characters"
                onChange={(e) => setData({...data, password: e.target.value})}
                required={true}
              />
            </div>
          </div>
          {/* konfirmasi password */}
          <div className='form-group mt-3'>
            <label htmlFor='password-confirm' className='form-label'>
              Konfirmasi Password
            </label>
            <div className='input-group'>
              <input
                type='password'
                className='form-control'
                id='password-confirm'
                pattern=".{8,}" title="Eight or more characters"
                autoComplete='off'
                required={true}
                onChange={validatePassword}
              />
            </div>
              {confirmErr && (<span className="text-danger">Your password doesn't match</span>) }
          </div>
          {/* buttons */}
          <input
            type='submit'
            className={
              confirmErr 
              ? 'btn btn-primary btn-submit mt-5 py-2 w-100 rounded-5 fw-semibold disabled'
              : 'btn btn-primary btn-submit mt-5 py-2 w-100 rounded-5 fw-semibold'
            }
            defaultValue='DAFTAR'
          />
          <Link to='/login'>
            <div className='btn btn-light mt-3 py-2 w-100 rounded-5 fw-semibold'>
              BATAL
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
}

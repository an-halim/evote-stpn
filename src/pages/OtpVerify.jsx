import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export default function OtpVerify() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const base = process.env.REACT_APP_BASE_URL;

  const { email: emailParam } = useParams();
  useEffect(() => {
    setEmail(emailParam);
  }, [emailParam]);

  console.log(email);

  const resendOtp = (e) => {
    e.preventDefault();
    const data = {
      email: email,
    };
    axios
      .post(base + "/forgot", data)
      .then((res) => {
        alert(JSON.stringify(res.data.data));
      })
      .catch((err) => {
        if (err.response.status === 404) {
          alert(err.response.data.errors);
        }
        if (err.response.status === 403) {
          alert(err.response.data.errors);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      otp: otp,
    };
    axios
      .post(base + "/verify", data)
      .then((res) => {
        alert(JSON.stringify(res.data.data));
        localStorage.setItem('token', res.data.data.token)
        window.location.href = "/set-new-password";
      })
      .catch((err) => {
        if (err.response.status === 404) {
          alert(err.response.data.errors);
        }
        if (err.response.status === 403) {
          alert(err.response.data.errors);
        }
      });
  };

  return (
    <div className='container vh-100 d-flex justify-content-center mt-5'>
      <div className='col-lg-4 col-10'>
        <Link
          to='/forgot-password'
          className='text-secondary fw-semibold text-decoration-none d-flex'>
          <ArrowBackIcon fontSize='medium' />
          <span className='d-flex align-items-center me-2'>Kembali</span>
        </Link>
        <hr />
        <div className='text-center mt-5'>
          <h4 className='my-3 fw-bold'>Verifikasi Email</h4>
          <p>Kami telah mengirimkan kode verifikasi ke alamat email Anda.</p>
        </div>
        {/* FORM */}
        <form onSubmit={handleSubmit} method='POST'>
          {/* nim */}
          <div className='form-group mt-4'>
            <label htmlFor='otp' className='form-label'>
              Masukkan OTP
            </label>
            <div className='input-group'>
              <input
                type='text'
                className='form-control'
                id='otp'
                autoComplete='off'
                placeholder='00000'
                pattern="^[0-9]*$"
                maxLength={6}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          </div>
          {/* submit & resend OTP */}
          <input
            type='submit'
            className='btn btn-primary btn-submit mt-4 w-100 rounded-5 py-2 fw-semibold'
            id='verif'
            defaultValue='Verifikasi'
            
          />

          <button
            onClick={resendOtp}
            className='d-block mt-3 text-center text-muted btn mt-4 w-100 rounded-5 py-2 text-decoration-underline'>
            Resend OTP
          </button>
        </form>
      </div>
    </div>
  );
}

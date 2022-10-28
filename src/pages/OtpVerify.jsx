import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function OtpVerify() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const base = process.env.REACT_APP_BASE_URL;

  const { email: emailParam } = useParams();
  useEffect(() => {
    setEmail(emailParam);
  }, [emailParam]);

  const resendOtp = (e) => {
    const Toast = toast.loading("Mohon tunggu...");

    const data = {
      email: email,
    };
    axios
      .post(base + "/forgot", data)
      .then((res) => {
        toast.update(Toast, {
          render: "Kode verifikasi berhasil dikirim!",
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
            render: "Mohon tunggu 10 menit untuk mengirim ulang kode verifikasi!",
            type: "error",
            isLoading: false,
            autoClose: 1500,
          });
        }
      }).finally(() => {
        setLoading(false);
      });
        
  };

  const handleSubmit = (e) => {
    setLoading(true);

    e.preventDefault();
    const data = {
      email: email,
      otp: otp,
    };
    axios
      .post(base + "/verify", data)
      .then((res) => {
        localStorage.setItem('token', res.data.data.token)
        toast.success("Kode verifikasi berhasil!");
        
        setInterval(() => {
          window.location.href = "/set-new-password";
        }, 1500);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast.error("Periksa kembali kode verifikasi!");
        }
        if (err.response.status === 422) {
          toast.error("Periksa kembali kode verifikasi!");
        }
        if (err.response.status === 403) {
          toast.error("Kode verifikasi telah kadaluarsa!");
        }
      });
    setLoading(false);
  };

  return (
    <div className='container vh-100 d-flex justify-content-center mt-5'>
    <ToastContainer />
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
                required
              />
            </div>
          </div>
          {/* submit & resend OTP */}
          <input
            type='submit'
            className={
              loading ? 'btn btn-primary btn-submit mt-4 w-100 rounded-5 py-2 fw-semibold disabled' 
              : 'btn btn-primary btn-submit mt-4 w-100 rounded-5 py-2 fw-semibold'
            }
            id='verif'
            defaultValue='Verifikasi'
            
          />

        </form>
          <button
            onClick={() => {
              resendOtp();
              setLoading(true);
            }}
            className={
              loading ? 'd-block mt-3 text-center text-muted btn mt-4 w-100 rounded-5 py-2 text-decoration-underline disabled' 
              : 'd-block mt-3 text-center text-muted btn mt-4 w-100 rounded-5 py-2 text-decoration-underline'
            }>
            Resend OTP
          </button>
      </div>
    </div>
  );
}

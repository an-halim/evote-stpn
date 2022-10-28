import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Forgot() {
  document.title = "Forgot Password";
  const base = process.env.REACT_APP_BASE_URL;

  const [loading, setLoading] = React.useState(false);
  const handleSubmit = (e) => {
    try {
      const Toast = toast.loading("Mohon tunggu...");

      e.preventDefault();
      setLoading(true);
      const email = e.target.email.value;
      const data = {
        email: email,
      };
      axios
        .post(base + "/forgot", data)
        .then((res) => {
          setLoading(false);
          toast.update(Toast, {
            render: "Kode verifikasi berhasil dikirim!",
            type: "success",
            isLoading: false,
            autoClose: 1500,
          });
          setTimeout(() => {
            window.location.href = "/otp-verify/" + email;
          }, 2000);
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
          setLoading(false);
          
        });
    } catch (err) {
      setLoading(false);
      toast.error("Terjadi kesalahan!");
    }
  };

  return (
    <div className='container vh-100 d-flex justify-content-center mt-5'>
      <ToastContainer />
      <div className='col-lg-4 col-10'>
        <Link
          to='/login'
          className='text-secondary fw-semibold text-decoration-none d-flex'>
          <ArrowBackIcon fontSize='medium' />
          <span className='d-flex align-items-center me-2'>Kembali</span>
        </Link>
        <hr />
        <div className='text-center mt-5'>
          <h4 className='my-3 fw-bold'>Lupa Password Anda?</h4>
          <p>
            Masukkan alamat email yang terhubung dengan akun anda dan kami akan
            mengirimkan kode OTP untuk mengatur ulang kata sandi Anda!
          </p>
        </div>
        {/* FORM */}
        <form onSubmit={handleSubmit}>
          {/* nim */}
          <div className='form-group mt-4'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <div className='input-group'>
              <span className='input-group-text material-icons fs-6 d-flex align-items-center text-muted'>
                <EmailIcon fontSize='small' />
              </span>
              <input
                type='email'
                className='form-control'
                id='email'
                autoComplete='off'
                placeholder='Masukkan Alamat Email...'
                required={true}
              />
            </div>
          </div>
          {/* submit */}
          <input
            type='submit'
            className={
              loading
                ? "btn btn-primary btn-submit mt-4 w-100 rounded-5 py-2 fw-semibold disabled"
                : "btn btn-primary btn-submit mt-4 w-100 rounded-5 py-2 fw-semibold"
            }
            id='reset'
            defaultValue='Kirim OTP'
          />
        </form>
      </div>
    </div>
  );
}

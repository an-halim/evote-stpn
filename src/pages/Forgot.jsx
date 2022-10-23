import React from "react";
import { Link} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
  


export default function Forgot() {
  document.title = "Forgot Password";
  const base = process.env.REACT_APP_BASE_URL;

  const [loading, setLoading] = React.useState(false);
  const handleSubmit = (e) => {
    try{
      e.preventDefault();
      setLoading(true);
      const email = e.target.email.value;
      const data = {
        email: email,
      };
      axios
        .post(base + "/forgot", data)
        .then((res) => {
          alert(JSON.stringify(res.data));
          setLoading(false);
          toast.success("Success Notification !", {
            position: toast.POSITION.TOP_CENTER
          });
          window.location.href = "/otp-verify/" + email;
        })
        .catch((err) => {
          if (err.response.status === 404) {
            alert(err.response.data.errors);
          }
          if(err.response.status === 403) {
            alert(err.response.data.errors);
          }
          setLoading(false);
          toast.error("Error Notification !", {
            position: toast.POSITION.TOP_CENTER
          });

        });
    } catch(err) {
      setLoading(false);
      toast.error(err, {
        position: toast.POSITION.TOP_CENTER
      })
    }
  };


  return (
    <div className='container vh-100 d-flex justify-content-center mt-5'>
      <ToastContainer />
      <div className='col-lg-4 col-10'>
        <Link to='/login' className='text-secondary fw-semibold text-decoration-none d-flex'>
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

import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function RegistSuccess() {
  return (
    <div className='container vh-100 d-flex justify-content-center mt-5'>
      <div className='col-lg-4 col-10'>
      <Link to='/forgot-password' className='text-secondary fw-semibold text-decoration-none d-flex'>
          <ArrowBackIcon fontSize='medium' /> 
          <span className='d-flex align-items-center me-2'> Kembali</span>
        </Link>
        <hr />
        <div className='text-center mt-5'>
          <h4 className='my-3 fw-bold text-success'>Pendaftaran Berhasil!</h4>
          <p>
            Terima kasih telah mendaftar! Akun anda akan dicek terlebih dahulu
            oleh admin kami. Mohon cek email anda untuk melihat informasi lebih
            lanjut, terutama bagian <b>spam</b>.
          </p>
          <Link to='/login' className='btn btn-light mt-2 py-2 px-4 rounded-5 fw-semibold'>            
            RETURN TO HOMEPAGE
          </Link>
        </div>
      </div>
    </div>
  );
}

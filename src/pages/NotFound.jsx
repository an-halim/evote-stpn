import React from 'react'
import { Link } from 'react-router-dom'
import notFoundImg from '../assets/images/404.svg'

export default function NotFound() {
  return (
    <>
      <section>
        <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
          <img src={notFoundImg} alt="404-Not-Found" className="img-fluid" width={500} />
          <h4 className="fw-bold">404</h4>
          <p>Halaman yang anda cari tidak dapat ditemukan :(<br />Kami sarankan untuk kembali ke halaman awal</p>
          <Link className="btn btn-primary mt-2 py-2 px-4 rounded-5 fw-semibold" to={"/"}>RETURN TO HOMEPAGE</Link>
        </div>
      </section>
    </>
  )
}

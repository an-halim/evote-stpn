import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoStpn from "../assets/images/stpn-logo.png";
import logoDpt from "../assets/images/logo_dpt.png";
import logoPPU from "../assets/images/logo_ppu.png";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

export default function Login() {
  const [user, setUser] = useState({
    nim: "",
    password: "",
  });

  const base = process.env.REACT_APP_BASE_URL;

  const getDetail = async () => {
    const token = localStorage.getItem("token");
    token &&
      (await axios
        .get(base + "/detail", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.status === "success" && res.data.data.role === "admin") {
            window.location.href = "/dashboard";
          } else {
            window.location.href = "/";
          }
        })
        .catch((err) => {
          console.log(err);
        }));
  };

  useEffect(() => {
    document.title = "Login | EVOTE BST STPN";
    getDetail();
    const nit = document.querySelector("#nit");
    nit.focus();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        base + "/login",
        {
          nim: user.nim,
          password: user.password,
        },
        {
          WithCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          localStorage.setItem("token", res.data.data.token);
          toast.success("Login Berhasil!", {
            position: "top-center",
          });
          setTimeout(() => {
            if (res.data.data.role === "admin") {
              window.location.href = "/dashboard";
            } else {
              window.location.href = "/";
            }
          }, 1500);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Login Gagal!", {
          position: "top-center",
        });
      })
  };

  return (
    <div className='container vh-100 d-flex flex-column justify-content-center align-items-center'>
      <ToastContainer />
      <div className='logo text-center mb-3'>
        <img
          src={logoDpt}
          alt='logo dpt'
          height={80}
          width='auto'
          className='mx-1'
        />
        <img
          src={logoPPU}
          alt='logo ppu'
          height={80}
          width='auto'
          className='mx-1'
        />
        <img
          src={logoStpn}
          alt='logo__stpn'
          height={70}
          width='auto'
          className='mx-1'
        />
      </div>
      <div>
        <div className='text-center'>
          <h4 className='my-3 fw-bold'>
            LOGIN EVOTE
            <br />
            BST STPN {
              new Date().getFullYear() + "/" + (new Date().getFullYear() + 1)
            }
          </h4>
        </div>
        {/* FORM */}
        <form onSubmit={handleSubmit} method='POST'>
          {/* nit */}
          <div className='form-group mt-4'>
            <label htmlFor='nit' className='form-label'>
              NIT
            </label>
            <div className='input-group'>
              <span className='input-group-text material-icons fs-6 d-flex align-items-center text-muted'>
                <PersonIcon fontSize='small' />
              </span>
              <input
                onChange={(e) => setUser({ ...user, nim: e.target.value })}
                type='text'
                className='form-control'
                id='nit'
                autoComplete='off'
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
              <span className='input-group-text material-icons fs-6 d-flex align-items-center text-muted'>
                <LockIcon fontSize='small' />
              </span>
              <input
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type='password'
                className='form-control'
                id='password'
                autoComplete='off'
                required={true}
              />
            </div>
            <div className='d-flex justify-content-end'>
              <Link
                to='/forgot-password'
                className='mt-1 text-decoration-none text-muted'>
                Lupa Password?
              </Link>
            </div>
          </div>
          {/* submit & daftar */}
          <input
            type='submit'
            className='btn btn-primary btn-submit mt-4 w-100 rounded-5 py-2 fw-semibold'
            defaultValue='LOGIN'
          />
          <p className='mt-3 text-center'>
            Belum punya akun?
            <Link
              to='/regist'
              className='text-decoration-underline text-primary fw-semibold'>
              {" "}
              Daftar sekarang
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

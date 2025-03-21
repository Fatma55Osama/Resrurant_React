import React, { useEffect, useRef } from 'react'
import styles from './index.module.css'
import './index.scss'
import { FaBriefcase } from 'react-icons/fa';
import img1 from '../../assets/imgs/3984392.jpg'
import img2 from '../../assets/imgs/career-progress-concept-illustration_114360-3348.avif'
import img3 from '../../assets/imgs/payment-information-concept-illustration_114360-4064.jpg'
import facebook from '../../assets/imgs/facebook.png'
import google from '../../assets/imgs/search.png'
import { useCategories } from '../Store';
import { index_users } from '../../API/index_users';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const phoneInput = useRef()
  const passworInput = useRef()
  const { domain } = useCategories()
  const navigate =useNavigate()
  const handeleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    index_users(domain, phoneInput, passworInput).then((res) => {
      if (res.length === 1) {
        Swal.fire({
          icon: "success",
          text: "Login Sucessfully"
        })
        let userInfo = res[0]
        let userData ={
          user_name:userInfo.user_name,
          user_role:userInfo.user_role,
          user_id:userInfo.documentId
        }
        sessionStorage.setItem("userInfo",JSON.stringify(userData))
        navigate('/')
      } else {
        Swal.fire({
          icon: "error",
          text: "Login Faild"
        })
      }
    })
  };


  return (
    <div className="col-12 h-100">
      <div className="col-12 h-100 d-flex" id="all">
        {/* Left section */}
        <div id="sec1" className="col-6 h-100">
          <div className="col-12 d-flex align-items-center justify-content-center">
            <FaBriefcase className={styles.icon} />
            <h2 className="ps-3 pt-3">SmartPOS</h2>
          </div>

          <div id="carouselExampleRide" className="carousel slide camel" data-bs-ride="true">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={img1} className="d-block w-75" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={img2} className="d-block w-75" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={img3} className="d-block w-75" alt="..." />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          <div id="acer" className="d-flex justify-content-center align-items-center align-content-center">
            <h4>Manage sales, inventory <br /> and other transactions</h4>
          </div>
        </div>

        {/* Right section */}
        <div id="aboiform" className="col-11 col-md-6 h-100">
          <div className="iconimg d-flex d-md-none ps-0 pb-5 me-5 col-12 d-flex h-25">
            <img className="ps-5 pt-2" src="./photo/Screenshot (30).png" width="75px" height="50px" alt="" />
            <h2 className="ps-3 pt-3 fs-3">SmartPOS</h2>
          </div>

          <div id="iform" className="col-12 col-md-9 bg-white container">
            <h3 id="text1">Welcome Back!</h3>
            <span>Please, sign in to continue</span>

            <form onSubmit={handeleLogin} className="inputs col-12">
              <ToastContainer position="top-center" autoClose={3000} />
              <input ref={phoneInput} className="" id="inp1" type="number" placeholder="Enter Your Phone" />
              <input ref={passworInput} id="inp2" type="password" placeholder=" Enter Your Password" />
              <button id="btn1" type="submit">Sign in</button>
            </form>

            <h4 id="text2">Or</h4>
            <div id="btones" className="mb-4 d-flex justify-content-between">
              <button id="btn2">
                <a href="https://www.Google.com/" target="_blank" rel="noopener noreferrer">
                  <img className="px-2" src={google} width="40px" height="30px" alt="" /> Sign up with Google
                </a>
              </button>
              <button id="btn3">
                <a href="https://www.Facebook.com/" target="_blank" rel="noopener noreferrer">
                  <img className="px-2" src={facebook} width="40px" height="30px" alt="" /> Sign up with Facebook
                </a>
              </button>
            </div>

            <div id="ancer" className="col-12 col-md-11 col-lg-10 d-flex flex-column align-items-center justify-content-center">
              <a className="mb-3" href="">Forgot password?</a>
              <span>Don't have an account? <a href="./register.html">Go to Registration</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

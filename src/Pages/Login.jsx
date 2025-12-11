import React from 'react'
import Logos from '/short_logo.png'
import { Link } from 'react-router-dom'
const Login = () => {
  return (
    <>
        <section class="main">
        <div class="container">
            <div class="col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 text-center">
                <form class="rounded shadow bg-white p-5 my-5">
                    <img src="<Logos/>" alt="logo"/>
                    <h3 class="text-derk fw-bolder fs-4 mb-2 mt-2">sing in to A-Foods</h3>
                    <div class="fw-normal text-muted mb-4">
                        New Here ? <a href="create-account-from.html" class="text-primary fw-bold text-decoration-none">Create an Account</a>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingInput" required placeholder="name@example.com"/>
                        <label htmlFor="floatingInput">Phone Number</label>
                      </div>
                      <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" required placeholder="Password"/>
                        <label htmlFor="floatingPassword">Password</label>
                      </div>
                      <div class="mt-2 text-end">
                        <Link href="forget-password.html" class="text-primary fw-bold text-decoration-none">Forget Password ?</Link>
                      </div>
                      <button type="submit" class="btn btn-primary  submit-btn lob w-100 my-4">Continue</button>
                      
                </form>
            </div>
        </div>
    </section> 
    </>
  )
}

export default Login

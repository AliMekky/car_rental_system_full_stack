import React from "react";
import "./Login.css";
import Navbar from "../../components/navbar/Navbar";

function Login() {
  return (
    <div>
      <Navbar />
      {/* <div class = "form">
        <div  class = "form-title"><div>Login</div></div>
      </div> */}
      {/* <div class="vh-100" > */}
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong">
              <div class="card-body p-5 text-center">
                <h3 class="mb-5">Login</h3>

                <div class="form-outline mb-4">
                  {/* <label class="form-label" for="typeEmailX-2">Email</label> */}
                  <input
                    type="email"
                    id="typeEmailX-2"
                    class="form-control form-control-lg"
                    placeholder="Email"
                  />
                </div>

                <div class="form-outline mb-4">
                  {/* <label class="form-label" for="typePasswordX-2">Password</label> */}
                  <input
                    type="password"
                    id="typePasswordX-2"
                    class="form-control form-control-lg"
                    placeholder="Password"
                  />
                </div>

                <button
                  class="btn btn-primary btn-lg btn-block btn-disp"
                  style={{ width: "7rem" }}
                  type="submit"
                >
                  Continue
                </button>
                <hr />
                <p class="footer p-disp">
                  New member? Sign up <a href="/Signup">Here</a>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Login;

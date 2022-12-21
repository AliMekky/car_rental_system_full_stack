import React from 'react'
import './Signup.css';
import Navbar from "../../components/navbar/Navbar";

function Signup() {
    return (
      <div>
        <Navbar/>
              <div class="container py-5 h-100">
                  <div class="row d-flex justify-content-center align-items-center h-100">
                  <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                      <div class="card shadow-2-strong" >
                      <div class="card-body p-5 text-center">
  
                          <h3 class="mb-5">Sign up</h3>
                          <br />
                          <h5 class="mb-5">Enter your personal information</h5>
                        
                          <div class="container"> 
                          
                                <div class="row">
                                    <div class="col">
                                         <div class="form-outline mb-4">
                                            <input type="text" id="typeEmailX-2" class="form-control form-control-lg" placeholder='Name'/>
                                        </div>
                                    </div>

                                    <div class="col">
                                        <div class="form-outline mb-4">
                                             <input type="number" id="typePasswordX-2" class="form-control form-control-lg" placeholder='Phone Number'/>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="form-outline mb-4">
                                            <input type="email" id="typeEmailX-2" class="form-control form-control-lg" placeholder='Email'/>
                                         </div>
                                    </div>

                                    <div class="col">
                                     <div class="form-outline mb-4">
                                         <input type="password" id="typePasswordX-2" class="form-control form-control-lg" placeholder='Password'/>
                                     </div>
                                    </div>
                                    
                                </div>
                          </div>


                    
                          <button class="btn btn-primary btn-lg btn-block btn-disp" style = {{width : "7rem"}} type="submit">Continue</button>
                          <hr/>
                          <p class="footer p-disp">New member? Sign up <a>Here</a> </p>
  
                      </div>
                      </div>
                  </div>
                  </div>
              </div>
          
      </div>
    )
  }
  
  export default Signup;
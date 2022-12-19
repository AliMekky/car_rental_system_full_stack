import React from 'react'
import './AddCar.css';
import Navbar from "../../components/navbar/Navbar";

function AddCar() {
    return (
      <div>
        <Navbar/>
              <div class="container py-5 h-100">
                  <div class="row d-flex justify-content-center align-items-center h-100">
                  <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                      <div class="card shadow-2-strong" >
                      <div class="card-body p-5 text-center">
  
                          <h3 class="mb-5">Add Car</h3>
                          <br />
                          <h5 class="mb-5">Enter Valid Information</h5>
                        
                          <div class="container"> 
                          
                                <div class="row">
                                    <div class="col">
                                         <div class="form-outline mb-4">
                                            <input type="text" id="typeEmailX-2" class="form-control form-control-lg" placeholder='Plate ID'/>
                                        </div>
                                    </div>

                                    <div class="col">
                                        <div class="form-outline mb-4">
                                             <input type="text" id="typePasswordX-2" class="form-control form-control-lg" placeholder='Manufacturer'/>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="form-outline mb-4">
                                            <input type="text" id="typeEmailX-2" class="form-control form-control-lg" placeholder='Model'/>
                                         </div>
                                    </div>

                                    <div class="col">
                                     <div class="form-outline mb-4">
                                         <input type="number" id="typePasswordX-2" class="form-control form-control-lg" placeholder='Year'/>
                                     </div>
                                    </div>
                                    
                                </div>

                                <div class="row">
                                    <div class="col">
                                        <div class="form-outline mb-4">
                                            <input type="number" id="typeEmailX-2" class="form-control form-control-lg" placeholder='Price'/>
                                         </div>
                                    </div>

                                    <div class="col">
                                     <div class="form-outline mb-4">
                                         <input type="text" id="typePasswordX-2" class="form-control form-control-lg" placeholder='Type'/>
                                     </div>
                                    </div>
                                    
                                </div>

                                <div class="row">
                                    <div class="col">
                                        <div class="form-outline mb-4">
                                            <input type="text" id="typeEmailX-2" class="form-control form-control-lg" placeholder='Capacity'/>
                                         </div>
                                    </div>

                                    <div class="col">
                                     <div class="form-outline mb-4">
                                         <input type="text" id="typePasswordX-2" class="form-control form-control-lg" placeholder='Color'/>
                                     </div>
                                    </div>
                                    
                                </div>

                                <div class="row">
                                    <div class="col">
                                        <div class="form-outline mb-4">
                                            <input type="number" id="typeEmailX-2" class="form-control form-control-lg" placeholder='Office ID'/>
                                         </div>
                                    </div>

                                    <div class="col">
                                     <div class="form-outline mb-4">
                                         <input type="url" id="typePasswordX-2" class="form-control form-control-lg" placeholder='Car Image'/>
                                     </div>
                                    </div>
                                </div>
                          </div>


                          <button class="btn btn-primary btn-lg btn-block" type="submit">Continue</button>
    
  
                      </div>
                      </div>
                  </div>
                  </div>
              </div>
          
      </div>
    )
  }
  
  export default AddCar;
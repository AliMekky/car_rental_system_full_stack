import React from 'react'
import './UpdateStatus.css';
import "../Admin/Admin.css";

function UpdateStatus(props) {
  return (
    <div className="popup">


      <div class="container py-5 ">
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong card-edit" >
              <div class="card-header back-image ">
                <button type="button" class="btn-close d-flex justify-content-end " aria-label="Close" onClick={props.close}></button>
                <h4 className="d-flex justify-content-start ">
                  Update Satatus of a car
                </h4>
              </div>
              <div class="card-body p-4 text-center">



                <div class="form-outline mb-4">
                  {/* <label class="form-label" for="typeEmailX-2">Email</label> */}
                  <input type="email" id="typeEmailX-2" class="form-control form-control-lg" placeholder='Plate ID' />
                </div>

                <div class="form-outline mb-4">
                  {/* <label class="form-label" for="typePasswordX-2">Password</label> */}
                  <input type="password" id="typePasswordX-2" class="form-control form-control-lg" placeholder='New Status' />
                </div>


                <div class=" d-flex justify-content-end ">

                  <button class="btn btn-primary btn-size btn-lg btn-block" type="submit">Update</button>

                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}

export default UpdateStatus;


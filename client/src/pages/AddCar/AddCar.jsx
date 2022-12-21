import React from 'react'
import './AddCar.css';
import "../Admin/Admin.css";

function AddCar(props) {
    return (
        <div className='popup'>
            <div class="container py-5">
                <div class="row d-flex justify-content-center align-items-center ">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="card shadow-2-strong card-edit" >
                            <div class="card-header back-image ">
                                <button type="button" class="btn-close d-flex justify-content-end " aria-label="Close" onClick={props.close}></button>
                                <h4 className="d-flex justify-content-start ">
                                    Add a new car
                                </h4>
                            </div>
                            <div class="card-body p-4 text-center">



                                <div class="container">

                                    <div class="row">
                                        <div class="col">
                                            <div class="form-outline mb-4">
                                                <input type="text" id="typeEmailX-2" class="form-control form-control-lg" placeholder='Plate ID' />
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="form-outline mb-4">
                                                <input type="text" id="typePasswordX-2" class="form-control form-control-lg" placeholder='Manufacturer' />
                                            </div>
                                        </div>

                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-outline mb-4">
                                                <input type="text" id="typeEmailX-2" class="form-control form-control-lg" placeholder='Model' />
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="form-outline mb-4">
                                                <input type="number" id="typePasswordX-2" class="form-control form-control-lg" placeholder='Year' />
                                            </div>
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="col">
                                            <div class="form-outline mb-4">
                                                <input type="number" id="typeEmailX-2" class="form-control form-control-lg" placeholder='Price' />
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="form-outline mb-4">
                                                <input type="text" id="typePasswordX-2" class="form-control form-control-lg" placeholder='Type' />
                                            </div>
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="col">
                                            <div class="form-outline mb-4">
                                                <input type="text" id="typeEmailX-2" class="form-control form-control-lg" placeholder='Capacity' />
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="form-outline mb-4">
                                                <input type="text" id="typePasswordX-2" class="form-control form-control-lg" placeholder='Color' />
                                            </div>
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="col">
                                            <div class="form-outline mb-4">
                                                <input type="number" id="typeEmailX-2" class="form-control form-control-lg" placeholder='Office ID' />
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="form-outline mb-4">
                                                <input type="url" id="typePasswordX-2" class="form-control form-control-lg" placeholder='Car Image' />
                                            </div>
                                        </div>
                                    </div>


                                    <div class=" d-flex justify-content-end ">

                                        <button class="btn btn-primary btn-size btn-lg btn-block" type="submit" style={{"width":"30%"}}>Continue</button>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddCar;
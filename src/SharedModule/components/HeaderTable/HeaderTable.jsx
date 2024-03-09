import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function HeaderTable({ Title, ButtonTitle, ButtonFunction }) {
    
    return <>

        <div className="title-info   d-flex flex-wrap  justify-content-sm-between justify-content-center   my-4   ">
            <div className='position-relative  me-2 mb-sm-0 mb-4'>
                <h4 className='text-center mb-sm-0 mb-4'>{Title}</h4>
                <p className='position-absolute  w-100 text-sm-start text-center top-50 mt-3 mt-sm-2'>You can check all details</p>
            </div>
            <div>
                {ButtonTitle && ButtonFunction ? <button onClick={() => {
                    { ButtonFunction() }
                }} className="btn bg-btn   text-white  px-5 ">{ButtonTitle}</button> : ""}

            </div>
        </div>

    </>
}

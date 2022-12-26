import React from 'react'
import "./FilterOption.css"

function FilterOption(props) {
  return (
    <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id={props.name} onChange= {(e)=>{props.editFilter(prevState=>{return {...prevState,[e.target.id] : e.target.checked}})}}/>
        <label class="form-check-label" for="flexCheckDefault">
            {props.name}
        </label>
    </div>
  )
}

export default FilterOption

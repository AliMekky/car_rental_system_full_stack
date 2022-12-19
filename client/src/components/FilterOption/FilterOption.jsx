import React from 'react'
import "./FilterOption.css"

function FilterOption(props) {
  return (
    <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
        <label class="form-check-label" for="flexCheckDefault">
            {props.name}
        </label>
    </div>
  )
}

export default FilterOption

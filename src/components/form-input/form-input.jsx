import React from 'react'

import './form-input.scss';

// Formatting for the label uses a ternary to determine if the user has
// typed in any character (making value.length > 0).  If so, the lable will shrink

const FormInput = ({ handleChange, label, ...other }) => (

  <div className='group'>
    <input className='form-input' onChange={handleChange} {...other} />
    {
      label ?
        (<label className={`${other.value.length ? 'shrink' : ''} form-input-label`}>
          {label}
        </label>)
        : null
    }
  </div>
)

export default FormInput
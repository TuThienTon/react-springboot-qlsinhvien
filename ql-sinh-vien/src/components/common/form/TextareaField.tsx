import { Field, ErrorMessage } from 'formik'
import React from 'react'
import IconRequiredLabel from './IconRequiredLabel'
import TextError from './TextError'

function TextareaField(props: any) {
  const { label, name, isRequired, ...rest } = props
  return (
    <div >
      <label htmlFor={name}>{label} <IconRequiredLabel show={isRequired}/></label>
      <Field component='textarea' id={name} name={name} {...rest} rows="3" />
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default TextareaField

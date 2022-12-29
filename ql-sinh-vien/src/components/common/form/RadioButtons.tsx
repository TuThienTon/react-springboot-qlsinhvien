import React from 'react'
import { Field, ErrorMessage } from "formik";
import IconRequiredLabel from "./IconRequiredLabel";
import TextError from "./TextError";
function RadioButtons(props: any) {
  const { label, name, options, tooltip, isRequired, ...rest } = props
  return (
    <div>
      {
        label &&
        <label htmlFor={name}>{label} <IconRequiredLabel show={isRequired} /> {tooltip}</label>
      }
      <Field name={name} >
        {({ field }: {field: any}) => {
          return options.map((option: any) => {
            return (
              <span key={option.key} style={{marginRight: '1rem', cursor: 'pointer'}}>
                <input
                  type='radio'
                  id={`${name}_${option.value}`}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label htmlFor={`${name}_${option.value}`} className="mx-1" style={{cursor: 'pointer'}}>{option.key}</label>
              </span>
            )
          })
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default RadioButtons
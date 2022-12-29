import { ErrorMessage, Field } from 'formik';
import React from 'react'
import TextError from './TextError';
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import IconRequiredLabel from './IconRequiredLabel';
registerLocale("vi", vi);

function DatepickerField(props: any) {
  const { label, name, tooltip, isRequired, ...rest } = props
  return (
    <div>
      <label htmlFor={name}>{label} <IconRequiredLabel show={isRequired} /> {tooltip}</label>
      <Field name={name}>
        {({ form, field }: { form: any, field: any }) => {
          const { setFieldValue } = form
          const { value } = field
          return (
            <ReactDatePicker
              id={name}
              {...field}
              onChange={(val: any) => {
                setFieldValue(name, val ? val : null)
              }}
              prevMonthButtonDisabled
              nextMonthButtonDisabled
              prevYearButtonDisabled
              nextYearButtonDisabled
              dateFormat="dd/MM/yyyy"
              autoComplete='off'
              // showTimeSelect
              // locale="vi"
              selected={value}
              {...rest}
            />
          )
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default DatepickerField

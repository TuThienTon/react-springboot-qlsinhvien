import { ErrorMessage, Field } from 'formik'
import Select from 'react-select';
import IconRequiredLabel from './IconRequiredLabel';
import TextError from './TextError';

function ReactSelectField(props: any) {
  const { label, name, options, tooltip, isRequired, ...rest } = props
  return (
    <div>
      <label htmlFor={name}>{label} <IconRequiredLabel show={isRequired} /> {tooltip} </label>
      <Field name={name}>
        {({ field, form }: { field: any, form: any }) => (
          <Select
            options={options}
            isSearchable={true}
            isClearable={true}
            // onChange={(selectedOption: any) =>
            //   form.setFieldValue(
            //     name,
            //     selectedOption.value,
            //   )
            // }
            {...rest}
          />
        )}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default ReactSelectField

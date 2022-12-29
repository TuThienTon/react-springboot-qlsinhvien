import { Field, ErrorMessage } from 'formik'
import IconRequiredLabel from './IconRequiredLabel'
import TextError from './TextError'
import AsyncSelect from 'react-select/async';

function AsyncReactSelectField(props: any) {
  const { label, name, options, tooltip, isRequired, ...rest } = props;
  return (
    <div>
      {
        label &&
        <label htmlFor={name}>{label} {tooltip} <IconRequiredLabel show={isRequired} /></label>
      }
      <Field name={name}>
        {({ field, form }: { field: any, form: any }) => (
          <>
            <AsyncSelect
              cacheOptions
              defaultOptions
              options={options}
              isSearchable={true}
              isClearable={true}
              // onChange={(selectedOption: any) =>
              //   form.setFieldValue(
              //     name,
              //     selectedOption ? selectedOption.value : null,
              //   )
              // }
              {...rest}
            />
          </>
        )}
      </Field>
      <ErrorMessage component={''} name={name} />
    </div>
  )
}

export default AsyncReactSelectField

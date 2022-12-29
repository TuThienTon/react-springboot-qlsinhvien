import { ErrorMessage, Field } from 'formik'
import IconRequiredLabel from './IconRequiredLabel';
import TextError from './TextError'

const BmsSelect = ({ field, form, ...props }: { field: any, form: any }) => {
  return <input {...field} {...props} className="form-select" />;
};

function SelectField(props: any) {
  const { label, name, options, tooltip, isRequired, nameValue = 'value', nameLabel = 'label', ...rest } = props
  return (
    <div>
      {
        label == null ? null :
          <label htmlFor={name}>{label} <IconRequiredLabel show={isRequired} /> {tooltip}</label>}
      <Field as='select' id={name} name={name} {...rest} className="form-control form-select">
        {options.map((option: any) => {
          return (
            <option key={option[nameValue]} value={option[nameValue]}>
              {option[nameLabel]}
            </option>
          )
        })}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default SelectField

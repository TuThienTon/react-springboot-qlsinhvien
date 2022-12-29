import { Grid } from "@mui/material";
import { Field, ErrorMessage } from "formik";
import IconRequiredLabel from "./IconRequiredLabel";
import TextError from "./TextError";

const BmsInput = ({ field, form, ...props }: { field: any, form: any }) => {
  return <input {...field} {...props} className="form-control" />;
};

function InputField(props: any) {
  let { name, label, placeholder, tooltip, isRequired, ...rest } = props;
  // const onChangeInput = () => {
  //   setOpenChangeInput(true)
  // }
  return (
    <div className='form-group'>
      <Grid container direction="row">
        <Grid item textAlign='left'>
          {
            label &&
            <label htmlFor={name}>{label} <IconRequiredLabel show={isRequired} /> {tooltip}</label>
          }
        </Grid>
        {/* {
          changeInput == null ? null :
            (
              <Grid item sm={6} textAlign='right'>
                <div
                  onClick={onChangeInput}
                  style={{
                    color: '#0d6efd',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontStyle: 'bold'
                  }}
                >
                  {changeInput}
                </div>
              </Grid>
            )
        } */}
      </Grid>
      {/* <Field id={name} name={name} {...rest} /> */}
      <Field name={name} placeholder={placeholder} autoComplete="off" {...rest} component={BmsInput} />
      <ErrorMessage component={TextError} name={name} ></ErrorMessage>
    </div >
  )
}

export default InputField

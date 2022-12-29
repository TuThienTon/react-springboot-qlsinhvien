import { ErrorMessage, Field } from 'formik';
import React from 'react';
import IconRequiredLabel from './IconRequiredLabel';
import TextError from './TextError';


const BmsUpload = ({ field, form, title, accept, name, ...props }: { field: any, form: any, title: any, accept: any, name: any }) => {
    return (
        <div>
            <input
                accept={accept}
                id={`file-${name}`}
                type="file"
                style={{ display: 'none' }}
                {...props}
            />
            <label htmlFor={`file-${name}`}>
                <div
                    style={{
                        color: '#0d6efd',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        fontStyle: 'italic'
                    }}
                >
                    {title}
                </div>
            </label>
        </div>
    )
};

const UploadField = (props: any) => {
    let { name, label, placeholder, tooltip, isRequired, ...rest } = props;
    return (
        <div className='form-group'>
            {
                label &&
                <label htmlFor={name}>{label} <IconRequiredLabel show={isRequired} /> {tooltip}</label>
            }
            {/* <Field id={name} name={name} {...rest} /> */}
            <Field name={name} placeholder={placeholder} autoComplete="off" {...rest} component={() => <BmsUpload {...props} />} />
            <ErrorMessage component={TextError} name={name} />
        </div>
    );
};

export default UploadField;
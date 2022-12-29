import React from 'react'
import AsyncReactSelectField from './AsyncReactSelectField';
import DatepickerField from './DatepickerField';
import InputField from './InputField';
import RadioButtons from './RadioButtons';
import ReactSelectField from './ReactSelectField';
import SelectField from './SelectField';
import TextareaField from './TextareaField';
import UploadField from './UploadField';

function TextFieldContainer(props: any) {
  const { variant, ...rest } = props;
  switch (variant) {
    case 'input':
      return <InputField {...rest} />
    case 'select':
      return <SelectField {...rest} />
    case 'textarea':
      return <TextareaField {...rest} />
    case 'date':
      return <DatepickerField {...rest} />
    case 'react-select':
      return <ReactSelectField {...rest} />
    case 'async-react-select':
      return <AsyncReactSelectField {...rest} />
    case 'radio':
      return <RadioButtons {...rest} />
    case 'upload':
      return <UploadField {...rest} />
    default:
      return <></>
  }
}

export default TextFieldContainer

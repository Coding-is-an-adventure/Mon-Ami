import React from "react";
import { FieldRenderProps } from "react-final-form";
import { Form, FormFieldProps, Label } from "semantic-ui-react";

interface ITextAreaInputProps
  extends FieldRenderProps<string, any>,
    FormFieldProps {}

const TextAreaInput: React.FC<ITextAreaInputProps> = ({
  input,
  width,
  type,
  rows,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      <textarea rows={rows} {...input} placeholder={placeholder} />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextAreaInput;
import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";
import { DateTimePicker } from "react-widgets";

interface IProps extends FieldRenderProps<any, HTMLElement>, FormFieldProps {}

const DateInput: React.FC<IProps> = ({
    input,
    width,
    placeholder,
    meta: touched,
    error,
    id,
    ...props
  }) => {
    return (
      <Form.Field error={touched && !!error} width={width}>
        <DateTimePicker
          id={String(id)}
          placeholder={placeholder}
          value={input.value || null}
          onChange={input.onChange}
          {...props}
        />
        {touched && error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
      </Form.Field>
    );
  };

  export default DateInput;
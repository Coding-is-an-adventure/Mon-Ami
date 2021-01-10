import React, { useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "./../../app/common/form/TextInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IUserFormValues } from "../../app/models/user";

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) => login(values)}
      render={({ handleSubmit, submitting , form }) => (
        <Form onSubmit={handleSubmit}>
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            component={TextInput}
            placeholder="Password"
            type="password"
          />
          <Button loading={submitting} positive content="Login" />
          <pre>{JSON.stringify(form.getState(), null, 2)}</pre>
        </Form>
      )}
    />
  );
};

export default LoginForm;

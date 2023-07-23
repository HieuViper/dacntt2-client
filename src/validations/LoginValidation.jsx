import * as yup from "yup";
const LoginValidationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Please enter valid email")
    .required("Please enter your email"),

  password: yup
    .string("Enter the password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Please enter your password"),
});
export default LoginValidationSchema;

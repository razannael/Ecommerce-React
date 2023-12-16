import * as yup from 'yup';
export const registerSchema= yup.object({
  userName:yup.string().required("userName is required").min(3,"must be at least 3 char").max(30,"max is 30 char"),
  email:yup.string().required("email is required").email(),
  password:yup.string().required("password is required").min(3,"must be at least 3 char").max(30,"max is 30 char")
});

export const loginSchema= yup.object({
  email:yup.string().required("email is required").email(),
  password:yup.string().required("password is required").min(3,"must be at least 3 char").max(30,"max is 30 char"),
});

export const sendCodeSchema= yup.object({
  email:yup.string().required("email is required").email(),
});

export const forgotPaswordSchema= yup.object({
  code:yup.string().required("code is required").min(3,"must be at least 3 char").max(30,"max is 30 char"),
  email:yup.string().required("email is required").email(),
  password:yup.string().required("password is required").min(3,"must be at least 3 char").max(30,"max is 30 char")
});

export const createOrderSchema= yup.object({
  coupon:yup.string().required("coupon is required").min(3,"must be at least 3 char").max(30,"max is 30 char"),
  phone:yup.string().required("phone is required").min(6,"must be at least 6 char").max(30,"max is 30 char"),
  address:yup.string().required("address is required").min(3,"must be at least 3 char").max(30,"max is 30 char")
});
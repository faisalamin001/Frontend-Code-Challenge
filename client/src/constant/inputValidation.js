import * as Yup from 'yup';

export const nameSchema = Yup.string('Name must be a string')
  .required('Name is required.')
  .min(3, 'Name must be at least 3 characters long.')
  .max(20, 'Name must not exceed 20 characters.');

export const priceSchema = Yup.number()
  .typeError('Price must be a valid number.')
  .positive('Price must be a positive number.')
  .required('Price is required.');

export const imageUrlSchema = Yup.string()
  .required('Url is required.')
  .matches(/^https?:\/\/.+\/.+$/, 'Image url is not valid');

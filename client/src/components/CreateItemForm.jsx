import { useRef, useState } from 'react';
import {
  nameSchema,
  priceSchema,
  imageUrlSchema,
} from '../constant/inputValidation';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { createRequest } from '../utils';
import { useNavigate } from 'react-router-dom';

function CreateItemForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({
    nameError: '',
    priceError: '',
    imageUrlError: '',
  });

  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const imageUrlRef = useRef(null);

  const newProductData = {
    name: nameRef?.current?.value,
    price: priceRef?.current?.value,
    img: imageUrlRef?.current?.value,
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => createRequest('items', newProductData), {
    onSuccess: () => {
      toast.success('Product created successfully!');
      queryClient.invalidateQueries(),
        setTimeout(() => {
          navigate('/store');
        }, 1000);
    },
    onError: () => {
      toast.error('An error occured while adding a product');
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    Promise.all([
      nameSchema.validate(nameRef.current.value),
      priceSchema.validate(priceRef.current.value),
      imageUrlSchema.validate(imageUrlRef.current.value),
    ])
      .then(() => {
        // Validation succeeded, proceed with form submission logic here
        mutate({
          name: nameRef.current.value,
          price: priceRef.current.value,
          img: imageUrlRef.current.value,
        });
      })
      .catch((err) => {
        console.log('ERROR : ', err);
        toast.error('Please fill the form with valid values');
      });
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className='mb-6'>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Name
          </label>
          <input
            type='text'
            id='name'
            ref={nameRef}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Product name'
            required
            onBlur={() =>
              nameSchema
                .validate(nameRef.current.value)
                .then(() => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    nameError: '', // Clear the error when input is valid
                  }));
                })
                .catch((err) => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    nameError: err.message,
                  }));
                })
            }
          />
          {errorMessage?.nameError && (
            <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
              <span className='font-medium'>Error: </span>{' '}
              {errorMessage?.nameError}
            </p>
          )}
        </div>
        <div className='mb-6'>
          <label
            htmlFor='price'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Price
          </label>
          <input
            type='number'
            id='price'
            ref={priceRef}
            placeholder='$99.00'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            required
            onBlur={() =>
              priceSchema
                .validate(priceRef.current.value)
                .then(() => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    priceError: '', // Clear the error when input is valid
                  }));
                })
                .catch((err) => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    priceError: err.message,
                  }));
                })
            }
          />
          {errorMessage?.priceError && (
            <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
              <span className='font-medium'>Error: </span>{' '}
              {errorMessage?.priceError}
            </p>
          )}
        </div>
        <div className='mb-6'>
          <label
            htmlFor='image'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Image
          </label>
          <input
            type='url'
            ref={imageUrlRef}
            id='image'
            placeholder=' image url'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            required
            onBlur={() =>
              imageUrlSchema
                .validate(imageUrlRef.current.value)
                .then(() => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    imageUrlError: '',
                  }));
                })
                .catch((err) => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    imageUrlError: err.message,
                  }));
                })
            }
          />
          {errorMessage?.imageUrlError && (
            <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
              <span className='font-medium'>Error: </span>{' '}
              {errorMessage?.imageUrlError}
            </p>
          )}
        </div>

        <button
          type='submit'
          className='text-white mt-8 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Create
        </button>
      </form>
      <Toaster position='bottom-right' />
    </>
  );
}

export default CreateItemForm;

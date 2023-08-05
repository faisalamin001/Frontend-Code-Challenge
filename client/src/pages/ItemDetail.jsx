import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { fetchRequest, deleteRequest } from '../utils';
import useStore from '../store/zustandStore';
import { getImageSrc } from '../utils/imageUtils';

function ItemDetail() {
  const addItemToCart = useStore((state) => state.addItemToCart);

  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const getItemDetail = () => fetchRequest(`items/${id}`);
  const { isLoading, data } = useQuery('itemDetail', getItemDetail, {
    onError: () => {
      navigate('/store');
    },
  });

  const imgSrc = getImageSrc(data?.img);

  // delete product
  const { mutate } = useMutation(() => deleteRequest(`items/${id}`), {
    onSuccess: () => {
      toast.success('Product deleted successfully!');
      queryClient.invalidateQueries(),
        setTimeout(() => {
          navigate('/store');
        }, 700);
    },
    onError: () => {
      toast.error('An error occured while deleting a product');
    },
  });

  const deleteHandler = () => {
    mutate();
  };

  return (
    <>
      {isLoading ? (
        'Loading....'
      ) : (
        <div className='flex flex-col justify-around items-center bg-white border border-gray-200  py-16 shadow sm:flex-row   dark:border-gray-700 dark:bg-gray-800 '>
          <div className='flex flex-col justify-between p-4 leading-normal'>
            <h5 className='mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white'>
              {data?.name}
            </h5>

            <p className=' w-96  mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio id
              eius similique natus obcaecati culpa!
            </p>

            <h3 className='text-5xl font-extrabold text-white'>
              ${data?.price}
            </h3>
            <div className='mt-8'>
              <button
                type='button'
                onClick={() => {
                  addItemToCart({
                    id: Math.floor(Math.random() * 900) + 100,
                    name: data?.name,
                    price: data?.price,
                    img: data?.img,
                  });
                  toast.success('Product added to cart!');
                }}
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                <svg
                  className='w-3.5 h-3.5 mr-2'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 18 21'
                >
                  <path d='M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z' />
                </svg>
                Buy now
              </button>
              <button
                type='button'
                onClick={deleteHandler}
                className='text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 inline-flex items-center focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-3.5 h-3.5 mr-2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>
          <img
            className='object-cover w-96 rounded h-72   '
            src={imgSrc}
            alt=''
          />
          <Toaster position='bottom-right' />
        </div>
      )}
    </>
  );
}

export default ItemDetail;

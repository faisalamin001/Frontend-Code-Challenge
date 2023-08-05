import toast, { Toaster } from 'react-hot-toast';
import useStore from '../store/zustandStore';
import { getImageSrc } from '../utils/imageUtils';

function Cart() {
  const { cartItems, clearCart, removeItemFromCart } = useStore();

  const clearCartHandler = () => {
    clearCart();
    toast.success('Thanks for shopping! ❤️ ');
  };

  return (
    <div className=' bg-slate-700 px-6 py-20'>
      <h1 className='text-white text-center text-4xl p-4 font-bold tracking-tight leading-none'>
        Cart
      </h1>

      <div className=' m-auto w-[380px] text-white'>
        {cartItems.length > 0 ? (
          cartItems.map((item) => {
            const imgSrc = getImageSrc(item?.img);
            return (
              <div
                key={item.id}
                className='flex items-center justify-between border-b border-gray-500 my-4 pb-4 '
              >
                {/* left */}
                <div className='flex  items-center'>
                  <img
                    src={imgSrc}
                    className='rounded h-14 h- w-14 object-cover '
                    alt={item?.name}
                  />
                  <div>
                    <p className='text-xl mx-4 text-left'>{item?.name}</p>
                    <p className='font-bold mx-4 '>
                      {' '}
                      <span className='text-yellow '>$</span>
                      {item?.price}
                    </p>
                  </div>
                </div>

                {/* right */}
                <div className='text-right'>
                  <button
                    onClick={() => {
                      removeItemFromCart(item.id);
                      toast.success('Product removed from cart!');
                    }}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='red'
                      className='w-5 h-5'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className='text-center text-4xl text-slate-500'>
            <p>Cart is empty!</p>
          </div>
        )}
        <button
          onClick={clearCartHandler}
          disabled={cartItems.length <= 0}
          className={`${
            cartItems.length <= 0 && 'cursor-not-allowed	'
          } px-8 mt-8 rounded py-3 text-white bg-blue-600 w-full`}
        >
          Checkout!
        </button>
      </div>
      <Toaster position='bottom-right' />
    </div>
  );
}

export default Cart;

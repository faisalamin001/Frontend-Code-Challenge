import { Link } from 'react-router-dom';
import Logo from '../assets/images/logo.png';

function Footer() {
  return (
    <>
      <footer className='bg-white shadow dark:bg-gray-900'>
        <div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
          <div className='sm:flex sm:items-center sm:justify-between'>
            <Link to='/' className='flex items-center mb-4 sm:mb-0'>
              <img src={Logo} className='h-8 mr-3' alt='Flowbite Logo' />
              <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
                RandoStore
              </span>
            </Link>
            <ul className='flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400'>
              <li>
                <Link to='/' className='mr-4 hover:underline md:mr-6 '>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/store' className='mr-4 hover:underline md:mr-6'>
                  Store
                </Link>
              </li>
              <li>
                <Link to='/additem' className='mr-4 hover:underline md:mr-6 '>
                  Add item
                </Link>
              </li>
              <li>
                <Link to='/cart' className='hover:underline'>
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
          <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
            © 2023{' '}
            <Link to='/' className='hover:underline'>
              RandoStore™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}

export default Footer;

import { useState } from 'react';
import Card from '../components/Card';
import { fetchRequest } from '../utils';
import { useQuery } from 'react-query';

function Store() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortParam, setSortParam] = useState(null);

  const getAllItems = () => fetchRequest('items');
  const { isLoading, data } = useQuery('allitems', getAllItems);

  // Filter the data based on the search query
  const filteredData = data?.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle sorting
  const handleSort = (param) => {
    if (sortParam === param) {
      setSortParam(null); // Remove sorting if it's already sorted by the same parameter
    } else {
      setSortParam(param);
    }
  };

  // Sort the filteredData array based on the selected sorting parameter
  if (sortParam === 'name') {
    filteredData.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortParam === 'price') {
    filteredData.sort((a, b) => a.price - b.price);
  }

  return (
    <div className='bg-slate-700'>
      <div className=' py-12 text-center'>
        <h1 className='text-6xl font-bold tracking-tight leading-none text-white '>
          Trending Products
        </h1>
        <div className=' w-96 m-auto'>
          <form>
            <label
              htmlFor='search'
              className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
            >
              Search
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg
                  className='w-4 h-4 text-gray-500 dark:text-gray-400'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                  />
                </svg>
              </div>
              <input
                type='search'
                id='search'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='block w-full p-4 my-8 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Search product'
              />
            </div>
          </form>
          <button
            type='button'
            onClick={() => handleSort('name')}
            className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
          >
            Sort by Name
          </button>
          <button
            type='button'
            onClick={() => handleSort('price')}
            className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
          >
            Sort by Price
          </button>
        </div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className='flex flex-wrap justify-center items-center'>
          {filteredData?.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Store;

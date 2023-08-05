import CreateItemForm from '../components/CreateItemForm';
function AddItem() {
  return (
    <div className=' bg-slate-700'>
      <h1 className='text-4xl py-8 text-center font-bold tracking-tight leading-none text-white'>
        Add new Product
      </h1>
      <div className='w-[380px] py-8 m-auto'>
        <CreateItemForm />
      </div>
    </div>
  );
}

export default AddItem;

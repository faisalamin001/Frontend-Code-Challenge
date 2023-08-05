import Home from '../pages/Home';
import Store from '../pages/Store';
import AddItem from '../pages/AddItem';
import Cart from '../pages/Cart';
import ItemDetail from '../pages/ItemDetail';
import NotFound from '../pages/NotFound';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/store',
    component: Store,
  },
  {
    path: '/store/detail/:id',
    component: ItemDetail,
  },
  {
    path: '/additem',
    component: AddItem,
  },
  {
    path: '/cart',
    component: Cart,
  },
  {
    path: '*',
    component: NotFound,
  },
];

export default routes;

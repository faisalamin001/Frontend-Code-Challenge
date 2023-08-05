import routes from './routes/index';
import { Route, Routes } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        {routes.map(({ path, component: Component }) => {
          return <Route key={path} path={path} element={<Component />} />;
        })}
      </Routes>
      <Footer />
    </>
  );
}

export default App;

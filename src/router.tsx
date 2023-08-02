import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Welcome from 'components/pages/Welcome';
import Errors from 'components/pages/Errors.tsx';
import MainLayout from 'components/layouts/MainLayout.tsx';
import Balances from 'components/pages/Balances';
import Metadata from 'components/pages/Metadata';

export default createBrowserRouter(
  createRoutesFromElements([
    <Route path='/' element={<MainLayout />} errorElement={<Errors />}>
      <Route index element={<Welcome />} />
      <Route path='/balances'>
        <Route index element={<Balances />} />
        <Route path=':address' element={<Balances />} />
      </Route>
      <Route path='/metadata'>
        <Route index element={<Metadata />} />
      </Route>
    </Route>,
  ]),
);

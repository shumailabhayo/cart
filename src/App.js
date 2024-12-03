import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';
import PageNotFound from './components/page-not-found/PageNotFound';
import { Store } from './store/Store';
import { Provider } from 'react-redux';

function App() {
  const router = createBrowserRouter([
    {  path: "/", element: <AppLayout />, errorElement: <PageNotFound />  },
    {  path: "/sign-in", element: <SignIn />,  },
    {  path: "/sign-up", element: <SignUp />, },
  ]);
  return (
    <div className="App">
      <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
    </div>
  );
}

export default App;

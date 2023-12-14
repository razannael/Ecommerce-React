import {createBrowserRouter} from "react-router-dom";
import Layout from './Layout.jsx';
import Home from './../components/web/home/Home.jsx';
import Categories from './../components/web/categories/Categories.jsx';

import Register from "../components/web/register/Register.jsx";
import Login from "../components/web/login/Login.jsx";
import CategoriesDetails from "../components/web/categories/CategoriesDetails.jsx";
import Product from "../components/web/products/Product.jsx";
import Cart from "../components/web/cart/Cart.jsx";
import ProtectedRoute from "../components/web/protectedRoute/ProtectedRoute.jsx";
import Profile from "../components/web/profile/Profile.jsx";
import UserInfo from "../components/web/profile/UserInfo.jsx";
import UserContact from "../components/web/profile/UserContact.jsx";
import SendCode from "../components/web/auth/SendCode.jsx";
import ForgotPassword from "../components/web/auth/ForgotPassword.jsx";
export const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
        {
          path:'register',
          element:<Register />
        },
        {
          path:'login',
          element:<Login/>
        },
        {
          path:'sendCode',
          element:<SendCode/>
        },
        {
          path:'forgotPassword',
          element:<ForgotPassword/>
        },
        {
          path:'/',
          element:<Home />
        },
        {
          path:'categories',
          element:<Categories />
        },
        {
          path:'products/category/:categoryId',
          element:<CategoriesDetails/>
        },
        {
          path:'product/:productId',
          element:<Product/>
        },
        {
          path:'cart',
          element: <ProtectedRoute>
            <Cart/>
          </ProtectedRoute>
        },
        {
          path:'profile',
          element:<ProtectedRoute>
            <Profile/>
          </ProtectedRoute>,
          children:[
            {
              index:true,
              element:<UserInfo/>,
            },
            {
              path:'contact',
              element:<UserContact/>,
            }
          ]
        },
        {
          path:'*',
          element:<h2>page not found --- web</h2>
        }
    ]
  },
  {
      path:'/dashboard',
    //  element:<DashboardLayout />,
      children:[{
      path:'home',
   //   element:<HomeDashboard />
    }
    ,{
      path:'categories',
    //  element:<CategoriesDashboard />
    },
    {
      path:'*',
      element:<h2>page not found --- dashboard</h2>
    }
  ]

  }
]);
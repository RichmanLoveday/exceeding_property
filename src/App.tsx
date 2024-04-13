import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/components/theme-provider";

import Login from "./pages/login";
import Products from "./pages/product";
import ProductDetails from "./pages/product-details";
import AddProduct from "./pages/add-product";
import EditProduct from "./pages/edit-product";
import Orders from "./pages/orders";
import OrderDetails from "./Features/orders/orderDetails";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/auth/protected";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ErrorPage from "./components/ErrorPage";
import { useState } from "react";
import AppLayout from "./components/ui/AppLayout";
import { MyContext } from "../src/pages/MyContext";
import Waitlist from "./pages/WaitList";
import ExternalLayout from "./components/ui/ExternalLayout";
import Category from "./pages/Category";
import Transaction from "./pages/Transaction";
import UserTransactions from "./pages/UserTransactions";
import Users from "./pages/Users";
import UserOrders from "./pages/userOrders";

const router = createBrowserRouter([
  {
    element: <ExternalLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: <AppLayout />,
    errorElement: (
      <>
        <ErrorPage />
      </>
    ),
    children: [
      {
        path: "/products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "/product/:productId",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/product/:productId/edit",
        element: (
          <ProtectedRoute>
            <EditProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-product",
        element: (
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order/:orderId",
        element: (
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order/user/:userId",
        element: (
          <ProtectedRoute>
            <UserOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "/waitlist",
        element: (
          <ProtectedRoute>
            <Waitlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "/transaction",
        element: (
          <ProtectedRoute>
            <Transaction />
          </ProtectedRoute>
        ),
      },
      {
        path: "/transaction/:userID",
        element: (
          <ProtectedRoute>
            <UserTransactions />
          </ProtectedRoute>
        ),
      },
      {
        path: "/waitlist/:waitlistId",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "/category",
        element: (
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  const [pageNum, setPageNum] = useState(false);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        // staleTime: 60 * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <Header /> */}
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={10}
          toastOptions={{
            duration: 2500,
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

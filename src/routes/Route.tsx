import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFoundPage } from "../pages/404";
import { HomePage } from "../pages/HomePage";
import { ChatPage } from "../pages/ChatPage";

const Route = () => {
  const appRoute = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <NotFoundPage />,
    },
    {
      path: "/chats",
      element: <ChatPage />,
      errorElement: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={appRoute} />;
};

export default Route;

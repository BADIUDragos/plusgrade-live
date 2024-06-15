import { HomePage, Layout, ErrorPage, NotFoundPage } from "../pages"
import { createBrowserRouter } from "react-router-dom";

export const routes = [
  {
    element: <Layout/>,
    children: [
      { path: "/", element: <HomePage/> },
      { path: "*", element: <NotFoundPage/> }
    ],
    errorElement: <ErrorPage />,
  }
]

const router = createBrowserRouter(routes);

export default router;

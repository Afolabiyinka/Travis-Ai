import { routes } from "./Routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const RoutesConfig: React.FC = () => {
  const routesModule = createBrowserRouter(routes);
  return <RouterProvider router={routesModule} />;
};

export default RoutesConfig;

import { lazy } from "react";
import PageNotFound from "./components/PageNotFound";

const Home = lazy(() =>
  import('./pages/HomePage')
    .then((module) => ({ default: module.default }))
    .catch(error => {
      console.error("Error loading Home page:", error);
      return { default: () => <div>Error loading Home page</div> };
    })
);

const Dash = lazy(() =>
  import('./pages/UserDash')
    .then((module) => ({ default: module.default })) 
    .catch(error => {
      console.error("Error Loading the User DashBoard:", error);
      return { default: () => <div>Error Loading the User Dash Please try again</div> };
    })
);

const ViewDetails = lazy(() =>
  import('./components/UserDashBoard/ViewDetails')
    .then((module) => ({ default: module.default })) 
    .catch(error => {
      console.error("Error Loading the User DashBoard:", error);
      return { default: () => <div>Error Loading the view details try again</div> };
    })
);

const ListRooms = lazy(() =>
  import('./components/UserDashBoard/ListRooms')
    .then((module) => ({ default: module.default })) 
    .catch(error => {
      console.error("Error Loading the User DashBoard:", error);
      return { default: () => <div>Error Loading the view details try again</div> };
    })
);



// Add any other routes you need
// const Login = lazy(() => import('./pages/LoginPage'));

const routes = [
  {
    path: '/',
    element: <Home />,
    meta: {
      name: "Home",
      icon: "home",
      RequireAuth: false, 
    }
  },

  {
    path: '/:id/dashboard',
    element: <Dash/>,
    meta:{
      name:"UserDashBoard",
      icon:"Dash",
      RequireAuth:false,
    }
  },
  {
    path: '/:id/dashboard/view-details/:roomId',
    element: <ViewDetails/>,
    meta:{
      name:"ViewDetails",
      icon:"user",
      RequireAuth:false,
    }
  },
  {
    path: '/:id/dashboard/listrooms',
    element: <ListRooms/>,
    meta:{
      name:"ListRooms",
      icon:"user",
      RequireAuth:false,
    }
  }
  ,
  {
    path: '*',
    element: <PageNotFound/>,
    meta: {
      name: "Not Found",
      RequireAuth: false,
    }
  }
];

export default routes;
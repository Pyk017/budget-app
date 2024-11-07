// IMPORT RRD
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// IMPORT LAYOUTS
import Main from "./layout/Main"

// IMPORT ROUTES
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage";
import Error from "./pages/Error";

// IMPORT ACTIONS
import { logoutAction } from "./actions/logout";

// IMPORT TOAST LIBRARY 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";

// ROUTE MANAGEMENT 
const router = createBrowserRouter([
  {
    path: "/", 
    element: <Main />,
    loader: dashboardLoader,
    errorElement: <Error />,
    children: [{
        path: "/", 
        // element: <h2>testing children</h2>
        element: <Dashboard />,   
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />
    }, {
      path: "/budget/:id", 
      element: <BudgetPage />,   
      loader: budgetLoader,
      action: budgetAction,
      errorElement: <Error />
    }, {
      path: "/expenses", 
      element: <ExpensesPage />,   
      loader: expensesLoader,
      action: expensesAction,
      errorElement: <Error />
    }, {
      path: "/logout", 
      action: logoutAction
    }]
  }, 
])

function App() {
  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      <ToastContainer />
      </div>
    </>
  )
}

export default App

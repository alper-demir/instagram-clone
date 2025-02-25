import { createRoot } from 'react-dom/client'
import './index.css'
import routes from "./routes.jsx"
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from "../src/store/store"
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
    <Toaster />
  </Provider>
)
import { ToastContainer } from "react-toastify";
import "./App.css";
import Router from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./stores/CartContext";
import Auth from "./utils/auth";
import { FoodProvider } from "./stores/FoodContext";
import { ConfirmProvider } from "material-ui-confirm";

function App() {
  return (
    <Auth>
      <ConfirmProvider>
        <FoodProvider>
          <CartProvider>
            <Router />
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </CartProvider>
        </FoodProvider>
      </ConfirmProvider>
    </Auth>
  );
}

export default App;

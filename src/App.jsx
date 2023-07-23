import { ToastContainer } from "react-toastify";
import "./App.css";
import Router from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./stores/CartContext";

function App() {
  return (
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
  );
}

export default App;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const removeLoader = () => {
  const loader = document.getElementById("loading");
  if (loader) loader.remove();
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
      </Elements>
    </Provider>
  </StrictMode>
);

// Call the removeLoader function after rendering
removeLoader();

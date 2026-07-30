import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";
import { Provider } from "react-redux";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { GoogleOAuthProvider } from '@react-oauth/google';

let persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId="8008835197-4dk9abl4itouvi276fbsa4sjevk8c8m8.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
        <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { fetchPosts } from "./features/posts/postsSlice.js";
import { fetchUsers } from "./features/users/usersSlice.js";

export let persistor = persistStore(store);
store.dispatch(fetchPosts());
store.dispatch(fetchUsers());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </PersistGate>
  </StrictMode>
);

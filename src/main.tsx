import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "./components/ui/provider.tsx"
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Provider>
    <BrowserRouter>
      <App />
      
    </BrowserRouter>
  </Provider>
);

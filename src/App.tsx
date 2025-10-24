import { Route, Routes } from "react-router";
import { guestRouters } from "./routes";
import GuestLayout from "./components/base/layout/layout";
import { Toaster } from 'sonner';
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<GuestLayout />}>
          {guestRouters.map((item, index) => (
            <Route
              path={item.path}
              element={<item.component />}
              key={index}
            />
          ))}
        </Route>
      </Routes>
      <Toaster position="top-center"/>
    </AuthProvider>

  );
}

export default App;

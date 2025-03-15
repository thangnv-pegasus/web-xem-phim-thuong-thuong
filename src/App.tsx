import { Route, Routes } from "react-router";
import GuestLayout from "./components/base/layout";
import { guestRouters } from "./routes";

function App() {
  return (
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
  );
}

export default App;

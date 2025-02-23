import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const App = () => {
  return (
    <div>
      <Outlet />
      <Toaster richColors position="top-center" />
    </div>
  );
};

export default App;

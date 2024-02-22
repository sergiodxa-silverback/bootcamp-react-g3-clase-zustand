import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

const router = createBrowserRouter([
  {
    index: true,
    lazy: () => import("./routes/index"),
    hydrateFallbackElement: <div>Cargando...</div>,
  },
  {
    path: "/meal/:mealId",
    lazy: () => import("./routes/meal.$mealId"),
    hydrateFallbackElement: <div>Cargando...</div>,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider
        router={router}
        fallbackElement={<div>Cargando...</div>}
      />
    </div>
  );
}

export default App;

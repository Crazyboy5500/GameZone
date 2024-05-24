import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MemoryGame from './memorygame/src/App'
import PuzzleGame from './puzzlegame/puzzlegame'
import App from "./App";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  , {
    path: "/memory",
    element: <MemoryGame />,
  },
  {
    path: "/puzzle",
    element: <PuzzleGame />,
  }
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

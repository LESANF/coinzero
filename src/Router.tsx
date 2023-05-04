import CoinLists from "./Pages/CoinLists";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={process.env.PUBLIC_URL + "/"} element={<Home />} />
        <Route path={process.env.PUBLIC_URL + "/coins"} element={<CoinLists />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

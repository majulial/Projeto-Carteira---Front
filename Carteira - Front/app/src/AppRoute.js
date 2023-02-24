import { BrowserRouter, Routes, Route } from "react-router-dom"
import Entrada from "./pages/Entrada/Entrada"
import Inicial from "./pages/Inicial/Inicial";
import Saida from "./pages/Saida/Saida";
import NoPage from "./pages/NoPage";

function AppRoute() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route index element={<Inicial />} />
          <Route path="entrada" element={<Entrada />} />
          <Route path="saida" element={<Saida />} />
          <Route path="*" element={<NoPage />} />
          
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default AppRoute;

import { React } from "react";

import Filters from "../Filters/Filters";
import Carrousel from "../Header/Carrousel/Carrousel";
import Billboard from "./../Billboard/Billboard";

import "./Home.css";

// import { useAuth } from "../Context/authContext";

export default function Home() {
  return (
    <div className="home--container">
      {/* COMPONENTE CARROUSEL - Contiene el slide con las imágenes promocionales */}
      <Carrousel />
      {/* COMPONENTE Filters - Contiene el componente SEARCHBAR y el FILTERBY */}
      <Filters />
      {/* COMPONENTE BILLBOARD - Contiene el catálogo de películas */}
      <Billboard />
    </div>
  );
}

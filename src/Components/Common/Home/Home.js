import { React } from "react";

import Filters from "../../Movies/Filters/Filters";
import Carrousel from "../Header/Carrousel/Carrousel";
import Billboard from "../../Movies/Billboard/Billboard";

import "./Home.css";

export default function Home() {
  return (
    <div className="home--container">
      <Carrousel />
      <Filters />
      <Billboard />
    </div>
  );
}

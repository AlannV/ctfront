import { React } from "react";

import Filters from "../Movies/Filters";
import Carrousel from "./Header/Carrousel";
import Billboard from "../Movies/Billboard";

import "../../Styles/Home.css";

export default function Home() {
  return (
    <div className="home--container">
      <Carrousel />
      <Filters />
      <Billboard />
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

function EditSchedule() {
  return (
    <div>
      EditSchedule
      <Link to="/adminmenu" className="admin-buttons">
        <div>Go Back</div>
      </Link>
    </div>
  );
}

export default EditSchedule;

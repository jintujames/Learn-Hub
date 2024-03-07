import React from "react";
import AdminTutor from "../../Components/Admin/AdminDashBoard/AdminTutor";
import AdminSidebar from "../../Components/Admin/AdminDashBoard/Header/AdminSidebar";

function AdminTutorPage() {
  return (
    <>
      <div className="flex ">
        <AdminSidebar />
        <AdminTutor />
      </div>
    </>
  );
}

export default AdminTutorPage;

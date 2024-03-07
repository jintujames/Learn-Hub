import React from "react";

import AdminDashboard from "../../Components/Admin/AdminDashBoard/AdminDashboard";
import AdminSidebar from "../../Components/Admin/AdminDashBoard/Header/AdminSidebar";

function AdminDashboardPage() {
  return (
    <>
      <div className="flex ">
        <AdminSidebar />
        <AdminDashboard />
      </div>
    </>
  );
}

export default AdminDashboardPage;

import React from "react";

import AdminUser from "../../Components/Admin/AdminDashBoard/AdminUser";
import AdminSidebar from "../../Components/Admin/AdminDashBoard/Header/AdminSidebar";

function AdminUserPage() {
  return (
    <>
      <div className="flex ">
        <AdminSidebar />
        <AdminUser />
      </div>
    </>
  );
}

export default AdminUserPage;

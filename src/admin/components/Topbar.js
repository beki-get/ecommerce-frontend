// src/admin/components/Topbar.jsx
import React from 'react';

const Topbar = () => (
  <div className="bg-white border-b p-4 flex justify-between items-center">
    <div className="text-lg font-semibold">Admin Dashboard</div>
    <div>
      {/* You can add admin user name / logout etc */}
    </div>
  </div>
);

export default Topbar;

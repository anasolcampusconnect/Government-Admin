import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, CreditCard, Mail, Bell, FileText, BarChart3, Settings, LogOut, ListChecks } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={22} /> },
    { name: "Users", path: "/users", icon: <Users size={22} /> },
    { name: "Payments", path: "/payments", icon: <CreditCard size={22} /> },
    { name: "Newsletters", path: "/newsletters", icon: <Mail size={22} /> },
    { name: "Premium", path: "/premium-content", icon: <FileText size={22} /> },
    { name: "Reports", path: "/reports", icon: <BarChart3 size={22} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={22} /> },
        { name: "Activities", path: "/activities", icon: <ListChecks size={22} /> },
  ];

  return (
    // 'flex-shrink-0' aur 'h-full' ensure karte hain ki sidebar ki size na badle
    <div className="w-[280px] h-full bg-[#000080] dark:bg-slate-950 text-indigo-50 flex flex-col transition-colors duration-300">
      
      {/* 1. Header: flex-shrink-0 se ye scroll nahi hoga */}
      <div className="p-8 flex-shrink-0">
        <h1 className="text-3xl font-extrabold tracking-tighter text-white">
          Admin<span className="text-[#FF9933]">Panel</span>
        </h1>
      </div>

      {/* 2. Nav Items: flex-1 aur overflow-y-auto se scroll enable hoga */}
      {/* hidden-scrollbar class aapki CSS file mein honi chahiye */}
      <ul className="flex-1 overflow-y-auto px-6 space-y-3 hidden-scrollbar">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.name}>
              <Link 
                to={item.path} 
                className={`flex items-center gap-4 px-5 py-3.5 rounded-xl text-lg font-medium transition-all duration-300 ${isActive ? "bg-[#FF9933] text-white shadow-lg" : "text-indigo-200 hover:bg-blue-800/50 hover:text-white"}`}
              >
                {item.icon} {item.name}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* 3. Logout Section: flex-shrink-0 se ye bottom pe chipka rahega */}
      <div className="p-6 border-t border-blue-800 flex-shrink-0">
        <Link to="/" className="flex items-center gap-4 px-5 py-3.5 rounded-xl text-lg font-medium text-indigo-300 hover:text-red-400 group">
          <LogOut size={22} className="text-red-400 group-hover:text-red-500" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
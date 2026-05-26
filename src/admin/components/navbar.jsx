import { Link, useLocation } from "react-router-dom";
import { Search, User, Sun, Moon, Bell } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  return (
    <div className="h-[75px] bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-8 transition-colors duration-300 flex-shrink-0">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white capitalize">
          {location.pathname.replace("/", "") || "Dashboard"}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Welcome to the Official Admin Portal</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input type="text" placeholder="Search records..." className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg outline-none text-sm w-64 dark:text-white focus:ring-2 focus:ring-[#FF9933]" />
        </div>
        <Link to="/notifications" className="text-slate-600 dark:text-slate-300 hover:text-[#FF9933]"><Bell size={22} /></Link>
        <button onClick={() => setIsDarkMode(!isDarkMode)} className="text-slate-600 dark:text-slate-300 hover:text-[#FF9933]">
          {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>
        <Link to="/profile" className="flex items-center gap-2 bg-[#FF9933] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-[#e68a2e]">
          <User size={16} /> Profile
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
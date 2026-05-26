import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Sidebar - Fixed on Left */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Container - Right Side */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar - Fixed at Top */}
        <Navbar />
        
        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
import { useState } from "react";
import { User, Shield, Bell, HardDrive, Save, CheckCircle } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  // State for our custom success notification (Toast)
  const [notification, setNotification] = useState({ show: false, message: "" });

  // Generic function to handle button clicks and show a success message
  const handleAction = (message) => {
    setNotification({ show: true, message });
    
    // Hide the notification automatically after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: "" });
    }, 3000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 shadow-sm border border-gray-300 dark:border-slate-700 border-t-4 border-t-blue-900 dark:border-t-blue-500 max-w-6xl transition-colors duration-300 min-h-[80vh] flex flex-col relative">
      
      {/* Toast Notification Pop-up */}
      {notification.show && (
        <div className="absolute bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-md shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-5 z-50">
          <CheckCircle size={20} />
          <span className="font-bold text-sm">{notification.message}</span>
        </div>
      )}

      {/* Official Header */}
      <div className="p-6 border-b border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 transition-colors">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-400 tracking-tight uppercase">System Administration Settings</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm font-semibold">Authorized Personnel Only • IP Logged</p>
      </div>
      
      <div className="flex flex-col md:flex-row flex-1">
        
        {/* Left Sidebar Navigation */}
        <div className="w-full md:w-64 border-r border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 transition-colors">
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-left transition-colors ${activeTab === 'profile' ? 'bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-blue-400 border-l-4 border-blue-900 dark:border-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-gray-200 border-l-4 border-transparent'}`}
            >
              <User size={18} /> Administrator Profile
            </button>
            <button 
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-left transition-colors ${activeTab === 'security' ? 'bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-blue-400 border-l-4 border-blue-900 dark:border-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-gray-200 border-l-4 border-transparent'}`}
            >
              <Shield size={18} /> Security & Access
            </button>
            <button 
              onClick={() => setActiveTab("notifications")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-left transition-colors ${activeTab === 'notifications' ? 'bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-blue-400 border-l-4 border-blue-900 dark:border-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-gray-200 border-l-4 border-transparent'}`}
            >
              <Bell size={18} /> Alerts & Notifications
            </button>
            <button 
              onClick={() => setActiveTab("system")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-left transition-colors ${activeTab === 'system' ? 'bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-blue-400 border-l-4 border-blue-900 dark:border-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-gray-200 border-l-4 border-transparent'}`}
            >
              <HardDrive size={18} /> System Configuration
            </button>
          </nav>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-6 md:p-8 bg-gray-50 dark:bg-slate-900 transition-colors">
          
          {/* TAB 1: PROFILE */}
          {activeTab === "profile" && (
            <div className="max-w-3xl animate-in fade-in duration-300">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-slate-700 pb-3 mb-6">Administrator Profile</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase">Employee / Govt ID</label>
                  <input type="text" className="w-full border border-gray-300 dark:border-slate-600 p-2.5 bg-gray-200 dark:bg-slate-800 text-gray-500 dark:text-gray-400 cursor-not-allowed text-sm font-semibold" defaultValue="TS-EMP-99281" disabled />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase">Official Designation</label>
                  <input type="text" className="w-full border border-gray-300 dark:border-slate-600 p-2.5 bg-gray-200 dark:bg-slate-800 text-gray-500 dark:text-gray-400 cursor-not-allowed text-sm font-semibold" defaultValue="Chief System Administrator" disabled />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase">Full Name (As per Records)</label>
                  <input type="text" className="w-full border border-gray-400 dark:border-slate-600 p-2.5 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-900 outline-none text-sm" defaultValue="M. Venkata Ramana" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase">Mobile Number</label>
                  <input type="tel" className="w-full border border-gray-400 dark:border-slate-600 p-2.5 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-900 outline-none text-sm" defaultValue="+91 98765 43210" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase">Registered Email Address</label>
                  <input type="email" className="w-full border border-gray-400 dark:border-slate-600 p-2.5 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-900 outline-none text-sm" defaultValue="admin.mvr@gov-teachers.in" />
                </div>
              </div>
              
              <div className="mt-8">
                {/* WIRED BUTTON */}
                <button 
                  onClick={() => handleAction("Profile records updated successfully!")}
                  className="flex items-center gap-2 bg-blue-900 dark:bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-600 text-white px-6 py-2.5 text-sm font-bold shadow-sm transition-colors border border-blue-950"
                >
                  <Save size={16} /> Update Records
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SECURITY */}
          {activeTab === "security" && (
            <div className="max-w-3xl animate-in fade-in duration-300">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-slate-700 pb-3 mb-6">Security & Access Control</h3>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 p-5">
                  <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-sm uppercase">Change Password</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 mb-1">Current Password</label>
                      <input type="password" placeholder="Enter current password" className="w-full border border-gray-400 dark:border-slate-600 p-2 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-900 outline-none text-sm max-w-md" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 mb-1">New Password</label>
                      <input type="password" placeholder="Enter new password" className="w-full border border-gray-400 dark:border-slate-600 p-2 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-900 outline-none text-sm max-w-md" />
                    </div>
                    {/* WIRED BUTTON */}
                    <button 
                      onClick={() => handleAction("Security password updated successfully!")}
                      className="bg-gray-800 dark:bg-slate-600 hover:bg-black text-white px-4 py-2 text-xs font-bold transition-colors mt-2"
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 p-5">
                  <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-sm uppercase">Session & Authentication</h4>
                  <div className="space-y-4">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input type="checkbox" className="form-checkbox mt-1 h-4 w-4 text-blue-900 border-gray-400" defaultChecked />
                      <div>
                        <span className="block text-sm font-bold text-gray-800 dark:text-gray-200">Require Two-Factor Authentication (2FA)</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Mandatory OTP sent to registered mobile number upon login.</span>
                      </div>
                    </label>
                    
                    <div className="pt-2">
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 mb-1">Idle Session Timeout</label>
                      <select className="border border-gray-400 dark:border-slate-600 p-2 text-sm bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-white focus:ring-1 focus:ring-blue-900 outline-none w-48">
                        <option>15 Minutes</option>
                        <option>30 Minutes</option>
                        <option>1 Hour</option>
                      </select>
                    </div>
                    {/* WIRED BUTTON */}
                    <button 
                      onClick={() => handleAction("Session policies saved!")}
                      className="bg-gray-800 dark:bg-slate-600 hover:bg-black text-white px-4 py-2 text-xs font-bold transition-colors mt-2"
                    >
                      Save Security Policies
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <div className="max-w-3xl animate-in fade-in duration-300">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-slate-700 pb-3 mb-6">Alerts & Notifications</h3>
              
              <div className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 p-6 space-y-5">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-900 border-gray-400" defaultChecked />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Send email alert on new user registrations</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-900 border-gray-400" defaultChecked />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">SMS alert for failed payment transactions</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-900 border-gray-400" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Weekly automated summary report via email</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-900 border-gray-400" defaultChecked />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Security alerts (Unusual login attempts)</span>
                </label>
                
                <div className="mt-6 pt-5 border-t border-gray-300 dark:border-slate-700">
                  {/* WIRED BUTTON */}
                  <button 
                    onClick={() => handleAction("Notification preferences have been saved!")}
                    className="bg-blue-900 dark:bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 text-sm font-bold shadow-sm transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SYSTEM CONFIG */}
          {activeTab === "system" && (
            <div className="max-w-3xl animate-in fade-in duration-300">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-slate-700 pb-3 mb-6">System Configuration</h3>
              
              <div className="bg-white dark:bg-slate-800 border border-red-300 dark:border-red-900 p-6 mb-6">
                <h4 className="font-bold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2 text-sm uppercase">
                  <Shield size={16} /> Restricted Zone
                </h4>
                <label className="flex items-start space-x-3 cursor-pointer p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50">
                  <input type="checkbox" className="form-checkbox mt-1 h-5 w-5 text-red-700 border-gray-400" />
                  <div>
                    <span className="block text-sm font-bold text-red-900 dark:text-red-300">Enable Maintenance Mode</span>
                    <span className="text-xs text-red-700 dark:text-red-400/80">WARNING: This will restrict all public access to the portal immediately. Only super-admins will be able to log in.</span>
                  </div>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 p-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase">Active Financial Year</label>
                  <select className="w-full border border-gray-400 dark:border-slate-600 p-2.5 text-sm bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-white focus:ring-1 focus:ring-blue-900 outline-none">
                    <option>2023 - 2024</option>
                    <option selected>2024 - 2025</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase">Data Sync Frequency</label>
                  <select className="w-full border border-gray-400 dark:border-slate-600 p-2.5 text-sm bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-white focus:ring-1 focus:ring-blue-900 outline-none">
                    <option>Real-time</option>
                    <option selected>Every 1 Hour</option>
                    <option>End of Day</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                {/* WIRED BUTTON */}
                <button 
                  onClick={() => handleAction("System configurations applied successfully!")}
                  className="bg-green-700 dark:bg-green-600 hover:bg-green-800 text-white px-6 py-2.5 text-sm font-bold shadow-sm transition-colors border border-green-900"
                >
                  Apply System Changes
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;
import React, { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  UserX,
  Download,
  Clock3,
  ShieldCheck,
  UserCheck,
  ChevronDown,
  RefreshCcw,
  FileDown,
  UserPlus,
  Filter,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const usersData = [
  {
    id: "TCH1001",
    name: "Ramesh Kumar",
    email: "ramesh@gmail.com",
    phone: "9876543210",
    district: "Hyderabad",
    school: "Govt High School",
    role: "Teacher",
    status: "Active",
    joining: "12 Jun 2024",
  },
  {
    id: "TCH1002",
    name: "Sita Devi",
    email: "sita@gmail.com",
    phone: "9123456780",
    district: "Warangal",
    school: "ZPHS School",
    role: "Head Master",
    status: "Pending",
    joining: "05 Jun 2024",
  },
  {
    id: "TCH1003",
    name: "Anil Sharma",
    email: "anil@gmail.com",
    phone: "9988776655",
    district: "Karimnagar",
    school: "Govt Primary School",
    role: "Teacher",
    status: "Suspended",
    joining: "01 Jun 2024",
  },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [exportOpen, setExportOpen] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [refreshOpen, setRefreshOpen] = useState(false);
  const [pageOpen, setPageOpen] = useState(false);

  /* DOWNLOAD POPUP */
  const [downloadPopup, setDownloadPopup] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState("");

  /* PAGINATION */
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  /* DOWNLOAD FUNCTION */
  const handleDownload = (type) => {
    setDownloadMessage(`${type} downloaded successfully`);
    setDownloadPopup(true);
    setTimeout(() => {
      setDownloadPopup(false);
    }, 3000);
    setExportOpen(false);
  };

  /* NEXT PAGE */
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  /* PREVIOUS PAGE */
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-5 transition-colors duration-300">
      {/* DOWNLOAD SUCCESS POPUP */}
      {downloadPopup && (
        <div className="fixed top-6 right-6 z-[100] animate-bounce">
          <div className="bg-white dark:bg-slate-800 border border-green-200 dark:border-slate-700 shadow-2xl rounded-2xl px-5 py-4 flex items-center gap-4 min-w-[320px]">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-2xl">
              ✅
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Download Completed
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {downloadMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Users Management
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Manage teachers, officers and admin users
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">
          {/* EXPORT BUTTON */}
          <div className="relative">
            <button
              onClick={() => setExportOpen(!exportOpen)}
              className="bg-white dark:bg-slate-900 px-4 py-2 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              <Download size={16} />
              Export
              <ChevronDown size={16} />
            </button>

            {exportOpen && (
              <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 z-50">
                <button
                  onClick={() => handleDownload("PDF")}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700 text-sm text-slate-700 dark:text-slate-200"
                >
                  <FileDown size={16} className="text-blue-600" />
                  Export PDF
                </button>
                <button
                  onClick={() => handleDownload("Excel")}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-700 text-sm text-slate-700 dark:text-slate-200"
                >
                  <FileDown size={16} className="text-orange-500" />
                  Export Excel
                </button>
                <button
                  onClick={() => handleDownload("CSV")}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-sm text-slate-700 dark:text-slate-200"
                >
                  <Download size={16} />
                  Download CSV
                </button>
              </div>
            )}
          </div>

          {/* ADD USER BUTTON */}
          <div className="relative">
            <button
              onClick={() => setAddUserOpen(!addUserOpen)}
              className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-5 py-2 rounded-xl shadow-sm flex items-center gap-2 hover:scale-105 transition-all duration-300 text-sm"
            >
              <Plus size={16} />
              Add User
              <ChevronDown size={16} />
            </button>

            {addUserOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 z-50">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-700 text-sm text-slate-700 dark:text-slate-200">
                  <UserPlus size={16} className="text-orange-500" />
                  Add Teacher
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700 text-sm text-slate-700 dark:text-slate-200">
                  <Users size={16} className="text-blue-600" />
                  Add Officer
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-sm text-slate-700 dark:text-slate-200">
                  <ShieldCheck size={16} />
                  Add Admin
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Total Users", val: "12,540", icon: Users, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
          { title: "Active Teachers", val: "10,210", icon: UserCheck, color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/30" },
          { title: "Pending Users", val: "1,240", icon: Clock3, color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30" },
          { title: "Suspended Users", val: "142", icon: UserX, color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/30" },
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{s.title}</p>
                <h2 className="text-3xl font-bold mt-2 dark:text-white">{s.val}</h2>
              </div>
              <div className={`${s.bg} p-3 rounded-2xl`}>
                <s.icon size={24} className={s.color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SEARCH & FILTERS */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          <div className="relative xl:col-span-2">
            <Search size={16} className="absolute left-4 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by teacher name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-200 dark:border-slate-700 bg-transparent dark:text-white rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="border border-slate-200 dark:border-slate-700 bg-transparent dark:text-slate-300 rounded-xl px-4 py-3 text-sm outline-none">
            <option>All Districts</option>
          </select>
          <select className="border border-slate-200 dark:border-slate-700 bg-transparent dark:text-slate-300 rounded-xl px-4 py-3 text-sm outline-none">
            <option>All Roles</option>
          </select>
          <select className="border border-slate-200 dark:border-slate-700 bg-transparent dark:text-slate-300 rounded-xl px-4 py-3 text-sm outline-none">
            <option>All Status</option>
          </select>
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mb-6">
        <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Users List</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage all registered users</p>
          </div>
          <button
            onClick={() => setRefreshOpen(!refreshOpen)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700 transition flex items-center gap-2"
          >
            <RefreshCcw size={16} /> Refresh
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr className="text-left text-sm text-slate-700 dark:text-slate-300">
                {["Teacher ID", "Name", "Email", "Phone", "District", "School", "Role", "Status", "Joining", "Actions"].map((h) => (
                  <th key={h} className="p-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index} className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  <td className="p-4 text-sm dark:text-slate-300">{user.id}</td>
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-sm">
                      {user.name.charAt(0)}
                    </div>
                    <span className="font-medium text-sm dark:text-white">{user.name}</span>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400 text-sm">{user.email}</td>
                  <td className="p-4 text-sm dark:text-slate-300">{user.phone}</td>
                  <td className="p-4 text-sm dark:text-slate-300">{user.district}</td>
                  <td className="p-4 text-sm dark:text-slate-300">{user.school}</td>
                  <td className="p-4 text-sm dark:text-slate-300">{user.role}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.status === "Active" ? "bg-green-100 text-green-700" : user.status === "Pending" ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm dark:text-slate-300">{user.joining}</td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600"><Eye size={16} /></button>
                      <button className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600"><Edit size={16} /></button>
                      <button className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
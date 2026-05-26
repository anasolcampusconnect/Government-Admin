import React, { useState } from "react";
import {
  IndianRupee,
  Search,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Bell,
  RefreshCcw,
  Filter,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const paymentStats = [
  { title: "Total Revenue", value: "₹24.5L", icon: IndianRupee, color: "bg-green-100", textColor: "text-green-600" },
  { title: "Successful Payments", value: "10,240", icon: CheckCircle, color: "bg-blue-100", textColor: "text-blue-600" },
  { title: "Pending Payments", value: "1,240", icon: Clock, color: "bg-yellow-100", textColor: "text-yellow-600" },
  { title: "Failed Transactions", value: "142", icon: XCircle, color: "bg-red-100", textColor: "text-red-600" },
];

const monthlyRevenue = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4500 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 7000 },
];

const paymentStatus = [
  { name: "Success", value: 75 },
  { name: "Pending", value: 20 },
  { name: "Failed", value: 5 },
];

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

const paymentsData = [
  { paymentId: "PAY1001", teacher: "Ramesh Kumar", amount: "₹2,500", type: "Salary", district: "Hyderabad", date: "12 Jun 2024", status: "Success" },
  { paymentId: "PAY1002", teacher: "Sita Devi", amount: "₹3,200", type: "Pension", district: "Warangal", date: "10 Jun 2024", status: "Pending" },
  { paymentId: "PAY1003", teacher: "Anil Sharma", amount: "₹1,800", type: "Membership", district: "Karimnagar", date: "08 Jun 2024", status: "Failed" },
];

export default function PaymentsPage() {
  const [search, setSearch] = useState("");
  const [exportOpen, setExportOpen] = useState(false);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [refreshOpen, setRefreshOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const totalPages = 3;

  const addNotification = (type, message) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setNotifications((prev) => prev.filter((item) => item.id !== id)), 3000);
  };

  const filteredPayments = paymentsData.filter((p) => p.teacher.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-5 transition-colors duration-300">
      
      {/* Notifications */}
      <div className="fixed top-5 right-5 z-[100] space-y-3">
        {notifications.map((note) => (
          <div key={note.id} className={`min-w-[320px] rounded-2xl shadow-2xl p-4 flex items-start gap-3 border ${note.type === "success" ? "bg-green-50 dark:bg-green-900/20 border-green-200" : "bg-blue-50 dark:bg-blue-900/20 border-blue-200"}`}>
            <div className="mt-1">{note.type === "success" ? <CheckCircle className="text-green-600" size={22} /> : <Bell className="text-blue-600" size={22} />}</div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">Notification</h3>
              <p className="text-sm text-gray-600 dark:text-slate-300 mt-1">{note.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Payments Management</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1 text-sm">Manage teacher payments and financial records</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button onClick={() => setExportOpen(!exportOpen)} className="bg-white dark:bg-slate-900 px-4 py-2 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
            <Download size={16} /> Export Report <ChevronDown size={16} />
          </button>
          <button onClick={() => setInvoiceOpen(!invoiceOpen)} className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow-sm flex items-center gap-2 text-sm">
            <FileText size={16} /> Generate Invoice <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {paymentStats.map((item, index) => (
          <div key={index} className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 dark:text-slate-400 text-sm">{item.title}</p>
                <h2 className="text-3xl font-bold mt-3 dark:text-white">{item.value}</h2>
              </div>
              <div className={`${item.color} dark:bg-slate-700 p-3 rounded-2xl`}>
                <item.icon size={26} className={item.textColor} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-5 xl:col-span-2">
          <h3 className="text-2xl font-semibold mb-5 dark:text-white">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyRevenue}>
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
              <Bar dataKey="revenue" fill="#2563eb" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-5">
          <h3 className="text-2xl font-semibold mb-5 dark:text-white">Payment Status</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={paymentStatus} dataKey="value" outerRadius={100} label>
                {paymentStatus.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold dark:text-white">Payments List</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm"><RefreshCcw size={16} /> Refresh</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-800">
              <tr className="text-left text-sm text-slate-700 dark:text-slate-300">
                {["Payment ID", "Teacher", "Amount", "Type", "District", "Date", "Status", "Actions"].map(h => <th key={h} className="p-4">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((p, i) => (
                <tr key={i} className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  <td className="p-4 font-medium dark:text-slate-300">{p.paymentId}</td>
                  <td className="p-4 dark:text-slate-300">{p.teacher}</td>
                  <td className="p-4 font-semibold dark:text-white">{p.amount}</td>
                  <td className="p-4 dark:text-slate-300">{p.type}</td>
                  <td className="p-4 dark:text-slate-300">{p.district}</td>
                  <td className="p-4 dark:text-slate-300">{p.date}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${p.status === "Success" ? "bg-green-100 text-green-700" : p.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{p.status}</span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <button className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600"><Eye size={16} /></button>
                    <button className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600"><CheckCircle size={16} /></button>
                    <button className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600"><XCircle size={16} /></button>
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
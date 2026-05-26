import React, { useState } from "react";

import {
  Users,
  IndianRupee,
  UserCheck,
  AlertCircle,
  TrendingUp,
  FileText,
  ArrowRight,
  ChevronDown,
  Eye,
  Download,
  Bell,
  UserPlus,
  ClipboardList,
  X,
  BarChart3,
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
  LineChart,
  Line,
} from "recharts";

/* ================= DATA ================= */

const stats = [
  {
    title: "Total Teachers",
    value: "12,540",
    icon: Users,
    bg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Active Users",
    value: "10,210",
    icon: UserCheck,
    bg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Pending Payments",
    value: "1,240",
    icon: AlertCircle,
    bg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Total Revenue",
    value: "₹24.5L",
    icon: IndianRupee,
    bg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
];

const monthlyData = [
  { month: "Jan", payments: 4000 },
  { month: "Feb", payments: 3000 },
  { month: "Mar", payments: 5000 },
  { month: "Apr", payments: 4500 },
  { month: "May", payments: 6000 },
  { month: "Jun", payments: 7000 },
  { month: "Jul", payments: 6500 },
  { month: "Aug", payments: 7200 },
  { month: "Sep", payments: 6800 },
  { month: "Oct", payments: 7600 },
  { month: "Nov", payments: 8200 },
  { month: "Dec", payments: 9100 },
];

const paymentStatus = [
  { name: "Card", value: 70 },
  { name: "Online", value: 20 },
  { name: "Cash", value: 10 },
];

const COLORS = ["#2563eb", "#60a5fa", "#bfdbfe"];

const activities = [
  {
    user: "Ramesh Kumar",
    action: "Completed salary payment",
    time: "2 mins ago",
  },
  {
    user: "Sita Devi",
    action: "Uploaded teacher documents",
    time: "10 mins ago",
    
  },
  {
    user: "Admin",
    action: "Posted new notice",
    time: "1 hour ago",
  },
  {
    user: "Vikram Singh",
    action: "New teacher registration",
    time: "2 hours ago",
  },
  {
    user: "Priya Sharma",
    action: "Approved leave request",
    time: "3 hours ago",
  },
];

const notices = [
  "Teacher Transfer Notice 2026",
  "Salary Increment Circular",
  "Updated Pension Rules",
  "District Meeting Schedule",
];

const teachers = [
  {
    name: "Vikram Singh",
    email: "vikram@gmail.com",
    date: "12 Jun 2024",
  },
  {
    name: "Anita Sharma",
    email: "anita@gmail.com",
    date: "11 Jun 2024",
  },
  {
    name: "Deepak Verma",
    email: "deepak@gmail.com",
    date: "10 Jun 2024",
  },
  {
    name: "Rahul Mehta",
    email: "rahul@gmail.com",
    date: "09 Jun 2024",
  },
  {
    name: "Sneha Reddy",
    email: "sneha@gmail.com",
    date: "08 Jun 2024",
  },
];

/* ================= DROPDOWN ================= */

function ViewAllDropdown({ title }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex justify-end">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 min-w-[120px] rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-md hover:scale-105 transition-all duration-300"
      >
        View All

        <ArrowRight size={14} />

        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-14 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-blue-100 dark:border-slate-700 overflow-hidden z-50">
          <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-slate-700 dark:to-slate-800 border-b border-blue-100 dark:border-slate-700">
            <h3 className="font-bold text-slate-800 dark:text-white text-sm">
              {title} Options
            </h3>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Quick access actions
            </p>
          </div>

          <div className="p-2 space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700 transition text-sm text-slate-700 dark:text-slate-200">
              <Eye size={16} className="text-blue-600" />
              View Complete List
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700 transition text-sm text-slate-700 dark:text-slate-200">
              <Download size={16} className="text-blue-600" />
              Download Report
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700 transition text-sm text-slate-700 dark:text-slate-200">
              <Bell size={16} className="text-blue-600" />
              Notifications
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700 transition text-sm text-slate-700 dark:text-slate-200">
              <UserPlus size={16} className="text-blue-600" />
              Add New Entry
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700 transition text-sm text-slate-700 dark:text-slate-200">
              <ClipboardList size={16} className="text-blue-600" />
              Manage Records
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= SMALL REPORT MODAL ================= */

function ReportModal({ open, setOpen }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">

        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600">

          <div>
            <h2 className="text-sm font-bold text-white">
              User Growth Report
            </h2>

            <p className="text-blue-100 text-[10px] mt-1">
              Analytics Overview
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
          >
            <X size={14} className="text-white" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-3">

          {/* CHART */}
          <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-3 border border-slate-200 dark:border-slate-800 mb-3">

            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                Monthly Analysis
              </h3>

              <div className="flex items-center gap-1 text-blue-600 text-[10px] font-semibold">
                <BarChart3 size={11} />
                Analytics
              </div>
            </div>

            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={monthlyData}>

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 8 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 8 }}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#0f172a",
                    color: "#fff",
                    fontSize: "10px",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="payments"
                  stroke="#ff7a00"
                  strokeWidth={2}
                  dot={{
                    r: 2,
                    strokeWidth: 1,
                    fill: "#fff",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* TABLE */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden mb-3">

            <div className="bg-slate-100 dark:bg-slate-800 px-3 py-2">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                Monthly Breakdown
              </h3>
            </div>

            <div className="max-h-32 overflow-y-auto">

              <table className="w-full">

                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                      Month
                    </th>

                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                      Users
                    </th>

                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {monthlyData.map((item, index) => (
                    <tr
                      key={index}
                      className="border-t border-slate-100 dark:border-slate-800"
                    >
                      <td className="px-3 py-2 text-[11px] text-slate-700 dark:text-slate-300">
                        {item.month}
                      </td>

                      <td className="px-3 py-2 text-[11px] text-slate-700 dark:text-slate-300">
                        {item.payments}
                      </td>

                      <td className="px-3 py-2">
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-[8px] font-semibold">
                          Growth
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-2">

            <button className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              Export
            </button>

            <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-semibold hover:scale-105 transition">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= DASHBOARD ================= */

export default function Dashboard() {

  const [reportOpen, setReportOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-5 transition-colors duration-300">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Dashboard
        </h1>

        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">
          Welcome to the Official Admin Portal
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-xs">
                  {item.title}
                </p>

                <h2 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">
                  {item.value}
                </h2>

                <div className="flex items-center gap-1 mt-2 text-orange-500 text-[11px] font-semibold">
                  <TrendingUp size={12} />
                  <span>8.5% growth</span>
                </div>
              </div>

              <div className={`${item.bg} dark:bg-blue-900/40 p-3 rounded-xl`}>
                <item.icon
                  size={20}
                  className={item.iconColor}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CHART SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">

        {/* BAR CHART */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 xl:col-span-2 h-[520px]">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Monthly Payments
            </h2>

            <button className="px-3 py-1 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-500 font-medium text-xs hover:bg-orange-200 transition">
              This Year
            </button>
          </div>

          <ResponsiveContainer width="100%" height={430}>
            <BarChart
              data={monthlyData}
              barCategoryGap="35%"
            >
              <XAxis
                dataKey="month"
                stroke="#94a3b8"
                fontSize={11}
              />

              <YAxis
                stroke="#94a3b8"
                fontSize={11}
              />

              <Tooltip cursor={{ fill: "#eff6ff" }} />

              <Bar
                dataKey="payments"
                fill="#ff7a00"
                radius={[8, 8, 0, 0]}
                barSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PAYMENT STATUS */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 h-[520px]">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Payment Status
            </h2>

            <button className="text-xs font-semibold text-orange-500">
              Monthly
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="text-center">
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Total Bill
              </p>

              <h3 className="font-bold text-lg text-slate-800 dark:text-white mt-1">
                165
              </h3>
            </div>

            <div className="text-center">
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                AVG Value
              </p>

              <h3 className="font-bold text-lg text-slate-800 dark:text-white mt-1">
                ₹76K
              </h3>
            </div>

            <div className="text-center">
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Peak Hour
              </p>

              <h3 className="font-bold text-lg text-slate-800 dark:text-white mt-1">
                9 AM
              </h3>
            </div>
          </div>

          <div className="relative flex items-center justify-center mt-8">

            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={paymentStatus}
                  dataKey="value"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  cornerRadius={12}
                >
                  {paymentStatus.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute text-center">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                ₹3,577
              </h2>

              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mt-1">
                Total Payment
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-4 mb-5 flex-wrap">

            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>

              <p className="text-xs text-slate-600 dark:text-slate-400">
                Card 70%
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>

              <p className="text-xs text-slate-600 dark:text-slate-400">
                Online 20%
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-200"></div>

              <p className="text-xs text-slate-600 dark:text-slate-400">
                Cash 10%
              </p>
            </div>
          </div>

          <button className="w-full py-2 rounded-xl border border-blue-600 text-blue-600 dark:text-blue-400 text-sm font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
            View Details
          </button>
        </div>
      </div>

      {/* LOWER SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">

        {/* RECENT ACTIVITIES */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Recent Activities
            </h2>

            <ViewAllDropdown title="Activities" />
          </div>

          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-3 hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded-lg transition"
              >
                <div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                    {activity.user}
                  </h4>

                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                    {activity.action}
                  </p>
                </div>

                <span className="text-[10px] text-slate-400">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* LATEST NOTICES */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Latest Notices
            </h2>

            <ViewAllDropdown title="Notices" />
          </div>

          <div className="space-y-3">
            {notices.map((notice, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-blue-50 dark:bg-slate-800 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white dark:bg-slate-700 p-2 rounded-lg shadow-sm">
                    <FileText
                      size={16}
                      className="text-blue-600"
                    />
                  </div>

                  <p className="font-medium text-sm text-slate-800 dark:text-slate-200">
                    {notice}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT TEACHERS */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Recent Teachers
            </h2>

            <ViewAllDropdown title="Teachers" />
          </div>

          <div className="space-y-3">
            {teachers.map((teacher, index) => (
              <div
                key={index}
                className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3 hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded-lg transition"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-sm text-sm">
                  {teacher.name.charAt(0)}
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                    {teacher.name}
                  </h4>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {teacher.email}
                  </p>
                </div>

                <span className="text-[10px] text-slate-400">
                  {teacher.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* USER GROWTH */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 h-[500px]">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            User Growth
          </h2>

          <button
            onClick={() => setReportOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-lg hover:scale-105 transition-all duration-300"
          >
            View Report
          </button>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyData}>

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
                backgroundColor: "#1e293b",
                color: "#fff"
              }}
            />

            <Line
              type="monotone"
              dataKey="payments"
              stroke="#ff7a00"
              strokeWidth={3}
              dot={{
                r: 4,
                strokeWidth: 3,
                fill: "white",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* REPORT MODAL */}
      <ReportModal
        open={reportOpen}
        setOpen={setReportOpen}
      />
    </div>
  );
}
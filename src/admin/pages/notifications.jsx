import React, { useState } from "react";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock3,
  Search,
  ShieldAlert,
  FileText,
  XCircle,
  CheckCheck,
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    title: "Teacher Verification Approved",
    message:
      "12 teacher verification requests have been approved successfully.",
    type: "success",
    time: "10 Minutes Ago",
    status: "Unread",
  },
  {
    id: 2,
    title: "Pending District Approval",
    message:
      "Warangal district still has 24 applications pending verification.",
    type: "warning",
    time: "45 Minutes Ago",
    status: "Unread",
  },
  {
    id: 3,
    title: "Monthly MIS Report Generated",
    message:
      "The monthly MIS performance report has been generated successfully.",
    type: "info",
    time: "Today, 10:30 AM",
    status: "Read",
  },
  {
    id: 4,
    title: "New Administrative Officer Added",
    message:
      "A new district administrative officer account has been created.",
    type: "success",
    time: "Yesterday",
    status: "Read",
  },
  {
    id: 5,
    title: "Payment Verification Failed",
    message:
      "Some challan payments failed verification due to bank mismatch.",
    type: "danger",
    time: "Yesterday",
    status: "Unread",
  },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [activeFilter, setActiveFilter] = useState("All");

  const [searchTerm, setSearchTerm] = useState("");

  // ---------------- FILTERED DATA ----------------
  const filteredNotifications = notifications.filter((item) => {

    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      activeFilter === "All"
        ? true
        : item.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  // ---------------- COUNTS ----------------
  const unreadCount = notifications.filter(
    (item) => item.status === "Unread"
  ).length;

  const readCount = notifications.filter(
    (item) => item.status === "Read"
  ).length;

  // ---------------- MARK SINGLE AS READ ----------------
  const handleMarkRead = (id) => {
    const updated = notifications.map((item) =>
      item.id === id
        ? { ...item, status: "Read" }
        : item
    );

    setNotifications(updated);
  };

  // ---------------- MARK ALL AS READ ----------------
  const handleMarkAllRead = () => {
    const updated = notifications.map((item) => ({
      ...item,
      status: "Read",
    }));

    setNotifications(updated);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] dark:bg-slate-950 p-6 transition-colors duration-300">

      {/* MAIN CONTAINER */}
      <div className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 border-t-4 border-t-blue-900 dark:border-t-blue-500 shadow-sm overflow-hidden transition-colors duration-300">

        {/* HEADER */}
        <div className="px-6 py-5 border-b border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 flex flex-col lg:flex-row lg:items-center lg:justify-between transition-colors duration-300">

          <div>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-blue-950 dark:text-blue-400">
              Notification Center
            </h1>

            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1">
              Directorate of Government Teachers Association
            </p>
          </div>

          <button
            onClick={handleMarkAllRead}
            className="mt-4 lg:mt-0 flex items-center gap-2 bg-blue-900 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-700 text-white px-5 py-2 text-sm font-bold transition-colors"
          >
            <CheckCheck size={17} />
            Mark All As Read
          </button>
        </div>

        {/* SUMMARY */}
        <div className="p-6 bg-gray-100 dark:bg-slate-950 border-b border-gray-300 dark:border-slate-700 transition-colors duration-300">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <SummaryCard
              title="Total Notifications"
              value={notifications.length}
              color="blue"
              icon={<Bell size={22} />}
            />

            <SummaryCard
              title="Unread Alerts"
              value={unreadCount}
              color="orange"
              icon={<AlertTriangle size={22} />}
            />

            <SummaryCard
              title="Read Notifications"
              value={readCount}
              color="green"
              icon={<CheckCircle2 size={22} />}
            />

            <SummaryCard
              title="System Warnings"
              value={
                notifications.filter(
                  (item) => item.type === "danger"
                ).length
              }
              color="red"
              icon={<ShieldAlert size={22} />}
            />
          </div>
        </div>

        {/* SEARCH + FILTER */}
        <div className="p-6 border-b border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 transition-colors duration-300">

          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

            {/* SEARCH */}
            <div className="relative w-full lg:max-w-md">

              <Search
                size={18}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                placeholder="Search notifications..."
                className="w-full border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 py-2.5 pl-10 pr-4 text-sm text-gray-800 dark:text-white outline-none focus:ring-1 focus:ring-blue-900 dark:focus:ring-blue-500 transition-colors"
              />
            </div>

            {/* FILTERS */}
            <div className="flex flex-wrap gap-2">

              {["All", "Unread", "Read"].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveFilter(item)}
                  className={`px-4 py-2 text-sm font-bold border transition-colors ${
                    activeFilter === item
                      ? "bg-blue-900 dark:bg-blue-600 text-white border-blue-900 dark:border-blue-600"
                      : "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* NOTIFICATION LIST */}
        <div className="p-6 bg-gray-100 dark:bg-slate-950 transition-colors duration-300">

          <div className="space-y-4">

            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((item) => (
                <NotificationCard
                  key={item.id}
                  item={item}
                  onMarkRead={handleMarkRead}
                />
              ))
            ) : (
              <div className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 p-10 text-center transition-colors duration-300">

                <p className="text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">
                  No Notifications Found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- SUMMARY CARD ---------------- */

const SummaryCard = ({
  title,
  value,
  icon,
  color,
}) => {

  const colorStyles = {
    blue: "border-t-blue-600",
    green: "border-t-green-600",
    orange: "border-t-orange-500",
    red: "border-t-red-600",
  };

  return (
    <div
      className={`bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 border-t-4 p-5 shadow-sm transition-colors duration-300 ${colorStyles[color]}`}
    >
      <div className="flex items-center justify-between">

        <div>
          <p className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400">
            {title}
          </p>

          <h3 className="text-3xl font-black mt-2 text-gray-900 dark:text-white">
            {value}
          </h3>
        </div>

        <div className="text-gray-700 dark:text-gray-300">
          {icon}
        </div>
      </div>
    </div>
  );
};

/* ---------------- NOTIFICATION CARD ---------------- */

const NotificationCard = ({
  item,
  onMarkRead,
}) => {

  const iconMap = {
    success: (
      <CheckCircle2
        size={22}
        className="text-green-700 dark:text-green-400"
      />
    ),

    warning: (
      <AlertTriangle
        size={22}
        className="text-orange-600 dark:text-orange-400"
      />
    ),

    info: (
      <FileText
        size={22}
        className="text-blue-700 dark:text-blue-400"
      />
    ),

    danger: (
      <XCircle
        size={22}
        className="text-red-700 dark:text-red-400"
      />
    ),
  };

  return (
    <div
      className={`bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 shadow-sm transition-all duration-300 hover:shadow-md ${
        item.status === "Unread"
          ? "border-l-4 border-l-blue-900 dark:border-l-blue-500"
          : ""
      }`}
    >

      <div className="p-5 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">

        {/* LEFT */}
        <div className="flex gap-4">

          <div className="w-12 h-12 bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
            {iconMap[item.type]}
          </div>

          <div>

            <div className="flex items-center gap-2 flex-wrap">

              <h3 className="font-black text-gray-900 dark:text-white uppercase text-sm tracking-wide">
                {item.title}
              </h3>

              {item.status === "Unread" && (
                <span className="px-2 py-1 text-[10px] font-bold uppercase bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-300 dark:border-blue-800">
                  New
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
              {item.message}
            </p>

            <div className="flex items-center gap-2 mt-3 text-xs uppercase font-bold text-gray-500 dark:text-gray-400">
              <Clock3 size={14} />
              {item.time}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex gap-2">

          {item.status === "Unread" && (
            <button
              onClick={() => onMarkRead(item.id)}
              className="px-4 py-2 text-xs font-bold bg-blue-900 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-700 text-white transition-colors"
            >
              Mark Read
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
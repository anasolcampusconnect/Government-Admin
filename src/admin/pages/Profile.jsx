import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  ShieldCheck,
  Building2,
  Landmark,
  BadgeCheck,
  Pencil,
  UserCog,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Clock3,
  FileText,
} from "lucide-react";

const GovernmentProfile = () => {
  return (
    <div className="min-h-screen bg-[#f4f7fb] dark:bg-slate-950 transition-colors duration-300 p-6">
      
      {/* MAIN CONTAINER */}
      <div className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 border-t-4 border-t-blue-900 dark:border-t-blue-500 shadow-sm rounded-sm overflow-hidden transition-colors duration-300">

        {/* HEADER */}
        <div className="px-6 py-5 border-b border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 flex flex-col lg:flex-row lg:items-center lg:justify-between transition-colors duration-300">
          
          <div>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-blue-950 dark:text-blue-400">
              Administrator Profile
            </h1>

            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1">
              Directorate of Government Teachers Association
            </p>
          </div>

          <button className="mt-4 lg:mt-0 flex items-center gap-2 bg-blue-900 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-700 text-white px-5 py-2 text-sm font-bold shadow-sm transition-colors">
            <Pencil size={16} />
            Edit Profile
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 bg-gray-100 dark:bg-slate-950 transition-colors duration-300">

          <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6">

            {/* LEFT SIDEBAR */}
            <div className="space-y-6">

              {/* PROFILE CARD */}
              <div className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 shadow-sm transition-colors duration-300">
                
                {/* TOP STRIP */}
                <div className="h-20 bg-blue-900 dark:bg-blue-600"></div>

                <div className="px-6 pb-6 relative">

                  {/* PROFILE IMAGE */}
                  <div className="flex justify-center">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="profile"
                      className="w-28 h-28 rounded-sm border-4 border-white dark:border-slate-900 shadow-md object-cover -mt-12"
                    />
                  </div>

                  {/* USER INFO */}
                  <div className="text-center mt-4">
                    <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-wide">
                      Rajesh Sharma
                    </h2>

                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-400 mt-1">
                      Senior Administrative Officer
                    </p>

                    <div className="mt-4 inline-flex items-center gap-2 border border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-4 py-2 text-xs font-bold uppercase">
                      <BadgeCheck size={15} />
                      Verified Administrator
                    </div>
                  </div>

                  {/* QUICK INFO */}
                  <div className="mt-6 border border-gray-300 dark:border-slate-700">

                    <InfoRow
                      icon={<ShieldCheck size={16} />}
                      label="Admin ID"
                      value="GOV-ADM-9214"
                    />

                    <InfoRow
                      icon={<Landmark size={16} />}
                      label="Department"
                      value="Education"
                    />

                    <InfoRow
                      icon={<Building2 size={16} />}
                      label="District"
                      value="Hyderabad"
                    />

                    <InfoRow
                      icon={<Clock3 size={16} />}
                      label="Last Active"
                      value="Today"
                    />
                  </div>
                </div>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-4">

                <div className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 border-t-4 border-t-green-600 p-4 shadow-sm transition-colors duration-300">
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white">
                    154
                  </h3>

                  <p className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 mt-1">
                    Teachers Managed
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 border-t-4 border-t-orange-500 p-4 shadow-sm transition-colors duration-300">
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white">
                    12
                  </h3>

                  <p className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 mt-1">
                    District Access
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="space-y-6">

              {/* PERSONAL INFO */}
              <SectionCard
                title="Personal Information"
                icon={<UserCog size={20} />}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <DetailCard
                    icon={<Mail size={18} />}
                    title="Official Email"
                    value="rajesh.admin@gov.in"
                  />

                  <DetailCard
                    icon={<Phone size={18} />}
                    title="Phone Number"
                    value="+91 98765 43210"
                  />

                  <DetailCard
                    icon={<MapPin size={18} />}
                    title="Office Address"
                    value="Secretariat, Hyderabad"
                  />

                  <DetailCard
                    icon={<CalendarDays size={18} />}
                    title="Joining Date"
                    value="12 March 2021"
                  />
                </div>
              </SectionCard>

              {/* QUALIFICATIONS + EXPERIENCE */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <SectionCard
                  title="Qualifications"
                  icon={<GraduationCap size={20} />}
                >
                  <TimelineItem
                    title="Master of Public Administration"
                    subtitle="Delhi University"
                  />

                  <TimelineItem
                    title="Governance & Policy"
                    subtitle="National Governance Institute"
                  />
                </SectionCard>

                <SectionCard
                  title="Work Experience"
                  icon={<Briefcase size={20} />}
                >
                  <TimelineItem
                    title="Senior Admin Officer"
                    subtitle="Education Ministry"
                  />

                  <TimelineItem
                    title="District Operations Head"
                    subtitle="Government Board"
                  />
                </SectionCard>
              </div>

              {/* RECENT ACTIVITY */}
              <SectionCard
                title="Recent Administrative Activity"
                icon={<FileText size={20} />}
              >
                <ActivityItem
                  title="Approved 12 teacher verification requests"
                  time="2 Hours Ago"
                />

                <ActivityItem
                  title="Generated district performance report"
                  time="Today, 2:15 PM"
                />

                <ActivityItem
                  title="Added new administrative officer"
                  time="Yesterday"
                />
              </SectionCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- REUSABLE COMPONENTS ---------------- */

const SectionCard = ({ title, icon, children }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 shadow-sm transition-colors duration-300">
      
      <div className="px-5 py-4 border-b border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 flex items-center gap-3 transition-colors duration-300">
        
        <div className="text-blue-900 dark:text-blue-400">
          {icon}
        </div>

        <h2 className="text-sm md:text-base font-black uppercase tracking-wide text-gray-800 dark:text-gray-100">
          {title}
        </h2>
      </div>

      <div className="p-5">
        {children}
      </div>
    </div>
  );
};

const DetailCard = ({ icon, title, value }) => {
  return (
    <div className="border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 p-4 transition-colors duration-300">
      
      <div className="flex items-start gap-3">

        <div className="text-blue-900 dark:text-blue-400 mt-1">
          {icon}
        </div>

        <div>
          <p className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400">
            {title}
          </p>

          <h3 className="font-bold text-gray-900 dark:text-white mt-1">
            {value}
          </h3>
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({ title, subtitle }) => {
  return (
    <div className="flex gap-4 pb-5 last:pb-0">

      <div className="flex flex-col items-center">
        <div className="w-3 h-3 bg-blue-900 dark:bg-blue-400 rounded-full"></div>
        <div className="w-[2px] flex-1 bg-gray-300 dark:bg-slate-700 mt-1"></div>
      </div>

      <div>
        <h3 className="font-bold text-gray-900 dark:text-white">
          {title}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

const ActivityItem = ({ title, time }) => {
  return (
    <div className="flex items-start gap-4 border-b border-gray-200 dark:border-slate-700 pb-4 mb-4 last:border-none last:pb-0 last:mb-0">

      <div className="bg-green-100 dark:bg-green-900/30 p-2">
        <CheckCircle2
          size={18}
          className="text-green-700 dark:text-green-400"
        />
      </div>

      <div>
        <h4 className="font-bold text-gray-900 dark:text-white">
          {title}
        </h4>

        <p className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mt-1">
          {time}
        </p>
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-300 dark:border-slate-700 p-3 last:border-none transition-colors duration-300">

      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <div className="text-blue-900 dark:text-blue-400">
          {icon}
        </div>

        <span className="text-xs uppercase font-bold">
          {label}
        </span>
      </div>

      <span className="text-sm font-bold text-gray-900 dark:text-white">
        {value}
      </span>
    </div>
  );
};

export default GovernmentProfile;
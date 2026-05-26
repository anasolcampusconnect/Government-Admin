import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Grid, List, Eye, Edit2, Trash2, CheckCircle2, 
  Calendar, MapPin, Users, Award, Percent, Download, Clock, 
  X, UploadCloud, Tag, FileText, Share2, ShieldCheck, Mail, 
  QrCode, Users2, FileSpreadsheet, Send,
  RefreshCw,
  Info
} from 'lucide-react';

export default function Activities() {
  // View Toggle and Dynamic Filtering States
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Interactive Upload Form States
  const [uploadedBanner, setUploadedBanner] = useState(null);
  const [uploadedPdf, setUploadedPdf] = useState(null);

  // Modals & Details Selection States
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Activity Categories List
  const categories = ["Workshop", "Webinar", "Seminar", "Training", "Awareness Program", "Competition"];

  // Global Activity Statistics Cards
  const stats = [
    { title: 'Total Campaigns', value: '184 Live', icon: Calendar, color: 'text-[#432fd3]', bg: 'bg-indigo-50 dark:bg-indigo-950/20' },
    { title: 'Registered Teachers', value: '5,120 Pool', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/20' },
    { title: 'Certificates Dispatched', value: '2,890 Vault', icon: Award, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/20' },
    { title: 'Premium Revenue Pool', value: '₹2,14,260', icon: Percent, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-950/20' },
  ];

  // Rich Dummy Data Tailored for Hyderabad School Teachers Onboarding & Training
  const [activitiesData, setActivitiesData] = useState([
    {
      id: "ACT-2026-M01",
      title: "Advanced NEP 2026 Classroom Assessment & Pedagogical Workshop",
      description: "An intensive training blueprint curated for primary and high school teachers. Covers newly deployed evaluation matrices, structural grading shifts, and interactive micro-teaching frameworks inside digital smart schools.",
      category: "Workshop",
      dateTime: "May 28, 2026 • 10:30 AM",
      startDate: "2026-05-28",
      endDate: "2026-05-30",
      location: "HQ Seminar Hall, Madhapur, Hyderabad",
      type: "Premium",
      registeredCount: 450,
      registrationLimit: 500,
      status: "Published",
      speaker: "Dr. Aravind Rao (NCERT Consultant)",
      qrVerified: true,
      downloadTracking: 340,
      gallery: ["https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500&auto=format&fit=crop&q=80"],
      participants: [
        { name: "Suresh Nallamala", phone: "+91 98480 22334", status: "Approved" },
        { name: "Mohammad Ali", phone: "+91 99081 55678", status: "Pending" }
      ]
    },
    {
      id: "ACT-2026-M02",
      title: "Digital Literacy & AI Prompt Engineering Seminar for Educators",
      description: "A futuristic certified webinar focusing on secure classroom technology integration. Learn how to generate automated worksheets, spreadsheet marks matrices, and design virtual lesson plans safely.",
      category: "Webinar",
      dateTime: "June 02, 2026 • 02:00 PM",
      startDate: "2026-06-02",
      endDate: "2026-06-02",
      location: "Live Stream Portal (Online Link)",
      type: "Free",
      registeredCount: 1280,
      registrationLimit: 2000,
      status: "Published",
      speaker: "Sneha Murthy (EdTech Director)",
      qrVerified: true,
      downloadTracking: 912,
      gallery: ["https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=80"],
      participants: [
        { name: "Kiran Kumar", phone: "+91 91234 56780", status: "Approved" }
      ]
    },
    {
      id: "ACT-2026-M03",
      title: "State Level Mathematics Olympiad Strategy Awareness Program",
      description: "Strategic planning assembly mapping core mental aptitude tracking guidelines, advanced solution shortcuts, and student selection criteria benchmarks for upcoming scholarship tests.",
      category: "Awareness Program",
      dateTime: "June 15, 2026 • 11:00 AM",
      startDate: "2026-06-15",
      endDate: "2026-06-16",
      location: "JNTU Junction Conference Arena, Kukatpally",
      type: "Premium",
      registeredCount: 180,
      registrationLimit: 200,
      status: "Unpublished",
      speaker: "Ramesh Kondapalli (Senior Math Fellow)",
      qrVerified: false,
      downloadTracking: 0,
      gallery: ["https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&auto=format&fit=crop&q=80"],
      participants: []
    },
    {
      id: "ACT-2026-M04",
      title: "Innovative Classroom Teaching Strategies for Primary Teachers",
      description: "A comprehensive training session for primary teachers. Covers new teaching paradigms, innovative classroom management, and student engagement strategies.",
      category: "Workshop",
      dateTime: "May 28, 2026 • 10:30 AM",
      startDate: "2026-05-28",
      endDate: "2026-05-30",
      location: "HQ Seminar Hall, Madhapur, Hyderabad",
      type: "Premium",
      registeredCount: 450,
      registrationLimit: 500,
      status: "Published",
      speaker: "Dr. Aravind Rao (NCERT Consultant)",
      qrVerified: true,
      downloadTracking: 340,
      gallery: ["https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500&auto=format&fit=crop&q=80"],
      participants: [
        { name: "Suresh Nallamala", phone: "+91 98480 22334", status: "Approved" },
        { name: "Mohammad Ali", phone: "+91 99081 55678", status: "Pending" }   
      ]
    },
    {
      id: "ACT-2026-M05",
      title: "Enhanced Teaching Strategies for Secondary Teachers",
      description: "A specialized webinar for secondary teachers. Covers new teaching paradigms, innovative classroom management, and student engagement strategies.",
      category: "Webinar",
      dateTime: "June 02, 2026 • 02:00 PM", 
      startDate: "2026-06-02",
      endDate: "2026-06-02",
      location: "Live Stream Portal (Online Link)",
      type: "Free",
      registeredCount: 1280,
      registrationLimit: 2000,
      status: "Published",
      speaker: "Sneha Murthy (EdTech Director)",
      qrVerified: true,
      downloadTracking: 912,
      gallery: ["https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=80"],
      participants: [
        { name: "Kiran Kumar", phone: "+91 91234 56780", status: "Approved" }
      ]
    },  
    {
      id: "ACT-2026-M06",
      title: "State Level Mathematics Olympiad Strategy Awareness Program",
      description: "Strategic planning assembly mapping core mental aptitude tracking guidelines, advanced solution shortcuts, and student selection criteria benchmarks for upcoming scholarship tests.",
      category: "Awareness Program",
      dateTime: "June 15, 2026 • 11:00 AM",
      startDate: "2026-06-15",
      endDate: "2026-06-16",
      location: "JNTU Junction Conference Arena, Kukatpally",
      type: "Premium",
      registeredCount: 180,
      registrationLimit: 200,
      status: "Unpublished",
      speaker: "Ramesh Kondapalli (Senior Math Fellow)",
      qrVerified: false,
      downloadTracking: 0,
      gallery: ["https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&auto=format&fit=crop&q=80"],
      participants: []
    }
  ]);

  // Dynamic Search and Category Filtering Engine
  const filteredActivities = useMemo(() => {
    return activitiesData.filter(item => {
      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activitiesData, searchQuery, categoryFilter]);

  // File Upload Handlers
  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (!file) return;
    const computedSize = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    if (fileType === 'pdf') setUploadedPdf({ name: file.name, size: computedSize });
    else setUploadedBanner({ name: file.name });
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto animate-fade-in pb-12 select-none text-gray-900 dark:text-white">
      
      {/* 👑 TITLE CONTROL BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#432fd3] dark:text-indigo-400" />
            Teacher Training & Activities Hub
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-400 mt-0.5">Deploy certified schooling workshops, manage participant registrations, approve certification templates, and track verification QR logs.</p>
        </div>
        
        <button 
          onClick={() => setIsCreateOpen(true)}
          className="bg-[#432fd3] hover:bg-[#3422ba] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest shadow-md shadow-indigo-100 dark:shadow-none flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          Create New Activity
        </button>
      </div>

      {/* 📊 PLATFORM CAMPAIGN METRICS COUNTERS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white dark:bg-slate-950 p-4 sm:p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 text-[#432fd3] dark:text-indigo-400 shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">{stat.title}</p>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5 tracking-tight">{stat.value}</h4>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔍 SEARCH AND DYNAMIC CLASSIFICATION FILTERS */}
      <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, location, keywords..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#432fd3] text-gray-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Category Tabs Filter Trigger */}
          <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-1 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setCategoryFilter('All')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                categoryFilter === 'All' ? 'bg-white dark:bg-slate-800 text-[#432fd3] dark:text-indigo-400 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              All Events
            </button>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  categoryFilter === cat ? 'bg-white dark:bg-slate-800 text-[#432fd3] dark:text-indigo-400 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid vs Table Layout Toggler */}
          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl p-1 bg-gray-50 dark:bg-slate-900 shrink-0">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-800 text-[#432fd3] dark:text-indigo-400 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              title="Grid Matrix Layout"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white dark:bg-slate-800 text-[#432fd3] dark:text-indigo-400 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              title="Ledger Table Layout"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 🚀 MAIN CONTENT WORKSPACE AREA */}
      {filteredActivities.length === 0 ? (
        <div className="bg-white dark:bg-slate-950 border dark:border-slate-800 rounded-2xl p-12 text-center text-gray-400 shadow-sm">
          <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#432fd3]" />
          <p className="font-bold text-sm text-slate-500">No training activities matched your parameter logs.</p>
        </div>
      ) : viewMode === 'grid' ? (
        
        /* 📰 NEWSCUTTING STYLED VINTAGE CARD MATRIX LAYOUT */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((item) => (
            <div 
              key={item.id} 
              onClick={() => { setSelectedActivity(item); setIsPreviewOpen(true); }}
              className="bg-white dark:bg-slate-950 border-2 border-zinc-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
              style={{ backgroundImage: 'linear-gradient(rgba(254,253,249,0.35) 95%, rgba(0,0,0,0.03) 100%)' }}
            >
              {/* Top Operational Status Ribbon Badge */}
              <div className="absolute top-0 right-0 z-10">
                <span className={`px-3 py-1 rounded-bl-xl text-[9px] font-black uppercase tracking-wider text-white ${
                  item.status === 'Published' ? 'bg-emerald-600' : 'bg-zinc-500'
                }`}>
                  {item.status}
                </span>
              </div>

              <div className="space-y-3.5">
                {/* ID Header Matrix */}
                <div className="flex justify-between items-center text-[10px] font-mono font-bold text-[#432fd3] dark:text-indigo-400 uppercase">
                  <span>{item.id} • {item.category}</span>
                  <span className={`px-2 py-0.5 rounded-md font-extrabold border ${
                    item.type === 'Premium' ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900/40' : 'text-slate-600 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700'
                  }`}>{item.type}</span>
                </div>

                {/* Newspaper Typography Headline Style Title text */}
                <h3 className="font-serif text-base font-black text-gray-900 dark:text-white leading-tight tracking-tight group-hover:text-[#432fd3] dark:group-hover:text-indigo-400 transition-colors line-clamp-2 pt-1 border-t-2 border-zinc-900 dark:border-slate-700">
                  {item.title}
                </h3>

                {/* Image Stream Block Canvas with shadow layout frames */}
                <div className="w-full h-36 bg-gray-100 dark:bg-slate-900 rounded-xl overflow-hidden border border-zinc-300 dark:border-slate-800 relative shadow-inner">
                  <img src={item.gallery[0]} alt="" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300" />
                  <div className="absolute inset-0 bg-black/5 opacity-10 group-hover:opacity-0 transition-opacity" />
                </div>

                {/* Location Map Pin Snip */}
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate"><MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" /> {item.location}</p>

                {/* Description clipping snippet abstracts */}
                <p className="text-xs text-gray-600 dark:text-slate-400 line-clamp-3 leading-relaxed font-sans text-justify">
                  {item.description}
                </p>

                {/* Custom Progress Bar for Registration limits tracking index */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                    <span>Seats Allocation Filled</span>
                    <span>{item.registeredCount} / {item.registrationLimit} Limit</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#432fd3] to-indigo-500 rounded-full" style={{ width: `${(item.registeredCount / item.registrationLimit) * 100}%` }} />
                  </div>
                </div>
              </div>

              {/* Card Base Footer Timestamps */}
              <div className="mt-4 pt-3 border-t border-dashed border-zinc-300 dark:border-slate-700 flex items-center justify-between text-[11px] text-gray-400 dark:text-slate-500 font-medium">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {item.dateTime}</span>
                <span className="bg-zinc-100 dark:bg-slate-800 text-zinc-700 dark:text-slate-300 font-black px-2 py-0.5 rounded text-[10px]">
                  👤 {item.speaker.split(' ')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        
        /* 📋 COMPREHENSIVE INDUSTRIAL DATA TABLE ACTIVITY REGISTRY */
        <div className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden animate-fade-in">
          <div className="p-4 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">System Deployment Campaign Archive</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  <th className="p-4 pl-6">Campaign ID</th>
                  <th className="p-4">Activity Presentation / Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Operational Window Schedule</th>
                  <th className="p-4">Location Hub Node</th>
                  <th className="p-4">Billing Framework</th>
                  <th className="p-4">Registrations Count</th>
                  <th className="p-4">Publish State</th>
                  <th className="p-4 text-center pr-6">Management Audit Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400">
                {filteredActivities.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/40 transition-colors">
                    <td className="p-4 pl-6 font-mono font-bold text-[#432fd3] dark:text-indigo-400">{item.id}</td>
                    <td className="p-4 flex items-center gap-3 max-w-xs">
                      <img src={item.gallery[0]} alt="" className="w-9 h-12 object-cover rounded shadow-sm border shrink-0 bg-gray-50 dark:bg-slate-900 filter grayscale" />
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white text-sm line-clamp-1 uppercase">{item.title}</p>
                        <p className="text-slate-400 dark:text-slate-500 text-[10px] font-medium mt-0.5">Speaker: {item.speaker}</p>
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap"><span className="bg-zinc-100 dark:bg-slate-800 text-zinc-700 dark:text-slate-300 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">{item.category}</span></td>
                    <td className="p-4 text-slate-500 dark:text-slate-400 font-mono whitespace-nowrap">{item.startDate} &rarr; {item.endDate}</td>
                    <td className="p-4 text-slate-500 dark:text-slate-400 max-w-xs truncate">{item.location}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${item.type === 'Premium' ? 'text-amber-700 bg-amber-50 dark:bg-amber-950/20' : 'text-slate-700 bg-slate-50 dark:bg-slate-900'}`}>{item.type}</span>
                    </td>
                    <td className="p-4 font-mono font-bold text-slate-700 dark:text-slate-400">{item.registeredCount} / {item.registrationLimit}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${item.status === 'Published' ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50' : 'bg-slate-50 text-slate-400 border-slate-200 dark:border-slate-700'}`}>{item.status}</span>
                    </td>
                    <td className="p-4 pr-6 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => { setSelectedActivity(item); setIsPreviewOpen(true); }} className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors" title="View Registration & Participant Dossier"><Eye className="w-4 h-4" /></button>
                        <button className="p-1.5 hover:bg-indigo-50 dark:hover:bg-slate-800 text-[#432fd3] dark:text-indigo-400 rounded-lg transition-colors" title="Edit Parameters Matrix"><Edit2 className="w-4 h-4" /></button>
                        <button className="p-1.5 hover:bg-rose-50 dark:hover:bg-slate-800 text-rose-600 dark:text-rose-400 rounded-lg transition-colors" title="De-authorize Campaign"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ➕ CREATE ACTIVITY / POLICY CONFIGURATIONS FORM MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-950 rounded-2xl shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto flex flex-col border dark:border-slate-800">
            
            <div className="p-5 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-950 z-10">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-tight">Deploy New Activity Policy</h2>
              <button onClick={() => setIsCreateOpen(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-900 rounded-lg text-gray-400"><X className="w-5 h-5" /></button>
            </div>

            <form className="p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Activity Campaign Title *</label>
                  <input type="text" placeholder="e.g., Annual Math Seminar Guidelines" className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-[#432fd3] text-gray-900 dark:text-white" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Category Classification *</label>
                  <select className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-[#432fd3] text-gray-900 dark:text-white">
                    {categories.map((c, i) => <option key={i}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Event Description & Abstract Framework *</label>
                <textarea rows="2" placeholder="Detail the pedagogical methodologies, learning metrics, or system guidelines discussed..." className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-[#432fd3] text-gray-900 dark:text-white" required></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Start Date *</label>
                  <input type="date" className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-[#432fd3] text-gray-900 dark:text-white" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">End Date *</label>
                  <input type="date" className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-[#432fd3] text-gray-900 dark:text-white" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Registration Capacity *</label>
                  <input type="number" placeholder="e.g., 500" className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-[#432fd3] text-gray-900 dark:text-white" required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Location / Online Stream Link *</label>
                  <input type="text" placeholder="e.g., Hyderabad Center Hub or Zoom URL" className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-[#432fd3] text-gray-900 dark:text-white" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Primary Speaker / Presenter Details *</label>
                  <input type="text" placeholder="e.g., Dr. Smith (NCERT consultant)" className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-[#432fd3] text-gray-900 dark:text-white" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-slate-900 p-3 rounded-xl border dark:border-slate-800">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center uppercase tracking-wide">Billing Architecture</span>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase">Free</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#432fd3]"></div>
                  </label>
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase">Premium</span>
                </div>
              </div>

              {/* Functional Drop Drag Upload Slots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="border-2 border-dashed border-gray-200 dark:border-slate-800 hover:border-[#432fd3] rounded-xl p-4 text-center cursor-pointer transition-colors bg-gray-50/50 dark:bg-slate-900/50 block">
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'img')} />
                  <UploadCloud className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                  <span className="block text-xs font-bold text-gray-700 dark:text-slate-300">{uploadedBanner ? "✓ Banner Ready" : "Upload Banner Image"}</span>
                </label>

                <label className="border-2 border-dashed border-gray-200 dark:border-slate-800 hover:border-[#432fd3] rounded-xl p-4 text-center cursor-pointer transition-colors bg-gray-50/50 dark:bg-slate-900/50 block">
                  <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleFileChange(e, 'pdf')} />
                  <FileText className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                  <span className="block text-xs font-bold text-gray-700 dark:text-slate-300">{uploadedPdf ? "✓ Booklet Attached" : "Attach Reference PDF / Syllabus"}</span>
                  {uploadedPdf && <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5 truncate max-w-full">{uploadedPdf.name} ({uploadedPdf.size})</span>}
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setIsCreateOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-900 rounded-xl">Cancel</button>
                <button type="submit" onClick={() => setIsCreateOpen(false)} className="px-5 py-2 bg-[#432fd3] hover:bg-[#3422ba] text-white rounded-xl text-sm font-semibold shadow-md">Publish Activity</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 📄 DETAILED REGISTRATION & CERTIFICATES DOSSIER MODAL */}
      {isPreviewOpen && selectedActivity && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col border dark:border-slate-800 animate-scale-up">
            
            {"/* Modal Dossier Header */"}
            <div className="p-4 border-b bg-slate-50 dark:bg-slate-900 border-gray-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400 tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#432fd3] dark:text-indigo-400" />
                <span>Campaign Participant Ledger & Verification Dossier</span>
              </div>
              <button onClick={() => { setIsPreviewOpen(false); setSelectedActivity(null); }} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-400"><X className="w-5 h-5" /></button>
            </div>

            {/* Modal Content Scroll Canvas */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-amber-50/5 dark:bg-slate-950/40">
              
              {/* Retro Press Header Title Banner */}
              <div className="text-center space-y-2 border-b-4 border-double border-zinc-800 dark:border-slate-700 pb-4">
                <span className="text-[10px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950/40 text-[#432fd3] dark:text-indigo-400 px-2.5 py-0.5 rounded">{selectedActivity.id}</span>
                <h2 className="font-serif font-black text-xl sm:text-2xl text-gray-900 dark:text-white leading-tight uppercase">"{selectedActivity.title}"</h2>
                <p className="text-xs text-slate-400 dark:text-slate-400 mt-1">Classification Category: <strong className="text-slate-800 dark:text-slate-200">{selectedActivity.category}</strong> • Lead Speaker: <strong className="dark:text-slate-200">{selectedActivity.speaker}</strong></p>
              </div>

              {/* Layout Split: Core Metrics and Auto Certificate QR block */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                
                {/* Left Mini Column: QR Auto Certificate Tracking Widget */}
                <div className="md:col-span-2 border border-zinc-300 dark:border-slate-800 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-inner text-center space-y-4">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b dark:border-slate-800 pb-1.5">Certificates Module</p>
                  <div className="bg-slate-100 dark:bg-slate-950 p-6 rounded-xl inline-block border-2 border-dashed border-zinc-300 dark:border-slate-800 shadow-inner">
                    <QrCode size={90} className="text-zinc-800 dark:text-slate-200 mx-auto" />
                  </div>
                  <div className="text-[11px] space-y-1 text-slate-500 dark:text-slate-400 font-semibold">
                    <p className="flex justify-between"><span>QR Verification:</span> <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{selectedActivity.qrVerified ? "Enabled & Active" : "Disabled"}</strong></p>
                    <p className="flex justify-between"><span>Download Tracker:</span> <strong className="text-slate-800 dark:text-slate-200">{selectedActivity.downloadTracking} Files</strong></p>
                  </div>
                  <button className="w-full bg-[#432fd3] hover:bg-[#3422ba] text-white py-2 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center justify-center gap-1">
                    <RefreshCw size={12} /> Auto Certificate Generation
                  </button>
                </div>

                {/* Right Major Column: Participants Registry List and Actions */}
                <div className="md:col-span-3 space-y-4">
                  <div className="flex justify-between items-center border-b dark:border-slate-800 pb-2">
                    <h4 className="font-serif font-bold text-gray-800 dark:text-slate-200 text-sm uppercase tracking-wide flex items-center gap-1"><Users2 size={16} /> Participants Roster</h4>
                    <button className="inline-flex items-center gap-1 border border-zinc-300 dark:border-slate-800 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase text-slate-700 dark:text-slate-300 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800">
                      <FileSpreadsheet size={12} className="text-emerald-600 dark:text-emerald-400" /> Export Excel/PDF
                    </button>
                  </div>

                  {/* Registered Attendees Mini List Logs Container */}
                  <div className="space-y-2 max-h-44 overflow-y-auto pr-1 scrollbar-none">
                    {selectedActivity.participants.length > 0 ? (
                      selectedActivity.participants.map((user, uIdx) => (
                        <div key={uIdx} className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl p-3 flex justify-between items-center text-xs font-semibold shadow-sm">
                          <div>
                            <p className="text-slate-900 dark:text-white font-bold">{user.name}</p>
                            <p className="text-slate-400 dark:text-slate-500 font-medium font-mono text-[10px] mt-0.5">{user.phone}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            user.status === 'Approved' ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40' : 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/40 animate-pulse'
                          }`}>{user.status}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-6 text-slate-400 dark:text-slate-500 text-xs font-medium">No registered teacher entries captured inside this pool container node.</p>
                    )}
                  </div>
                  
                  {selectedActivity.participants.length > 0 && (
                    <button className="w-full bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-400 text-[10px] font-black uppercase tracking-wider py-2 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1">
                      <Mail size={12} /> Broadcast Reminders to Pending Users
                    </button>
                  )}
                </div>

              </div>

              {/* Infrastructure system rule abstract policy notification banner */}
              <div className="bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 rounded-xl p-3.5 flex gap-2.5 text-xs text-indigo-950 dark:text-indigo-400 font-medium">
                <Info size={16} className="text-[#432fd3] dark:text-indigo-400 shrink-0 mt-0.5" />
                <span>Platform Directive Matrix: Publishing/Unpublishing campaigns immediately recalibrates dynamic registry pipelines across teacher smartphone nodes during authentication sequences.</span>
              </div>
            </div>

            {/* Modal Actions Footer Bar */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 flex justify-end gap-2">
              <button onClick={() => setIsPreviewOpen(false)} className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-1 white dark:bg-slate-950">Close Canvas</button>
              {selectedActivity.status === 'Published' ? (
                <button 
                  onClick={() => {
                    setActivitiesData(prev => prev.map(a => a.id === selectedActivity.id ? { ...a, status: "Unpublished" } : a));
                    setIsPreviewOpen(false);
                  }}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm shadow-rose-100"
                >
                  Unpublish Campaign
                </button>
              ) : (
                <button 
                  onClick={() => {
                    setActivitiesData(prev => prev.map(a => a.id === selectedActivity.id ? { ...a, status: "Published" } : a));
                    setIsPreviewOpen(false);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm shadow-emerald-100"
                >
                  Publish Campaign Live
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
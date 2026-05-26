import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Crown, Download, Users, Grid, List, Eye, Trash2, Edit2, 
  Video, FileText, Layers, X, UploadCloud, BarChart2, Calendar, Tag, 
  DollarSign, Play, ShieldAlert, Clock
} from 'lucide-react';

export default function PremiumContent() {
  // View Toggle State (grid or table)
  const [viewMode, setViewMode] = useState('grid');
  
  // Modals & Selection States
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [activeType, setActiveType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive Upload States
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [uploadedPdf, setUploadedPdf] = useState(null);
  const [uploadedThumbnail, setUploadedThumbnail] = useState(null);

  // Content Types List
  const contentTypes = ["PDFs", "Videos", "Courses", "Mock Tests", "Study Materials", "Recorded Classes"];

  // System Stats
  const stats = [
    { id: 1, title: 'Total Premium Content', value: '312', icon: Crown, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/20' },
    { id: 2, title: 'Active Subscribers', value: '1,840', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-950/20' },
    { id: 3, title: 'Revenue', value: '₹4,85,000', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/20' },
    { id: 4, title: 'Video Views', value: '92,450', icon: Video, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/20' },
    { id: 5, title: 'Downloads', value: '14,890', icon: Download, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-950/20' },
  ];

  // Rich Dummy Data tailored for School Teachers & Educators
  const [premiumData, setPremiumData] = useState([
    {
      id: 1,
      title: "Advanced Classroom Management & Student Psychology Course",
      description: "An exclusive multi-chapter masterclass detailing modern pedagogical approaches, behavioral correction frameworks, and empathy-driven teaching tactics for primary and high school educators.",
      contentType: "Courses",
      category: "Pedagogy",
      membershipPlan: "Yearly Plan",
      uploadDate: "2026-05-24",
      views: 4520,
      downloads: 890,
      status: "Active",
      isLocked: true,
      expiryDate: "2027-12-31",
      downloadOption: "Enabled",
      watermarking: "Enabled",
      chapters: ["Introduction to Behavior", "Positive Reinforcement", "Parent-Teacher Alignments"],
      tags: ["Psychology", "ClassroomManagement", "Pedagogy"],
      thumbnail: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      title: "National Talent Search Examination (NTSE) Comprehensive Mock Test Bank",
      description: "Complete printable and interactive simulation sets curated specifically for school teachers to evaluate and prepare brilliant students for state level scholarship benchmarks.",
      contentType: "Mock Tests",
      category: "Scholarship Exams",
      membershipPlan: "Monthly Plan",
      uploadDate: "2026-05-22",
      views: 3120,
      downloads: 2450,
      status: "Active",
      isLocked: true,
      expiryDate: "2026-11-30",
      downloadOption: "Enabled",
      watermarking: "Enabled",
      chapters: [],
      tags: ["NTSE", "MockTest", "Olympiad"],
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      title: "Digital Lesson Plan Layouts for Secondary Mathematics (Geometry)",
      description: "Premium visual assets, downloadable PDF guidebooks, and dynamic geometry slide decks designed to introduce interactive learning into high school smart boards.",
      contentType: "Study Materials",
      category: "Mathematics",
      membershipPlan: "Yearly Plan",
      uploadDate: "2026-05-18",
      views: 1840,
      downloads: 940,
      status: "Active",
      isLocked: false,
      expiryDate: "2027-05-01",
      downloadOption: "Enabled",
      watermarking: "Enabled",
      chapters: [],
      tags: ["Maths", "Geometry", "LessonPlans"],
      thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 4,
      title: "Recorded Class: ICT Integration and AI Tools for Educators",
      description: "Full streaming support master session demonstrating how to use modern digital tools, automated spreadsheet marks counters, and interactive presentation modules safely in classrooms.",
      contentType: "Recorded Classes",
      category: "Technology",
      membershipPlan: "Monthly Plan",
      uploadDate: "2026-05-15",
      views: 5890,
      downloads: 410,
      status: "Active",
      isLocked: true,
      expiryDate: "2026-12-31",
      downloadOption: "Disabled",
      watermarking: "Enabled",
      chapters: ["Understanding ICT", "Prompt Engineering for Teachers", "Digital Grading Matrix"],
      tags: ["AI", "ICT", "EdTech"],
      thumbnail: "https://images.unsplash.com/photo-1516534775068-ba3e84589d90?w=500&auto=format&fit=crop&q=80"
    }
  ]);

  // Handle Dynamic Filtering & Searching
  const filteredContent = useMemo(() => {
    return premiumData.filter(item => {
      const matchesType = activeType === 'All' || item.contentType === activeType;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesType && matchesSearch;
    });
  }, [premiumData, activeType, searchQuery]);

  // Interactive Upload Logics
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const sizeStr = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    if (type === 'pdf') setUploadedPdf({ name: file.name, size: sizeStr });
    else if (type === 'video') setUploadedVideo({ name: file.name, size: sizeStr });
    else setUploadedThumbnail({ name: file.name });
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto animate-fade-in text-gray-900 dark:text-white">
      
      {/* 👑 TITLE HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-[#432fd3] dark:text-indigo-400">Premium Educational Content</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">Manage premium resources, restrict content access, and monitor subscriptions.</p>
        </div>
        
        <button 
          onClick={() => setIsUploadOpen(true)}
          className="bg-[#432fd3] hover:bg-[#3422ba] text-white px-5 py-2.5 rounded-xl font-medium shadow-md shadow-indigo-100 dark:shadow-none flex items-center justify-center gap-2 transition-all shrink-0"
        >
          <Plus className="w-5 h-5" />
          Upload Premium Content
        </button>
      </div>

      {/* 📊 FIVE TOP METRICS MATRIX */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider line-clamp-1">{stat.title}</p>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">{stat.value}</h4>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔍 DYNAMIC CONTROLS & FILTERING */}
      <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative w-full lg:w-80">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, tags, plans..." 
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#432fd3] text-sm text-gray-900 dark:text-white"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
            <button 
              onClick={() => setActiveType('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${activeType === 'All' ? 'bg-[#432fd3] text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'}`}
            >
              All Content
            </button>
            {contentTypes.map((type, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${activeType === type ? 'bg-[#432fd3] text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'}`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* View Mode Switching */}
          <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-xl p-1 bg-gray-50 dark:bg-slate-900 shrink-0">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-800 text-[#432fd3] dark:text-indigo-400 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white dark:bg-slate-800 text-[#432fd3] dark:text-indigo-400 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 🖥️ CORE WORKSPACE */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        
        {/* VIEW LOADER CONTAINER */}
        <div className="xl:col-span-2">
          {filteredContent.length === 0 ? (
            <div className="bg-white dark:bg-slate-950 border dark:border-slate-800 rounded-2xl p-12 text-center text-gray-400">
              <Crown className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No premium data logs matched your dynamic variables.</p>
            </div>
          ) : viewMode === 'grid' ? (
            
            /* 📰 NEWSCUTTING STYLED CONTENT GRID */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredContent.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => { setSelectedContent(item); setIsPreviewOpen(true); }}
                  className="bg-white dark:bg-slate-950 border-2 border-zinc-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                  style={{ backgroundImage: 'linear-gradient(rgba(253,252,248,0.3) 95%, rgba(0,0,0,0.03) 100%)' }}
                >
                  <div className="absolute top-0 right-0 bg-[#432fd3] text-white p-2 rounded-bl-xl shadow-sm z-10 flex items-center gap-1">
                    {item.isLocked ? <Crown className="w-3.5 h-3.5 fill-white" /> : <Eye className="w-3.5 h-3.5" />}
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-bold tracking-wider uppercase text-zinc-400 dark:text-slate-500">
                      <span>{item.contentType} • {item.category}</span>
                      <span className="text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md font-extrabold border border-amber-100 dark:border-amber-900/60">{item.membershipPlan}</span>
                    </div>

                    {/* Newspaper Vintage Headline */}
                    <h3 className="font-serif text-lg font-black text-gray-900 dark:text-white leading-tight tracking-tight group-hover:text-[#432fd3] dark:group-hover:text-indigo-400 transition-colors line-clamp-2 pt-1 border-t-2 border-zinc-900 dark:border-slate-700">
                      {item.title}
                    </h3>

                    {/* Premium Thumbnail Canvas */}
                    <div className="w-full h-36 bg-gray-100 dark:bg-slate-900 rounded-lg overflow-hidden border border-zinc-300 dark:border-slate-800 relative">
                      <img src={item.thumbnail} alt="" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300" />
                      {item.contentType === 'Videos' || item.contentType === 'Recorded Classes' ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/0 transition-colors">
                          <div className="bg-white/90 dark:bg-slate-950/90 p-2.5 rounded-full shadow-md text-[#432fd3] dark:text-indigo-400"><Play className="w-4 h-4 fill-[#432fd3] dark:fill-indigo-400" /></div>
                        </div>
                      ) : null}
                    </div>

                    <p className="text-xs text-gray-600 dark:text-slate-400 line-clamp-3 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  {/* Metadata Base */}
                  <div className="mt-4 pt-3 border-t border-dashed border-zinc-300 dark:border-slate-700 flex items-center justify-between text-[11px] text-gray-400 dark:text-slate-500 font-medium">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.uploadDate}</span>
                    <div className="flex items-center gap-3">
                      <span>👁️ {item.views}</span>
                      <span className="bg-zinc-100 dark:bg-slate-800 text-zinc-700 dark:text-slate-300 font-bold px-2 py-0.5 rounded">📥 {item.downloads}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            
            /* 📋 COMPREHENSIVE PREMIUM CONTENT TABLE */
            <div className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">Premium Registry Ledger</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 text-[11px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                      <th className="p-4 pl-6">Thumbnail / Title</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Plan</th>
                      <th className="p-4">Upload Date</th>
                      <th className="p-4">Views</th>
                      <th className="p-4">Downloads</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-center pr-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-800 text-sm">
                    {filteredContent.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/40 dark:hover:bg-slate-900/40 transition-colors">
                        <td className="p-4 pl-6 flex items-center gap-3 max-w-xs">
                          <img src={item.thumbnail} alt="" className="w-10 h-14 object-cover rounded shadow-sm border border-gray-200 dark:border-slate-800 shrink-0 bg-gray-100 dark:bg-slate-900" />
                          <span className="font-semibold text-gray-900 dark:text-white line-clamp-1">{item.title}</span>
                        </td>
                        <td className="p-4"><span className="bg-zinc-100 dark:bg-slate-800 text-zinc-700 dark:text-slate-300 px-2 py-0.5 rounded text-xs font-medium">{item.contentType}</span></td>
                        <td className="p-4 text-gray-500 dark:text-slate-400 whitespace-nowrap">{item.category}</td>
                        <td className="p-4"><span className="text-amber-700 dark:text-amber-500 text-xs font-bold">{item.membershipPlan}</span></td>
                        <td className="p-4 text-gray-400 dark:text-slate-500 whitespace-nowrap">{item.uploadDate}</td>
                        <td className="p-4 font-medium text-gray-600 dark:text-slate-400">{item.views.toLocaleString()}</td>
                        <td className="p-4 font-medium text-gray-600 dark:text-slate-400">{item.downloads.toLocaleString()}</td>
                        <td className="p-4">
                          <span className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full text-xs font-semibold border border-emerald-200 dark:border-emerald-900/50">{item.status}</span>
                        </td>
                        <td className="p-4 pr-6 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => { setSelectedContent(item); setIsPreviewOpen(true); }} className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white rounded-lg"><Eye className="w-4 h-4" /></button>
                            <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                            <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-rose-600 dark:text-rose-400 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* 🛠️ SUBSCRIPTION FEATURES & CONTROL HUB SIDEBAR */}
        <div className="space-y-6">
          
          {/* Subscription Features Block */}
          <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-50 dark:border-slate-800 pb-3">
              <Crown className="w-5 h-5 text-[#432fd3] dark:text-indigo-400" />
              <h3 className="font-bold text-gray-900 dark:text-white">Subscription Controls</h3>
            </div>
            
            <div className="space-y-2.5">
              <div className="bg-gray-50 dark:bg-slate-900 p-3 rounded-xl flex items-center justify-between text-xs border border-gray-100 dark:border-slate-800">
                <div>
                  <p className="font-bold text-gray-800 dark:text-white">Live Plan Configurations</p>
                  <p className="text-[11px] text-gray-400 dark:text-slate-500">Manage locks & threshold parameters</p>
                </div>
                <span className="text-gray-400 group-hover:text-[#432fd3] dark:group-hover:text-indigo-400 cursor-pointer font-bold">&rarr;</span>
              </div>
              
              <div className="bg-gray-50 dark:bg-slate-900 p-3 rounded-xl flex items-center justify-between text-xs border border-gray-100 dark:border-slate-800">
                <div>
                  <p className="font-bold text-gray-800 dark:text-white">Yearly Value Metrics</p>
                  <p className="text-[11px] text-gray-400 dark:text-slate-500">Discount models & token bundles</p>
                </div>
                <span className="text-gray-400 cursor-pointer font-bold">&rarr;</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button className="w-full bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100/70 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-400 text-xs font-bold py-2 rounded-xl transition-all">
                🔔 Trigger Automatic Renewal Reminders
              </button>
              <button className="w-full bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100/70 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-900 text-indigo-800 dark:text-indigo-400 text-xs font-bold py-2 rounded-xl transition-all">
                🚀 Push Smart Upgrade Prompts
              </button>
            </div>
          </div>

          {/* Access Control Overview Summary */}
          <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-gray-50 dark:border-slate-800 pb-2">
              <BarChart2 className="w-5 h-5 text-[#432fd3] dark:text-indigo-400" />
              <h3 className="font-bold text-gray-900 dark:text-white">Growth Tracking Analytics</h3>
            </div>
            
            <div className="space-y-2.5 text-xs text-gray-600 dark:text-slate-400">
              <div className="flex justify-between items-center">
                <span>Avg Video Watch Time</span>
                <strong className="text-gray-900 dark:text-white">42 mins/user</strong>
              </div>
              <div className="flex justify-between items-center">
                <span>PDF Downloads Today</span>
                <strong className="text-gray-900 dark:text-white">140 files</strong>
              </div>
              <div className="flex justify-between items-center">
                <span>Subscriber Growth Index</span>
                <span className="text-emerald-600 font-bold">+18.4%</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ➕ UPLOAD PREMIUM CONTENT FORM MODAL */}
      {isUploadOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-950 rounded-2xl shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto flex flex-col border dark:border-slate-800">
            
            <div className="p-5 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-950 z-10">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Upload Premium Asset</h2>
              <button onClick={() => setIsUploadOpen(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-900 rounded-lg text-gray-400"><X className="w-5 h-5" /></button>
            </div>

            <form className="p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Content Title *</label>
                  <input type="text" placeholder="Enter content title..." className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-[#432fd3] text-gray-900 dark:text-white" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Category / Topic *</label>
                  <input type="text" placeholder="e.g., Mathematics" className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-[#432fd3] text-gray-900 dark:text-white" required />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Content Description *</label>
                <textarea rows="2" placeholder="Provide extensive description info..." className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-[#432fd3] text-gray-900 dark:text-white" required></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Membership Plan</label>
                  <select className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-[#432fd3] text-gray-900 dark:text-white">
                    <option>Monthly Plan</option>
                    <option>Yearly Plan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Download Lock</label>
                  <select className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-[#432fd3] text-gray-900 dark:text-white">
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Expiry Date</label>
                  <input type="date" className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-[#432fd3] text-gray-900 dark:text-white" />
                </div>
              </div>

              {/* Access Security Configurations */}
              <div className="bg-zinc-50 dark:bg-slate-900 p-3 rounded-xl border border-zinc-100 dark:border-slate-800 grid grid-cols-2 gap-4 text-xs font-bold text-zinc-600 dark:text-slate-400">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-[#432fd3] focus:ring-[#432fd3]" />
                  <span>Enable Anti-piracy Watermarking</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-[#432fd3] focus:ring-[#432fd3]" />
                  <span>Lock Resource to Subscription</span>
                </label>
              </div>

              {/* Video URL or Stream Source Input */}
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Video Stream URL / Chapters Endpoint</label>
                <input type="url" placeholder="e.g., HLS stream source manifest link..." className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-[#432fd3] text-gray-900 dark:text-white" />
              </div>

              {/* Functional Drop Slots */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="border-2 border-dashed border-gray-200 dark:border-slate-800 hover:border-[#432fd3] rounded-xl p-3 text-center cursor-pointer transition-colors bg-gray-50/50 dark:bg-slate-900/50 block">
                  <input type="file" accept="video/*" className="hidden" onChange={(e) => handleFileChange(e, 'video')} />
                  <Video className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <span className="block text-[11px] font-bold text-gray-700 dark:text-slate-300 truncate">{uploadedVideo ? "✓ Video Sync" : "Video Asset"}</span>
                </label>

                <label className="border-2 border-dashed border-gray-200 dark:border-slate-800 hover:border-[#432fd3] rounded-xl p-3 text-center cursor-pointer transition-colors bg-gray-50/50 dark:bg-slate-900/50 block">
                  <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleFileChange(e, 'pdf')} />
                  <FileText className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <span className="block text-[11px] font-bold text-gray-700 dark:text-slate-300 truncate">{uploadedPdf ? "✓ PDF Ready" : "Upload PDF"}</span>
                </label>

                <label className="border-2 border-dashed border-gray-200 dark:border-slate-800 hover:border-[#432fd3] rounded-xl p-3 text-center cursor-pointer transition-colors bg-gray-50/50 dark:bg-slate-900/50 block">
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'img')} />
                  <UploadCloud className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <span className="block text-[11px] font-bold text-gray-700 dark:text-slate-300 truncate">{uploadedThumbnail ? "✓ Cover Sync" : "Cover Image"}</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Tags (Comma Separated)</label>
                <input type="text" placeholder="e.g., premium, rules" className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-[#432fd3] text-gray-900 dark:text-white" />
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setIsUploadOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#432fd3] hover:bg-[#3422ba] text-white rounded-xl text-sm font-semibold shadow-md">Deploy Asset</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 📄 NEWSCUTTING DOCK PREVIEW MODAL */}
      {isPreviewOpen && selectedContent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col border dark:border-slate-800">
            
            <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between bg-gray-50 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold uppercase text-zinc-400 tracking-wider">{selectedContent.contentType} Ledger</span>
              </div>
              <button onClick={() => { setIsPreviewOpen(false); setSelectedContent(null); }} className="p-1 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-lg text-gray-400"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6 bg-amber-50/10 dark:bg-slate-950/40 flex-1">
              <div className="text-center space-y-2 border-b-4 border-double border-zinc-800 dark:border-slate-700 pb-4">
                <h2 className="font-serif font-black text-2xl text-gray-900 dark:text-white leading-tight">{selectedContent.title}</h2>
                <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-400 font-medium">
                  <span>📅 Plan: <strong className="text-amber-600">{selectedContent.membershipPlan}</strong></span>
                  <span>•</span>
                  <span>Expiry: {selectedContent.expiryDate}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                <div className="md:col-span-2 border border-zinc-300 dark:border-slate-700 p-1 bg-white dark:bg-slate-900 rounded shadow-sm">
                  <img src={selectedContent.thumbnail} alt="" className="w-full h-auto object-cover rounded" />
                </div>
                <div className="md:col-span-3 space-y-4">
                  <h4 className="font-serif font-bold text-gray-800 dark:text-slate-200 text-sm border-b border-zinc-200 dark:border-slate-700 pb-1">PREMIUM EXTRACT</h4>
                  <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed text-justify first-letter:text-2xl first-letter:font-bold first-letter:mr-0.5">
                    {selectedContent.description}
                  </p>
                  
                  {/* Video Chapters Logic Flag Condition */}
                  {selectedContent.chapters?.length > 0 && (
                    <div className="space-y-1.5 bg-zinc-50 dark:bg-slate-900 p-2.5 rounded-xl border border-zinc-100 dark:border-slate-800">
                      <p className="text-[10px] uppercase font-bold text-[#432fd3] dark:text-indigo-400 tracking-wider flex items-center gap-1"><Clock className="w-3 h-3" /> Video Stream Chapters</p>
                      <ul className="text-[11px] text-zinc-500 dark:text-slate-400 list-decimal pl-4 space-y-0.5">
                        {selectedContent.chapters.map((ch, idx) => <li key={idx} className="font-medium">{ch} (Resume Supported)</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-zinc-900/5 dark:bg-slate-900/40 border border-dashed rounded-xl p-3 flex items-center gap-2 text-xs text-zinc-500 dark:text-slate-400">
                <ShieldAlert className="w-4 h-4 text-[#432fd3] dark:text-indigo-400 shrink-0" />
                <span>Security Engine Profile: Watermarking is <strong>{selectedContent.watermarking}</strong>. Content downloads are restricted via policy to verified browsers.</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex justify-end gap-2">
              <button className="bg-[#432fd3] text-white px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md">
                <Play className="w-3.5 h-3.5 fill-white" /> Open Media Viewer
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
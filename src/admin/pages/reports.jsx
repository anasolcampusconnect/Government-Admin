import { useState, useMemo } from "react";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { CheckCircle, Loader2 } from "lucide-react";

// Expanded Mock Data to properly test pagination
const MOCK_DATA = [
  { id: 1, refId: "TS-GTA-24-8839", name: "M. Srinivas Rao", empId: "1048829", role: "SGT", district: "Hyderabad", zone: "Khairatabad Zone", challan: "CHLN-899210-SBI", paymentStatus: "Success", status: "SANCTIONED" },
  { id: 2, refId: "TS-GTA-24-8840", name: "K. Lakshmi Devi", empId: "1059932", role: "School Asst.", district: "Warangal", zone: "Hanamkonda", challan: "CHLN-899215-UBI", paymentStatus: "Pending Clearance", status: "UNDER REVIEW" },
  { id: 3, refId: "TS-GTA-24-8841", name: "P. Rajesh Kumar", empId: "1061120", role: "SGT", district: "Karimnagar", zone: "Jammikunta", challan: "CHLN-899216-SBI", paymentStatus: "Success", status: "SANCTIONED" },
  { id: 4, refId: "TS-GTA-24-8842", name: "S. Anitha", empId: "1072234", role: "Principal", district: "Hyderabad", zone: "Secunderabad", challan: "CHLN-899217-HDFC", paymentStatus: "Failed", status: "REJECTED" },
  { id: 5, refId: "TS-GTA-24-8843", name: "V. Ramana", empId: "1083345", role: "School Asst.", district: "Nizamabad", zone: "Armoor", challan: "CHLN-899218-UBI", paymentStatus: "Pending Clearance", status: "UNDER REVIEW" },
  { id: 6, refId: "TS-GTA-24-8844", name: "D. Suresh", empId: "1094456", role: "SGT", district: "Hyderabad", zone: "Charminar", challan: "CHLN-899219-SBI", paymentStatus: "Success", status: "SANCTIONED" },
  { id: 7, refId: "TS-GTA-24-8845", name: "A. Bhavani", empId: "1105567", role: "Principal", district: "Warangal", zone: "Kazipet", challan: "CHLN-899220-HDFC", paymentStatus: "Success", status: "SANCTIONED" },
  { id: 8, refId: "TS-GTA-24-8846", name: "G. Mahesh", empId: "1116678", role: "School Asst.", district: "Karimnagar", zone: "Huzurabad", challan: "CHLN-899221-UBI", paymentStatus: "Pending Clearance", status: "UNDER REVIEW" },
  { id: 9, refId: "TS-GTA-24-8847", name: "N. Kavitha", empId: "1127789", role: "SGT", district: "Nizamabad", zone: "Bodhan", challan: "CHLN-899222-SBI", paymentStatus: "Failed", status: "REJECTED" },
  { id: 10, refId: "TS-GTA-24-8848", name: "B. Raju", empId: "1138890", role: "School Asst.", district: "Hyderabad", zone: "Golconda", challan: "CHLN-899223-SBI", paymentStatus: "Success", status: "SANCTIONED" },
  { id: 11, refId: "TS-GTA-24-8849", name: "K. Swathi", empId: "1149901", role: "SGT", district: "Warangal", zone: "Hasanparthy", challan: "CHLN-899224-HDFC", paymentStatus: "Success", status: "SANCTIONED" },
  { id: 12, refId: "TS-GTA-24-8850", name: "P. Vinay", empId: "1161012", role: "Principal", district: "Karimnagar", zone: "Choppadandi", challan: "CHLN-899225-UBI", paymentStatus: "Pending Clearance", status: "UNDER REVIEW" }
];

const Reports = () => {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState("memberships");
  const [selectedRowDetail, setSelectedRowDetail] = useState(null); 
  
  // Filter States
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [selectedCategory, setSelectedCategory] = useState("Premium Memberships");
  const [dateRange, setDateRange] = useState("");
  
  // Applied Filters & Loading State
  const [appliedFilters, setAppliedFilters] = useState({ district: "All Districts" });
  const [isGenerating, setIsGenerating] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "" });

  // Pagination State - Increased to 4 per page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; 

  // --- DATA PROCESSING ---
  const filteredData = useMemo(() => {
    if (appliedFilters.district === "All Districts") return MOCK_DATA;
    return MOCK_DATA.filter((row) => row.district === appliedFilters.district);
  }, [appliedFilters]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      setAppliedFilters({ district: selectedDistrict });
      setCurrentPage(1); 
      setIsGenerating(false);
      
      setNotification({ show: true, message: `Report generated for ${selectedDistrict}` });
      setTimeout(() => setNotification({ show: false, message: "" }), 3000);
    }, 600); 
  };

  // --- EXPORT HANDLERS ---
  const exportToExcel = () => {
    const excelData = filteredData.map((row, index) => ({
      "S.No": index + 1,
      "Application Ref ID": row.refId,
      "Employee Name": row.name,
      "Employee ID": row.empId,
      "Designation": row.role,
      "District": row.district,
      "Mandal/Zone": row.zone,
      "Challan Ref": row.challan,
      "Payment Status": row.paymentStatus,
      "Approval Status": row.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "MIS_Report");
    XLSX.writeFile(workbook, `MIS_Report_${appliedFilters.district}.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.setTextColor(30, 58, 138); 
    doc.text("Management Information System (MIS) Report", 14, 15);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`District: ${appliedFilters.district} | Generated: ${new Date().toLocaleDateString()}`, 14, 22);

    const tableColumns = ["S.No", "Ref ID", "Employee Info", "Location", "Payment Ref", "Status"];
    const tableRows = filteredData.map((row, index) => [
      index + 1,
      row.refId,
      `${row.name}\n(ID: ${row.empId})`,
      `${row.district}\n${row.zone}`,
      `${row.challan}\n${row.paymentStatus}`,
      row.status
    ]);

    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 28,
      theme: 'grid',
      headStyles: { fillColor: [30, 58, 138], textColor: 255 }, 
      styles: { fontSize: 8, cellPadding: 3 },
    });

    doc.save(`MIS_Report_${appliedFilters.district}.pdf`);
  };

  const handleExport = (type) => {
    if (filteredData.length === 0) return alert("No data to export!");
    if (type === "print") window.print();
    else if (type === "excel") exportToExcel();
    else if (type === "pdf") exportToPDF();
  };

  return (
    <>
      <style type="text/css" media="print">
        {`
          @page { size: landscape; margin: 10mm; }
          body * { visibility: hidden; }
          #printable-report, #printable-report * { visibility: visible; }
          #printable-report { position: absolute; left: 0; top: 0; width: 100%; }
        `}
      </style>

      <div className="bg-white dark:bg-slate-900 shadow-sm border border-gray-300 dark:border-slate-700 border-t-4 border-t-blue-900 dark:border-t-blue-500 min-h-screen relative transition-colors duration-300 print:border-none print:shadow-none print:bg-white print:m-0 print:p-0" id="printable-report">

        {notification.show && (
          <div className="absolute top-6 right-6 bg-green-600 text-white px-6 py-3 rounded-md shadow-lg flex items-center gap-3 animate-in slide-in-from-top-5 z-50 print:hidden">
            <CheckCircle size={20} />
            <span className="font-bold text-sm">{notification.message}</span>
          </div>
        )}

        {/* Official Header Area */}
        <div className="p-6 border-b border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center print:hidden transition-colors duration-300">
          <div>
            <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-400 tracking-tight uppercase transition-colors">Management Information System (MIS) Reports</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm font-semibold transition-colors">Directorate of Government Teachers Association</p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300 transition-colors">Financial Year: 2024-2025</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors">Last Synced: Today, 10:45 AM</p>
          </div>
        </div>

        {/* Action Bar & Filters */}
        <div className="p-6 border-b border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 print:hidden transition-colors duration-300">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase">Select District</label>
              <select 
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full border border-gray-400 dark:border-slate-600 p-2 text-sm bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 focus:ring-1 focus:ring-blue-900 dark:focus:ring-blue-500 outline-none transition-colors"
              >
                <option>All Districts</option>
                <option>Hyderabad</option>
                <option>Warangal</option>
                <option>Karimnagar</option>
                <option>Nizamabad</option>
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase">Report Category</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-400 dark:border-slate-600 p-2 text-sm bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 focus:ring-1 focus:ring-blue-900 dark:focus:ring-blue-500 outline-none transition-colors"
              >
                <option>Premium Memberships</option>
                <option>Pending Approvals</option>
                <option>Revenue Collection</option>
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase">Date Range</label>
              <input 
                type="date" 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full border border-gray-400 dark:border-slate-600 p-2 text-sm bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 focus:ring-1 focus:ring-blue-900 dark:focus:ring-blue-500 outline-none transition-colors" 
              />
            </div>
            <div>
              <button 
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="flex items-center gap-2 bg-blue-900 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-700 text-white px-6 py-2 text-sm font-bold shadow-sm transition-colors border border-blue-950 dark:border-blue-800 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isGenerating ? <Loader2 className="animate-spin" size={16} /> : null}
                {isGenerating ? "Processing..." : "Generate Report"}
              </button>
            </div>
          </div>
        </div>

        {/* Master Summary Dashboard */}
        <div className="p-6 bg-gray-100 dark:bg-slate-950 border-b border-gray-300 dark:border-slate-700 transition-colors duration-300 print:bg-white print:border-none print:p-0 print:mb-6">
          <div className="hidden print:block text-center mb-6">
            <h2 className="text-xl font-bold text-black uppercase">Directorate of Government Teachers Association</h2>
            <p className="text-md text-gray-700 font-semibold">Management Information System (MIS) - {appliedFilters.district}</p>
          </div>

          <h3 className="text-md font-bold text-gray-800 dark:text-gray-100 mb-4 border-l-4 border-blue-900 dark:border-blue-500 pl-2 print:text-black">State-wide Abstract (FY 24-25)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print:gap-2">
            <div className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 p-4 shadow-sm border-t-2 border-t-blue-500 transition-colors print:shadow-none print:border-black">
              <h4 className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 mb-1 print:text-gray-800">Total Registrations</h4>
              <p className="text-2xl font-black text-gray-900 dark:text-white print:text-black">{MOCK_DATA.length}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 p-4 shadow-sm border-t-2 border-t-green-600 transition-colors print:shadow-none print:border-black">
              <h4 className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 mb-1 print:text-gray-800">Filtered Results</h4>
              <p className="text-2xl font-black text-green-700 dark:text-green-400 print:text-black">{filteredData.length}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 p-4 shadow-sm border-t-2 border-t-orange-500 transition-colors print:shadow-none print:border-black">
              <h4 className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 mb-1 print:text-gray-800">Pending Verification</h4>
              <p className="text-2xl font-black text-orange-600 dark:text-orange-400 print:text-black">
                {filteredData.filter(r => r.status === "UNDER REVIEW").length}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 p-4 shadow-sm border-t-2 border-t-purple-600 transition-colors print:shadow-none print:border-black">
              <h4 className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 mb-1 print:text-gray-800">Total Remittance (INR)</h4>
              <p className="text-2xl font-black text-purple-700 dark:text-purple-400 print:text-black">₹ 1,28,45,000</p>
            </div>
          </div>
        </div>

        {/* Official Data Table Section */}
        <div className="p-6 print:p-0">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-md font-bold text-gray-800 dark:text-gray-100 border-l-4 border-blue-900 dark:border-blue-500 pl-2 print:text-black">Detailed Beneficiary Record</h3>
            
            <div className="flex gap-2 text-sm print:hidden">
              <button onClick={() => handleExport('pdf')} className="flex items-center gap-1 border border-gray-400 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 px-3 py-1 hover:bg-red-50 dark:hover:bg-slate-700 font-semibold text-red-700 dark:text-red-400 transition-colors">
                PDF
              </button>
              <button onClick={() => handleExport('excel')} className="flex items-center gap-1 border border-gray-400 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 px-3 py-1 hover:bg-green-50 dark:hover:bg-slate-700 font-semibold text-green-700 dark:text-green-400 transition-colors">
                Excel
              </button>
              <button onClick={() => handleExport('print')} className="flex items-center gap-1 border border-gray-400 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 px-3 py-1 hover:bg-blue-50 dark:hover:bg-slate-700 font-semibold text-blue-700 dark:text-blue-400 transition-colors">
                Print
              </button>
            </div>
          </div>

          <div className="overflow-x-auto print:overflow-visible border border-gray-400 dark:border-slate-600 shadow-sm transition-colors print:shadow-none print:border-black">
            <table className="w-full text-left border-collapse bg-white dark:bg-slate-900 print:bg-white print:text-black">
              <thead>
                <tr className="bg-blue-900 dark:bg-slate-800 text-white text-xs uppercase tracking-wider transition-colors print:bg-gray-200 print:text-black">
                  <th className="p-3 border border-gray-400 dark:border-slate-600 print:border-black font-semibold text-center">S.No</th>
                  <th className="p-3 border border-gray-400 dark:border-slate-600 print:border-black font-semibold">Application Ref ID</th>
                  <th className="p-3 border border-gray-400 dark:border-slate-600 print:border-black font-semibold">Employee Details</th>
                  <th className="p-3 border border-gray-400 dark:border-slate-600 print:border-black font-semibold">District / Mandal</th>
                  <th className="p-3 border border-gray-400 dark:border-slate-600 print:border-black font-semibold">Challan / Payment Ref</th>
                  <th className="p-3 border border-gray-400 dark:border-slate-600 print:border-black font-semibold text-center">Status</th>
                  <th className="p-3 border border-gray-400 dark:border-slate-600 print:border-black font-semibold text-center print:hidden">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-800 dark:text-gray-200 print:text-black">
                {currentData.length > 0 ? ( 
                  currentData.map((row, index) => {
                    const serialNum = (currentPage - 1) * itemsPerPage + index + 1;
                    return (
                      <tr key={row.id} className="hover:bg-yellow-50 dark:hover:bg-slate-700/50 even:bg-gray-50 dark:even:bg-slate-800/50 transition-colors print:break-inside-avoid print:bg-white print:even:bg-white">
                        <td className="p-3 border border-gray-300 dark:border-slate-700 print:border-gray-500 text-center font-medium">{serialNum}</td>
                        <td className="p-3 border border-gray-300 dark:border-slate-700 print:border-gray-500 font-mono text-blue-800 dark:text-blue-400 print:text-black font-bold">{row.refId}</td>
                        <td className="p-3 border border-gray-300 dark:border-slate-700 print:border-gray-500">
                          <div className="font-bold">{row.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 print:text-gray-700">Emp ID: {row.empId} • {row.role}</div>
                        </td>
                        <td className="p-3 border border-gray-300 dark:border-slate-700 print:border-gray-500">
                          <div>{row.district}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 print:text-gray-700">{row.zone}</div>
                        </td>
                        <td className="p-3 border border-gray-300 dark:border-slate-700 print:border-gray-500 font-mono text-xs">
                          {row.challan}<br/>
                          <span className={row.paymentStatus === "Success" ? "text-green-600 dark:text-green-400 font-bold print:text-black" : row.paymentStatus === "Failed" ? "text-red-600 dark:text-red-400 font-bold print:text-black" : "text-orange-500 dark:text-orange-400 font-bold print:text-black"}>
                            {row.paymentStatus}
                          </span>
                        </td>
                        <td className="p-3 border border-gray-300 dark:border-slate-700 print:border-gray-500 text-center">
                          <span className={`px-2 py-1 text-xs font-bold border ${
                            row.status === "SANCTIONED" ? "bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-400 border-green-300 dark:border-green-800 print:bg-transparent print:border-none print:text-black" :
                            row.status === "REJECTED" ? "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-400 border-red-300 dark:border-red-800 print:bg-transparent print:border-none print:text-black" :
                            "bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-400 border-orange-300 dark:border-orange-800 print:bg-transparent print:border-none print:text-black"
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="p-3 border border-gray-300 dark:border-slate-700 print:border-gray-500 text-center print:hidden">
                          <button 
                            onClick={() => setSelectedRowDetail(row)}
                            className="text-blue-700 dark:text-blue-400 hover:underline text-xs font-bold"
                          >
                            {row.status === "UNDER REVIEW" ? "Verify" : "View"}
                          </button>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="p-6 text-center text-gray-500 dark:text-gray-400 font-semibold border border-gray-300 dark:border-slate-700 print:border-black">
                      No records found for the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Fully Updated Pagination Matching Your Screenshot */}
          {filteredData.length > 0 && (
            <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-700 dark:text-gray-300 print:hidden transition-colors">
              <div>
                Showing <strong>{((currentPage - 1) * itemsPerPage) + 1}</strong> to <strong>{Math.min(currentPage * itemsPerPage, filteredData.length)}</strong> of <strong>{filteredData.length}</strong> entries
              </div>
              
              <div className="flex gap-2 mt-4 md:mt-0">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 border text-sm font-medium transition-colors ${
                    currentPage === 1 
                    ? 'border-gray-300 bg-gray-50 dark:bg-slate-800 dark:border-slate-700 text-gray-400 cursor-not-allowed' 
                    : 'border-gray-300 bg-white dark:bg-slate-900 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-4 py-2 border text-sm font-medium transition-colors ${
                      currentPage === i + 1 
                      ? 'border-[#1e3a8a] bg-[#1e3a8a] text-white' 
                      : 'border-gray-300 bg-white dark:bg-slate-900 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 border text-sm font-medium transition-colors ${
                    currentPage === totalPages 
                    ? 'border-gray-300 bg-gray-50 dark:bg-slate-800 dark:border-slate-700 text-gray-400 cursor-not-allowed' 
                    : 'border-gray-300 bg-white dark:bg-slate-900 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Dynamic Action Modal Overlay - hidden in print */}
        {selectedRowDetail && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 transition-opacity print:hidden">
            <div className="bg-white dark:bg-slate-800 w-full max-w-md shadow-lg border-t-4 border-t-blue-900 dark:border-t-blue-500 rounded-sm">
              <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center bg-gray-50 dark:bg-slate-900">
                <h3 className="font-bold text-gray-800 dark:text-gray-100">Application Details</h3>
                <button onClick={() => setSelectedRowDetail(null)} className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 font-bold text-xl leading-none">&times;</button>
              </div>
              <div className="p-6 flex flex-col gap-3 text-sm text-gray-800 dark:text-gray-300">
                <p><strong>Ref ID:</strong> <span className="text-blue-700 dark:text-blue-400 font-mono">{selectedRowDetail.refId}</span></p>
                <p><strong>Name:</strong> {selectedRowDetail.name}</p>
                <p><strong>Emp ID:</strong> {selectedRowDetail.empId}</p>
                <p><strong>District:</strong> {selectedRowDetail.district}</p>
                <p><strong>Status:</strong> {selectedRowDetail.status}</p>
                <div className="mt-4 flex gap-2">
                  {selectedRowDetail.status === "UNDER REVIEW" && (
                    <button onClick={() => { alert("Approved successfully!"); setSelectedRowDetail(null); }} className="bg-green-600 dark:bg-green-700 text-white px-4 py-2 font-bold flex-1 hover:bg-green-700 dark:hover:bg-green-600 transition-colors rounded-sm">Approve</button>
                  )}
                  <button onClick={() => setSelectedRowDetail(null)} className="bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 px-4 py-2 font-bold flex-1 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors rounded-sm">Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default Reports;
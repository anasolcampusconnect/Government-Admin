import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ShieldCheck, User, Building2, Landmark } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Admin credentials check
    if (email === "admin@gov.in" && password === "12345") {
      navigate("/dashboard", { replace: true });
    } else {
      alert("Invalid Credentials. Access restricted to authorized system administrators only.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6">

      {/* CONTAINER */}
      <div className="flex w-full max-w-[1050px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.45)] overflow-hidden min-h-[520px] border border-indigo-900/20">

        {/* LEFT PANEL */}
        <div className="hidden md:flex md:w-1/2 relative text-white">

          <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
            <Landmark className="w-7 h-7 text-amber-400" />
            <span className="text-lg font-bold tracking-widest uppercase">
              Admin Control Portal
            </span>
          </div>

          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            effect="fade"
            pagination={{ clickable: true }}
            loop={true}
            className="w-full h-full"
          >

            {/* SLIDE 1 */}
            <SwiperSlide>
              <div className="relative w-full h-full">
                <img
                  src="https://www.teachingchannel.com/wp-content/uploads/2023/05/first-time-teachers.jpg"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-900/75 to-transparent"></div>

                <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-10 space-y-3">
                  <h1 className="text-3xl font-bold">
                    System Administration
                  </h1>
                  <div className="w-14 h-1 bg-amber-400 rounded-full"></div>
                  <p className="text-sm text-indigo-100 max-w-md">
                    Centralized administrative dashboard for managing government infrastructure, user accounts, and system policies.
                  </p>
                </div>
              </div>
            </SwiperSlide>

            {/* SLIDE 2 */}
            <SwiperSlide>
              <div className="relative w-full h-full">
                <img
                  src="https://bsmedia.business-standard.com/_media/bs/img/article/2019-01/21/full/1548047799-6279.jpg"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-900/75 to-transparent"></div>

                <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-10 space-y-3">
                  <h1 className="text-3xl font-bold">
                    Secure Admin Access
                  </h1>
                  <div className="w-14 h-1 bg-amber-400 rounded-full"></div>
                  <p className="text-sm text-indigo-100 max-w-md">
                    High-security authentication gateway ensuring strictly authorized access to sensitive government databases.
                  </p>
                </div>
              </div>
            </SwiperSlide>

            {/* SLIDE 3 */}
            <SwiperSlide>
              <div className="relative w-full h-full">
                <img
                  src="https://www.socialsciencespace.com/wp-content/uploads/black-teacher.jpg"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-900/75 to-transparent"></div>

                <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-10 space-y-3">
                  <h1 className="text-3xl font-bold">
                    Governance Dashboard
                  </h1>
                  <div className="w-14 h-1 bg-amber-400 rounded-full"></div>
                  <p className="text-sm text-indigo-100 max-w-md">
                    Comprehensive monitoring tools providing real-time oversight of national education programs and operational metrics.
                  </p>
                </div>
              </div>
            </SwiperSlide>

          </Swiper>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-1/2 p-7 lg:p-10 flex flex-col justify-center bg-slate-50">

          <div className="mb-6 flex flex-col items-center">
            <div className="bg-indigo-900 p-3 rounded-2xl mb-4 shadow-lg">
              <ShieldCheck className="w-8 h-8 text-[#FF9933]" />
            </div>

            <h1 className="text-2xl font-bold text-slate-800">
              Government Admin Login
            </h1>

            <p className="text-slate-500 text-center text-sm">
              Authorized access for system administrators only
            </p>
          </div>

          <div className="space-y-4">

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" /> Administrator Email ID
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gov.in"
                  className="w-full border border-slate-300 pl-10 p-3 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-600" /> System Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-slate-300 pl-10 p-3 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none"
                />
              </div>
            </div>

            {/* RESET */}
            <div className="text-right">
              <span className="text-xs font-semibold text-indigo-700 cursor-default">
                Reset Admin Credentials?
              </span>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleLogin}
              className="w-full bg-indigo-900 text-[#FF9933] p-3 rounded-xl font-bold hover:bg-indigo-800 active:scale-[0.98] transition-all shadow-md border border-amber-400/20"
            >
              Authenticate Admin Login
            </button>

            {/* FOOTER */}
            <p className="text-center text-xs text-slate-500 mt-4">
              This portal is restricted to authorized government administrators only.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
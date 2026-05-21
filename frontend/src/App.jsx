import { useState, useEffect } from "react"

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
.wrap{background:linear-gradient(135deg,#e0f2fe 0%,#f0f9ff 50%,#e0f2fe 100%);min-height:100vh;padding:2.5rem 1.5rem;font-family:'Inter',sans-serif;display:flex;align-items:flex-start;justify-content:center}
.shell{width:100%;max-width:620px;padding-top:1rem}

.topbar{display:flex;align-items:center;justify-content:center;margin-bottom:2rem}
.brand{display:flex;align-items:center;gap:14px;align-items: center;}
.brand-dot{width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,#0284c7,#0ea5e9);display:flex;align-items:center;justify-content:center;font-size:26px;box-shadow:0 6px 18px rgba(2,132,199,.35); margin: 0 auto;}
.brand-name{font-size:30px;font-weight:bold;color:#0c4a6e;letter-spacing:-.3px;text-align: center;}
.brand-sub{font-size:14px;color:#0486c4;font-weight:bold;margin-top:2px;text-align:center;margin-top:10px;}

.nav-tabs{display:flex;gap:8px;margin-bottom:2rem;background:white;padding:6px;border-radius:14px;border:1.5px solid #bae6fd;box-shadow:0 2px 8px rgba(2,132,199,.08)}
.nav-tab{flex:1;padding:10px;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;font-family:'Inter',sans-serif;background:transparent;color:#7dd3fc}
.nav-tab.active{background:linear-gradient(135deg,#0284c7,#0ea5e9);color:white;box-shadow:0 4px 12px rgb(0,103,220)}

.steps {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 350px 2rem ; /* left and right margin */
}
  
.step-circle{width:34px;height:34px;border-radius:50%;border:2px solid #bae6fd;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#7dd3fc;transition:all .3s;flex-shrink:0;background:white}
.step-circle.active{border-color:#0284c7;color:#0284c7;background:#e0f2fe}
.step-circle.done{border-color:#0284c7;background:linear-gradient(135deg,#0284c7,#0ea5e9);color:white}
.step-label{font-size:13px;font-weight:600;color:#bae6fd;transition:color .3s;margin-left:8px}
.step-label.active{color:#0284c7}
.step-label.done{color:#0284c7}

.drop-area{border:2px dashed #bae6fd;border-radius:20px;padding:1.75rem;margin-bottom:14px;cursor:pointer;transition:all .25s;position:relative;background:white;box-shadow:0 2px 12px rgba(2,132,199,.08)}
.drop-area:hover,.drop-area.dragging{border-color:#0284c7;background:#f0f9ff;box-shadow:0 6px 24px rgba(2,132,199,.15)}
.drop-area.filled{border-color:#0284c7;border-style:solid;background:#f0f9ff}
.drop-area input{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%}
.drop-inner{display:flex;align-items:center;gap:18px;pointer-events:none}
.drop-ico{width:56px;height:56px;border-radius:14px;background:#e0f2fe;display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0;transition:all .25s}
.drop-area.filled .drop-ico{background:linear-gradient(135deg,#0284c7,#0ea5e9);box-shadow:0 4px 12px rgba(2,132,199,.3)}
.drop-title{font-size:16px;font-weight:700;color:#0c4a6e}
.drop-sub{font-size:13px;color:#7dd3fc;margin-top:4px;font-weight:500}
.drop-area.filled .drop-sub{color:#0284c7}
.file-tag{display:inline-flex;align-items:center;gap:5px;background:#e0f2fe;border-radius:8px;padding:4px 10px;font-size:12px;color:#0284c7;font-weight:600;margin-top:6px}

.vs-row{display:flex;align-items:center;gap:10px;margin:6px 0 16px}
.vs-line{flex:1;height:1.5px;background:#e0f2fe}
.vs-badge{font-size:13px;color:#7dd3fc;background:white;border:1.5px solid #bae6fd;padding:5px 16px;border-radius:100px;font-weight:600}

.analyze-btn{width:100%;padding:18px;border:none;border-radius:16px;font-size:17px;font-weight:800;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;transition:all .2s;font-family:'Inter',sans-serif;background:linear-gradient(135deg,#0284c7,#0ea5e9);color:white;margin-top:6px;box-shadow:0 6px 20px rgba(2,132,199,.4);letter-spacing:.3px}
.analyze-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 10px 28px rgba(2,132,199,.5)}
.analyze-btn:active:not(:disabled){transform:scale(.98)}
.analyze-btn:disabled{opacity:.4;cursor:not-allowed;transform:none;box-shadow:none}

.scan-bar{margin:14px 0}
.scan-track{height:5px;background:#e0f2fe;border-radius:3px;overflow:hidden}
.scan-fill{height:100%;background:linear-gradient(90deg,#0284c7,#38bdf8);border-radius:3px;transition:width .5s ease}
.scan-label{font-size:13px;color:#0284c7;margin-top:8px;display:flex;align-items:center;gap:6px;font-weight:600}

.result-panel{border-radius:22px;border:1.5px solid #bae6fd;overflow:hidden;background:white;animation:slideUp .4s ease;box-shadow:0 10px 40px rgba(2,132,199,.14)}
@keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}

.result-hero{padding:2.25rem;text-align:center;background:linear-gradient(135deg,#f0f9ff,#e0f2fe);border-bottom:1.5px solid #bae6fd}
.score-wrap{position:relative;width:220px;height:220px;margin:0 auto 1.25rem}
.score-inner{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.score-big{font-size:42px;font-weight:800;line-height:1}
.score-tiny{font-size:14px;color:#7dd3fc;margin-top:5px;font-weight:600}
.verdict{display:inline-flex;align-items:center;gap:8px;padding:10px 22px;border-radius:100px;font-size:15px;font-weight:700;margin-top:12px}
.v-safe{background:#f0fdf4;color:#15803d;border:2px solid #86efac}
.v-warn{background:#fffbeb;color:#b45309;border:2px solid #fde68a}
.v-high{background:#fef2f2;color:#dc2626;border:2px solid #fca5a5}

.stats-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;padding:18px;background:#f0f9ff}
.stat-box{background:white;border-radius:14px;padding:16px;text-align:center;border:1.5px solid #e0f2fe;box-shadow:0 2px 8px rgba(2,132,199,.08);transition:transform .2s}
.stat-box:hover{transform:translateY(-3px)}
.stat-num{font-size:26px;font-weight:800}
.stat-label{font-size:12px;color:#7dd3fc;margin-top:4px;font-weight:600}

.meter-row{padding:18px;background:white;border-top:1.5px solid #e0f2fe}
.meter-label{display:flex;justify-content:space-between;margin-bottom:10px}
.meter-label span{font-size:14px;color:#7dd3fc;font-weight:600}
.meter-track{height:14px;background:#e0f2fe;border-radius:7px;overflow:hidden}
.meter-fill{height:100%;border-radius:7px;transition:width 1.2s ease}

.files-row{display:flex;align-items:center;justify-content:center;gap:10px;padding:16px;background:#f0f9ff;border-top:1.5px solid #e0f2fe}
.fchip{background:white;border:1.5px solid #bae6fd;padding:7px 16px;border-radius:10px;font-size:13px;color:#0284c7;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600}

.reset-btn{width:100%;padding:15px;background:white;border:2px solid #bae6fd;border-radius:14px;font-size:15px;color:#0284c7;cursor:pointer;transition:all .2s;font-family:'Inter',sans-serif;font-weight:700}
.reset-btn:hover{border-color:#0284c7;background:#e0f2fe;box-shadow:0 4px 14px rgba(2,132,199,.15)}

.err-box{background:#fef2f2;border:1.5px solid #fca5a5;color:#dc2626;padding:12px 16px;border-radius:12px;font-size:14px;margin-top:12px;animation:slideUp .3s ease;font-weight:600}
.spinner{width:18px;height:18px;border:2.5px solid rgba(255,255,255,.4);border-top-color:white;border-radius:50%;animation:spin .7s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}

.history-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem}
.history-title{font-size:18px;font-weight:800;color:#0c4a6e}
.refresh-btn{padding:8px 16px;background:white;border:1.5px solid #bae6fd;border-radius:10px;font-size:13px;color:#0284c7;cursor:pointer;font-family:'Inter',sans-serif;font-weight:600;transition:all .2s}
.refresh-btn:hover{background:#e0f2fe;border-color:#0284c7}
.history-empty{text-align:center;padding:3rem;background:white;border-radius:20px;border:1.5px solid #bae6fd}
.history-empty-icon{font-size:48px;margin-bottom:1rem}
.history-empty-text{font-size:16px;font-weight:600;color:#7dd3fc}
.history-empty-sub{font-size:13px;color:#bae6fd;margin-top:6px}
.history-card{background:white;border-radius:16px;border:1.5px solid #bae6fd;padding:1.25rem 1.5rem;margin-bottom:12px;box-shadow:0 2px 10px rgba(2,132,199,.08);animation:slideUp .3s ease;transition:transform .2s}
.history-card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(2,132,199,.14)}
.history-card-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
.history-files{font-size:14px;font-weight:600;color:#0c4a6e}
.history-files span{color:#7dd3fc;margin:0 6px}
.history-date{font-size:12px;color:#bae6fd;font-weight:500}
.history-card-bottom{display:flex;align-items:center;justify-content:space-between}
.history-score{font-size:28px;font-weight:800}
.history-badges{display:flex;align-items:center;gap:8px}
.history-verdict{display:inline-flex;align-items:center;gap:5px;padding:5px 14px;border-radius:100px;font-size:12px;font-weight:700}
.delete-btn{padding:6px 14px;background:#fef2f2;border:1.5px solid #fca5a5;border-radius:8px;font-size:12px;color:#dc2626;cursor:pointer;font-family:'Inter',sans-serif;font-weight:600;transition:all .2s}
.delete-btn:hover{background:#fee2e2}
.history-bar-wrap{margin-top:10px}
.history-bar-track{height:6px;background:#e0f2fe;border-radius:3px;overflow:hidden}
.history-bar-fill{height:100%;border-radius:3px;transition:width 1s ease}

.wrap{background:linear-gradient(135deg,#e0f2fe 0%,#f0f9ff 50%,#e0f2fe 100%);min-height:100vh;width:100%;padding:2.5rem 1.5rem;font-family:'Inter',sans-serif;display:flex;justify-content:center;align-items:flex-start;}
.shell{width:100%;max-width:1400px;margin:0 auto;padding-top:1rem;}
@media(min-width:1400px){.shell{max-width:1600px}}
@media(max-width:1200px){.shell{max-width:95%}}
@media(max-width:768px){.wrap{padding:1.5rem 1rem}.shell{max-width:100%;padding-top:0.5rem}}
@media(max-width:480px){.wrap{padding:1rem 0.75rem}.shell{width:100%;max-width:100%}}

.auth-wrap{background:linear-gradient(135deg,#0284c7 0%,#0ea5e9 50%,#38bdf8 100%);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem 1rem;font-family:'Inter',sans-serif}
.auth-card {
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 20px 60px rgba(2, 132, 199, .3);
  display: flex;
  flex-direction: column;
  align-items: center; 
}
.auth-logo {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(135deg, #0284c7, #0ea5e9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-bottom: 1.25rem; /* 'margin: 0 auto' ની હવે જરૂર નથી */
  box-shadow: 0 6px 18px rgba(2, 132, 199, .4);
}
.auth-title {
  font-size: 22px;
  font-weight: 800;
  color: #0c4a6e;
  text-align: center;
  margin-bottom: 4px;
}

.auth-sub {
  font-size: 13px;
  color: #64748b; 
  text-align: center;
  margin-bottom: 1.75rem;
  font-weight:500;
}

.auth-tabs{display:flex;background:#f0f9ff;border-radius:12px;padding:4px;margin-bottom:1.5rem}
.auth-tab{flex:1;padding:10px;border:none;border-radius:9px;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;font-family:'Inter',sans-serif;background:transparent;color:#7dd3fc}
.auth-tab.active{background:white;color:#0284c7;box-shadow:0 2px 8px rgba(2,132,199,.15);padding: 5px 50px;}
.input-group{margin-bottom:1rem}
.input-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:1rem}
.input-label{font-size:13px;font-weight:600;color:#0c4a6e;margin-bottom:6px;display:block}
.input-field{width:100%;padding:12px 14px;border:1.5px solid #bae6fd;border-radius:12px;font-size:14px;font-family:'Inter',sans-serif;color:#0c4a6e;outline:none;transition:all .2s;background:#f0f9ff}
.input-field:focus{border-color:#0284c7;background:white;box-shadow:0 0 0 3px rgba(2,132,199,.1)}
.input-field::placeholder{color:#bae6fd}
.auth-btn{width:100%;padding:14px;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;background:linear-gradient(135deg,#0284c7,#0ea5e9);color:white;margin-top:0.5rem;box-shadow:0 4px 16px rgba(2,132,199,.4);transition:all .2s}
.auth-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 24px rgba(2,132,199,.5)}
.auth-btn:active{transform:scale(.98)}
.auth-btn:disabled{opacity:.5;cursor:not-allowed;transform:none}
.auth-err{background:#fef2f2;border:1.5px solid #fca5a5;color:#dc2626;padding:10px 14px;border-radius:10px;font-size:13px;margin-bottom:1rem;font-weight:500;text-align:center}
.auth-success{background:#f0fdf4;border:1.5px solid #86efac;color:#15803d;padding:10px 14px;border-radius:10px;font-size:13px;margin-bottom:1rem;font-weight:500;text-align:center}
.section-divider{font-size:12px;font-weight:700;color:#0684c6;text-transform:uppercase;letter-spacing:1px;margin:1rem 0 0.75rem;padding-bottom:6px;border-bottom:1.5px solid #e0f2fe}
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.topbar-right {
  margin-left: auto;
  margin-top: -12px;
  margin-bottom: 20px;  
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  flex-shrink: 0;
}

.user-pill {
  display: flex;
  align-items: center;
  margin-top:-20px;
  margin-right:20px;
  gap: 6px;
  padding: 6px 25px;
  border-radius: 100px;
  border: 1.5px solid #bae6fd;
  background: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .06);
  cursor: pointer;
}
.user-avatar{width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#0284c7,#0ea5e9);display:flex;align-items:center;justify-content:center;font-size:13px;color:white;font-weight:700}
.user-name{font-size:13px;color:#0284c7;font-weight:600}
.logout-btn{padding:6px 14px;background:#fef2f2;border:1.5px solid #fca5a5;border-radius:100px;font-size:12px;color:#dc2626;cursor:pointer;font-family:'Inter',sans-serif;font-weight:600;transition:all .2s}
.logout-btn:hover{background:#fee2e2}

.profile-popup{position:absolute;top:48px;right:0;background:white;border-radius:16px;border:1.5px solid #bae6fd;box-shadow:0 8px 32px rgba(2,132,199,.15);padding:1.25rem;min-width:220px;z-index:100;animation:slideUp .2s ease}
.profile-popup-name{font-size:16px;font-weight:700;color:#0c4a6e;margin-bottom:4px}
.profile-popup-row{display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid #f0f9ff;font-size:13px;color:#475569;font-weight:500}
.profile-popup-row:last-of-type{border-bottom:none}
.profile-popup-label{font-size:11px;color:#bae6fd;font-weight:600;margin-bottom:2px}
.popup-logout-btn{width:100%;padding:10px;background:#fef2f2;border:1.5px solid #fca5a5;border-radius:10px;font-size:13px;color:#dc2626;cursor:pointer;font-family:'Inter',sans-serif;font-weight:600;margin-top:12px;transition:all .2s}
.popup-logout-btn:hover{background:#fee2e2} 
.user-pill{cursor:pointer;position:relative}


/* =========================
   MOBILE RESPONSIVE FIXES
   ========================= */

@media (max-width: 768px) {

  .topbar {
    flex-direction: column;
    gap: 16px;
    align-items: center;
    text-align: center;
  }

  .topbar-right {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    margin-left: 0;
  }

  .brand {
    flex-direction: column;
    gap: 10px;
  }

  .brand-name {
    font-size: 22px;
    line-height: 1.2;
  }

  .brand-sub {
    font-size: 12px;
  }

  .nav-tabs {
    flex-direction: column;
    gap: 10px;
  }

  .steps {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }

  .step-label {
    font-size: 12px;
  }

  .drop-inner {
    flex-direction: column;
    text-align: center;
  }

  .drop-title {
    font-size: 15px;
    word-break: break-word;
  }

  .drop-sub {
    font-size: 12px;
  }

  .stats-row {
    grid-template-columns: 1fr;
  }

  .files-row {
    flex-direction: column;
    gap: 12px;
  }

  .fchip {
    max-width: 100%;
    width: 100%;
  }

  .history-card-top,
  .history-card-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .history-badges {
    flex-wrap: wrap;
  }

  .input-row {
    grid-template-columns: 1fr;
  }

  .auth-card {
    padding: 1.5rem;
    border-radius: 18px;
  }

  .score-wrap {
    width: 180px;
    height: 180px;
  }

  .score-big {
    font-size: 38px;
  }

  .result-hero {
    padding: 1.5rem 1rem;
  }

  .analyze-btn,
  .reset-btn,
  .auth-btn {
    font-size: 14px;
    padding: 14px;
  }
}

/* SMALL MOBILE */

@media (max-width: 480px) {

  .wrap {
    padding: 0.8rem;
  }

  .shell {
    width: 100%;
  }

  .auth-card {
    padding: 1.2rem;
  }

  .brand-name {
    font-size: 20px;
  }

  .nav-tab {
    font-size: 13px;
    padding: 12px;
  }

  .drop-area {
    padding: 1rem;
  }

  .drop-ico {
    width: 48px;
    height: 48px;
    font-size: 22px;
  }

  .score-wrap {
    width: 150px;
    height: 150px;
  }

  .score-big {
    font-size: 30px;
  }

  .history-card {
    padding: 1rem;
  }

  .history-score {
    font-size: 22px;
  }

  .user-pill {
    width: 100%;
    justify-content: center;
  }

  .logout-btn {
    width: 100%;
  }
}
`

const SCAN_MSGS = ["Extracting text...", "Building vectors...", "Computing similarity...", "Generating report..."]
const SCAN_PCTS = [20, 45, 70, 90]
const API = "https://plagiarism-detector-api-62d4.onrender.com/api"

// ── Auth Page ──────────────────────────────────────────────
function AuthPage({ onLogin }) {
  const [tab, setTab] = useState("login")
  const [form, setForm] = useState({ firstName: "", lastName: "", contact: "", username: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleLogin = async () => {
    if (!form.username || !form.password) { setError("Please enter username and password"); return }
    setLoading(true); setError("")
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.username, password: form.password })
      })
      const data = await res.json()
      if (!res.ok) { setError(data.detail); setLoading(false); return }
      localStorage.setItem("token", data.access_token)
      localStorage.setItem("username", data.username)
      localStorage.setItem("full_name", data.full_name || "")
      onLogin(data.username, data.access_token)
    } catch { setError("Server se connect nahi ho pa raha!") }
    setLoading(false)
  }
  const handleRegister = async () => {
    if (!form.firstName || !form.lastName || !form.contact || !form.username || !form.password) {
      setError("Fill all fields"); return
    }
    if (form.password.length < 4) { setError("Password length should be atleast 4 character"); return }
    setLoading(true); setError(""); setSuccess("")
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          contact: form.contact,
          username: form.username,
          password: form.password
        })
      })
      const data = await res.json()
      if (!res.ok) { setError(data.detail); setLoading(false); return }
      localStorage.setItem("full_name", `${form.firstName} ${form.lastName}`)
      localStorage.setItem("contact", form.contact)
      setSuccess("You are registered !")
      setTab("login")
      setForm({ firstName: "", lastName: "", contact: "", username: "", password: "" })
    } catch { setError("Server se connect nahi ho pa raha!") }
    setLoading(false)
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-logo">🔍</div>
        <div className="auth-title">Plagiarism Detector</div>
        <div className="auth-sub">AI-powered document similarity check</div>
        <div className="auth-tabs">
          <button className={`auth-tab ${tab === "login" ? "active" : ""}`}
            onClick={() => { setTab("login"); setError(""); setSuccess("") }}>🔑 Login</button>
          <button className={`auth-tab ${tab === "register" ? "active" : ""}`}
            onClick={() => { setTab("register"); setError(""); setSuccess("") }}>✨ Register</button>
        </div>
        {error && <div className="auth-err">❌ {error}</div>}
        {success && <div className="auth-success">✅ {success}</div>}

        {tab === "login" && (
          <>
            <div className="input-group">
              <label className="input-label">👤Username</label>
              <input className="input-field" placeholder="Enter username" value={form.username}
                onChange={(e) => set("username", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
            </div>
            <div className="input-group">
              <label className="input-label">🔒 Password</label>
              <input className="input-field" type="password" placeholder="Enter password" value={form.password}
                onChange={(e) => set("password", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
            </div>
            <button className="auth-btn" onClick={handleLogin} disabled={loading}>
              {loading ? "Please wait..." : " Login"}
            </button>
          </>
        )}

        {tab === "register" && (
          <>
            <div className="section-divider">Personal Info</div>
            <div className="input-row">
              <div>
                <label className="input-label">👤 First Name</label>
                <input className="input-field" placeholder="John" value={form.firstName}
                  onChange={(e) => set("firstName", e.target.value)} />
              </div>
              <div>
                <label className="input-label">👤 Last Name</label>
                <input className="input-field" placeholder="Doe" value={form.lastName}
                  onChange={(e) => set("lastName", e.target.value)} />
              </div>
            </div>
            <div className="input-group">
              <label className="input-label">📱 Contact Number</label>
              <input className="input-field" placeholder="9876543210" value={form.contact}
                onChange={(e) => set("contact", e.target.value)} />
            </div>
            <div className="section-divider">Account Info</div>
            <div className="input-group">
              <label className="input-label">🔖 Username</label>
              <input className="input-field" placeholder="Set Username" value={form.username}
                onChange={(e) => set("username", e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">🔒 Password</label>
              <input className="input-field" type="password" placeholder="Set your password" value={form.password}
                onChange={(e) => set("password", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRegister()} />
            </div>
            <button className="auth-btn" onClick={handleRegister} disabled={loading}>
              {loading ? "Please wait..." : " Register "}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ── Drop Zone ──────────────────────────────────────────────
function DropZone({ num, file, onFile }) {
  const [dragging, setDragging] = useState(false)
  return (
    <div className={`drop-area ${file ? "filled" : ""} ${dragging ? "dragging" : ""}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) onFile(f) }}>
      <input type="file" accept=".pdf,.docx" onChange={(e) => e.target.files[0] && onFile(e.target.files[0])} />
      <div className="drop-inner">
        <div className="drop-ico">{file ? "✅" : "📄"}</div>
        <div>
          <div className="drop-title">{file ? file.name : `Drop ${num === 1 ? "first" : "second"} document here`}</div>
          <div className="drop-sub">{file ? `${(file.size / 1024).toFixed(1)} KB · ready` : "PDF or DOCX · click or drag & drop"}</div>
          {file && <div className="file-tag">✓ Ready to analyze</div>}
        </div>
      </div>
    </div>
  )
}

// ── Score Ring ─────────────────────────────────────────────
function ScoreRing({ score, color }) {
  const circ = 607
  return (
    <div className="score-wrap">
      <svg width="220" height="220" viewBox="0 0 220 220" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="110" cy="110" r="96" fill="none" stroke="#e0f2fe" strokeWidth="12" />
        <circle cx="110" cy="110" r="96" fill="none" stroke={color} strokeWidth="12"
          strokeLinecap="round" strokeDasharray={circ}
          strokeDashoffset={circ - (score / 100) * circ}
          style={{ transition: "stroke-dashoffset 1.2s ease" }} />
      </svg>
      <div className="score-inner">
        <div className="score-big" style={{ color }}>{score}%</div>
        <div className="score-tiny">similarity score</div>
      </div>
    </div>
  )
}

// ── History Page ───────────────────────────────────────────
function HistoryPage({ token }) {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  const getColor = (s) => s > 70 ? "#dc2626" : s > 40 ? "#b45309" : "#15803d"
  const getVClass = (s) => s > 70 ? "history-verdict v-high" : s > 40 ? "history-verdict v-warn" : "history-verdict v-safe"
  const getIcon = (s) => s > 70 ? "⚠️" : s > 40 ? "🔶" : "✅"

  const fetchHistory = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/history`, { headers: { Authorization: `Bearer ${token}` } })
      const data = await res.json()
      setHistory(data)
    } catch { setHistory([]) }
    setLoading(false)
  }

  const deleteRecord = async (id) => {
    await fetch(`${API}/history/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
    fetchHistory()
  }

  // Fix: useEffect with async function inside
  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${API}/history`, { headers: { Authorization: `Bearer ${token}` } })
        const data = await res.json()
        setHistory(data)
      } catch { setHistory([]) }
      setLoading(false)
    }
    load()
  }, [token])

  return (
    <div>
      <div className="history-header">
        <div className="history-title">📋 Comparison History</div>
        <button className="refresh-btn" onClick={fetchHistory}>🔄 Refresh</button>
      </div>
      {loading && <div style={{ textAlign: "center", padding: "2rem", color: "#7dd3fc", fontWeight: 600 }}>Loading...</div>}
      {!loading && history.length === 0 && (
        <div className="history-empty">
          <div className="history-empty-icon">📂</div>
          <div className="history-empty-text">No history yet</div>
          <div className="history-empty-sub">Compare your document first!</div>
        </div>
      )}
      {!loading && history.map((h) => (
        <div key={h.id} className="history-card">
          <div className="history-card-top">
            <div className="history-files">📄 {h.file1} <span>⇄</span> 📄 {h.file2}</div>
            <div className="history-date">🕐 {h.date}</div>
          </div>
          <div className="history-bar-wrap">
            <div className="history-bar-track">
              <div className="history-bar-fill" style={{ width: `${h.score}%`, background: getColor(h.score) }} />
            </div>
          </div>
          <div className="history-card-bottom" style={{ marginTop: "10px" }}>
            <div className="history-score" style={{ color: getColor(h.score) }}>{h.score}%</div>
            <div className="history-badges">
              <div className={getVClass(h.score)}>{getIcon(h.score)} {h.result}</div>
              <button className="delete-btn" onClick={() => deleteRecord(h.id)}>🗑 Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Main App ───────────────────────────────────────────────
export default function App() {
  const [showProfile, setShowProfile] = useState(false)
  const [user, setUser] = useState(localStorage.getItem("username"))
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [tab, setTab] = useState("check")
  const [file1, setFile1] = useState(null)
  const [file2, setFile2] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [scanMsg, setScanMsg] = useState("")
  const [error, setError] = useState("")
  const [step, setStep] = useState(1)
  const [, setStatus] = useState("Ready")

  const getColor = (s) => s > 70 ? "#dc2626" : s > 40 ? "#b45309" : "#15803d"

  const handleLogin = (username, tok) => { setUser(username); setToken(tok) }
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    setUser(null); setToken(null)
  }

  if (!user) return <><style>{css}</style><AuthPage onLogin={handleLogin} /></>

  const analyze = async () => {
    if (!file1 || !file2) return
    setLoading(true); setError(""); setResult(null); setProgress(0); setStep(2); setStatus("Scanning...")
    SCAN_MSGS.forEach((msg, i) => setTimeout(() => { setScanMsg(msg); setProgress(SCAN_PCTS[i]) }, i * 600))
    const fd = new FormData()
    fd.append("files", file1); fd.append("files", file2)
    try {
      const res = await fetch(`${API}/compare`, { method: "POST", body: fd, headers: { Authorization: `Bearer ${token}` } })
      const data = await res.json()
      if (!res.ok) { setError(data.detail); setLoading(false); setStep(1); setStatus("Error"); return }
      setProgress(100); setScanMsg("Complete!")
      setTimeout(() => { setResult(data); setLoading(false); setStep(3); setStatus("Done") }, 500)
    } catch {
      setError("Cannot connect to backend. Make sure server is running.")
      setLoading(false); setProgress(0); setStep(1); setStatus("Error")
    }
  }

  const reset = () => {
    setFile1(null); setFile2(null); setResult(null)
    setLoading(false); setProgress(0); setError("")
    setStep(1); setStatus("Ready"); setScanMsg("")
  }

  const sc = (n) => n < step ? "done" : n === step ? "active" : ""

return (
    <>
      <style>{css}</style>
      <div className="wrap" onClick={() => setShowProfile(false)}>
        <div className="shell">
 
          {/* Topbar */}
          <div className="topbar" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="brand">
              <div className="brand-dot">🔍</div>
              <div>
                <div className="brand-name">Plagiarism Detector</div>
                <div className="brand-sub">AI-powered similarity check</div>
              </div>
              </div>
     </div>
{/* Topbar Right */}
<div className="topbar-right" style={{ position: "relative" }}>
<div className="user-pill" onClick={(e) => { e.stopPropagation(); setShowProfile(!showProfile) }}>
    <div className="user-avatar">{user[0].toUpperCase()}</div>
    <span className="user-name">{user} ▾</span>
  </div>

  {showProfile && (
    <div style={{
      position: "absolute", top: "48px", right: 0,
      background: "white", borderRadius: "16px",
      border: "1.5px solid #bae6fd",
      boxShadow: "0 8px 32px rgba(2,132,199,.15)",
      padding: "1.25rem", minWidth: "220px", zIndex: 100,
      animation: "slideUp .2s ease"
    }}>
      <div style={{ fontSize: "20px", fontWeight: 700, color: "#1a6691", marginBottom: "12px" }}>
        👤 {localStorage.getItem("full_name") || user}
      </div>
      <hr></hr><br></br>
      {[
        { label: "First Name : ",val: (localStorage.getItem("full_name") || "").split(" ")[0] || "—" },
        { label: "Last Name : ", val: (localStorage.getItem("full_name") || "").split(" ")[1] || "—" },
        { label: "Contact :", val: localStorage.getItem("contact") || "—" },
        { label: "Username :", val: user },
      ].map((item, i) => (
        <div key={i} style={{ borderBottom: i < 3 ? "1px solid #f0f9ff" : "none", paddingBottom: "8px", marginBottom: "8px" }}>
          <div style={{ fontSize: "14px", color: "#005eb0", fontWeight:"bold", marginBottom: "2px" }}>{item.label}</div>
          <div style={{ fontSize: "14px", color: "#475569", fontWeight: "bold" }}>{item.icon} {item.val}</div>
        </div>
      ))}

      <button onClick={handleLogout} style={{
        width: "100%", padding: "10px",
        background: "#fef2f2", border: "1.5px solid #fca5a5",
        borderRadius: "10px", fontSize: "13px", color: "#dc2626",
        cursor: "pointer", fontFamily: "Inter, sans-serif",
        fontWeight: 600, marginTop: "4px"
      }}>↩ Logout</button>
    </div>
  )}
</div>

          <div className="nav-tabs">
            <button className={`nav-tab ${tab === "check" ? "active" : ""}`} onClick={() => setTab("check")}>🔍 Check Plagiarism</button>
            <button className={`nav-tab ${tab === "history" ? "active" : ""}`} onClick={() => setTab("history")}>📋 History</button>
          </div>

          {tab === "check" && (
            <>
              <div className="steps">
                {["Upload", "Analyze", "Results"].map((label, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                    <div className={`step-circle ${sc(i + 1)}`}>{i + 1}</div>
                    <span className={`step-label ${sc(i + 1)}`}>{label}</span>
                    {i < 2 && <div style={{ flex: 1, height: "2px", background: step > i + 2 ? "#0284c7" : "#bae6fd", margin: "0 10px", transition: "background .3s", borderRadius: "2px" }} />}
                  </div>
                ))}
              </div>

              {!result && (
                <>
                  <DropZone num={1} file={file1} onFile={(f) => { setFile1(f); if (f && file2) setStep(2) }} />
                  <div className="vs-row"><div className="vs-line" /><div className="vs-badge">compare with</div><div className="vs-line" /></div>
                  <DropZone num={2} file={file2} onFile={(f) => { setFile2(f); if (f && file1) setStep(2) }} />
                  {error && <div className="err-box">❌ {error}</div>}
                  {loading && (
                    <div className="scan-bar">
                      <div className="scan-track"><div className="scan-fill" style={{ width: `${progress}%` }} /></div>
                      <div className="scan-label">
                        <div className="spinner" style={{ borderTopColor: "#0284c7", borderColor: "rgba(2,132,199,.2)" }} />
                        <span>{scanMsg}</span>
                      </div>
                    </div>
                  )}
                  <button className="analyze-btn" onClick={analyze} disabled={!file1 || !file2 || loading}>
                    {loading ? <><div className="spinner" /><span>Analyzing...</span></> : <><span>🔍</span><span>Analyze Documents</span></>}
                  </button>
                </>
              )}

              {result && (
                <div className="result-panel">
                  <div className="result-hero">
                    <ScoreRing score={result.similarity_score} color={getColor(result.similarity_score)} />
                    <div className={`verdict ${result.similarity_score > 70 ? "v-high" : result.similarity_score > 40 ? "v-warn" : "v-safe"}`}>
                      {result.similarity_score > 70 ? "⚠️" : result.similarity_score > 40 ? "🔶" : "✅"} {result.result}
                    </div>
                  </div>
                  <div className="stats-row">
                    {[
                      { val: `${Math.round(100 - result.similarity_score)}%`, label: "Unique Content" },
                      { val: result.similarity_score > 70 ? "High" : result.similarity_score > 40 ? "Medium" : "Low", label: "Risk Level" },
                      { val: result.similarity_score > 70 ? "F" : result.similarity_score > 40 ? "C" : "A", label: "Match Grade" }
                    ].map((s, i) => (
                      <div key={i} className="stat-box">
                        <div className="stat-num" style={{ color: getColor(result.similarity_score) }}>{s.val}</div>
                        <div className="stat-label">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="meter-row">
                    <div className="meter-label">
                      <span>Plagiarism Meter</span>
                      <span style={{ color: getColor(result.similarity_score), fontWeight: 800 }}>{result.similarity_score}%</span>
                    </div>
                    <div className="meter-track">
                      <div className="meter-fill" style={{ width: `${result.similarity_score}%`, background: getColor(result.similarity_score) }} />
                    </div>
                  </div>
                  <div className="files-row">
                    <div className="fchip">📄 {result.file1}</div>
                    <span style={{ color: "#7dd3fc", fontSize: 20 }}>⇄</span>
                    <div className="fchip">📄 {result.file2}</div>
                  </div>
                  <div style={{ padding: "16px", borderTop: "1.5px solid #e0f2fe", display: "flex", gap: "10px" }}>
                    <button className="reset-btn" onClick={reset}>↺ Check Another</button>
                    <button className="reset-btn" style={{ background: "#e0f2fe", borderColor: "#0284c7", color: "#0284c7" }}
                      onClick={() => { setTab("history"); reset() }}>📋 View History</button>
                  </div>
                </div>
              )}
            </>
          )}

          {tab === "history" && <HistoryPage token={token} />}

        </div>
      </div>
  </>
)
}
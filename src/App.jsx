import { useState } from “react";

const AFFILIATE = {
skyscanner: {
label: “Search Flights",
icon: “✈️",
url: “https://www.skyscanner.net/",
signupUrl: “https://www.partners.skyscanner.net/affiliates/affiliate-products",
commission: “Up to 20% per booking - 30-day cookie",
note: “Sign up via Impact.com",
},
booking: {
label: “Find Hotels",
icon: “🏨",
url: “https://www.booking.com/",
signupUrl: “https://www.booking.com/affiliate-program/v2/index.html",
commission: “4% hotels - 6% car hire",
note: “Sign up via Awin UK region",
},
viator: {
label: “Book Experiences",
icon: “🎟️",
url: “https://www.viator.com/",
signupUrl: “https://partnerresources.viator.com/",
commission: “8% per experience - 30-day cookie",
note: “Sign up at partnerresources.viator.com",
},
getyourguide: {
label: “Tours and Activities",
icon: “🗺️",
url: “https://www.getyourguide.com/",
signupUrl: “https://partner.getyourguide.com/",
commission: “8-10% per booking - 31-day cookie",
note: “Sign up via partner.getyourguide.com",
},
};

const TRIPS = [
{ id: 1, emoji: “🇯🇵", name: “Tokyo Explorer", region: “Japan, Asia", tags: [“Culture", “Food", “City"], price: 1850, match: 98, bg: “rgba(220,53,69,0.12)" },
{ id: 2, emoji: “🇵🇹", name: “Lisbon Escape", region: “Portugal, Europe", tags: [“City Break", “Food", “History"], price: 920, match: 94, bg: “rgba(255,193,7,0.1)" },
{ id: 3, emoji: “🏝️", name: “Bali Retreat", region: “Indonesia, SE Asia", tags: [“Beach", “Wellness", “Nature"], price: 1400, match: 89, bg: “rgba(40,167,69,0.1)" },
{ id: 4, emoji: “🇲🇦", name: “Marrakech Magic", region: “Morocco, Africa", tags: [“Culture", “Adventure", “Food"], price: 780, match: 85, bg: “rgba(232,201,126,0.1)" },
{ id: 5, emoji: “🇮🇸", name: “Iceland Aurora", region: “Iceland, Europe", tags: [“Adventure", “Nature", “Photography"], price: 2200, match: 81, bg: “rgba(0,123,255,0.1)" },
{ id: 6, emoji: “🇻🇳", name: “Vietnam Discovery", region: “Vietnam, SE Asia", tags: [“Backpacker", “Food", “Culture"], price: 1100, match: 77, bg: “rgba(255,99,132,0.1)" },
];

const TAGS_FILTER = [“All", “Beach", “City", “Culture", “Adventure", “Food", “Wellness", “Nature"];

const AI_RESPONSES = {
default: “I am Voya, your personal travel concierge! Ask me about destinations, visas, or budgeting.",
tokyo: “Tokyo is magical year-round! Cherry blossom season (late March to April) is iconic. Budget around 120 GBP per day including accommodation.",
lisbon: “Lisbon is Europe best value break right now! Spring is ideal. A 5-day trip can be done for under 600 GBP from the UK.",
bali: “Bali is paradise! Best time is April to October (dry season). No visa needed for UK citizens under 30 days.",
visa: “For UK travellers: Japan visa-free 90 days. Bali free visa on arrival. Vietnam e-visa around 20 GBP. Morocco visa-free.",
group: “Group travel tips! Set a shared goal here. Designate a trip lead each day. Book accommodation with communal spaces.",
budget: “Smart saving tips: Even 50 GBP per month auto-saved adds up to 600 GBP per year. Flying Tuesday to Thursday is 20 to 40 percent cheaper.",
};

function getAIReply(msg) {
const l = msg.toLowerCase();
if (l.includes(“tokyo") || l.includes(“japan")) return AI_RESPONSES.tokyo;
if (l.includes(“lisbon") || l.includes(“portugal")) return AI_RESPONSES.lisbon;
if (l.includes(“bali") || l.includes(“indonesia")) return AI_RESPONSES.bali;
if (l.includes(“visa")) return AI_RESPONSES.visa;
if (l.includes(“group")) return AI_RESPONSES.group;
if (l.includes(“budget") || l.includes(“cheap") || l.includes(“save")) return AI_RESPONSES.budget;
return AI_RESPONSES.default;
}

const groupMembers = [
{ name: “You", emoji: “😎", saved: 460, target: 550, color: “#e8c97e" },
{ name: “Jamie", emoji: “🧑", saved: 550, target: 550, color: “#4cc864" },
{ name: “Priya", emoji: “👩", saved: 380, target: 550, color: “#60a5fa" },
{ name: “Marcus", emoji: “🧔", saved: 450, target: 550, color: “#f472b6" },
];

const initialGoals = [
{ id: 1, dest: “Tokyo, Japan", type: “Solo Adventure", emoji: “🇯🇵", saved: 1200, target: 1850, group: false },
{ id: 2, dest: “Lisbon Weekend", type: “Group Trip", emoji: “🇵🇹", saved: 1840, target: 2200, group: true },
];

const css = `

- { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: sans-serif; background: #0a0f1e; color: #f0ebe0; }
  .app { min-height: 100vh; }
  .nav { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; background: rgba(10,15,30,0.95); border-bottom: 1px solid rgba(255,255,255,0.07); position: sticky; top: 0; z-index: 100; flex-wrap: wrap; gap: 8px; }
  .logo { font-size: 20px; color: #e8c97e; font-weight: 700; }
  .tabs { display: flex; gap: 4px; flex-wrap: wrap; }
  .tab { padding: 7px 13px; border-radius: 8px; border: none; cursor: pointer; font-size: 13px; background: transparent; color: rgba(240,235,224,0.5); transition: all 0.2s; }
  .tab:hover { color: #f0ebe0; background: rgba(255,255,255,0.05); }
  .tab.active { background: rgba(232,201,126,0.15); color: #e8c97e; }
  .hero { padding: 70px 24px 50px; text-align: center; background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,201,126,0.08) 0%, transparent 70%); }
  .hero-tag { display: inline-block; padding: 5px 14px; border-radius: 100px; border: 1px solid rgba(232,201,126,0.3); color: #e8c97e; font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 20px; }
  .hero h1 { font-size: clamp(36px, 6vw, 64px); font-weight: 900; line-height: 1.05; margin-bottom: 16px; background: linear-gradient(135deg, #f0ebe0 30%, #e8c97e 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .hero p { font-size: 17px; color: rgba(240,235,224,0.6); max-width: 440px; margin: 0 auto 36px; line-height: 1.6; }
  .hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .btn { padding: 13px 28px; border-radius: 11px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; border: none; }
  .btn-gold { background: #e8c97e; color: #0a0f1e; }
  .btn-gold:hover { background: #f0d990; transform: translateY(-1px); }
  .btn-outline { background: rgba(255,255,255,0.06); color: #f0ebe0; border: 1px solid rgba(255,255,255,0.12); }
  .btn-outline:hover { background: rgba(255,255,255,0.1); }
  .stats { display: flex; gap: 1px; background: rgba(255,255,255,0.06); border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); }
  .stat { flex: 1; padding: 24px; text-align: center; background: #0a0f1e; }
  .stat-num { font-size: 30px; color: #e8c97e; font-weight: 700; }
  .stat-label { font-size: 12px; color: rgba(240,235,224,0.45); margin-top: 4px; }
  .section { padding: 50px 24px; max-width: 960px; margin: 0 auto; }
  .section-title { font-size: 28px; font-weight: 700; margin-bottom: 6px; }
  .section-sub { color: rgba(240,235,224,0.5); font-size: 14px; margin-bottom: 32px; }
  .goals-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 18px; margin-bottom: 24px; }
  .goal-card { border-radius: 18px; padding: 24px; position: relative; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); cursor: pointer; transition: all 0.25s; }
  .goal-card:hover { border-color: rgba(232,201,126,0.3); transform: translateY(-2px); }
  .goal-emoji { font-size: 32px; margin-bottom: 14px; }
  .goal-dest { font-size: 18px; font-weight: 700; margin-bottom: 3px; }
  .goal-type { font-size: 12px; color: rgba(240,235,224,0.45); margin-bottom: 18px; }
  .goal-bar { height: 6px; background: rgba(255,255,255,0.08); border-radius: 100px; overflow: hidden; margin-bottom: 9px; }
  .goal-fill { height: 100%; border-radius: 100px; background: linear-gradient(90deg, #e8c97e, #f0d990); }
  .goal-amounts { display: flex; justify-content: space-between; font-size: 12px; }
  .goal-saved { color: #e8c97e; font-weight: 600; }
  .goal-target { color: rgba(240,235,224,0.4); }
  .pill { position: absolute; top: 18px; right: 18px; padding: 3px 9px; border-radius: 100px; font-size: 10px; font-weight: 600; }
  .pill-green { background: rgba(76,200,100,0.15); color: #4cc864; }
  .pill-gold { background: rgba(232,201,126,0.15); color: #e8c97e; }
  .add-card { border: 1px dashed rgba(255,255,255,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; min-height: 180px; }
  .add-icon { font-size: 32px; opacity: 0.3; }
  .add-text { color: rgba(240,235,224,0.35); font-size: 13px; }
  .form-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; padding: 28px; margin-top: 8px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
  .form-group { display: flex; flex-direction: column; gap: 7px; }
  .form-label { font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: rgba(240,235,224,0.45); }
  .form-input { padding: 11px 14px; border-radius: 9px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: #f0ebe0; font-size: 14px; outline: none; }
  .form-input:focus { border-color: rgba(232,201,126,0.5); }
  .form-actions { display: flex; gap: 10px; margin-top: 8px; }
  .milestones { margin-top: 28px; }
  .ms-item { display: flex; align-items: center; gap: 14px; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .ms-dot { width: 13px; height: 13px; border-radius: 50%; flex-shrink: 0; }
  .dot-done { background: #4cc864; }
  .dot-next { background: #e8c97e; box-shadow: 0 0 0 4px rgba(232,201,126,0.15); }
  .dot-todo { background: rgba(255,255,255,0.15); }
  .ms-label { flex: 1; font-size: 13px; }
  .ms-label.done { color: rgba(240,235,224,0.4); text-decoration: line-through; }
  .ms-amt { font-size: 12px; color: rgba(240,235,224,0.4); }
  .filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
  .chip { padding: 7px 16px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: rgba(240,235,224,0.55); font-size: 12px; cursor: pointer; transition: all 0.2s; }
  .chip:hover { border-color: rgba(232,201,126,0.4); color: #e8c97e; }
  .chip.on { background: rgba(232,201,126,0.12); border-color: rgba(232,201,126,0.5); color: #e8c97e; }
  .trips-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 18px; }
  .trip-card { border-radius: 18px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); transition: all 0.25s; }
  .trip-card:hover { transform: translateY(-2px); border-color: rgba(232,201,126,0.3); }
  .trip-img { height: 150px; display: flex; align-items: center; justify-content: center; font-size: 64px; position: relative; }
  .match-badge { position: absolute; top: 12px; right: 12px; padding: 4px 10px; background: rgba(10,15,30,0.85); border-radius: 100px; border: 1px solid rgba(232,201,126,0.4); font-size: 11px; font-weight: 700; color: #e8c97e; }
  .trip-body { padding: 18px; }
  .trip-name { font-size: 18px; font-weight: 700; margin-bottom: 3px; }
  .trip-region { font-size: 12px; color: rgba(240,235,224,0.45); margin-bottom: 12px; }
  .trip-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
  .tag { padding: 3px 9px; border-radius: 6px; background: rgba(255,255,255,0.06); font-size: 11px; color: rgba(240,235,224,0.6); }
  .trip-price { font-weight: 700; color: #e8c97e; font-size: 17px; margin-bottom: 12px; }
  .trip-price span { font-size: 11px; color: rgba(240,235,224,0.4); font-weight: 400; }
  .aff-btns { display: flex; gap: 7px; flex-wrap: wrap; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.06); }
  .aff-btn { flex: 1; min-width: 70px; padding: 8px 10px; border-radius: 9px; background: rgba(232,201,126,0.10); border: 1px solid rgba(232,201,126,0.25); color: #e8c97e; font-size: 11px; font-weight: 600; cursor: pointer; text-align: center; transition: all 0.2s; text-decoration: none; display: block; }
  .aff-btn:hover { background: rgba(232,201,126,0.22); }
  .members { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }
  .member { display: flex; align-items: center; gap: 14px; padding: 16px 20px; border-radius: 13px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); }
  .member-avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  .member-name { font-weight: 600; font-size: 14px; }
  .member-bar { height: 5px; background: rgba(255,255,255,0.07); border-radius: 100px; overflow: hidden; margin-top: 5px; }
  .member-fill { height: 100%; border-radius: 100px; }
  .member-saved { font-size: 12px; font-weight: 600; margin-left: auto; white-space: nowrap; }
  .invite-box { padding: 22px; border-radius: 14px; border: 1px dashed rgba(232,201,126,0.3); background: rgba(232,201,126,0.04); text-align: center; }
  .invite-box p { color: rgba(240,235,224,0.45); font-size: 13px; margin-bottom: 12px; }
  .invite-row { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
  .chat-window { border-radius: 18px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); overflow: hidden; display: flex; flex-direction: column; height: 460px; }
  .chat-header { padding: 16px 22px; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; gap: 12px; }
  .chat-avatar { width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, #e8c97e, #c8a855); display: flex; align-items: center; justify-content: center; font-size: 17px; }
  .chat-name { font-weight: 600; font-size: 14px; }
  .chat-online { font-size: 11px; color: #4cc864; }
  .chat-msgs { flex: 1; overflow-y: auto; padding: 22px; display: flex; flex-direction: column; gap: 14px; }
  .msg { max-width: 80%; }
  .msg-ai { align-self: flex-start; }
  .msg-user { align-self: flex-end; }
  .msg-bubble { padding: 12px 16px; border-radius: 14px; font-size: 13px; line-height: 1.5; }
  .msg-ai .msg-bubble { background: rgba(255,255,255,0.07); border-bottom-left-radius: 3px; }
  .msg-user .msg-bubble { background: rgba(232,201,126,0.18); color: #f0d990; border-bottom-right-radius: 3px; }
  .msg-time { font-size: 10px; color: rgba(240,235,224,0.3); margin-top: 4px; padding: 0 3px; }
  .msg-user .msg-time { text-align: right; }
  .chat-input-row { padding: 14px 18px; border-top: 1px solid rgba(255,255,255,0.06); display: flex; gap: 8px; }
  .chat-input { flex: 1; padding: 11px 14px; border-radius: 11px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: #f0ebe0; font-size: 13px; outline: none; }
  .chat-send { width: 42px; height: 42px; border-radius: 11px; background: #e8c97e; border: none; cursor: pointer; font-size: 17px; color: #0a0f1e; }
  .quick-qs { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 14px; }
  .quick-q { padding: 6px 13px; border-radius: 18px; border: 1px solid rgba(232,201,126,0.25); background: transparent; color: rgba(240,235,224,0.6); font-size: 11px; cursor: pointer; }
  .quick-q:hover { border-color: rgba(232,201,126,0.5); color: #e8c97e; }
  .aff-panel { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; margin-bottom: 36px; }
  .aff-card { border-radius: 14px; padding: 20px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); }
  .aff-icon { font-size: 26px; margin-bottom: 9px; }
  .aff-name { font-weight: 700; font-size: 14px; margin-bottom: 3px; }
  .aff-commission { font-size: 11px; color: #4cc864; margin-bottom: 3px; }
  .aff-note { font-size: 10px; color: rgba(240,235,224,0.35); margin-bottom: 12px; line-height: 1.5; }
  .aff-signup { display: block; text-align: center; padding: 8px 12px; border-radius: 8px; background: rgba(232,201,126,0.12); border: 1px solid rgba(232,201,126,0.3); color: #e8c97e; font-size: 11px; font-weight: 700; text-decoration: none; }
  .info-box { padding: 18px 22px; border-radius: 13px; border: 1px solid rgba(232,201,126,0.2); background: rgba(232,201,126,0.05); margin-bottom: 28px; font-size: 13px; line-height: 1.8; color: rgba(240,235,224,0.7); }
  .info-box strong { color: #e8c97e; }
  .steps { display: flex; flex-direction: column; gap: 14px; }
  .step-card { padding: 20px 22px; border-radius: 13px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); }
  .step-num { font-size: 11px; color: #e8c97e; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 5px; }
  .step-title { font-size: 16px; font-weight: 700; margin-bottom: 7px; }
  .step-desc { font-size: 13px; color: rgba(240,235,224,0.6); line-height: 1.7; }
  .step-desc a { color: #e8c97e; }
  .code-block { margin-top: 10px; padding: 12px 16px; border-radius: 9px; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); font-family: monospace; font-size: 12px; color: #a8d8a8; line-height: 1.8; white-space: pre-wrap; }
  .toast { position: fixed; bottom: 24px; right: 24px; z-index: 999; padding: 13px 20px; border-radius: 11px; background: #1e2a4a; border: 1px solid rgba(232,201,126,0.3); color: #f0ebe0; font-size: 13px; font-weight: 500; box-shadow: 0 12px 32px rgba(0,0,0,0.4); }
  .deposit-row { display: flex; gap: 10px; margin-bottom: 28px; flex-wrap: wrap; }
  `;

const SUGGESTIONS = [“Best time to visit Tokyo?", “Budget trip to Lisbon", “Visa requirements for Bali?", “Group travel tips"];

export default function App() {
const [tab, setTab] = useState(“dashboard");
const [goals, setGoals] = useState(initialGoals);
const [showAdd, setShowAdd] = useState(false);
const [newGoal, setNewGoal] = useState({ dest: “", type: “solo", target: “", monthly: “" });
const [selectedGoal, setSelectedGoal] = useState(null);
const [filter, setFilter] = useState(“All");
const [messages, setMessages] = useState([{ id: 1, role: “ai", text: “Hey! I am Voya, your travel concierge. Ask me anything about destinations, visas, or budgeting!", time: “Just now" }]);
const [chatInput, setChatInput] = useState("");
const [toast, setToast] = useState(null);
const [depositAmt, setDepositAmt] = useState("");

const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };
const totalSaved = goals.reduce((s, g) => s + g.saved, 0);
const totalTarget = goals.reduce((s, g) => s + g.target, 0);

const addGoal = () => {
if (!newGoal.dest || !newGoal.target) return;
setGoals([…goals, { id: Date.now(), dest: newGoal.dest, type: newGoal.type === “group" ? “Group Trip" : “Solo Adventure", emoji: “🌍", saved: 0, target: parseInt(newGoal.target), group: newGoal.type === “group" }]);
setNewGoal({ dest: “", type: “solo", target: “", monthly: “" });
setShowAdd(false);
showToast(“Goal created!");
};

const deposit = (goalId) => {
const amt = parseInt(depositAmt);
if (!amt || amt <= 0) return;
setGoals(goals.map(g => g.id === goalId ? { …g, saved: Math.min(g.saved + amt, g.target) } : g));
setDepositAmt("");
showToast(“Added to your goal!");
};

const sendMessage = async (text) => {
const msg = text || chatInput.trim();
if (!msg) return;
setChatInput("");
setMessages(prev => […prev, { id: Date.now(), role: “user", text: msg, time: “Just now" }]);
await new Promise(r => setTimeout(r, 1000));
setMessages(prev => […prev, { id: Date.now() + 1, role: “ai", text: getAIReply(msg), time: “Just now" }]);
};

const filteredTrips = filter === “All" ? TRIPS : TRIPS.filter(t => t.tags.includes(filter));

const milestones = selectedGoal ? [
{ label: “Goal created", amt: “0 GBP", done: true },
{ label: “25% milestone", amt: Math.round(selectedGoal.target * 0.25) + “ GBP", done: selectedGoal.saved >= selectedGoal.target * 0.25 },
{ label: “Halfway there!", amt: Math.round(selectedGoal.target * 0.5) + “ GBP", done: selectedGoal.saved >= selectedGoal.target * 0.5 },
{ label: “75% milestone", amt: Math.round(selectedGoal.target * 0.75) + “ GBP", done: selectedGoal.saved >= selectedGoal.target * 0.75 },
{ label: “Goal reached - time to book!", amt: selectedGoal.target + “ GBP", done: selectedGoal.saved >= selectedGoal.target },
] : [];

const TABS = [
{ id: “dashboard", label: “Dashboard" }, { id: “goals", label: “My Goals" },
{ id: “trips", label: “Trip Matching" }, { id: “group", label: “Group" },
{ id: “concierge", label: “Concierge" }, { id: “affiliates", label: “Earn" },
{ id: “hosting", label: “Go Live" },
];

return (
<div className="app">
<style>{css}</style>
<nav className="nav">
<div className="logo">Vault and Voyage</div>
<div className="tabs">{TABS.map(t => <button key={t.id} className={“tab" + (tab === t.id ? “ active" : “")} onClick={() => setTab(t.id)}>{t.label}</button>)}</div>
</nav>

```
  {tab === "dashboard" && (
    <div>
      <div className="hero">
        <div className="hero-tag">Save. Plan. Go.</div>
        <h1>Your smarter way to travel the world</h1>
        <p>Set savings goals, get AI-matched trips, and travel with a personal concierge by your side.</p>
        <div className="hero-btns">
          <button className="btn btn-gold" onClick={() => setTab("goals")}>Start Saving</button>
          <button className="btn btn-outline" onClick={() => setTab("trips")}>Browse Trips</button>
        </div>
      </div>
      <div className="stats">
        <div className="stat"><div className="stat-num">{totalSaved.toLocaleString()} GBP</div><div className="stat-label">Total Saved</div></div>
        <div className="stat"><div className="stat-num">{goals.length}</div><div className="stat-label">Active Goals</div></div>
        <div className="stat"><div className="stat-num">{(totalTarget - totalSaved).toLocaleString()} GBP</div><div className="stat-label">To Go</div></div>
        <div className="stat"><div className="stat-num">{Math.round((totalSaved / totalTarget) * 100)}%</div><div className="stat-label">Progress</div></div>
      </div>
      <div className="section">
        <div className="section-title">Your Goals</div>
        <div className="section-sub">Click a goal to manage it</div>
        <div className="goals-grid">
          {goals.map(g => (
            <div key={g.id} className="goal-card" onClick={() => { setSelectedGoal(g); setTab("goals"); }}>
              <div className={"pill " + (g.group ? "pill-gold" : "pill-green")}>{g.group ? "Group" : "Active"}</div>
              <div className="goal-emoji">{g.emoji}</div>
              <div className="goal-dest">{g.dest}</div>
              <div className="goal-type">{g.type}</div>
              <div className="goal-bar"><div className="goal-fill" style={{ width: Math.min((g.saved / g.target) * 100, 100) + "%" }} /></div>
              <div className="goal-amounts"><span className="goal-saved">{g.saved.toLocaleString()} GBP</span><span className="goal-target">of {g.target.toLocaleString()} GBP</span></div>
            </div>
          ))}
        </div>
        <button className="btn btn-gold" onClick={() => setTab("trips")}>Find My Next Trip</button>
      </div>
    </div>
  )}

  {tab === "goals" && (
    <div className="section">
      <div className="section-title">My Savings Goals</div>
      <div className="section-sub">Track progress and add funds</div>
      <div className="goals-grid">
        {goals.map(g => (
          <div key={g.id} className={"goal-card" + (selectedGoal && selectedGoal.id === g.id ? " active-card" : "")} onClick={() => setSelectedGoal(g)} style={selectedGoal && selectedGoal.id === g.id ? { borderColor: "rgba(232,201,126,0.5)", background: "rgba(232,201,126,0.06)" } : {}}>
            <div className={"pill " + (g.group ? "pill-gold" : "pill-green")}>{g.group ? "Group" : "Active"}</div>
            <div className="goal-emoji">{g.emoji}</div>
            <div className="goal-dest">{g.dest}</div>
            <div className="goal-type">{g.type}</div>
            <div className="goal-bar"><div className="goal-fill" style={{ width: Math.min((g.saved / g.target) * 100, 100) + "%" }} /></div>
            <div className="goal-amounts"><span className="goal-saved">{g.saved.toLocaleString()} GBP</span><span className="goal-target">of {g.target.toLocaleString()} GBP</span></div>
          </div>
        ))}
        <div className="goal-card add-card" onClick={() => setShowAdd(!showAdd)}>
          <div className="add-icon">+</div>
          <div className="add-text">Add new goal</div>
        </div>
      </div>
      {showAdd && (
        <div className="form-box">
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 18 }}>Create New Goal</div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Destination</label><input className="form-input" placeholder="e.g. Tokyo, Japan" value={newGoal.dest} onChange={e => setNewGoal({ ...newGoal, dest: e.target.value })} /></div>
            <div className="form-group"><label className="form-label">Trip Type</label><select className="form-input" value={newGoal.type} onChange={e => setNewGoal({ ...newGoal, type: e.target.value })}><option value="solo">Solo Adventure</option><option value="group">Group Trip</option><option value="couple">Couple Escape</option><option value="family">Family Holiday</option></select></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Target (GBP)</label><input className="form-input" type="number" placeholder="e.g. 2000" value={newGoal.target} onChange={e => setNewGoal({ ...newGoal, target: e.target.value })} /></div>
            <div className="form-group"><label className="form-label">Monthly Save (GBP)</label><input className="form-input" type="number" placeholder="e.g. 200" value={newGoal.monthly} onChange={e => setNewGoal({ ...newGoal, monthly: e.target.value })} /></div>
          </div>
          <div className="form-actions"><button className="btn btn-gold" onClick={addGoal}>Create Goal</button><button className="btn btn-outline" onClick={() => setShowAdd(false)}>Cancel</button></div>
        </div>
      )}
      {selectedGoal && (
        <div style={{ marginTop: 36 }}>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 5 }}>{selectedGoal.emoji} {selectedGoal.dest}</div>
          <div style={{ color: "rgba(240,235,224,0.45)", fontSize: 13, marginBottom: 24 }}>{selectedGoal.type}</div>
          <div className="deposit-row">
            <input className="form-input" type="number" placeholder="Amount to add (GBP)" value={depositAmt} onChange={e => setDepositAmt(e.target.value)} style={{ width: 200 }} />
            <button className="btn btn-gold" onClick={() => deposit(selectedGoal.id)}>Add Funds</button>
            <button className="btn btn-outline" onClick={() => showToast("Auto-save configured!")}>Set Auto-Save</button>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Milestones</div>
          <div className="milestones">
            {milestones.map((m, i) => {
              const isNext = !m.done && (i === 0 || milestones[i - 1].done);
              return <div key={i} className="ms-item"><div className={"ms-dot " + (m.done ? "dot-done" : isNext ? "dot-next" : "dot-todo")} /><div className={"ms-label" + (m.done ? " done" : "")}>{m.label}</div><div className="ms-amt">{m.amt}</div></div>;
            })}
          </div>
        </div>
      )}
    </div>
  )}

  {tab === "trips" && (
    <div className="section">
      <div className="section-title">AI Trip Matching</div>
      <div className="section-sub">Matched to your savings - click booking buttons to earn affiliate commission</div>
      <div className="filters">{TAGS_FILTER.map(f => <button key={f} className={"chip" + (filter === f ? " on" : "")} onClick={() => setFilter(f)}>{f}</button>)}</div>
      <div className="trips-grid">
        {filteredTrips.map(trip => (
          <div key={trip.id} className="trip-card">
            <div className="trip-img" style={{ background: trip.bg }}><span style={{ fontSize: 64 }}>{trip.emoji}</span><div className="match-badge">{trip.match}% match</div></div>
            <div className="trip-body">
              <div className="trip-name">{trip.name}</div>
              <div className="trip-region">{trip.region}</div>
              <div className="trip-tags">{trip.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
              <div className="trip-price">{trip.price.toLocaleString()} GBP <span>per person</span></div>
              <div className="aff-btns">
                <a className="aff-btn" href={AFFILIATE.skyscanner.url} target="_blank" rel="noopener noreferrer">Flights</a>
                <a className="aff-btn" href={AFFILIATE.booking.url} target="_blank" rel="noopener noreferrer">Hotels</a>
                <a className="aff-btn" href={AFFILIATE.viator.url} target="_blank" rel="noopener noreferrer">Experiences</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}

  {tab === "group" && (
    <div className="section">
      <div className="section-title">Group Travel</div>
      <div className="section-sub">Coordinate savings and plans with your crew</div>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 5 }}>Lisbon Weekend - Group Goal</div>
      <div style={{ color: "rgba(240,235,224,0.45)", fontSize: 13, marginBottom: 22 }}>Target: 2200 GBP - 550 GBP per person</div>
      <div className="members">
        {groupMembers.map((m, i) => (
          <div key={i} className="member">
            <div className="member-avatar" style={{ background: m.color + "22" }}>{m.emoji}</div>
            <div style={{ flex: 1 }}>
              <div className="member-name">{m.name}</div>
              <div className="member-bar"><div className="member-fill" style={{ width: (m.saved / m.target) * 100 + "%", background: m.color }} /></div>
            </div>
            <div className="member-saved" style={{ color: m.color }}>{m.saved} / {m.target} GBP</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
        <button className="btn btn-gold" onClick={() => showToast("Added to group pot!")}>Add to Group Pot</button>
        <button className="btn btn-outline" onClick={() => showToast("Reminder sent!")}>Nudge the Group</button>
      </div>
      <div className="invite-box">
        <p>Invite friends to join your group savings goal</p>
        <div className="invite-row">
          <input className="form-input" placeholder="friend@email.com" style={{ width: 220 }} />
          <button className="btn btn-gold" onClick={() => showToast("Invite sent!")}>Send Invite</button>
        </div>
      </div>
    </div>
  )}

  {tab === "concierge" && (
    <div className="section">
      <div className="section-title">Travel Concierge</div>
      <div className="section-sub">Your AI-powered personal travel assistant</div>
      <div className="quick-qs">{SUGGESTIONS.map((q, i) => <button key={i} className="quick-q" onClick={() => sendMessage(q)}>{q}</button>)}</div>
      <div className="chat-window">
        <div className="chat-header">
          <div className="chat-avatar">✈️</div>
          <div><div className="chat-name">Voya - Travel Concierge</div><div className="chat-online">Online now</div></div>
        </div>
        <div className="chat-msgs">
          {messages.map(msg => (
            <div key={msg.id} className={"msg msg-" + msg.role}>
              <div className="msg-bubble">{msg.text}</div>
              <div className="msg-time">{msg.time}</div>
            </div>
          ))}
        </div>
        <div className="chat-input-row">
          <input className="chat-input" placeholder="Ask Voya anything..." value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} />
          <button className="chat-send" onClick={() => sendMessage()}>↑</button>
        </div>
      </div>
    </div>
  )}

  {tab === "affiliates" && (
    <div className="section">
      <div className="section-title">Affiliate Programmes</div>
      <div className="section-sub">Sign up to each then paste your personal links into the code</div>
      <div className="info-box">
        <strong>How it works:</strong> Sign up below. Each programme gives you a unique tracking URL. Replace the placeholder URLs in the code. Every booking a user makes through your app earns you commission paid monthly to your UK bank account.
      </div>
      <div className="aff-panel">
        {Object.entries(AFFILIATE).map(([key, aff]) => (
          <div key={key} className="aff-card">
            <div className="aff-icon">{aff.icon}</div>
            <div className="aff-name">{aff.label}</div>
            <div className="aff-commission">{aff.commission}</div>
            <div className="aff-note">{aff.note}</div>
            <a className="aff-signup" href={aff.signupUrl} target="_blank" rel="noopener noreferrer">Sign Up Free</a>
          </div>
        ))}
      </div>
      <div className="info-box">
        At <strong>500 active users</strong> with 10% clicking through:<br /><br />
        Skyscanner: ~15 GBP per month<br />
        Booking.com: ~240 GBP per month<br />
        Viator: ~240 GBP per month<br />
        GetYourGuide: ~150 GBP per month<br /><br />
        <strong>Total: around 645 GBP per month at 500 users</strong>
      </div>
    </div>
  )}

  {tab === "hosting" && (
    <div className="section">
      <div className="section-title">Go Live for Free</div>
      <div className="section-sub">Host your app on the internet in under 30 minutes</div>
      <div className="steps">
        {[
          { num: "Step 1", title: "Download the app file", desc: "Download the VaultAndVoyage.jsx file from this chat and save it on your computer." },
          { num: "Step 2", title: "Create a free GitHub account", desc: "Go to github.com and sign up free. Create a new repository called vault-and-voyage." },
          { num: "Step 3", title: "Set up a React project", desc: "Install Node.js from nodejs.org then run these commands:", code: "npx create-react-app vault-and-voyage\ncd vault-and-voyage\nnpm start" },
          { num: "Step 4", title: "Deploy free on Vercel", desc: "Go to vercel.com and sign up with GitHub. Import your repo and click Deploy. You get a live URL in 60 seconds." },
          { num: "Step 5", title: "Add your affiliate links", desc: "Replace the placeholder URLs in the AFFILIATE object at the top of App.jsx with your real tracking links." },
        ].map((s, i) => (
          <div key={i} className="step-card">
            <div className="step-num">{s.num}</div>
            <div className="step-title">{s.title}</div>
            <div className="step-desc">{s.desc}</div>
            {s.code && <div className="code-block">{s.code}</div>}
          </div>
        ))}
      </div>
    </div>
  )}

  {toast && <div className="toast">{toast}</div>}
</div>
```

);
}

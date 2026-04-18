import { useState } from “react”;

// ============================================================
// AFFILIATE LINKS — replace these with YOUR personal links
// after signing up to each programme (instructions in the
// 💰 Earn tab inside the app)
// ============================================================
const AFFILIATE = {
skyscanner: {
label: “Search Flights”,
icon: “✈️”,
url: “https://www.skyscanner.net/”, // → replace with your Impact.com referral link
signupUrl: “https://www.partners.skyscanner.net/affiliates/affiliate-products”,
commission: “Up to 20% per booking · 30-day cookie”,
note: “Sign up via Impact.com — takes 2–3 days to approve”,
},
booking: {
label: “Find Hotels”,
icon: “🏨”,
url: “https://www.booking.com/”, // → replace with your Awin/CJ link e.g. booking.com?aid=YOUR_ID
signupUrl: “https://www.booking.com/affiliate-program/v2/index.html”,
commission: “4% hotels · 6% car hire · £2/flight”,
note: “Sign up via Awin (UK region) — usually approved within 48h”,
},
viator: {
label: “Book Experiences”,
icon: “🎟️”,
url: “https://www.viator.com/”, // → replace with your Viator partner link
signupUrl: “https://partnerresources.viator.com/”,
commission: “8% per experience · 30-day cookie”,
note: “Sign up directly at partnerresources.viator.com — instant approval”,
},
getyourguide: {
label: “Tours & Activities”,
icon: “🗺️”,
url: “https://www.getyourguide.com/”, // → replace with your GYG partner link
signupUrl: “https://partner.getyourguide.com/”,
commission: “8–10% per booking · 31-day cookie”,
note: “Sign up via partner.getyourguide.com or through Awin”,
},
};

const GOOGLE_FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');`;

const styles = `
${GOOGLE_FONTS}

- { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: ‘DM Sans’, sans-serif; background: #0a0f1e; color: #f0ebe0; }
  .app { min-height: 100vh; background: #0a0f1e; }

.nav { display: flex; align-items: center; justify-content: space-between; padding: 18px 32px; border-bottom: 1px solid rgba(255,255,255,0.07); background: rgba(10,15,30,0.95); position: sticky; top: 0; z-index: 100; backdrop-filter: blur(12px); flex-wrap: wrap; gap: 8px; }
.nav-logo { font-family: ‘Playfair Display’, serif; font-size: 22px; color: #e8c97e; font-weight: 700; }
.nav-logo span { color: #f0ebe0; }
.nav-tabs { display: flex; gap: 4px; flex-wrap: wrap; }
.nav-tab { padding: 8px 14px; border-radius: 8px; border: none; cursor: pointer; font-family: ‘DM Sans’, sans-serif; font-size: 13px; font-weight: 500; background: transparent; color: rgba(240,235,224,0.5); transition: all 0.2s; }
.nav-tab:hover { color: #f0ebe0; background: rgba(255,255,255,0.05); }
.nav-tab.active { background: rgba(232,201,126,0.15); color: #e8c97e; }

.hero { padding: 80px 32px 60px; text-align: center; background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,201,126,0.08) 0%, transparent 70%); }
.hero-tag { display: inline-block; padding: 6px 16px; border-radius: 100px; border: 1px solid rgba(232,201,126,0.3); color: #e8c97e; font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 24px; }
.hero h1 { font-family: ‘Playfair Display’, serif; font-size: clamp(40px, 6vw, 72px); font-weight: 900; line-height: 1.05; margin-bottom: 20px; background: linear-gradient(135deg, #f0ebe0 30%, #e8c97e 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero p { font-size: 18px; color: rgba(240,235,224,0.6); max-width: 480px; margin: 0 auto 40px; line-height: 1.6; }
.hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

.btn-primary { padding: 14px 32px; background: #e8c97e; color: #0a0f1e; border: none; border-radius: 12px; font-family: ‘DM Sans’, sans-serif; font-weight: 700; font-size: 15px; cursor: pointer; transition: all 0.2s; }
.btn-primary:hover { background: #f0d990; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(232,201,126,0.25); }
.btn-secondary { padding: 14px 32px; background: rgba(255,255,255,0.06); color: #f0ebe0; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; font-family: ‘DM Sans’, sans-serif; font-weight: 500; font-size: 15px; cursor: pointer; transition: all 0.2s; }
.btn-secondary:hover { background: rgba(255,255,255,0.1); }

.stats-row { display: flex; gap: 1px; background: rgba(255,255,255,0.06); border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); }
.stat-item { flex: 1; padding: 28px 24px; text-align: center; background: #0a0f1e; }
.stat-num { font-family: ‘Playfair Display’, serif; font-size: 32px; color: #e8c97e; font-weight: 700; }
.stat-label { font-size: 13px; color: rgba(240,235,224,0.45); margin-top: 4px; }

.section { padding: 60px 32px; max-width: 960px; margin: 0 auto; }
.section-title { font-family: ‘Playfair Display’, serif; font-size: 32px; font-weight: 700; margin-bottom: 8px; }
.section-sub { color: rgba(240,235,224,0.5); font-size: 15px; margin-bottom: 36px; }

.goals-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-bottom: 28px; }
.goal-card { border-radius: 20px; padding: 28px; position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); cursor: pointer; transition: all 0.25s; }
.goal-card:hover { border-color: rgba(232,201,126,0.3); transform: translateY(-2px); }
.goal-card.active-card { border-color: rgba(232,201,126,0.5); background: rgba(232,201,126,0.06); }
.goal-emoji { font-size: 36px; margin-bottom: 16px; }
.goal-dest { font-family: ‘Playfair Display’, serif; font-size: 20px; font-weight: 700; margin-bottom: 4px; }
.goal-type { font-size: 13px; color: rgba(240,235,224,0.45); margin-bottom: 20px; }
.goal-progress-bar { height: 6px; background: rgba(255,255,255,0.08); border-radius: 100px; overflow: hidden; margin-bottom: 10px; }
.goal-progress-fill { height: 100%; border-radius: 100px; background: linear-gradient(90deg, #e8c97e, #f0d990); transition: width 0.6s ease; }
.goal-amounts { display: flex; justify-content: space-between; font-size: 13px; }
.goal-saved { color: #e8c97e; font-weight: 600; }
.goal-target { color: rgba(240,235,224,0.4); }
.goal-pill { position: absolute; top: 20px; right: 20px; padding: 4px 10px; border-radius: 100px; font-size: 11px; font-weight: 600; }
.pill-active { background: rgba(76,200,100,0.15); color: #4cc864; }
.pill-group { background: rgba(232,201,126,0.15); color: #e8c97e; }

.add-goal-form { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 32px; margin-top: 8px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-label { font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: rgba(240,235,224,0.45); }
.form-input { padding: 12px 16px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: #f0ebe0; font-family: ‘DM Sans’, sans-serif; font-size: 15px; outline: none; transition: border-color 0.2s; }
.form-input:focus { border-color: rgba(232,201,126,0.5); }
.form-input option { background: #1a2040; }
.form-actions { display: flex; gap: 12px; margin-top: 8px; }

.milestones { margin-top: 32px; }
.milestone-item { display: flex; align-items: center; gap: 16px; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
.milestone-dot { width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0; }
.dot-done { background: #4cc864; }
.dot-next { background: #e8c97e; box-shadow: 0 0 0 4px rgba(232,201,126,0.15); }
.dot-todo { background: rgba(255,255,255,0.15); }
.milestone-label { flex: 1; font-size: 14px; }
.milestone-label.done { color: rgba(240,235,224,0.45); text-decoration: line-through; }
.milestone-amt { font-size: 13px; color: rgba(240,235,224,0.45); }

.match-filters { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 28px; }
.filter-chip { padding: 8px 18px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: rgba(240,235,224,0.55); font-family: ‘DM Sans’, sans-serif; font-size: 13px; cursor: pointer; transition: all 0.2s; }
.filter-chip:hover { border-color: rgba(232,201,126,0.4); color: #e8c97e; }
.filter-chip.selected { background: rgba(232,201,126,0.12); border-color: rgba(232,201,126,0.5); color: #e8c97e; }

.trips-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
.trip-card { border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); transition: all 0.25s; }
.trip-card:hover { transform: translateY(-3px); border-color: rgba(232,201,126,0.3); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
.trip-img { height: 160px; display: flex; align-items: center; justify-content: center; font-size: 64px; position: relative; }
.trip-match-badge { position: absolute; top: 14px; right: 14px; padding: 5px 12px; background: rgba(10,15,30,0.85); border-radius: 100px; border: 1px solid rgba(232,201,126,0.4); font-size: 12px; font-weight: 700; color: #e8c97e; backdrop-filter: blur(6px); }
.trip-body { padding: 20px; }
.trip-name { font-family: ‘Playfair Display’, serif; font-size: 20px; font-weight: 700; margin-bottom: 4px; }
.trip-region { font-size: 13px; color: rgba(240,235,224,0.45); margin-bottom: 14px; }
.trip-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
.tag { padding: 4px 10px; border-radius: 6px; background: rgba(255,255,255,0.06); font-size: 12px; color: rgba(240,235,224,0.6); }
.trip-price { font-weight: 700; color: #e8c97e; font-size: 18px; margin-bottom: 14px; }
.trip-price span { font-size: 12px; color: rgba(240,235,224,0.4); font-weight: 400; }
.affiliate-btns { display: flex; gap: 8px; flex-wrap: wrap; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.06); }
.aff-btn { flex: 1; min-width: 80px; padding: 9px 10px; border-radius: 10px; background: rgba(232,201,126,0.10); border: 1px solid rgba(232,201,126,0.25); color: #e8c97e; font-family: ‘DM Sans’, sans-serif; font-size: 12px; font-weight: 600; cursor: pointer; text-align: center; transition: all 0.2s; text-decoration: none; display: block; }
.aff-btn:hover { background: rgba(232,201,126,0.22); }

.aff-panel { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 16px; margin-bottom: 40px; }
.aff-card { border-radius: 16px; padding: 22px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); transition: all 0.2s; }
.aff-card:hover { border-color: rgba(232,201,126,0.3); }
.aff-icon { font-size: 28px; margin-bottom: 10px; }
.aff-name { font-weight: 700; font-size: 15px; margin-bottom: 4px; }
.aff-commission { font-size: 12px; color: #4cc864; margin-bottom: 4px; }
.aff-note { font-size: 11px; color: rgba(240,235,224,0.35); margin-bottom: 14px; line-height: 1.5; }
.aff-signup { display: block; text-align: center; padding: 9px 14px; border-radius: 9px; background: rgba(232,201,126,0.12); border: 1px solid rgba(232,201,126,0.3); color: #e8c97e; font-family: ‘DM Sans’, sans-serif; font-size: 12px; font-weight: 700; text-decoration: none; transition: all 0.2s; }
.aff-signup:hover { background: rgba(232,201,126,0.22); }

.info-box { padding: 20px 24px; border-radius: 14px; border: 1px solid rgba(232,201,126,0.2); background: rgba(232,201,126,0.05); margin-bottom: 32px; font-size: 14px; line-height: 1.8; color: rgba(240,235,224,0.7); }
.info-box strong { color: #e8c97e; }

.steps { display: flex; flex-direction: column; gap: 16px; }
.step-card { padding: 22px 24px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); }
.step-num { font-size: 12px; color: #e8c97e; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px; }
.step-title { font-size: 17px; font-weight: 700; margin-bottom: 8px; }
.step-desc { font-size: 14px; color: rgba(240,235,224,0.6); line-height: 1.7; }
.step-desc a { color: #e8c97e; text-decoration: none; }
.step-desc a:hover { text-decoration: underline; }
.code-block { margin-top: 12px; padding: 14px 18px; border-radius: 10px; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); font-family: monospace; font-size: 13px; color: #a8d8a8; line-height: 1.8; white-space: pre-wrap; }

.group-members { display: flex; flex-direction: column; gap: 14px; margin-bottom: 32px; }
.member-row { display: flex; align-items: center; gap: 16px; padding: 18px 22px; border-radius: 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); }
.member-avatar { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
.member-name { font-weight: 600; font-size: 15px; }
.member-bar { height: 6px; background: rgba(255,255,255,0.07); border-radius: 100px; overflow: hidden; margin-top: 6px; }
.member-bar-fill { height: 100%; border-radius: 100px; transition: width 0.5s ease; }
.member-saved { font-size: 13px; font-weight: 600; margin-left: auto; white-space: nowrap; }
.invite-box { padding: 24px; border-radius: 16px; border: 1px dashed rgba(232,201,126,0.3); background: rgba(232,201,126,0.04); text-align: center; }
.invite-box p { color: rgba(240,235,224,0.45); font-size: 14px; margin-bottom: 14px; }

.chat-window { border-radius: 20px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); overflow: hidden; display: flex; flex-direction: column; height: 480px; }
.chat-header { padding: 18px 24px; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; gap: 14px; }
.chat-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #e8c97e, #c8a855); display: flex; align-items: center; justify-content: center; font-size: 18px; }
.chat-name { font-weight: 600; font-size: 15px; }
.chat-online { font-size: 12px; color: #4cc864; margin-top: 1px; }
.chat-messages { flex: 1; overflow-y: auto; padding: 24px; display: flex; flex-direction: column; gap: 16px; }
.chat-messages::-webkit-scrollbar { width: 4px; }
.chat-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
.msg { max-width: 80%; }
.msg-ai { align-self: flex-start; }
.msg-user { align-self: flex-end; }
.msg-bubble { padding: 13px 18px; border-radius: 16px; font-size: 14px; line-height: 1.5; }
.msg-ai .msg-bubble { background: rgba(255,255,255,0.07); border-bottom-left-radius: 4px; }
.msg-user .msg-bubble { background: rgba(232,201,126,0.18); color: #f0d990; border-bottom-right-radius: 4px; border: 1px solid rgba(232,201,126,0.2); }
.msg-time { font-size: 11px; color: rgba(240,235,224,0.3); margin-top: 5px; padding: 0 4px; }
.msg-user .msg-time { text-align: right; }
.chat-input-row { padding: 16px 20px; border-top: 1px solid rgba(255,255,255,0.06); display: flex; gap: 10px; }
.chat-input { flex: 1; padding: 12px 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: #f0ebe0; font-family: ‘DM Sans’, sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s; }
.chat-input:focus { border-color: rgba(232,201,126,0.4); }
.chat-send { width: 46px; height: 46px; border-radius: 12px; background: #e8c97e; border: none; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; color: #0a0f1e; }
.chat-send:hover { background: #f0d990; }
.typing { display: flex; gap: 5px; align-items: center; padding: 4px 0; }
.typing-dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(240,235,224,0.3); animation: bounce 1.2s infinite; }
.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce { 0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)} }
.quick-qs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
.quick-q { padding: 7px 14px; border-radius: 20px; border: 1px solid rgba(232,201,126,0.25); background: transparent; color: rgba(240,235,224,0.6); font-family: ‘DM Sans’, sans-serif; font-size: 12px; cursor: pointer; transition: all 0.2s; }
.quick-q:hover { border-color: rgba(232,201,126,0.5); color: #e8c97e; background: rgba(232,201,126,0.07); }

.toast { position: fixed; bottom: 28px; right: 28px; z-index: 999; padding: 14px 22px; border-radius: 12px; background: #1e2a4a; border: 1px solid rgba(232,201,126,0.3); color: #f0ebe0; font-size: 14px; font-weight: 500; box-shadow: 0 12px 32px rgba(0,0,0,0.4); animation: slideUp 0.3s ease; }
@keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
`;

const TRIPS = [
{ id: 1, emoji: “🇯🇵”, name: “Tokyo Explorer”, region: “Japan, Asia”, tags: [“Culture”, “Food”, “City”], price: 1850, match: 98, bg: “rgba(220,53,69,0.12)” },
{ id: 2, emoji: “🇵🇹”, name: “Lisbon Escape”, region: “Portugal, Europe”, tags: [“City Break”, “Food”, “History”], price: 920, match: 94, bg: “rgba(255,193,7,0.1)” },
{ id: 3, emoji: “🏝️”, name: “Bali Retreat”, region: “Indonesia, SE Asia”, tags: [“Beach”, “Wellness”, “Nature”], price: 1400, match: 89, bg: “rgba(40,167,69,0.1)” },
{ id: 4, emoji: “🇲🇦”, name: “Marrakech Magic”, region: “Morocco, Africa”, tags: [“Culture”, “Adventure”, “Food”], price: 780, match: 85, bg: “rgba(232,201,126,0.1)” },
{ id: 5, emoji: “🇮🇸”, name: “Iceland Aurora”, region: “Iceland, Europe”, tags: [“Adventure”, “Nature”, “Photography”], price: 2200, match: 81, bg: “rgba(0,123,255,0.1)” },
{ id: 6, emoji: “🇻🇳”, name: “Vietnam Discovery”, region: “Vietnam, SE Asia”, tags: [“Backpacker”, “Food”, “Culture”], price: 1100, match: 77, bg: “rgba(255,99,132,0.1)” },
];

const TAGS_FILTER = [“All”, “Beach”, “City”, “Culture”, “Adventure”, “Food”, “Wellness”, “Nature”];
const CONCIERGE_SUGGESTIONS = [“Best time to visit Tokyo?”, “Budget trip to Lisbon”, “Visa requirements for Bali?”, “Group travel tips”];

const AI_RESPONSES = {
default: “I’m Voya, your personal travel concierge! Ask me about destinations, visas, or budgeting. I’ll help you plan the perfect trip ✈️”,
tokyo: “Tokyo is magical year-round! 🇯🇵 Cherry blossom season (late March–April) is iconic, but October–November has fewer crowds. Budget ~£120/day including accommodation. Search flights via the Skyscanner link in Trip Matching!”,
lisbon: “Lisbon is Europe’s best value break right now! 🇵🇹 Spring (March–May) is ideal. A 5-day trip can be done for under £600 from the UK. Don’t miss Alfama and Sintra. Check Booking.com for deals in the Trip Matching tab!”,
bali: “Bali is paradise! 🌴 Best time: April–October (dry season). No visa needed for UK citizens under 30 days. A 10-day trip runs £900–£1,400. Book experiences through Viator or GetYourGuide for the best prices!”,
visa: “For UK travellers: 🇯🇵 Japan — visa-free 90 days. 🇮🇩 Bali — free visa on arrival. 🇻🇳 Vietnam — e-visa (~£20). 🇲🇦 Morocco — visa-free. Always double-check at gov.uk before travelling!”,
group: “Group travel tips! 👫 1. Set a shared goal here. 2. Designate a ‘trip lead’ each day. 3. Book accommodation with communal spaces. 4. Plan 1 group activity per day, keep the rest flexible. GetYourGuide has great group rates!”,
budget: “Smart saving tips: Even £50/month auto-saved adds up to £600/year. Flying Tue–Thu is 20–40% cheaper. Book hotels 6–8 weeks out on Booking.com. Use Viator for experiences — often cheaper than door prices!”,
};

function getAIReply(msg) {
const l = msg.toLowerCase();
if (l.includes(“tokyo”) || l.includes(“japan”)) return AI_RESPONSES.tokyo;
if (l.includes(“lisbon”) || l.includes(“portugal”)) return AI_RESPONSES.lisbon;
if (l.includes(“bali”) || l.includes(“indonesia”)) return AI_RESPONSES.bali;
if (l.includes(“visa”)) return AI_RESPONSES.visa;
if (l.includes(“group”)) return AI_RESPONSES.group;
if (l.includes(“budget”) || l.includes(“cheap”) || l.includes(“save”)) return AI_RESPONSES.budget;
return AI_RESPONSES.default;
}

const groupMembers = [
{ name: “You”, emoji: “😎”, saved: 460, target: 550, color: “#e8c97e” },
{ name: “Jamie”, emoji: “🧑‍🦱”, saved: 550, target: 550, color: “#4cc864” },
{ name: “Priya”, emoji: “👩‍🦰”, saved: 380, target: 550, color: “#60a5fa” },
{ name: “Marcus”, emoji: “🧔”, saved: 450, target: 550, color: “#f472b6” },
];

const initialGoals = [
{ id: 1, dest: “Tokyo, Japan”, type: “Solo Adventure”, emoji: “🇯🇵”, saved: 1200, target: 1850, group: false },
{ id: 2, dest: “Lisbon Weekend”, type: “Group Trip · 4 people”, emoji: “🇵🇹”, saved: 1840, target: 2200, group: true },
];

export default function App() {
const [tab, setTab] = useState(“dashboard”);
const [goals, setGoals] = useState(initialGoals);
const [showAddGoal, setShowAddGoal] = useState(false);
const [newGoal, setNewGoal] = useState({ dest: “”, type: “solo”, target: “”, monthly: “” });
const [selectedGoal, setSelectedGoal] = useState(null);
const [filter, setFilter] = useState(“All”);
const [messages, setMessages] = useState([{ id: 1, role: “ai”, text: “Hey! ✈️ I’m Voya, your travel concierge. Ask me anything about destinations, visas, or budgeting!”, time: “Just now” }]);
const [chatInput, setChatInput] = useState(””);
const [typing, setTyping] = useState(false);
const [toast, setToast] = useState(null);
const [depositAmt, setDepositAmt] = useState(””);

const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };
const totalSaved = goals.reduce((s, g) => s + g.saved, 0);
const totalTarget = goals.reduce((s, g) => s + g.target, 0);

const addGoal = () => {
if (!newGoal.dest || !newGoal.target) return;
setGoals([…goals, { id: Date.now(), dest: newGoal.dest, type: newGoal.type === “group” ? “Group Trip” : “Solo Adventure”, emoji: “🌍”, saved: 0, target: parseInt(newGoal.target), group: newGoal.type === “group” }]);
setNewGoal({ dest: “”, type: “solo”, target: “”, monthly: “” });
setShowAddGoal(false);
showToast(“🎉 New savings goal created!”);
};

const deposit = (goalId) => {
const amt = parseInt(depositAmt);
if (!amt || amt <= 0) return;
setGoals(goals.map(g => g.id === goalId ? { …g, saved: Math.min(g.saved + amt, g.target) } : g));
setDepositAmt(””);
showToast(`✅ £${amt} added!`);
};

const sendMessage = async (text) => {
const msg = text || chatInput.trim();
if (!msg) return;
setChatInput(””);
setMessages(prev => […prev, { id: Date.now(), role: “user”, text: msg, time: “Just now” }]);
setTyping(true);
await new Promise(r => setTimeout(r, 1000 + Math.random() * 600));
setTyping(false);
setMessages(prev => […prev, { id: Date.now() + 1, role: “ai”, text: getAIReply(msg), time: “Just now” }]);
};

const filteredTrips = filter === “All” ? TRIPS : TRIPS.filter(t => t.tags.includes(filter));

const milestones = selectedGoal ? [
{ label: “Goal created”, amt: “£0”, done: true },
{ label: “25% milestone”, amt: `£${Math.round(selectedGoal.target * 0.25)}`, done: selectedGoal.saved >= selectedGoal.target * 0.25 },
{ label: “Halfway there!”, amt: `£${Math.round(selectedGoal.target * 0.5)}`, done: selectedGoal.saved >= selectedGoal.target * 0.5 },
{ label: “75% milestone”, amt: `£${Math.round(selectedGoal.target * 0.75)}`, done: selectedGoal.saved >= selectedGoal.target * 0.75 },
{ label: “Goal reached — time to book! 🎉”, amt: `£${selectedGoal.target}`, done: selectedGoal.saved >= selectedGoal.target },
] : [];

const TABS = [
{ id: “dashboard”, label: “Dashboard” }, { id: “goals”, label: “My Goals” },
{ id: “trips”, label: “Trip Matching” }, { id: “group”, label: “Group” },
{ id: “concierge”, label: “Concierge” }, { id: “affiliates”, label: “💰 Earn” },
{ id: “hosting”, label: “🚀 Go Live” },
];

return (
<div className="app">
<style>{styles}</style>
<nav className="nav">
<div className="nav-logo">Vault <span>&</span> Voyage</div>
<div className="nav-tabs">{TABS.map(t => <button key={t.id} className={`nav-tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>{t.label}</button>)}</div>
</nav>

```
  {tab === "dashboard" && (<>
    <div className="hero">
      <div className="hero-tag">Save. Plan. Go.</div>
      <h1>Your smarter way<br />to travel the world</h1>
      <p>Set savings goals, get AI-matched trips, and travel with a personal concierge by your side.</p>
      <div className="hero-btns">
        <button className="btn-primary" onClick={() => setTab("goals")}>Start Saving</button>
        <button className="btn-secondary" onClick={() => setTab("trips")}>Browse Trips</button>
      </div>
    </div>
    <div className="stats-row">
      <div className="stat-item"><div className="stat-num">£{totalSaved.toLocaleString()}</div><div className="stat-label">Total Saved</div></div>
      <div className="stat-item"><div className="stat-num">{goals.length}</div><div className="stat-label">Active Goals</div></div>
      <div className="stat-item"><div className="stat-num">£{(totalTarget - totalSaved).toLocaleString()}</div><div className="stat-label">To Go</div></div>
      <div className="stat-item"><div className="stat-num">{Math.round((totalSaved / totalTarget) * 100)}%</div><div className="stat-label">Progress</div></div>
    </div>
    <div className="section">
      <div className="section-title">Your Goals</div>
      <div className="section-sub">Click a goal to manage it</div>
      <div className="goals-grid">
        {goals.map(g => (
          <div key={g.id} className="goal-card" onClick={() => { setSelectedGoal(g); setTab("goals"); }}>
            <div className={`goal-pill ${g.group ? "pill-group" : "pill-active"}`}>{g.group ? "Group" : "Active"}</div>
            <div className="goal-emoji">{g.emoji}</div>
            <div className="goal-dest">{g.dest}</div>
            <div className="goal-type">{g.type}</div>
            <div className="goal-progress-bar"><div className="goal-progress-fill" style={{ width: `${Math.min((g.saved / g.target) * 100, 100)}%` }} /></div>
            <div className="goal-amounts"><span className="goal-saved">£{g.saved.toLocaleString()}</span><span className="goal-target">of £{g.target.toLocaleString()}</span></div>
          </div>
        ))}
      </div>
      <button className="btn-primary" onClick={() => setTab("trips")}>Find My Next Trip →</button>
    </div>
  </>)}

  {tab === "goals" && (
    <div className="section">
      <div className="section-title">My Savings Goals</div>
      <div className="section-sub">Track progress and add funds</div>
      <div className="goals-grid">
        {goals.map(g => (
          <div key={g.id} className={`goal-card ${selectedGoal?.id === g.id ? "active-card" : ""}`} onClick={() => setSelectedGoal(g)}>
            <div className={`goal-pill ${g.group ? "pill-group" : "pill-active"}`}>{g.group ? "Group" : "Active"}</div>
            <div className="goal-emoji">{g.emoji}</div>
            <div className="goal-dest">{g.dest}</div>
            <div className="goal-type">{g.type}</div>
            <div className="goal-progress-bar"><div className="goal-progress-fill" style={{ width: `${Math.min((g.saved / g.target) * 100, 100)}%` }} /></div>
            <div className="goal-amounts"><span className="goal-saved">£{g.saved.toLocaleString()}</span><span className="goal-target">of £{g.target.toLocaleString()}</span></div>
          </div>
        ))}
        <div className="goal-card" style={{ border: "1px dashed rgba(255,255,255,0.12)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 200 }} onClick={() => setShowAddGoal(!showAddGoal)}>
          <div style={{ fontSize: 36, opacity: 0.4 }}>+</div>
          <div style={{ color: "rgba(240,235,224,0.4)", fontSize: 14 }}>Add new goal</div>
        </div>
      </div>
      {showAddGoal && (
        <div className="add-goal-form">
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, marginBottom: 20 }}>Create New Goal</div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Destination</label><input className="form-input" placeholder="e.g. Tokyo, Japan" value={newGoal.dest} onChange={e => setNewGoal({ ...newGoal, dest: e.target.value })} /></div>
            <div className="form-group"><label className="form-label">Trip Type</label><select className="form-input" value={newGoal.type} onChange={e => setNewGoal({ ...newGoal, type: e.target.value })}><option value="solo">Solo Adventure</option><option value="group">Group Trip</option><option value="couple">Couple's Escape</option><option value="family">Family Holiday</option></select></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Target (£)</label><input className="form-input" type="number" placeholder="e.g. 2000" value={newGoal.target} onChange={e => setNewGoal({ ...newGoal, target: e.target.value })} /></div>
            <div className="form-group"><label className="form-label">Monthly Auto-Save (£)</label><input className="form-input" type="number" placeholder="e.g. 200" value={newGoal.monthly} onChange={e => setNewGoal({ ...newGoal, monthly: e.target.value })} /></div>
          </div>
          <div className="form-actions"><button className="btn-primary" onClick={addGoal}>Create Goal</button><button className="btn-secondary" onClick={() => setShowAddGoal(false)}>Cancel</button></div>
        </div>
      )}
      {selectedGoal && (
        <div style={{ marginTop: 40 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, marginBottom: 6 }}>{selectedGoal.emoji} {selectedGoal.dest}</div>
          <div style={{ color: "rgba(240,235,224,0.45)", fontSize: 14, marginBottom: 28 }}>{selectedGoal.type}</div>
          <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
            <input className="form-input" type="number" placeholder="Amount to add (£)" value={depositAmt} onChange={e => setDepositAmt(e.target.value)} style={{ width: 200 }} />
            <button className="btn-primary" onClick={() => deposit(selectedGoal.id)}>Add Funds</button>
            <button className="btn-secondary" onClick={() => showToast("🔄 Auto-save configured!")}>Set Auto-Save</button>
          </div>
          <div className="section-title" style={{ fontSize: 20, marginBottom: 4 }}>Milestones</div>
          <div className="milestones">
            {milestones.map((m, i) => {
              const isNext = !m.done && (i === 0 || milestones[i - 1].done);
              return <div className="milestone-item" key={i}><div className={`milestone-dot ${m.done ? "dot-done" : isNext ? "dot-next" : "dot-todo"}`} /><div className={`milestone-label ${m.done ? "done" : ""}`}>{m.label}</div><div className="milestone-amt">{m.amt}</div></div>;
            })}
          </div>
        </div>
      )}
    </div>
  )}

  {tab === "trips" && (
    <div className="section">
      <div className="section-title">AI Trip Matching</div>
      <div className="section-sub">Matched to your savings goals — click the booking buttons below each trip to earn affiliate commission</div>
      <div className="match-filters">{TAGS_FILTER.map(f => <button key={f} className={`filter-chip ${filter === f ? "selected" : ""}`} onClick={() => setFilter(f)}>{f}</button>)}</div>
      <div className="trips-grid">
        {filteredTrips.map(trip => (
          <div key={trip.id} className="trip-card">
            <div className="trip-img" style={{ background: trip.bg }}><span style={{ fontSize: 72 }}>{trip.emoji}</span><div className="trip-match-badge">{trip.match}% match</div></div>
            <div className="trip-body">
              <div className="trip-name">{trip.name}</div>
              <div className="trip-region">📍 {trip.region}</div>
              <div className="trip-tags">{trip.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
              <div className="trip-price">£{trip.price.toLocaleString()} <span>/ person</span></div>
              <div className="affiliate-btns">
                <a className="aff-btn" href={AFFILIATE.skyscanner.url} target="_blank" rel="noopener noreferrer sponsored">✈️ Flights</a>
                <a className="aff-btn" href={AFFILIATE.booking.url} target="_blank" rel="noopener noreferrer sponsored">🏨 Hotels</a>
                <a className="aff-btn" href={AFFILIATE.viator.url} target="_blank" rel="noopener noreferrer sponsored">🎟️ Experiences</a>
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
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, marginBottom: 6 }}>🇵🇹 Lisbon Weekend — Group Goal</div>
      <div style={{ color: "rgba(240,235,224,0.45)", fontSize: 14, marginBottom: 24 }}>Target: £2,200 · £550 per person</div>
      <div className="group-members">
        {groupMembers.map((m, i) => (
          <div key={i} className="member-row">
            <div className="member-avatar" style={{ background: `${m.color}22` }}>{m.emoji}</div>
            <div style={{ flex: 1 }}>
              <div className="member-name">{m.name}</div>
              <div className="member-bar"><div className="member-bar-fill" style={{ width: `${(m.saved / m.target) * 100}%`, background: m.color }} /></div>
            </div>
            <div className="member-saved" style={{ color: m.color }}>£{m.saved} <span style={{ color: "rgba(240,235,224,0.35)", fontWeight: 400 }}>/ £{m.target}</span></div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
        <button className="btn-primary" onClick={() => showToast("💰 £50 added to group pot!")}>Add to Group Pot</button>
        <button className="btn-secondary" onClick={() => showToast("📨 Reminder sent!")}>Nudge the Group</button>
      </div>
      <div className="invite-box">
        <p>Invite friends to join your group savings goal</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <input className="form-input" placeholder="friend@email.com" style={{ width: 240 }} />
          <button className="btn-primary" onClick={() => showToast("📩 Invite sent!")}>Send Invite</button>
        </div>
      </div>
    </div>
  )}

  {tab === "concierge" && (
    <div className="section">
      <div className="section-title">Travel Concierge</div>
      <div className="section-sub">Your AI-powered personal travel assistant</div>
      <div className="quick-qs">{CONCIERGE_SUGGESTIONS.map((q, i) => <button key={i} className="quick-q" onClick={() => sendMessage(q)}>{q}</button>)}</div>
      <div className="chat-window">
        <div className="chat-header">
          <div className="chat-avatar">✈️</div>
          <div><div className="chat-name">Voya — Travel Concierge</div><div className="chat-online">● Online now</div></div>
        </div>
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`msg msg-${msg.role}`}>
              <div className="msg-bubble">{msg.text}</div>
              <div className="msg-time">{msg.time}</div>
            </div>
          ))}
          {typing && <div className="msg msg-ai"><div className="msg-bubble"><div className="typing"><div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" /></div></div></div>}
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
      <div className="section-title">💰 Affiliate Programmes</div>
      <div className="section-sub">Sign up to each (free) — then paste your personal links into the AFFILIATE object at the top of the code</div>
      <div className="info-box">
        <strong>How it works:</strong> Sign up below → each programme gives you a unique tracking URL → replace the placeholder URLs in the code → every booking a user makes through your app earns you commission, paid monthly to your UK bank account. No partnership negotiations needed.
      </div>
      <div className="aff-panel">
        {Object.entries(AFFILIATE).map(([key, aff]) => (
          <div key={key} className="aff-card">
            <div className="aff-icon">{aff.icon}</div>
            <div className="aff-name">{aff.label}</div>
            <div className="aff-commission">✓ {aff.commission}</div>
            <div className="aff-note">{aff.note}</div>
            <a className="aff-signup" href={aff.signupUrl} target="_blank" rel="noopener noreferrer">Sign Up Free →</a>
          </div>
        ))}
      </div>
      <div className="section-title" style={{ fontSize: 22, marginBottom: 16 }}>Projected Monthly Earnings</div>
      <div className="info-box">
        At <strong>500 active users</strong> with ~10% clicking through to book:<br /><br />
        ✈️ Skyscanner: ~50 clicks × £0.30 avg = <strong>£15/mo</strong><br />
        🏨 Booking.com: ~30 bookings × £8 commission = <strong>£240/mo</strong><br />
        🎟️ Viator: ~20 bookings × £12 avg = <strong>£240/mo</strong><br />
        🗺️ GetYourGuide: ~15 bookings × £10 avg = <strong>£150/mo</strong><br /><br />
        <strong>Total: ~£645/month at 500 users</strong> — scales linearly with growth.
      </div>
    </div>
  )}

  {tab === "hosting" && (
    <div className="section">
      <div className="section-title">🚀 Go Live for Free</div>
      <div className="section-sub">Host your app on the internet in under 30 minutes — no technical experience needed</div>
      <div className="steps">
        {[
          { num: "Step 1", title: "Download the app file", desc: "Download the VaultAndVoyage.jsx file from this chat and save it on your computer." },
          { num: "Step 2", title: "Create a free GitHub account", desc: <span>Go to <a href="https://github.com" target="_blank" rel="noopener noreferrer">github.com</a> → Sign up free → Create a new repository called <strong>vault-and-voyage</strong>. This is where your code lives.</span> },
          { num: "Step 3", title: "Set up a React project locally", desc: "Install Node.js from nodejs.org (free), then run these commands:", code: `npx create-react-app vault-and-voyage\ncd vault-and-voyage\n# Paste your VaultAndVoyage.jsx content into src/App.js\nnpm start   # Preview at localhost:3000` },
          { num: "Step 4", title: "Deploy free on Vercel (recommended)", desc: <span>Go to <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a> → Sign up with GitHub (free, no credit card) → Click "Add New Project" → Select your repo → Click Deploy. You'll have a live URL like <strong>vault-and-voyage.vercel.app</strong> in 60 seconds.</span> },
          { num: "Step 5", title: "OR drag-and-drop on Netlify", desc: <span>Go to <a href="https://netlify.com" target="_blank" rel="noopener noreferrer">netlify.com</a> → Sign up free → Run <code style={{background:"rgba(255,255,255,0.1)",padding:"2px 6px",borderRadius:4}}>npm run build</code> → Drag the <strong>/build</strong> folder onto the Netlify dashboard. Live instantly.</span>, code: `npm run build\n# Then drag the /build folder to app.netlify.com` },
          { num: "Step 6", title: "Add your real affiliate links", desc: "Open VaultAndVoyage.jsx, find the AFFILIATE object at the top, and replace the placeholder URLs with your real affiliate tracking links from each programme." },
          { num: "Step 7 (optional)", title: "Get a cheap UK domain name", desc: <span>Buy a <strong>.co.uk</strong> domain from <a href="https://www.123-reg.co.uk" target="_blank" rel="noopener noreferrer">123-reg.co.uk</a> for ~£3/year. Connect it to Vercel or Netlify in their domain settings — they walk you through it step by step.</span> },
        ].map((s, i) => (
          <div key={i} className="step-card">
            <div className="step-num">{s.num}</div>
            <div className="step-title">{s.title}</div>
            <div className="step-desc">{s.desc}</div>
            {s.code && <div className="code-block">{s.code}</div>}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 40 }}>
        <div className="section-title" style={{ fontSize: 22, marginBottom: 16 }}>Quick Links</div>
        <div className="aff-panel">
          {[
            { icon: "▲", name: "Vercel", desc: "Fastest free hosting — no credit card", url: "https://vercel.com" },
            { icon: "◆", name: "Netlify", desc: "Drag & drop deployment", url: "https://netlify.com" },
            { icon: "🐱", name: "GitHub", desc: "Store your code for free", url: "https://github.com" },
            { icon: "⬡", name: "Node.js", desc: "Required to build the app", url: "https://nodejs.org" },
            { icon: "🌐", name: "123-reg", desc: "UK domains from ~£3/yr", url: "https://www.123-reg.co.uk" },
          ].map((l, i) => (
            <div key={i} className="aff-card">
              <div className="aff-icon" style={{ fontSize: 22 }}>{l.icon}</div>
              <div className="aff-name">{l.name}</div>
              <div className="aff-note" style={{ fontSize: 13, color: "rgba(240,235,224,0.55)", marginBottom: 14 }}>{l.desc}</div>
              <a className="aff-signup" href={l.url} target="_blank" rel="noopener noreferrer">Open →</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}

  {toast && <div className="toast">✦ {toast}</div>}
</div>
```

);
}

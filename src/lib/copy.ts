export const COPY = {
  heroH1: "A call can be missed. Your presence shouldn’t be.",
  heroSub:
    "A small, moving telepresence robot that helps families abroad see, talk to, and stay close to their loved ones in Kerala.",
  distanceLine: "Thousands of kilometres away. One simple way to feel closer.",
  privacyNote:
    "Designed with privacy-first access controls and secure communication.",
  mobilityNote:
    "Designed to handle common indoor transitions and small thresholds, subject to final engineering validation.",
  demoEnd:
    "That was a virtual visit. Imagine doing it with your family every day.",
  finalH: "Bring your presence home.",
  finalSub: "Stay close to the people who raised you—even when you live far away.",
} as const;

export const GCC_CITIES = [
  { id: "dubai", label: "Dubai", km: 2900, ml: "ദുബായിൽ" },
  { id: "abudhabi", label: "Abu Dhabi", km: 2980, ml: "അബുദാബിയിൽ" },
  { id: "doha", label: "Doha", km: 3100, ml: "ദോഹയിൽ" },
  { id: "riyadh", label: "Riyadh", km: 3500, ml: "റിയാദിൽ" },
  { id: "kuwait", label: "Kuwait", km: 3600, ml: "കുവൈത്തിൽ" },
  { id: "muscat", label: "Muscat", km: 2200, ml: "മസ്കറ്റിൽ" },
  { id: "manama", label: "Manama", km: 3300, ml: "മനാമയിൽ" },
] as const;

export const MALAYALAM_PHRASES = [
  { ml: "സുപ്രഭാതം", en: "Good morning." },
  { ml: "പ്രഭാത ഭക്ഷണം കഴിച്ചോ?", en: "Did you have breakfast?" },
  { ml: "ഞാൻ ഇന്ന് രാത്രി വീണ്ടും വിളിക്കാം.", en: "I will call again tonight." },
  { ml: "കുട്ടികൾ നിങ്ങളെ കാണാൻ ആഗ്രഹിക്കുന്നു.", en: "The children want to see you." },
  { ml: "സുഖമാണോ?", en: "Are you comfortable?" },
  { ml: "ഞാൻ നിങ്ങളോടൊപ്പമുണ്ട്.", en: "I am here with you." },
] as const;

export const ROBOT_HOTSPOTS = [
  { id: "camera", label: "See", title: "Camera", text: "See the room from the family member’s point of view." },
  { id: "microphone", label: "Listen", title: "Microphone", text: "Hear and speak in real time." },
  { id: "speaker", label: "Talk", title: "Speaker", text: "Lets the elder hear the caller clearly." },
  { id: "wheels", label: "Move", title: "Drive wheels", text: "Move through the home remotely." },
  { id: "light", label: "Status", title: "Soft status light", text: "Shows when the robot is active." },
  { id: "privacy", label: "Privacy", title: "Privacy cover", text: "Makes it clear when video is unavailable." },
  { id: "battery", label: "Recharge", title: "Battery system", text: "Allows regular use between charging sessions." },
  { id: "charging", label: "Dock", title: "Charging contacts", text: "Enables automatic return to the charging station." },
  { id: "raised", label: "Cross", title: "Raised-wheel design", text: "Helps cross small thresholds and floor transitions." },
] as const;

export const OBSTACLES = [
  { id: "tile", label: "Tile-to-tile transition", note: "Rolls over small tile lips between rooms.", status: "pass" },
  { id: "threshold", label: "Small doorway threshold", note: "Raised-wheel design climbs low door strips.", status: "pass" },
  { id: "platform", label: "Slightly raised platform", note: "Handles low platforms within validated height.", status: "pass" },
  { id: "carpet", label: "Carpet edge", note: "Soft edge crossing at slow speed.", status: "pass" },
  { id: "passage", label: "Narrow passage", note: "Slows and centres through tight gaps.", status: "pass" },
  { id: "clutter", label: "Small household clutter", note: "Stops safely and asks for a new path.", status: "fail-safe" },
  { id: "hump", label: "Mild floor hump", note: "Eases over gentle humps; stops if too steep.", status: "fail-safe" },
] as const;

export const KERALA_DISTRICTS = [
  "Ernakulam (Kochi)",
  "Kozhikode (Calicut)",
  "Thrissur",
  "Malappuram",
  "Thiruvananthapuram",
  "Kottayam",
  "Kannur",
  "Palakkad",
  "Kollam",
  "Alappuzha",
  "Pathanamthitta",
  "Kasaragod",
  "Wayanad",
  "Idukki",
] as const;

export const PILOT_CONFIG = {
  batchNumber: 1,
  totalUnits: 50,
  reservedUnits: 38,
  depositAmount: "Zero upfront payment",
  deliveryWindow: "Q2 Pilot Batch",
  trialDays: 30,
  tagline: "Limited to 50 Kerala families. Reserve your presence today.",
} as const;

export const BANNED_COPY = [
  "monitor your parents",
  "secure webrtc",
  "2mfa",
  "secure cloud operations",
  "medical emergency",
  "climb stairs",
];

export const TALLY_CONFIG = {
  // Set your Tally form ID here or via NEXT_PUBLIC_TALLY_FORM_ID in .env.local
  formId: process.env.NEXT_PUBLIC_TALLY_FORM_ID || "VLeqQa",
  modalWidth: 650,
  emoji: "👋",
} as const;



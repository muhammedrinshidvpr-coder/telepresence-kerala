export const COPY = {
  heroH1: "A call can be missed. Your presence shouldn’t be.",
  heroSub:
    "A small, moving telepresence robot that helps families abroad see, talk to, and stay close to their loved ones in Kerala.",
  distanceLine: "Thousands of kilometres away. One simple way to feel closer.",
  privacyNote:
    "Built on peer-to-peer WebRTC encryption for complete privacy with zero intrusion into your family home.",
  mobilityNote:
    "Designed to handle common indoor transitions and small thresholds.",
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
  { id: "camera", label: "Enlarged Camera", title: "High-Definition Optical Lens", text: "Enlarged wide-angle camera lens positioned at optimal eye level for natural face-to-face interaction." },
  { id: "screen", label: "Bigger Display", title: "Expansive Companion Display", text: "Large landscape display showing your warm smile clearly to parents across the room." },
  { id: "tires", label: "Chunky All-Terrain Tires", title: "Heavy-Tread Rugged Wheels", text: "4 deep-tread rubber tires engineered to transition smoothly across Kerala tile joints, rugs, and door sills." },
  { id: "chassis", label: "Low-Profile Chassis", title: "Stable Navy Rover Body", text: "Heavy, low center of gravity base (20cm riser height) preventing any tipping on household transitions." },
  { id: "privacy", label: "WebRTC Privacy", title: "Peer-to-Peer Encrypted", text: "Complete privacy and zero intrusion into the system — direct peer connection with active LED indicator." },
  { id: "charging", label: "Auto Docking", title: "Magnetic Charging Base", text: "Returns automatically to the magnetic floor dock when not in use." },
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
  depositAmount: "₹200 Pre-Order Token",
  deliveryWindow: "Q2 Priority Batch",
  trialDays: 30,
  tagline: "Join Early Access and get exclusive priority boarding.",
} as const;

export const TALLY_CONFIG = {
  formId: process.env.NEXT_PUBLIC_TALLY_FORM_ID || "VLeqQa",
  modalWidth: 650,
  emoji: "👋",
} as const;

export const BANNED_COPY = [
  "monitor your parents",
  "2mfa",
  "secure cloud operations",
  "medical emergency",
  "climb stairs",
];

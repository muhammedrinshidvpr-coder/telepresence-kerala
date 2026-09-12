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
  tagline: "Experience Be There Kerala in your parents' home with a free private demo.",
  trialDays: 30,
} as const;

export const KERALA_STATS = [
  {
    stat: "16.5%",
    label: "Senior citizens in Kerala",
    sub: "India’s highest aging state, projected to reach ~23% by 2036.",
    highlight: "Highest in India",
  },
  {
    stat: "22+ Lakh",
    label: "Malayalis working abroad",
    sub: "Living in the UAE, Saudi, Qatar, Oman & Kuwait while parents stay back home.",
    highlight: "The Gulf Diaspora",
  },
  {
    stat: "1 in 5",
    label: "Elderly homes live alone",
    sub: "Navigating daily chores, medicines, and silent evenings in large ancestral houses.",
    highlight: "Empty Nest Reality",
  },
  {
    stat: "30%+",
    label: "Seniors face a fall each year",
    sub: "Most accidents happen unobserved when phones are left on chargers in other rooms.",
    highlight: "Safety & Fall Risk",
  },
] as const;

export const HEALTH_ALERTS = [
  {
    id: "wake-up",
    icon: "Sunrise",
    title: "Morning Wake-Up Check",
    malayalam: "രാവിലെ ഉണർന്നോ എന്നറിയാം",
    desc: "Know that parents are up, active, and having their morning tea without interrupting their peaceful routine with anxious early morning calls.",
  },
  {
    id: "fall",
    icon: "AlertTriangle",
    title: "Floor-Level Fall Detection",
    malayalam: "വീഴ്ചകൾ ഉടൻ അറിയാൻ",
    desc: "Unlike wall cameras that miss blind spots, the rover sits near floor level to quickly notice if a parent has tripped and immediately alert your phone.",
  },
  {
    id: "medicine",
    icon: "Pill",
    title: "Gentle Malayalam Pill Reminders",
    malayalam: "“അമ്മേ, ഗുളിക കഴിക്കാൻ സമയമായി”",
    desc: "No confusing digital alarms. The rover softly speaks familiar Malayalam prompts so parents never miss their blood pressure or diabetic medicines.",
  },
  {
    id: "sos",
    icon: "BellRing",
    title: "One-Touch Emergency SOS",
    malayalam: "ഒറ്റ ടച്ചിൽ മക്കളിലേക്ക്",
    desc: "A single, clear button on the rover triggers an urgent call and live video link to your phone abroad, giving immediate help when they need it most.",
  },
] as const;

export const FOUNDER_INFO = {
  name: "Muhammed Rinshid V P",
  role: "Founder & AI Engineer",
  tagline: "AI Automation Engineer & Full-Stack Developer",
  quote:
    "Being from Kerala, I’ve seen firsthand how Gulf families live with constant knot-in-the-stomach anxiety when evening calls go unanswered. I'm building Be There Kerala so you don't just call home—you can physically be there, check on their health, and give them the comforting presence they deserve.",
  image: "/founder.jpg",
  portfolio: "https://muhammedrinshidvpr-coder.github.io/rinshid-portfolio/",
  linkedin: "https://linkedin.com/in/rinshidrazaq",
  github: "https://github.com/muhammedrinshidvpr-coder",
  email: "muhammedrinshidvpr@gmail.com",
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

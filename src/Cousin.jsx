import { useState, useEffect, useRef } from "react";

const CITIES = [
  { city: "New York", country: "US", tz: "America/New_York" },
  { city: "Los Angeles", country: "US", tz: "America/Los_Angeles" },
  { city: "Chicago", country: "US", tz: "America/Chicago" },
  { city: "Houston", country: "US", tz: "America/Chicago" },
  { city: "San Francisco", country: "US", tz: "America/Los_Angeles" },
  { city: "Seattle", country: "US", tz: "America/Los_Angeles" },
  { city: "Boston", country: "US", tz: "America/New_York" },
  { city: "Miami", country: "US", tz: "America/New_York" },
  { city: "Atlanta", country: "US", tz: "America/New_York" },
  { city: "Denver", country: "US", tz: "America/Denver" },
  { city: "Phoenix", country: "US", tz: "America/Phoenix" },
  { city: "Dallas", country: "US", tz: "America/Chicago" },
  { city: "Washington DC", country: "US", tz: "America/New_York" },
  { city: "Philadelphia", country: "US", tz: "America/New_York" },
  { city: "Minneapolis", country: "US", tz: "America/Chicago" },
  { city: "Portland", country: "US", tz: "America/Los_Angeles" },
  { city: "Las Vegas", country: "US", tz: "America/Los_Angeles" },
  { city: "Detroit", country: "US", tz: "America/Detroit" },
  { city: "Austin", country: "US", tz: "America/Chicago" },
  { city: "Nashville", country: "US", tz: "America/Chicago" },
  { city: "Anchorage", country: "US", tz: "America/Anchorage" },
  { city: "Charlotte", country: "US", tz: "America/New_York" },
  { city: "San Diego", country: "US", tz: "America/Los_Angeles" },
  { city: "San Antonio", country: "US", tz: "America/Chicago" },
  { city: "Indianapolis", country: "US", tz: "America/Indiana/Indianapolis" },
  { city: "Columbus", country: "US", tz: "America/New_York" },
  { city: "Jacksonville", country: "US", tz: "America/New_York" },
  { city: "Memphis", country: "US", tz: "America/Chicago" },
  { city: "Louisville", country: "US", tz: "America/Kentucky/Louisville" },
  { city: "Baltimore", country: "US", tz: "America/New_York" },
  { city: "Milwaukee", country: "US", tz: "America/Chicago" },
  { city: "Albuquerque", country: "US", tz: "America/Denver" },
  { city: "Tucson", country: "US", tz: "America/Phoenix" },
  { city: "Fresno", country: "US", tz: "America/Los_Angeles" },
  { city: "Sacramento", country: "US", tz: "America/Los_Angeles" },
  { city: "Kansas City", country: "US", tz: "America/Chicago" },
  { city: "Omaha", country: "US", tz: "America/Chicago" },
  { city: "Raleigh", country: "US", tz: "America/New_York" },
  { city: "Cleveland", country: "US", tz: "America/New_York" },
  { city: "Tampa", country: "US", tz: "America/New_York" },
  { city: "Orlando", country: "US", tz: "America/New_York" },
  { city: "Pittsburgh", country: "US", tz: "America/New_York" },
  { city: "Salt Lake City", country: "US", tz: "America/Denver" },
  { city: "New Orleans", country: "US", tz: "America/Chicago" },
  { city: "Buffalo", country: "US", tz: "America/New_York" },
  { city: "Oklahoma City", country: "US", tz: "America/Chicago" },
  { city: "Tulsa", country: "US", tz: "America/Chicago" },
  { city: "Boise", country: "US", tz: "America/Boise" },
  { city: "Fort Worth", country: "US", tz: "America/Chicago" },
  { city: "Honolulu", country: "US", tz: "Pacific/Honolulu" },
  { city: "London", country: "UK", tz: "Europe/London" },
  { city: "Edinburgh", country: "UK", tz: "Europe/London" },
  { city: "Manchester", country: "UK", tz: "Europe/London" },
  { city: "Birmingham", country: "UK", tz: "Europe/London" },
  { city: "Glasgow", country: "UK", tz: "Europe/London" },
  { city: "Liverpool", country: "UK", tz: "Europe/London" },
  { city: "Paris", country: "France", tz: "Europe/Paris" },
  { city: "Lyon", country: "France", tz: "Europe/Paris" },
  { city: "Marseille", country: "France", tz: "Europe/Paris" },
  { city: "Nice", country: "France", tz: "Europe/Paris" },
  { city: "Berlin", country: "Germany", tz: "Europe/Berlin" },
  { city: "Hamburg", country: "Germany", tz: "Europe/Berlin" },
  { city: "Munich", country: "Germany", tz: "Europe/Berlin" },
  { city: "Frankfurt", country: "Germany", tz: "Europe/Berlin" },
  { city: "Cologne", country: "Germany", tz: "Europe/Berlin" },
  { city: "Madrid", country: "Spain", tz: "Europe/Madrid" },
  { city: "Barcelona", country: "Spain", tz: "Europe/Madrid" },
  { city: "Seville", country: "Spain", tz: "Europe/Madrid" },
  { city: "Rome", country: "Italy", tz: "Europe/Rome" },
  { city: "Milan", country: "Italy", tz: "Europe/Rome" },
  { city: "Naples", country: "Italy", tz: "Europe/Rome" },
  { city: "Florence", country: "Italy", tz: "Europe/Rome" },
  { city: "Amsterdam", country: "Netherlands", tz: "Europe/Amsterdam" },
  { city: "Brussels", country: "Belgium", tz: "Europe/Brussels" },
  { city: "Vienna", country: "Austria", tz: "Europe/Vienna" },
  { city: "Zurich", country: "Switzerland", tz: "Europe/Zurich" },
  { city: "Geneva", country: "Switzerland", tz: "Europe/Zurich" },
  { city: "Stockholm", country: "Sweden", tz: "Europe/Stockholm" },
  { city: "Oslo", country: "Norway", tz: "Europe/Oslo" },
  { city: "Copenhagen", country: "Denmark", tz: "Europe/Copenhagen" },
  { city: "Helsinki", country: "Finland", tz: "Europe/Helsinki" },
  { city: "Warsaw", country: "Poland", tz: "Europe/Warsaw" },
  { city: "Prague", country: "Czech Republic", tz: "Europe/Prague" },
  { city: "Budapest", country: "Hungary", tz: "Europe/Budapest" },
  { city: "Bucharest", country: "Romania", tz: "Europe/Bucharest" },
  { city: "Athens", country: "Greece", tz: "Europe/Athens" },
  { city: "Istanbul", country: "Turkey", tz: "Europe/Istanbul" },
  { city: "Ankara", country: "Turkey", tz: "Europe/Istanbul" },
  { city: "Moscow", country: "Russia", tz: "Europe/Moscow" },
  { city: "Saint Petersburg", country: "Russia", tz: "Europe/Moscow" },
  { city: "Novosibirsk", country: "Russia", tz: "Asia/Novosibirsk" },
  { city: "Vladivostok", country: "Russia", tz: "Asia/Vladivostok" },
  { city: "Lisbon", country: "Portugal", tz: "Europe/Lisbon" },
  { city: "Porto", country: "Portugal", tz: "Europe/Lisbon" },
  { city: "Dublin", country: "Ireland", tz: "Europe/Dublin" },
  { city: "Kyiv", country: "Ukraine", tz: "Europe/Kiev" },
  { city: "Belgrade", country: "Serbia", tz: "Europe/Belgrade" },
  { city: "Zagreb", country: "Croatia", tz: "Europe/Zagreb" },
  { city: "Sofia", country: "Bulgaria", tz: "Europe/Sofia" },
  { city: "Riga", country: "Latvia", tz: "Europe/Riga" },
  { city: "Tallinn", country: "Estonia", tz: "Europe/Tallinn" },
  { city: "Vilnius", country: "Lithuania", tz: "Europe/Vilnius" },
  { city: "Reykjavik", country: "Iceland", tz: "Atlantic/Reykjavik" },
  { city: "Nicosia", country: "Cyprus", tz: "Asia/Nicosia" },
  { city: "Dubai", country: "UAE", tz: "Asia/Dubai" },
  { city: "Abu Dhabi", country: "UAE", tz: "Asia/Dubai" },
  { city: "Riyadh", country: "Saudi Arabia", tz: "Asia/Riyadh" },
  { city: "Jeddah", country: "Saudi Arabia", tz: "Asia/Riyadh" },
  { city: "Mecca", country: "Saudi Arabia", tz: "Asia/Riyadh" },
  { city: "Medina", country: "Saudi Arabia", tz: "Asia/Riyadh" },
  { city: "Doha", country: "Qatar", tz: "Asia/Qatar" },
  { city: "Kuwait City", country: "Kuwait", tz: "Asia/Kuwait" },
  { city: "Manama", country: "Bahrain", tz: "Asia/Bahrain" },
  { city: "Muscat", country: "Oman", tz: "Asia/Muscat" },
  { city: "Amman", country: "Jordan", tz: "Asia/Amman" },
  { city: "Beirut", country: "Lebanon", tz: "Asia/Beirut" },
  { city: "Baghdad", country: "Iraq", tz: "Asia/Baghdad" },
  { city: "Tehran", country: "Iran", tz: "Asia/Tehran" },
  { city: "Tel Aviv", country: "Israel", tz: "Asia/Jerusalem" },
  { city: "Jerusalem", country: "Israel", tz: "Asia/Jerusalem" },
  { city: "Damascus", country: "Syria", tz: "Asia/Damascus" },
  { city: "Sana'a", country: "Yemen", tz: "Asia/Aden" },
  { city: "Baku", country: "Azerbaijan", tz: "Asia/Baku" },
  { city: "Yerevan", country: "Armenia", tz: "Asia/Yerevan" },
  { city: "Tbilisi", country: "Georgia", tz: "Asia/Tbilisi" },
  { city: "Tashkent", country: "Uzbekistan", tz: "Asia/Tashkent" },
  { city: "Almaty", country: "Kazakhstan", tz: "Asia/Almaty" },
  { city: "Bishkek", country: "Kyrgyzstan", tz: "Asia/Bishkek" },
  { city: "Dushanbe", country: "Tajikistan", tz: "Asia/Dushanbe" },
  { city: "Ashgabat", country: "Turkmenistan", tz: "Asia/Ashgabat" },
  { city: "Kabul", country: "Afghanistan", tz: "Asia/Kabul" },
  { city: "Karachi", country: "Pakistan", tz: "Asia/Karachi" },
  { city: "Lahore", country: "Pakistan", tz: "Asia/Karachi" },
  { city: "Islamabad", country: "Pakistan", tz: "Asia/Karachi" },
  { city: "Peshawar", country: "Pakistan", tz: "Asia/Karachi" },
  { city: "Multan", country: "Pakistan", tz: "Asia/Karachi" },
  { city: "Rawalpindi", country: "Pakistan", tz: "Asia/Karachi" },
  { city: "Faisalabad", country: "Pakistan", tz: "Asia/Karachi" },
  { city: "Quetta", country: "Pakistan", tz: "Asia/Karachi" },
  { city: "Dhaka", country: "Bangladesh", tz: "Asia/Dhaka" },
  { city: "Chittagong", country: "Bangladesh", tz: "Asia/Dhaka" },
  { city: "Sylhet", country: "Bangladesh", tz: "Asia/Dhaka" },
  { city: "Rajshahi", country: "Bangladesh", tz: "Asia/Dhaka" },
  { city: "Mumbai", country: "India", tz: "Asia/Kolkata" },
  { city: "Delhi", country: "India", tz: "Asia/Kolkata" },
  { city: "New Delhi", country: "India", tz: "Asia/Kolkata" },
  { city: "Bangalore", country: "India", tz: "Asia/Kolkata" },
  { city: "Chennai", country: "India", tz: "Asia/Kolkata" },
  { city: "Kolkata", country: "India", tz: "Asia/Kolkata" },
  { city: "Hyderabad", country: "India", tz: "Asia/Kolkata" },
  { city: "Ahmedabad", country: "India", tz: "Asia/Kolkata" },
  { city: "Pune", country: "India", tz: "Asia/Kolkata" },
  { city: "Jaipur", country: "India", tz: "Asia/Kolkata" },
  { city: "Lucknow", country: "India", tz: "Asia/Kolkata" },
  { city: "Kochi", country: "India", tz: "Asia/Kolkata" },
  { city: "Colombo", country: "Sri Lanka", tz: "Asia/Colombo" },
  { city: "Kathmandu", country: "Nepal", tz: "Asia/Kathmandu" },
  { city: "Yangon", country: "Myanmar", tz: "Asia/Rangoon" },
  { city: "Bangkok", country: "Thailand", tz: "Asia/Bangkok" },
  { city: "Ho Chi Minh City", country: "Vietnam", tz: "Asia/Ho_Chi_Minh" },
  { city: "Hanoi", country: "Vietnam", tz: "Asia/Bangkok" },
  { city: "Phnom Penh", country: "Cambodia", tz: "Asia/Phnom_Penh" },
  { city: "Vientiane", country: "Laos", tz: "Asia/Vientiane" },
  { city: "Kuala Lumpur", country: "Malaysia", tz: "Asia/Kuala_Lumpur" },
  { city: "Singapore", country: "Singapore", tz: "Asia/Singapore" },
  { city: "Jakarta", country: "Indonesia", tz: "Asia/Jakarta" },
  { city: "Bali", country: "Indonesia", tz: "Asia/Makassar" },
  { city: "Surabaya", country: "Indonesia", tz: "Asia/Jakarta" },
  { city: "Manila", country: "Philippines", tz: "Asia/Manila" },
  { city: "Hong Kong", country: "China", tz: "Asia/Hong_Kong" },
  { city: "Shanghai", country: "China", tz: "Asia/Shanghai" },
  { city: "Beijing", country: "China", tz: "Asia/Shanghai" },
  { city: "Guangzhou", country: "China", tz: "Asia/Shanghai" },
  { city: "Shenzhen", country: "China", tz: "Asia/Shanghai" },
  { city: "Chengdu", country: "China", tz: "Asia/Shanghai" },
  { city: "Wuhan", country: "China", tz: "Asia/Shanghai" },
  { city: "Taipei", country: "Taiwan", tz: "Asia/Taipei" },
  { city: "Seoul", country: "South Korea", tz: "Asia/Seoul" },
  { city: "Busan", country: "South Korea", tz: "Asia/Seoul" },
  { city: "Tokyo", country: "Japan", tz: "Asia/Tokyo" },
  { city: "Osaka", country: "Japan", tz: "Asia/Tokyo" },
  { city: "Kyoto", country: "Japan", tz: "Asia/Tokyo" },
  { city: "Nagoya", country: "Japan", tz: "Asia/Tokyo" },
  { city: "Fukuoka", country: "Japan", tz: "Asia/Tokyo" },
  { city: "Sapporo", country: "Japan", tz: "Asia/Tokyo" },
  { city: "Sydney", country: "Australia", tz: "Australia/Sydney" },
  { city: "Melbourne", country: "Australia", tz: "Australia/Melbourne" },
  { city: "Brisbane", country: "Australia", tz: "Australia/Brisbane" },
  { city: "Perth", country: "Australia", tz: "Australia/Perth" },
  { city: "Adelaide", country: "Australia", tz: "Australia/Adelaide" },
  { city: "Canberra", country: "Australia", tz: "Australia/Sydney" },
  { city: "Auckland", country: "New Zealand", tz: "Pacific/Auckland" },
  { city: "Wellington", country: "New Zealand", tz: "Pacific/Auckland" },
  { city: "Christchurch", country: "New Zealand", tz: "Pacific/Auckland" },
  { city: "Suva", country: "Fiji", tz: "Pacific/Fiji" },
  { city: "Cairo", country: "Egypt", tz: "Africa/Cairo" },
  { city: "Alexandria", country: "Egypt", tz: "Africa/Cairo" },
  { city: "Nairobi", country: "Kenya", tz: "Africa/Nairobi" },
  { city: "Lagos", country: "Nigeria", tz: "Africa/Lagos" },
  { city: "Abuja", country: "Nigeria", tz: "Africa/Lagos" },
  { city: "Accra", country: "Ghana", tz: "Africa/Accra" },
  { city: "Casablanca", country: "Morocco", tz: "Africa/Casablanca" },
  { city: "Rabat", country: "Morocco", tz: "Africa/Casablanca" },
  { city: "Marrakech", country: "Morocco", tz: "Africa/Casablanca" },
  { city: "Tunis", country: "Tunisia", tz: "Africa/Tunis" },
  { city: "Algiers", country: "Algeria", tz: "Africa/Algiers" },
  { city: "Johannesburg", country: "South Africa", tz: "Africa/Johannesburg" },
  { city: "Cape Town", country: "South Africa", tz: "Africa/Johannesburg" },
  { city: "Durban", country: "South Africa", tz: "Africa/Johannesburg" },
  { city: "Addis Ababa", country: "Ethiopia", tz: "Africa/Addis_Ababa" },
  { city: "Dar es Salaam", country: "Tanzania", tz: "Africa/Dar_es_Salaam" },
  { city: "Kampala", country: "Uganda", tz: "Africa/Kampala" },
  { city: "Kigali", country: "Rwanda", tz: "Africa/Kigali" },
  { city: "Kinshasa", country: "DR Congo", tz: "Africa/Kinshasa" },
  { city: "Dakar", country: "Senegal", tz: "Africa/Dakar" },
  { city: "Abidjan", country: "Cote d'Ivoire", tz: "Africa/Abidjan" },
  { city: "Khartoum", country: "Sudan", tz: "Africa/Khartoum" },
  { city: "Mogadishu", country: "Somalia", tz: "Africa/Mogadishu" },
  { city: "Luanda", country: "Angola", tz: "Africa/Luanda" },
  { city: "Lusaka", country: "Zambia", tz: "Africa/Lusaka" },
  { city: "Harare", country: "Zimbabwe", tz: "Africa/Harare" },
  { city: "Maputo", country: "Mozambique", tz: "Africa/Maputo" },
  { city: "Toronto", country: "Canada", tz: "America/Toronto" },
  { city: "Vancouver", country: "Canada", tz: "America/Vancouver" },
  { city: "Montreal", country: "Canada", tz: "America/Toronto" },
  { city: "Calgary", country: "Canada", tz: "America/Edmonton" },
  { city: "Ottawa", country: "Canada", tz: "America/Toronto" },
  { city: "Edmonton", country: "Canada", tz: "America/Edmonton" },
  { city: "Halifax", country: "Canada", tz: "America/Halifax" },
  { city: "Mexico City", country: "Mexico", tz: "America/Mexico_City" },
  { city: "Guadalajara", country: "Mexico", tz: "America/Mexico_City" },
  { city: "Monterrey", country: "Mexico", tz: "America/Monterrey" },
  { city: "Cancun", country: "Mexico", tz: "America/Cancun" },
  { city: "Sao Paulo", country: "Brazil", tz: "America/Sao_Paulo" },
  { city: "Rio de Janeiro", country: "Brazil", tz: "America/Sao_Paulo" },
  { city: "Brasilia", country: "Brazil", tz: "America/Sao_Paulo" },
  { city: "Buenos Aires", country: "Argentina", tz: "America/Argentina/Buenos_Aires" },
  { city: "Bogota", country: "Colombia", tz: "America/Bogota" },
  { city: "Medellin", country: "Colombia", tz: "America/Bogota" },
  { city: "Lima", country: "Peru", tz: "America/Lima" },
  { city: "Santiago", country: "Chile", tz: "America/Santiago" },
  { city: "Caracas", country: "Venezuela", tz: "America/Caracas" },
  { city: "Quito", country: "Ecuador", tz: "America/Guayaquil" },
  { city: "La Paz", country: "Bolivia", tz: "America/La_Paz" },
  { city: "Montevideo", country: "Uruguay", tz: "America/Montevideo" },
  { city: "Panama City", country: "Panama", tz: "America/Panama" },
  { city: "San Jose", country: "Costa Rica", tz: "America/Costa_Rica" },
  { city: "Guatemala City", country: "Guatemala", tz: "America/Guatemala" },
  { city: "Havana", country: "Cuba", tz: "America/Havana" },
  { city: "Santo Domingo", country: "Dominican Republic", tz: "America/Santo_Domingo" },
  { city: "San Juan", country: "Puerto Rico", tz: "America/Puerto_Rico" },
  { city: "Kingston", country: "Jamaica", tz: "America/Jamaica" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getLocalTime(tz, format = "display") {
  try {
    const now = new Date();
    if (format === "hour") {
      return parseInt(new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", hour12: false }).format(now));
    }
    return new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit", hour12: true }).format(now);
  } catch { return format === "hour" ? 12 : "--:--"; }
}

function isGoodTimeToCall(tz) {
  const h = getLocalTime(tz, "hour");
  return h >= 8 && h < 21;
}

function getCallScore(tz) {
  const h = getLocalTime(tz, "hour");
  if (h < 8 || h >= 21) return -1;
  return 100 - Math.abs(h - 17) * 4;
}

function getTimeStatus(tz) {
  const h = getLocalTime(tz, "hour");
  if (h >= 22 || h < 6)  return { label: "asleep",       green: false };
  if (h < 8)             return { label: "early morning", green: false };
  if (h >= 20)           return { label: "late evening",  green: false };
  if (h >= 18)           return { label: "evening",       green: true  };
  return                        { label: "good time",     green: true  };
}

function getWeeklySuggestions(contacts, count = 3) {
  if (!contacts.length) return new Set();
  const weekSeed = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  const sorted = [...contacts].sort((a, b) => {
    const h = s => s.split("").reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + weekSeed), 0) % 1000;
    return h(a.id) - h(b.id);
  });
  return new Set(sorted.slice(0, Math.min(count, contacts.length)).map(c => c.id));
}

function initials(name) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

function avatarColors(name) {
  const hue = (name.charCodeAt(0) * 47 + (name.charCodeAt(1) || 0) * 13) % 360;
  return { bg: `hsl(${hue},28%,88%)`, fg: `hsl(${hue},35%,30%)` };
}

// ─── City Autocomplete ────────────────────────────────────────────────────────

function CityAutocomplete({ value, onChange, onSelect, placeholder }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value || "");
  const ref = useRef(null);

  const results = query.length > 1
    ? CITIES.filter(c =>
        c.city.toLowerCase().startsWith(query.toLowerCase()) ||
        c.city.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 7)
    : [];

  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <input
        value={query}
        onChange={e => { setQuery(e.target.value); onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        style={fieldStyle}
        onFocus={e => e.target.style.borderColor = "#6366f1"}
        onBlur={e => e.target.style.borderColor = "#e2e8f0"}
      />
      {open && results.length > 0 && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 999,
          background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px",
          maxHeight: "220px", overflowY: "auto",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}>
          {results.map((c, i) => (
            <div key={i}
              onMouseDown={() => { setQuery(c.city); onSelect(c); setOpen(false); }}
              style={{
                padding: "9px 14px", cursor: "pointer",
                display: "flex", justifyContent: "space-between",
                borderBottom: i < results.length - 1 ? "1px solid #f1f5f9" : "none",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <span style={{ fontSize: "14px", color: "#0f172a" }}>{c.city}</span>
              <span style={{ fontSize: "12px", color: "#94a3b8" }}>{c.country}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const fieldStyle = {
  width: "100%", padding: "9px 12px", border: "1.5px solid #e2e8f0",
  borderRadius: "8px", background: "#fff", color: "#0f172a",
  fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
  outline: "none", boxSizing: "border-box", transition: "border-color 0.15s",
};

// ─── Contact Modal ────────────────────────────────────────────────────────────

function ContactModal({ contact, onSave, onClose }) {
  const [form, setForm] = useState({
    name: contact?.name || "",
    city: contact?.city || "",
    tz: contact?.tz || "",
    relationship: contact?.relationship || "",
    notes: contact?.notes || "",
  });
  const [citySearch, setCitySearch] = useState(contact?.city || "");
  const valid = form.name.trim() && form.tz;

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(15,23,42,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: "20px", backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff", borderRadius: "16px", padding: "28px",
          width: "100%", maxWidth: "430px",
          boxShadow: "0 24px 60px rgba(0,0,0,0.13)",
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px" }}>
          <h2 style={{ margin: 0, fontSize: "17px", fontWeight: "600", color: "#0f172a", fontFamily: "'DM Sans', sans-serif" }}>
            {contact ? "Edit contact" : "Add a loved one"}
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: "22px", lineHeight: 1 }}>×</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
          {[
            { key: "name", label: "Name", ph: "Full name", req: true },
            { key: "relationship", label: "Relationship", ph: "Mom, Uncle Tariq, college friend…" },
          ].map(({ key, label, ph, req }) => (
            <div key={key}>
              <label style={mLabel}>{label}{req && <span style={{ color: "#6366f1" }}> *</span>}</label>
              <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                placeholder={ph} style={fieldStyle}
                onFocus={e => e.target.style.borderColor = "#6366f1"}
                onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
            </div>
          ))}

          <div>
            <label style={mLabel}>City <span style={{ color: "#6366f1" }}>*</span></label>
            <CityAutocomplete
              value={citySearch}
              onChange={val => { setCitySearch(val); setForm(f => ({ ...f, city: val, tz: "" })); }}
              onSelect={c => { setCitySearch(c.city); setForm(f => ({ ...f, city: c.city, tz: c.tz })); }}
              placeholder="Start typing a city…"
            />
            {form.tz && (
              <div style={{ marginTop: "4px", fontSize: "12px", color: "#10b981", fontFamily: "'DM Sans', sans-serif" }}>
                ✓ {getLocalTime(form.tz)} local time right now
              </div>
            )}
          </div>

          <div>
            <label style={mLabel}>Notes & topics to discuss</label>
            <textarea
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              placeholder="Ask about the new job, Eid plans, the house search…"
              rows={3}
              style={{ ...fieldStyle, resize: "vertical", lineHeight: 1.6 }}
              onFocus={e => e.target.style.borderColor = "#6366f1"}
              onBlur={e => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "10px", border: "1px solid #e2e8f0",
            borderRadius: "8px", background: "#fff", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#64748b", fontWeight: "500",
          }}>Cancel</button>
          <button
            disabled={!valid}
            onClick={() => valid && onSave(form)}
            style={{
              flex: 2, padding: "10px", border: "none", borderRadius: "8px",
              background: valid ? "#6366f1" : "#f1f5f9",
              cursor: valid ? "pointer" : "not-allowed",
              fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
              fontWeight: "600", color: valid ? "#fff" : "#94a3b8",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => { if (valid) e.currentTarget.style.background = "#4f46e5"; }}
            onMouseLeave={e => { if (valid) e.currentTarget.style.background = "#6366f1"; }}
          >{contact ? "Save changes" : "Add contact"}</button>
        </div>
      </div>
    </div>
  );
}

const mLabel = {
  display: "block", fontSize: "13px", fontWeight: "500",
  color: "#64748b", marginBottom: "5px", fontFamily: "'DM Sans', sans-serif",
};

// ─── Contact Row ──────────────────────────────────────────────────────────────

function ContactRow({ contact, onEdit, onDelete, isHighlighted, isSuggested }) {
  const [expanded, setExpanded] = useState(false);
  const time = getLocalTime(contact.tz);
  const status = getTimeStatus(contact.tz);
  const av = avatarColors(contact.name);

  return (
    <div style={{
      background: isHighlighted ? "#f0f0fe" : "#fff",
      border: `1px solid ${isHighlighted ? "#c7d2fe" : "#f1f5f9"}`,
      borderRadius: "10px",
      transition: "border-color 0.15s",
    }}>
      <div
        onClick={() => setExpanded(e => !e)}
        style={{
          display: "flex", alignItems: "center", gap: "12px",
          padding: "13px 15px", cursor: "pointer", userSelect: "none",
        }}
      >
        {/* Avatar */}
        <div style={{
          width: "38px", height: "38px", borderRadius: "50%", flexShrink: 0,
          background: av.bg, color: av.fg,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'DM Sans', sans-serif", fontWeight: "700", fontSize: "13px",
          position: "relative",
        }}>
          {initials(contact.name)}
          {isHighlighted && (
            <div style={{
              position: "absolute", bottom: -1, right: -1,
              width: "11px", height: "11px", borderRadius: "50%",
              background: "#6366f1", border: "2px solid #fff",
            }} />
          )}
        </div>

        {/* Name + meta */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: "600", fontSize: "14px", color: "#0f172a" }}>
              {contact.name}
            </span>
            {isSuggested && !isHighlighted && (
              <span style={pill("#eef2ff", "#6366f1")}>this week</span>
            )}
            {isHighlighted && (
              <span style={pill("#6366f1", "#fff")}>suggested</span>
            )}
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#94a3b8", marginTop: "1px" }}>
            {contact.city}{contact.relationship ? ` · ${contact.relationship}` : ""}
          </div>
        </div>

        {/* Time */}
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: "600", fontSize: "13px", color: "#0f172a" }}>{time}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "flex-end", marginTop: "2px" }}>
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: status.green ? "#10b981" : "#cbd5e1" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: status.green ? "#10b981" : "#94a3b8", fontWeight: "500" }}>
              {status.label}
            </span>
          </div>
        </div>

        <div style={{ color: "#cbd5e1", fontSize: "11px", flexShrink: 0, transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.18s" }}>▾</div>
      </div>

      {expanded && (
        <div style={{ borderTop: "1px solid #f1f5f9", padding: "12px 15px 14px", background: isHighlighted ? "#eef2ff" : "#fafbff" }}>
          {contact.notes
            ? <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#475569", lineHeight: 1.65, margin: "0 0 11px", paddingLeft: "10px", borderLeft: "2px solid #c7d2fe" }}>{contact.notes}</p>
            : <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#cbd5e1", fontStyle: "italic", margin: "0 0 11px" }}>No notes yet.</p>
          }
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={e => { e.stopPropagation(); onEdit(contact); }} style={actionBtn("#fff", "#475569", "#e2e8f0")}>Edit</button>
            <button onClick={e => { e.stopPropagation(); onDelete(contact.id); }} style={actionBtn("#fff", "#ef4444", "#fee2e2")}>Remove</button>
          </div>
        </div>
      )}
    </div>
  );
}

const pill = (bg, color) => ({
  fontSize: "10px", fontFamily: "'DM Sans', sans-serif", fontWeight: "600",
  letterSpacing: "0.3px", background: bg, color, padding: "2px 7px",
  borderRadius: "20px", textTransform: "uppercase",
});

const actionBtn = (bg, color, borderColor) => ({
  padding: "6px 14px", border: `1px solid ${borderColor}`,
  borderRadius: "6px", background: bg, cursor: "pointer",
  fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color, fontWeight: "500",
});

// ─── App ──────────────────────────────────────────────────────────────────────

export default function Cousin() {
  const [contacts, setContacts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [modal, setModal] = useState(null);
  const [callNowContact, setCallNowContact] = useState(null);
  const [tick, setTick] = useState(0);
  const [myCity, setMyCity] = useState({ city: "San Francisco", tz: "America/Los_Angeles" });
  const [editMyCity, setEditMyCity] = useState(false);
  const [myCityQuery, setMyCityQuery] = useState("San Francisco");

  useEffect(() => {
    function load() {
      try {
        const r = localStorage.getItem("cousin-contacts");
        if (r) setContacts(JSON.parse(r));
        const mc = localStorage.getItem("cousin-mycity");
        if (mc) { const c = JSON.parse(mc); setMyCity(c); setMyCityQuery(c.city); }
      } catch {}
      setLoaded(true);
    }
    load();
  }, []);

  useEffect(() => { if (loaded) { try { localStorage.setItem("cousin-contacts", JSON.stringify(contacts)); } catch {} } }, [contacts, loaded]);
  useEffect(() => { if (loaded) { try { localStorage.setItem("cousin-mycity", JSON.stringify(myCity)); } catch {} } }, [myCity, loaded]);
  useEffect(() => { const iv = setInterval(() => setTick(t => t + 1), 30000); return () => clearInterval(iv); }, []);

  function handleCallNow() {
    if (!contacts.length) return;
    const pool = contacts.filter(c => isGoodTimeToCall(c.tz)).sort((a, b) => getCallScore(b.tz) - getCallScore(a.tz));
    const list = pool.length ? pool : [...contacts];
    if (!callNowContact) { setCallNowContact(list[0]); return; }
    const idx = list.findIndex(c => c.id === callNowContact.id);
    setCallNowContact(list[(idx + 1) % list.length]);
  }

  function handleSave(form) {
    if (modal?.id) setContacts(cs => cs.map(c => c.id === modal.id ? { ...c, ...form } : c));
    else setContacts(cs => [...cs, { ...form, id: Date.now().toString() }]);
    setModal(null);
  }

  function handleDelete(id) {
    if (confirm("Remove this contact?")) {
      setContacts(cs => cs.filter(c => c.id !== id));
      if (callNowContact?.id === id) setCallNowContact(null);
    }
  }

  const weekIds = getWeeklySuggestions(contacts, 3);
  const callableCount = contacts.filter(c => isGoodTimeToCall(c.tz)).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f8fafc; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }
        @keyframes drop { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }
        .drop { animation: drop 0.18s ease; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'DM Sans', sans-serif" }}>

        {/* Nav */}
        <nav style={{
          background: "#fff", borderBottom: "1px solid #f1f5f9",
          padding: "0 24px", height: "56px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "sticky", top: 0, zIndex: 100,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontWeight: "700", fontSize: "17px", color: "#0f172a", letterSpacing: "-0.2px" }}>cousin</span>
            <span style={{ color: "#6366f1", fontWeight: "300", fontSize: "20px" }}>·</span>
            {!editMyCity ? (
              <button onClick={() => setEditMyCity(true)} style={{
                background: "none", border: "none", cursor: "pointer", padding: 0,
                display: "flex", alignItems: "center", gap: "5px",
              }}>
                <span style={{ fontSize: "13px", color: "#64748b" }}>{myCity.city}</span>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#334155" }}>{getLocalTime(myCity.tz)}</span>
                <span style={{ fontSize: "11px", color: "#cbd5e1", marginLeft: "1px" }}>✎</span>
              </button>
            ) : (
              <div style={{ display: "flex", gap: "5px", alignItems: "center", width: "200px" }}>
                <CityAutocomplete
                  value={myCityQuery}
                  onChange={v => setMyCityQuery(v)}
                  onSelect={c => { setMyCity({ city: c.city, tz: c.tz }); setMyCityQuery(c.city); setEditMyCity(false); }}
                  placeholder="Your city…"
                />
                <button onClick={() => setEditMyCity(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: "20px" }}>×</button>
              </div>
            )}
          </div>
          <button
            onClick={() => setModal("add")}
            style={{
              background: "#6366f1", border: "none", borderRadius: "7px",
              padding: "7px 15px", cursor: "pointer", color: "#fff",
              fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: "600",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#4f46e5"}
            onMouseLeave={e => e.currentTarget.style.background = "#6366f1"}
          >+ Add</button>
        </nav>

        {/* Body */}
        <div style={{ maxWidth: "620px", margin: "0 auto", padding: "24px 16px" }}>

          {contacts.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "72px 20px",
              background: "#fff", borderRadius: "12px", border: "1px solid #f1f5f9",
            }}>
              <div style={{
                width: "48px", height: "48px", background: "#eef2ff", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 14px", fontSize: "20px",
              }}>📞</div>
              <div style={{ fontSize: "16px", fontWeight: "600", color: "#0f172a", marginBottom: "6px" }}>No contacts yet</div>
              <p style={{ fontSize: "13px", color: "#94a3b8", maxWidth: "280px", margin: "0 auto 20px", lineHeight: 1.6 }}>
                Add the people you care about and cousin will help you stay in touch.
              </p>
              <button onClick={() => setModal("add")} style={{
                background: "#6366f1", border: "none", borderRadius: "7px",
                padding: "9px 20px", cursor: "pointer", color: "#fff",
                fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: "600",
              }}>Add your first contact</button>
            </div>
          ) : (
            <>
              {/* Call Now bar */}
              <div style={{
                background: "#fff", borderRadius: "10px", border: "1px solid #f1f5f9",
                padding: "14px 16px", marginBottom: "12px",
                display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap",
              }}>
                <button
                  onClick={handleCallNow}
                  style={{
                    background: "#6366f1", border: "none", borderRadius: "7px",
                    padding: "8px 16px", cursor: "pointer", color: "#fff",
                    fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: "600",
                    flexShrink: 0, transition: "background 0.15s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#4f46e5"}
                  onMouseLeave={e => e.currentTarget.style.background = "#6366f1"}
                >
                  {callNowContact ? "↻ Someone else" : "Call now"}
                </button>

                {callNowContact ? (
                  <div className="drop" style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }}>
                    <div style={{
                      ...avatarColors(callNowContact.name),
                      width: "32px", height: "32px", borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'DM Sans', sans-serif", fontWeight: "700", fontSize: "12px", flexShrink: 0,
                    }}>{initials(callNowContact.name)}</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: "600", fontSize: "14px", color: "#0f172a" }}>{callNowContact.name}</div>
                      <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                        {callNowContact.city} · {getLocalTime(callNowContact.tz)}
                        {callNowContact.notes && <span style={{ color: "#c7d2fe" }}> · {callNowContact.notes.slice(0, 45)}{callNowContact.notes.length > 45 ? "…" : ""}</span>}
                      </div>
                    </div>
                  </div>
                ) : (
                  <span style={{ fontSize: "13px", color: "#94a3b8" }}>
                    {callableCount > 0 ? `${callableCount} contact${callableCount !== 1 ? "s" : ""} in a good window right now` : "Tap to get a time-zone-aware suggestion"}
                  </span>
                )}
              </div>

              {/* Contact list */}
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {contacts.map(c => (
                  <ContactRow
                    key={c.id}
                    contact={c}
                    onEdit={setModal}
                    onDelete={handleDelete}
                    isHighlighted={callNowContact?.id === c.id}
                    isSuggested={weekIds.has(c.id)}
                    tick={tick}
                  />
                ))}
              </div>

              <div style={{ textAlign: "center", marginTop: "24px", fontSize: "11px", color: "#e2e8f0" }}>
                cousin · ihsan.build
              </div>
            </>
          )}
        </div>
      </div>

      {modal && (
        <ContactModal
          contact={modal === "add" ? null : modal}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}

import gtImg from "@/assets/model-gt.jpg";
import sedanImg from "@/assets/model-sedan.jpg";
import suvImg from "@/assets/model-suv.jpg";
import vortexImg from "@/assets/model-vortex.jpg";
import zephyrImg from "@/assets/model-zephyr.jpg";
import apexImg from "@/assets/model-apex.jpg";
import nomadImg from "@/assets/model-nomad.jpg";
import eclipseImg from "@/assets/model-eclipse.jpg";
import phantomImg from "@/assets/model-phantom.jpg";
import pulseImg from "@/assets/model-pulse.jpg";

export const categories = [
  { slug: "hypercar", label: "Hypercars" },
  { slug: "grand-tourer", label: "Grand Tourers" },
  { slug: "suv", label: "SUVs" },
  { slug: "roadster", label: "Roadsters" },
  { slug: "track", label: "Track" },
  { slug: "concept", label: "Concept" },
  { slug: "city", label: "City" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];
export const categorySlugs = categories.map((c) => c.slug) as CategorySlug[];
export const categoryLabel = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug)?.label ?? slug;

export type Paint = { name: string; swatch: string; filter: string; price: number };
export type DriveMode = {
  name: string;
  power: number;
  response: number;
  aero: number;
  efficiency: number;
};
export type Hotspot = { x: number; y: number; title: string; detail: string };

export type Model = {
  slug: string;
  name: string;
  code: string;
  categorySlug: CategorySlug;
  category: string;
  tagline: string;
  description: string;
  image: string;
  price: number;
  stats: { topSpeed: number; zeroTo100: number; power: number; range: number };
  specs: { label: string; value: string }[];
  paints: Paint[];
  modes: DriveMode[];
  hotspots: Hotspot[];
};

export const models: Model[] = [
  {
    slug: "spectre-gt",
    name: "Spectre GT",
    code: "AX-01",
    categorySlug: "hypercar",
    category: "Electric Hypercar",
    tagline: "Silence at 412 km/h.",
    description:
      "A tri-motor electric hypercar sculpted in the wind tunnel and tuned on the Nürburgring. Active aero, carbon monocoque and a solid-state core make Spectre the fastest AETHER ever built.",
    image: gtImg,
    price: 389000,
    stats: { topSpeed: 412, zeroTo100: 1.9, power: 1480, range: 620 },
    specs: [
      { label: "Powertrain", value: "Tri-motor AWD" },
      { label: "Battery", value: "112 kWh solid-state" },
      { label: "Torque", value: "2,100 Nm" },
      { label: "Weight", value: "1,690 kg" },
      { label: "Chassis", value: "Carbon monocoque" },
      { label: "Charging", value: "10–80% in 9 min" },
    ],
    paints: [
      { name: "Rosso Ion", swatch: "oklch(0.55 0.22 27)", filter: "none", price: 0 },
      { name: "Cobalt Pulse", swatch: "oklch(0.5 0.18 255)", filter: "hue-rotate(215deg) saturate(1.1)", price: 6500 },
      { name: "Verde Flux", swatch: "oklch(0.6 0.17 150)", filter: "hue-rotate(125deg) saturate(0.9)", price: 6500 },
      { name: "Solar Gold", swatch: "oklch(0.78 0.15 80)", filter: "hue-rotate(38deg) saturate(1.2) brightness(1.1)", price: 9800 },
      { name: "Carbon Noir", swatch: "oklch(0.22 0.005 260)", filter: "saturate(0) brightness(0.6) contrast(1.3)", price: 4200 },
      { name: "Lunar White", swatch: "oklch(0.92 0.005 260)", filter: "saturate(0) brightness(1.55) contrast(1.05)", price: 4200 },
    ],
    modes: [
      { name: "Comfort", power: 55, response: 40, aero: 30, efficiency: 95 },
      { name: "Sport", power: 82, response: 78, aero: 65, efficiency: 70 },
      { name: "Track", power: 100, response: 100, aero: 100, efficiency: 42 },
    ],
    hotspots: [
      { x: 14, y: 46, title: "Laser Matrix Lights", detail: "Adaptive 1.2M-pixel beam that projects lane guidance onto the road." },
      { x: 30, y: 60, title: "Carbon-Ceramic Brakes", detail: "420 mm discs with regenerative blending up to 0.9 g." },
      { x: 60, y: 46, title: "Active Side Intakes", detail: "Morphing vanes feed the rear motor cooling at speed." },
      { x: 90, y: 22, title: "Swan-Neck Wing", detail: "Hydraulic wing generating 1,100 kg of downforce in Track mode." },
    ],
  },
  {
    slug: "aurora",
    name: "Aurora",
    code: "AX-02",
    categorySlug: "grand-tourer",
    category: "Grand Touring Sedan",
    tagline: "Light, refined into motion.",
    description:
      "Four doors, four seats, zero compromise. Aurora pairs a lounge-grade cabin with dual-motor performance and an 860 km range for continents, not commutes.",
    image: sedanImg,
    price: 142000,
    stats: { topSpeed: 290, zeroTo100: 2.8, power: 920, range: 860 },
    specs: [
      { label: "Powertrain", value: "Dual-motor AWD" },
      { label: "Battery", value: "128 kWh structural" },
      { label: "Torque", value: "1,350 Nm" },
      { label: "Weight", value: "2,080 kg" },
      { label: "Drag coefficient", value: "0.19 Cd" },
      { label: "Charging", value: "10–80% in 14 min" },
    ],
    paints: [
      { name: "Lunar Silver", swatch: "oklch(0.88 0.005 260)", filter: "none", price: 0 },
      { name: "Glacier Blue", swatch: "oklch(0.7 0.09 230)", filter: "sepia(0.5) saturate(2.2) hue-rotate(170deg)", price: 3800 },
      { name: "Champagne", swatch: "oklch(0.82 0.06 80)", filter: "sepia(0.55) saturate(1.4) brightness(1.02)", price: 3800 },
      { name: "Obsidian", swatch: "oklch(0.2 0.005 260)", filter: "brightness(0.5) contrast(1.35)", price: 2400 },
    ],
    modes: [
      { name: "Comfort", power: 50, response: 35, aero: 25, efficiency: 98 },
      { name: "Sport", power: 78, response: 72, aero: 55, efficiency: 75 },
      { name: "Track", power: 100, response: 92, aero: 80, efficiency: 50 },
    ],
    hotspots: [
      { x: 28, y: 50, title: "Halo Light Blade", detail: "A single 1.8 m LED blade that greets you as you approach." },
      { x: 52, y: 27, title: "Electrochromic Roof", detail: "Glass canopy that dims from clear to opaque in 0.3 s." },
      { x: 55, y: 62, title: "Aero Wheels", detail: "22-inch turbine wheels reduce drag by 4%." },
    ],
  },
  {
    slug: "titan-x",
    name: "Titan X",
    code: "AX-03",
    categorySlug: "suv",
    category: "Performance SUV",
    tagline: "Every terrain. One answer.",
    description:
      "Titan X brings hypercar torque to any surface. Adaptive air suspension, quad-motor torque vectoring and an armoured underbody make the impossible route the obvious one.",
    image: suvImg,
    price: 168000,
    stats: { topSpeed: 260, zeroTo100: 3.2, power: 1020, range: 710 },
    specs: [
      { label: "Powertrain", value: "Quad-motor AWD" },
      { label: "Battery", value: "140 kWh structural" },
      { label: "Torque", value: "1,800 Nm" },
      { label: "Ground clearance", value: "180–310 mm" },
      { label: "Towing", value: "3,500 kg" },
      { label: "Wading depth", value: "900 mm" },
    ],
    paints: [
      { name: "Graphite Matte", swatch: "oklch(0.25 0.005 260)", filter: "none", price: 0 },
      { name: "Ion Cyan", swatch: "oklch(0.7 0.12 205)", filter: "hue-rotate(170deg) saturate(1.1)", price: 4200 },
      { name: "Toxic Lime", swatch: "oklch(0.8 0.18 125)", filter: "hue-rotate(60deg) saturate(1.2)", price: 4200 },
      { name: "Ghost", swatch: "oklch(0.85 0.005 260)", filter: "saturate(0) brightness(1.5) contrast(0.95)", price: 3100 },
    ],
    modes: [
      { name: "Comfort", power: 50, response: 40, aero: 20, efficiency: 92 },
      { name: "Sport", power: 80, response: 75, aero: 45, efficiency: 68 },
      { name: "Terrain", power: 70, response: 60, aero: 15, efficiency: 60 },
    ],
    hotspots: [
      { x: 22, y: 43, title: "Signature DRL", detail: "Vertical light blades double as camera washers." },
      { x: 58, y: 74, title: "All-Terrain Wheels", detail: "21-inch forged wheels with run-flat tyres." },
      { x: 70, y: 22, title: "Roof Sensor Array", detail: "Lidar and radar suite for Level-4 autonomy." },
    ],
  },
  {
    slug: "vortex-r",
    name: "Vortex R",
    code: "AX-04",
    categorySlug: "hypercar",
    category: "Electric Hypercar",
    tagline: "Built to break records.",
    description:
      "Vortex R is the lightest AETHER ever made. A wedge-shaped carbon body, quad motors and ground-effect tunnels push it past 430 km/h — the fastest road car we have ever homologated.",
    image: vortexImg,
    price: 465000,
    stats: { topSpeed: 431, zeroTo100: 1.7, power: 1720, range: 540 },
    specs: [
      { label: "Powertrain", value: "Quad-motor AWD" },
      { label: "Battery", value: "98 kWh solid-state" },
      { label: "Torque", value: "2,400 Nm" },
      { label: "Weight", value: "1,540 kg" },
      { label: "Downforce", value: "1,350 kg" },
      { label: "Production", value: "99 units" },
    ],
    paints: [
      { name: "Acid Lime", swatch: "oklch(0.85 0.2 125)", filter: "none", price: 0 },
      { name: "Arancio Volt", swatch: "oklch(0.7 0.19 50)", filter: "hue-rotate(-55deg) saturate(1.2)", price: 7200 },
      { name: "Abyss Blue", swatch: "oklch(0.55 0.17 250)", filter: "hue-rotate(140deg)", price: 7200 },
      { name: "Nero Stealth", swatch: "oklch(0.22 0.005 260)", filter: "saturate(0) brightness(0.55) contrast(1.3)", price: 5100 },
      { name: "Bianco Ice", swatch: "oklch(0.93 0.005 260)", filter: "saturate(0) brightness(1.45)", price: 5100 },
    ],
    modes: [
      { name: "Strada", power: 60, response: 50, aero: 35, efficiency: 88 },
      { name: "Sport", power: 85, response: 82, aero: 70, efficiency: 64 },
      { name: "Corsa", power: 100, response: 100, aero: 100, efficiency: 38 },
    ],
    hotspots: [
      { x: 8, y: 50, title: "Blade Headlights", detail: "Razor-thin laser modules hidden in the front splitter." },
      { x: 50, y: 46, title: "Light Spine", detail: "A full-length LED spine shows charge level and drive mode." },
      { x: 77, y: 56, title: "Turbofan Wheels", detail: "Forged magnesium wheels pull hot air away from the brakes." },
      { x: 93, y: 41, title: "Ground-Effect Exit", detail: "Venturi tunnels generate downforce without a wing." },
    ],
  },
  {
    slug: "eclipse",
    name: "Eclipse",
    code: "AX-05",
    categorySlug: "grand-tourer",
    category: "Grand Touring Coupé",
    tagline: "Elegance at the speed of light.",
    description:
      "A long-hood, two-door coupé for drivers who cross countries for dinner. Eclipse blends hand-stitched luxury with a near-silent 780 hp powertrain and a 900 km range.",
    image: eclipseImg,
    price: 218000,
    stats: { topSpeed: 305, zeroTo100: 3.0, power: 780, range: 900 },
    specs: [
      { label: "Powertrain", value: "Dual-motor AWD" },
      { label: "Battery", value: "132 kWh structural" },
      { label: "Torque", value: "1,150 Nm" },
      { label: "Weight", value: "1,980 kg" },
      { label: "Seating", value: "2 + 2" },
      { label: "Charging", value: "10–80% in 15 min" },
    ],
    paints: [
      { name: "Sapphire Night", swatch: "oklch(0.42 0.16 262)", filter: "none", price: 0 },
      { name: "Bordeaux", swatch: "oklch(0.4 0.15 15)", filter: "hue-rotate(125deg) brightness(0.9)", price: 4600 },
      { name: "British Emerald", swatch: "oklch(0.45 0.12 160)", filter: "hue-rotate(-95deg)", price: 4600 },
      { name: "Pearl", swatch: "oklch(0.92 0.01 90)", filter: "saturate(0) brightness(1.6)", price: 3900 },
    ],
    modes: [
      { name: "Comfort", power: 50, response: 35, aero: 20, efficiency: 98 },
      { name: "GT", power: 75, response: 65, aero: 50, efficiency: 82 },
      { name: "Sport", power: 100, response: 90, aero: 75, efficiency: 60 },
    ],
    hotspots: [
      { x: 9, y: 46, title: "Signature Headlights", detail: "Crystal-cut LED optics with a welcome light sequence." },
      { x: 19, y: 60, title: "Turbine Wheels", detail: "23-inch multi-spoke wheels with aero inserts." },
      { x: 52, y: 26, title: "Chrome Halo Line", detail: "A single polished strip frames the glasshouse." },
      { x: 92, y: 41, title: "Light Bar Tail", detail: "Full-width OLED tail lamp that animates on unlock." },
    ],
  },
  {
    slug: "nomad",
    name: "Nomad",
    code: "AX-06",
    categorySlug: "suv",
    category: "Expedition SUV",
    tagline: "The map ends. Nomad doesn't.",
    description:
      "Built for the places roads forget. Nomad carries a 160 kWh pack, portal axles and a roof-mounted expedition rack — plus enough power to run a camp for a week.",
    image: nomadImg,
    price: 124000,
    stats: { topSpeed: 210, zeroTo100: 4.4, power: 760, range: 780 },
    specs: [
      { label: "Powertrain", value: "Quad-motor AWD" },
      { label: "Battery", value: "160 kWh LFP" },
      { label: "Torque", value: "1,600 Nm" },
      { label: "Ground clearance", value: "260–380 mm" },
      { label: "Wading depth", value: "1,000 mm" },
      { label: "Bi-directional power", value: "11 kW" },
    ],
    paints: [
      { name: "Dune", swatch: "oklch(0.75 0.05 80)", filter: "none", price: 0 },
      { name: "Olive Drab", swatch: "oklch(0.5 0.06 120)", filter: "hue-rotate(40deg) saturate(0.8) brightness(0.85)", price: 2800 },
      { name: "Arctic", swatch: "oklch(0.92 0.005 260)", filter: "saturate(0) brightness(1.3)", price: 2800 },
      { name: "Graphite", swatch: "oklch(0.3 0.005 260)", filter: "saturate(0) brightness(0.6) contrast(1.2)", price: 2200 },
    ],
    modes: [
      { name: "Road", power: 55, response: 45, aero: 30, efficiency: 90 },
      { name: "Sand", power: 85, response: 70, aero: 15, efficiency: 60 },
      { name: "Rock", power: 65, response: 40, aero: 10, efficiency: 55 },
    ],
    hotspots: [
      { x: 47, y: 17, title: "Expedition Light Bar", detail: "40,000-lumen roof bar with amber fog mode." },
      { x: 46, y: 42, title: "Full-Width DRL", detail: "Daytime light blade that doubles as a charge indicator." },
      { x: 34, y: 60, title: "Recovery Points", detail: "Rated forged shackles and an integrated 6-tonne winch." },
      { x: 51, y: 70, title: "33-inch All-Terrains", detail: "Self-inflating tyres adjust pressure on the move." },
    ],
  },
  {
    slug: "zephyr-spyder",
    name: "Zephyr Spyder",
    code: "AX-07",
    categorySlug: "roadster",
    category: "Electric Roadster",
    tagline: "No roof. No limits.",
    description:
      "A roofless speedster that puts the sky in the cockpit. Zephyr uses an invisible air-curtain windscreen, a rear-biased 960 hp setup and a chassis tuned for coastal roads.",
    image: zephyrImg,
    price: 276000,
    stats: { topSpeed: 330, zeroTo100: 2.4, power: 960, range: 480 },
    specs: [
      { label: "Powertrain", value: "Dual-motor RWD-biased" },
      { label: "Battery", value: "86 kWh solid-state" },
      { label: "Torque", value: "1,280 Nm" },
      { label: "Weight", value: "1,480 kg" },
      { label: "Windscreen", value: "Active air curtain" },
      { label: "Seats", value: "2, tan Nappa" },
    ],
    paints: [
      { name: "Giallo Sole", swatch: "oklch(0.85 0.17 95)", filter: "none", price: 0 },
      { name: "Rosso Corsa", swatch: "oklch(0.58 0.22 27)", filter: "hue-rotate(-50deg) saturate(1.3)", price: 5200 },
      { name: "Verde Riviera", swatch: "oklch(0.7 0.17 145)", filter: "hue-rotate(65deg)", price: 5200 },
      { name: "Azzurro", swatch: "oklch(0.65 0.13 230)", filter: "hue-rotate(160deg)", price: 5200 },
    ],
    modes: [
      { name: "Cruise", power: 55, response: 40, aero: 25, efficiency: 92 },
      { name: "Sport", power: 82, response: 80, aero: 55, efficiency: 68 },
      { name: "Drift", power: 100, response: 95, aero: 60, efficiency: 45 },
    ],
    hotspots: [
      { x: 40, y: 50, title: "Sweep Headlights", detail: "Matrix LEDs that follow the steering angle." },
      { x: 52, y: 30, title: "Open Cockpit", detail: "Hand-stitched tan seats with neck-level heating." },
      { x: 56, y: 63, title: "Carbon Brakes", detail: "Yellow calipers with 400 mm carbon-ceramic discs." },
      { x: 77, y: 55, title: "Side Air Channels", detail: "Feed cooling air to the rear motor and battery." },
    ],
  },
  {
    slug: "apex-rs",
    name: "Apex RS",
    code: "AX-08",
    categorySlug: "track",
    category: "Track-Only Racer",
    tagline: "Licensed for the circuit only.",
    description:
      "Apex RS is a customer race car born from our endurance program. Slick tyres, a swan-neck wing and 2,000 kg of downforce — delivered with a pit crew and a season of track days.",
    image: apexImg,
    price: 520000,
    stats: { topSpeed: 350, zeroTo100: 1.8, power: 1350, range: 160 },
    specs: [
      { label: "Powertrain", value: "Tri-motor AWD" },
      { label: "Battery", value: "64 kWh hot-swap" },
      { label: "Downforce", value: "2,000 kg @ 250 km/h" },
      { label: "Weight", value: "1,180 kg" },
      { label: "Tyres", value: "Racing slicks" },
      { label: "Pit swap", value: "Battery in 90 s" },
    ],
    paints: [
      { name: "Rosso Livery", swatch: "oklch(0.6 0.22 27)", filter: "none", price: 0 },
      { name: "Cyan Livery", swatch: "oklch(0.75 0.13 205)", filter: "hue-rotate(185deg)", price: 8000 },
      { name: "Lime Livery", swatch: "oklch(0.82 0.19 130)", filter: "hue-rotate(105deg) saturate(1.2)", price: 8000 },
      { name: "Gold Livery", swatch: "oklch(0.78 0.15 80)", filter: "hue-rotate(40deg) saturate(1.2)", price: 8000 },
    ],
    modes: [
      { name: "Qualify", power: 100, response: 100, aero: 90, efficiency: 30 },
      { name: "Race", power: 90, response: 92, aero: 100, efficiency: 55 },
      { name: "Wet", power: 65, response: 60, aero: 100, efficiency: 70 },
    ],
    hotspots: [
      { x: 85, y: 33, title: "Swan-Neck Wing", detail: "Adjustable in 12 positions for each circuit." },
      { x: 53, y: 30, title: "Roof Air Scoop", detail: "Ram air for the battery cooling loop." },
      { x: 30, y: 70, title: "Front Splitter", detail: "Carbon splitter with 140 kg of front downforce." },
      { x: 61, y: 62, title: "Racing Slicks", detail: "Centre-lock wheels changed in under 3 seconds." },
    ],
  },
  {
    slug: "phantom-zero",
    name: "Phantom Zero",
    code: "AX-X0",
    categorySlug: "concept",
    category: "Vision Concept",
    tagline: "A glimpse of 2040.",
    description:
      "Phantom Zero is our vision of the car after cars. A liquid-chrome body, hubless light-ring wheels and a single teardrop canopy — driven by AI, or by you, whenever you want.",
    image: phantomImg,
    price: 1200000,
    stats: { topSpeed: 400, zeroTo100: 1.9, power: 1600, range: 1000 },
    specs: [
      { label: "Powertrain", value: "In-wheel hub motors ×4" },
      { label: "Battery", value: "Graphene solid-state" },
      { label: "Autonomy", value: "Level 5" },
      { label: "Body", value: "Liquid chrome composite" },
      { label: "Wheels", value: "Hubless light rings" },
      { label: "Status", value: "One-off concept" },
    ],
    paints: [
      { name: "Liquid Chrome", swatch: "oklch(0.85 0.01 230)", filter: "none", price: 0 },
      { name: "Ember Core", swatch: "oklch(0.65 0.2 35)", filter: "hue-rotate(170deg)", price: 25000 },
      { name: "Rose Gold", swatch: "oklch(0.75 0.08 40)", filter: "sepia(0.6) saturate(1.6) hue-rotate(-20deg)", price: 40000 },
      { name: "24k Gold", swatch: "oklch(0.8 0.14 85)", filter: "sepia(0.75) saturate(2)", price: 60000 },
    ],
    modes: [
      { name: "Autonomous", power: 40, response: 30, aero: 40, efficiency: 100 },
      { name: "Pilot", power: 80, response: 80, aero: 70, efficiency: 75 },
      { name: "Unleashed", power: 100, response: 100, aero: 100, efficiency: 50 },
    ],
    hotspots: [
      { x: 55, y: 25, title: "Teardrop Canopy", detail: "Single-piece glass canopy that lifts forward." },
      { x: 28, y: 55, title: "Light Smile", detail: "A front light ribbon that communicates with pedestrians." },
      { x: 56, y: 60, title: "Hubless Light Rings", detail: "In-wheel motors framed by glowing rings." },
    ],
  },
  {
    slug: "pulse",
    name: "Pulse",
    code: "AX-09",
    categorySlug: "city",
    category: "Compact Sport Hatch",
    tagline: "Big energy. Small footprint.",
    description:
      "Pulse brings AETHER performance to the city. A compact hatch with a pixel-light face, 480 hp and a playful chassis that turns every roundabout into a corner.",
    image: pulseImg,
    price: 58000,
    stats: { topSpeed: 230, zeroTo100: 3.9, power: 480, range: 560 },
    specs: [
      { label: "Powertrain", value: "Dual-motor AWD" },
      { label: "Battery", value: "78 kWh" },
      { label: "Torque", value: "620 Nm" },
      { label: "Length", value: "4,150 mm" },
      { label: "Turning circle", value: "10.2 m" },
      { label: "Charging", value: "10–80% in 18 min" },
    ],
    paints: [
      { name: "Lagoon Teal", swatch: "oklch(0.75 0.12 200)", filter: "none", price: 0 },
      { name: "Coral", swatch: "oklch(0.7 0.16 30)", filter: "hue-rotate(170deg)", price: 1200 },
      { name: "Lime", swatch: "oklch(0.85 0.18 130)", filter: "hue-rotate(-80deg)", price: 1200 },
      { name: "Mono", swatch: "oklch(0.8 0.005 260)", filter: "saturate(0) brightness(1.15)", price: 900 },
    ],
    modes: [
      { name: "Eco", power: 45, response: 40, aero: 20, efficiency: 100 },
      { name: "City", power: 65, response: 70, aero: 25, efficiency: 88 },
      { name: "Boost", power: 100, response: 95, aero: 40, efficiency: 60 },
    ],
    hotspots: [
      { x: 55, y: 46, title: "Pixel Headlights", detail: "1,024 programmable pixels that can display messages." },
      { x: 50, y: 18, title: "Contrast Roof", detail: "Black glass roof with solar cells adding 15 km a day." },
      { x: 44, y: 63, title: "19-inch Aero Wheels", detail: "Lightweight wheels with teal accent inserts." },
    ],
  },
];

export const getModel = (slug: string) => models.find((m) => m.slug === slug);

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

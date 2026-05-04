
import React, { useState } from "react";
import AuthModal from "./auth/AuthModal";
import { useSharedAuth } from "./auth/sharedAuth";
import { useSiteControl } from "./useSiteControl";

const factionLogoPaths = {
  rome: "/rome_logo_transparent.png",
  barbarian: "/barbarian_logo_transparent.png",
  egypt: "/egypt_logo_transparent.png",
};

const navItems = ["Vision", "Factions", "World", "Economy", "NFTs", "Token", "Roadmap"].map((label) => ({
  label,
  href: `#${label.toLowerCase()}`,
}));

const heroFeatures = ["ROME-CENTERED MMO", "GLADIATOR PVP", "DAYZ-STYLE RISK", "EVE-LIKE ECONOMY"];
const heroStats = [["3", "Playable Factions"], ["1–60", "Leveling Journey"], ["10–14D", "Gold Vein Events"], ["8M", "Token Supply"]];

const visionCards = [
  { eyebrow: "CORE VISION", title: "Grounded Ancient War MMO", text: "Makgura is a grounded, realistic MMO set in an ancient world centered around Rome, the Barbarian Horde, and Egypt." },
  { eyebrow: "PROGRESSION", title: "Classic 1–60 Leveling", text: "Level up through a long-form MMORPG journey inspired by WoW Classic progression, then push into dangerous zones, dungeons, raids, territory wars, and endgame conflict." },
  { eyebrow: "RISK", title: "Death Has Weight", text: "Inventory drops on death, equipped gear has partial drop risk, and currency and resources can be partially lost. Bank and housing storage remain safe." },
];

const factions = [
  { eyebrow: "DISCIPLINE / EMPIRE", title: "Roman Empire", text: "Organized, defensive, and formation-focused. Rome controls military roads, fortified cities, legions, engineers, governors, and the political center of the world.", tags: ["Formations", "Defense", "Legions"], accent: "#B8322A", logo: factionLogoPaths.rome, glow: "rgba(184,50,42,0.22)" },
  { eyebrow: "FURY / RAIDING", title: "Barbarian Horde", text: "Fast, aggressive, and raiding-focused. The Horde thrives on mobility, ambushes, warbands, frontier pressure, and brutal open-world conflict.", tags: ["Raids", "Speed", "Warbands"], accent: "#3F7D4E", logo: factionLogoPaths.barbarian, glow: "rgba(63,125,78,0.22)" },
  { eyebrow: "MOBILITY / ECONOMY", title: "Egypt", text: "Ranged, mobile, and economically powerful. Egypt controls river cities, desert trade, ancient temples, resource networks, and mystic endgame sites.", tags: ["Ranged", "Trade", "Temples"], accent: "#2D80C5", logo: factionLogoPaths.egypt, glow: "rgba(45,128,197,0.24)" },
];

const gameplayLoop = ["Level up from 1–60", "Acquire gear through loot, crafting, and trade", "Enter dangerous zones for better rewards", "Become a Gladiator in Colosseum PvP", "Risk losing gear and resources on death", "Store valuables, rebuild, and return stronger"];
const worldSystems = [
  { eyebrow: "WORLD STRUCTURE", title: "Shifting Faction Regions", text: "Regions are controlled by factions, borders shift based on player activity, and territory resets seasonally to keep the world from locking forever.", tags: ["Faction Control", "Shifting Borders", "Yearly Reset"] },
  { eyebrow: "CITY WARFARE", title: "Attack, Capture, Occupy", text: "Major cities are economic and social hubs that can be attacked. Attackers breach gates, capture districts, and flip the city if defenders lose control.", tags: ["Gates", "Districts", "Occupation"] },
  { eyebrow: "LAW SYSTEM", title: "Safe Zones, Controlled Zones, Warzones", text: "Cities have guards and crime response, controlled regions enforce some law, and warzones allow full PvP with no protection.", tags: ["Guards", "Infamy", "Bounties"] },
];
const deathCards = [
  { title: "Inventory Drops", text: "On death, carried inventory drops fully. The best loot is valuable because taking it into danger creates real risk." },
  { title: "Equipped Gear Risk", text: "Equipped gear has partial drop chance, making strong equipment powerful but not untouchable." },
  { title: "Safe Storage", text: "Bank storage and housing storage never drop, so players can recover, rebuild, and avoid being permanently ruined." },
  { title: "Corpse Window", text: "Bodies remain for roughly 10–20 minutes with a short priority window for the owner before others can fully loot." },
];
const economyCards = [
  { title: "City Taxes", text: "Marketplace trades, crafting fees, repairs, and property taxes generate city activity and governor revenue." },
  { title: "Governor Deeds", text: "Capital City NFTs act as permanent tradable deeds. Owners earn only when their faction controls the city." },
  { title: "Housing", text: "NFT-owned or earned or rented homes provide safe storage, prestige, location value, and repairable property after sieges." },
  { title: "Banking", text: "Personal banks, guild banks, permissions, and storage expansion give players safe recovery between dangerous runs." },
];
const professionCards = [
  { eyebrow: "GATHERING", title: "Mining, Woodcutting, Skinning", text: "Gatherers pull ore, stone, timber, hides, herbs, and rare world materials from dangerous regions, city outskirts, dungeons, and contested warzones.", tags: ["Ore", "Timber", "Hides"] },
  { eyebrow: "REFINING", title: "Smelting, Tanning, Milling", text: "Raw materials move through refining professions before they become armor, weapons, building components, siege supplies, and trade goods.", tags: ["Bars", "Leather", "Planks"] },
  { eyebrow: "CRAFTING", title: "Smithing, Carpentry, Alchemy", text: "Crafters make weapons, armor, tools, potions, house upgrades, repair kits, siege parts, and player-market goods that keep the war economy moving.", tags: ["Gear", "Consumables", "Housing"] },
  { eyebrow: "SPECIALISTS", title: "Builders, Traders, Outfitters", text: "Players can focus on building houses, supplying guilds, running market routes, repairing gear, furnishing plots, and becoming known for a profession.", tags: ["Housing", "Markets", "Guild Supply"] },
];
const craftingPillars = [
  { title: "Player-Made Gear", text: "Loot matters, but crafted gear, repair materials, consumables, and upgrades give non-raiders a meaningful economic role." },
  { title: "Local Markets", text: "City control, taxes, transport risk, and local demand make crafters think about where to sell and what each region needs." },
  { title: "Housing Economy", text: "Land plots create demand for building materials, furniture, storage upgrades, decoration, and profession-made house improvements." },
  { title: "War Supply Chains", text: "Sieges and raids need food, potions, weapons, repairs, outpost supplies, and replacement gear after costly PvP losses." },
];
const nftCards = [
  { title: "603 Total NFTs", text: "Makgura's first NFT structure is 3 Founder Capital City NFTs plus 600 capital-city home plot NFTs across Rome, Egypt, and the Barbarian capital." },
  { title: "3 Founder Capital City NFTs", text: "One Founder Capital City NFT exists for each race capital: Rome, Egypt, and the Barbarian Horde." },
  { title: "600 Home Plot NFTs", text: "Capital land plots are sold like real estate for future player houses: 300 in Rome, 200 in Egypt, and 100 in the Barbarian capital." },
  { title: "Not Pay-To-Win", text: "Founder city NFTs and land plots create ownership, housing, prestige, and economy rights. They do not sell weapons, stats, or direct combat strength." },
];
const nftCapitalCards = [
  { eyebrow: "FOUNDER CITY NFT", title: "Rome Capital", text: "The largest capital city. Founder price is 100 SOL with 300 total home plot NFTs: 150 small, 105 medium, and 45 large.", tags: ["100 SOL", "300 Plots", "Largest Capital"] },
  { eyebrow: "FOUNDER CITY NFT", title: "Egypt Capital", text: "The middle-size capital city. Founder price is 50 SOL with 200 total home plot NFTs: 100 small, 70 medium, and 30 large.", tags: ["50 SOL", "200 Plots", "Trade Capital"] },
  { eyebrow: "FOUNDER CITY NFT", title: "Barbarian Capital", text: "The smallest capital city. Founder price is 25 SOL with 100 total home plot NFTs: 50 small, 35 medium, and 15 large.", tags: ["25 SOL", "100 Plots", "Warband Capital"] },
];
const landPlotCards = [
  { title: "Small Plot NFTs", text: "300 total small home plots across all capitals. Small plots cost 0.15 SOL each." },
  { title: "Medium Plot NFTs", text: "210 total medium home plots across all capitals. Medium plots cost 0.5 SOL each." },
  { title: "Large Plot NFTs", text: "90 total large home plots across all capitals. Large plots cost 1 SOL each." },
];
const nftStats = [["3", "Founder Capital City NFTs"], ["3", "Race Capitals"], ["3", "Land Plot Sizes"], ["600", "Plots Available"]];
const founderCityDrops = [
  { race: "Roman Empire", name: "Rome Founder Capital City NFT", symbol: "ROMA", price: "100 SOL", supply: "1 Founder Capital City NFT", plots: "300 home plots", small: "150 small", medium: "105 medium", large: "45 large", perk: "The biggest capital city ownership asset, tied to Rome's political center, capital governance identity, and the largest land market.", accent: "#B8322A", logo: factionLogoPaths.rome },
  { race: "Egypt", name: "Egypt Founder Capital City NFT", symbol: "EGYPT", price: "50 SOL", supply: "1 Founder Capital City NFT", plots: "200 home plots", small: "100 small", medium: "70 medium", large: "30 large", perk: "The middle-size capital city ownership asset, tied to Egypt's trade identity, land value, housing market, and capital-city prestige.", accent: "#2D80C5", logo: factionLogoPaths.egypt },
  { race: "Barbarian Horde", name: "Barbarian Founder Capital City NFT", symbol: "HORDE", price: "25 SOL", supply: "1 Founder Capital City NFT", plots: "100 home plots", small: "50 small", medium: "35 medium", large: "15 large", perk: "The smallest capital city ownership asset, tied to raiding prestige, warband identity, and a tighter land market.", accent: "#3F7D4E", logo: factionLogoPaths.barbarian },
];
const landPlotDrops = [
  { size: "Small", name: "Small Capital Home Plot NFT", price: "0.15 SOL", supply: "300 total: Rome 150, Egypt 100, Barbarians 50", perk: "Entry-level capital real estate for future player housing, personal identity, and city presence." },
  { size: "Medium", name: "Medium Capital Home Plot NFT", price: "0.5 SOL", supply: "210 total: Rome 105, Egypt 70, Barbarians 35", perk: "Expanded housing footprint with more room for upgrades, storage flavor, decorations, and stronger location value." },
  { size: "Large", name: "Large Capital Home Plot NFT", price: "1 SOL", supply: "90 total: Rome 45, Egypt 30, Barbarians 15", perk: "Scarce high-value capital property for serious players, guild-adjacent housing, and high-value city placement." },
];
const nftHowItWorks = [
  "Founder Capital City NFTs are one-of-one assets for Rome, Egypt, and the Barbarian Horde.",
  "Rome is the biggest capital: 100 SOL founder city NFT and 300 home plot NFTs.",
  "Egypt is the middle capital: 50 SOL founder city NFT and 200 home plot NFTs.",
  "Barbarians are the smallest capital: 25 SOL founder city NFT and 100 home plot NFTs.",
  "Small plots cost 0.15 SOL, medium plots cost 0.5 SOL, and large plots cost 1 SOL.",
  "Players will be able to build houses on owned capital plots.",
  "Housing creates demand for builders, furniture, storage upgrades, and crafted materials.",
  "NFTs do not sell weapons, stats, or direct combat strength.",
];
const eventCards = [
  { eyebrow: "WORLD EVENT", title: "Gold Vein Spawns", text: "A high-value resource vein appears in a dangerous contested zone, lasts 10–14 days, then depletes and respawns somewhere else on the map." },
  { eyebrow: "CONTROL", title: "Outposts & Extraction", text: "Players build mining infrastructure, defend it, upgrade it, hold the area during extraction, and fight through vulnerability windows." },
  { eyebrow: "REWARDS", title: "Shared But Competitive", text: "The majority goes to the controlling group, smaller shares go to contributors, and minor shares can go to nearby participants." },
];
const soloGroupCards = [
  { title: "Solo Players", text: "Solo players can level fully, become a Gladiator in Colosseum PvP, craft, trade, bounty hunt, join small-scale fights, and temporarily join wars as mercenaries." },
  { title: "Groups & Guilds", text: "Groups control territory, capture cities, dominate resources, run dungeons, fight raids, manage guild banks, and lead large-scale warfare." },
];
const tokenCards = [
  { title: "8M Max Supply", text: "Makgura Coin (MKG) has a fixed max supply of 8,000,000 tokens, with 4,800,000 reserved for long-term player rewards." },
  { title: "22-Minute Rewards", text: "MKG emits through competitive systems roughly every 22 minutes, keeping reward timing simple and predictable." },
  { title: "2-Year Halvings", text: "Global emissions halve every 2 years, creating Bitcoin-style scarcity cycles over a 20-25 year reward timeline." },
  { title: "No Combat Power", text: "MKG is a premium utility and prestige token. It does not sell direct strength, weapons, stats, or pay-to-win advantages." },
];
const tokenRewards = [
  { eyebrow: "PRIMARY REWARD", title: "Gold Vein Control", text: "Contested gold veins generate an initial 40 MKG per reward interval. Guilds must control, mine, defend, and survive large-scale PvP pressure to keep earning.", tags: ["40 MKG / 22 MIN", "Guild Warfare", "Territory Control"] },
  { eyebrow: "SECONDARY REWARD", title: "Top Gladiator", text: "The top-ranked PvP Gladiator earns an initial 10 MKG per reward interval, giving solo and small-scale fighters a prestige path beside guild warfare.", tags: ["10 MKG / 22 MIN", "Colosseum PvP", "Solo Prestige"] },
];
const tokenDistribution = [
  ["60%", "Player Rewards", "4,800,000 MKG"],
  ["15%", "Public Sale", "1,200,000 MKG"],
  ["10%", "Seed Round", "800,000 MKG"],
  ["10%", "Team / Development", "800,000 MKG"],
  ["5%", "Treasury", "400,000 MKG"],
];
const tokenUtilityCards = [
  { title: "Cosmetics & Prestige", text: "Exclusive skins, visual upgrades, status unlocks, and rare recognition without selling combat power." },
  { title: "Governance", text: "MKG holders can vote on game updates, balance changes, event decisions, and long-term ecosystem direction." },
  { title: "Bank Storage", text: "Holding MKG can expand global bank capacity and storage slots while keeping housing storage separate." },
  { title: "Passive XP Boost", text: "Holding MKG can grant a small capped XP boost around 5%, designed as quality-of-life rather than advantage abuse." },
  { title: "Market Fee Reduction", text: "Long-term holders can reduce marketplace taxes and trading fees, rewarding active traders and crafters." },
  { title: "Post-Emission Value", text: "After emissions end, gold veins and Gladiator competition can continue around prestige, rare items, and recognition." },
];
const roadmap = [
  { eyebrow: "PHASE 01", title: "World & Factions", text: "Rome, Barbarian Horde, and Egypt identity; faction regions; cities; law zones; class direction; and the core 1–60 leveling plan." },
  { eyebrow: "PHASE 02", title: "Combat & Progression", text: "Real-time MMO combat, PvE enemies, PvP rules, gear progression, death and loot logic, banks, housing, and early dungeon prototypes." },
  { eyebrow: "PHASE 03", title: "Territory & Economy", text: "City sieges, governors, taxes, faction control, guild banks, property, professions, crafting fees, market activity, and seasonal territory reset." },
  { eyebrow: "PHASE 04", title: "World Events & Endgame", text: "Gold veins, outposts, Colosseum Gladiator PvP rewards, raids, bounty systems, token emissions, and live conflict loops that keep the world moving." },
];

function HeaderCommandButton({ children, primary = false, onClick }) { return <button onClick={onClick} className={`button-shine header-command ${primary ? "primary" : ""}`}><span className="button-sweep" /><span className="button-content">{children}</span></button>; }
function ShieldButton({ children, light = false, onClick }) { return <button onClick={onClick} className={`button-shine shield-button ${light ? "light" : ""}`}><span className="button-sweep" /><span className="button-content">{children}</span></button>; }
function StatusPill({ children }) { return <span className="status-pill">{children}</span>; }
function FeaturePill({ children }) { return <div className="feature-pill"><span>✦</span><span>{children}</span></div>; }
function SectionHeading({ eyebrow, title, text }) { return <div className="section-heading"><div className="eyebrow">{eyebrow}</div><h2>{title}</h2><div className="heading-line" />{text && <p>{text}</p>}</div>; }
function Card({ eyebrow, title, text, children, compact = false }) { return <div className={`card hover-card ${compact ? "compact" : ""}`}><div className="card-topline" /><div className="card-pattern" /><div className="card-glow" />{eyebrow && <div className="card-eyebrow">{eyebrow}</div>}<h3>{title}</h3><p>{text}</p>{children}</div>; }
function MetricCard({ value, label }) { return <div className="metric-card hover-card"><div className="metric-topline" /><div className="metric-value">{value}</div><div className="metric-label">{label}</div></div>; }
function TagList({ tags }) { return <div className="tag-list">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>; }

function FactionCard({ faction }) {
  return <div className="faction-card" style={{ "--faction": faction.accent, "--faction-glow": faction.glow }}><div className="faction-topline" /><div className="faction-glow one" /><div className="faction-glow two" /><div className="card-pattern" /><div className="faction-content"><div className="faction-logo-wrap"><img src={faction.logo} alt={`${faction.title} logo`} /></div><div className="faction-copy"><div className="faction-eyebrow">{faction.eyebrow}</div><h3>{faction.title}</h3><p>{faction.text}</p><div className="faction-tags">{faction.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></div></div>;
}

function WarMapPanel() {
  const markers = [
    { title: "ROME", label: "Capital deed", className: "marker-rome", logo: factionLogoPaths.rome, color: "#B8322A", glow: "rgba(184,50,42,0.28)" },
    { title: "EGYPT", label: "Trade kingdom", className: "marker-egypt", logo: factionLogoPaths.egypt, color: "#2D80C5", glow: "rgba(45,128,197,0.30)" },
    { title: "VEIN", label: "10–14 day event", className: "marker-vein", icon: "✦", color: "#d6a85a", glow: "rgba(214,168,90,0.24)" },
    { title: "HORDE", label: "Raiding frontier", className: "marker-horde", logo: factionLogoPaths.barbarian, color: "#3F7D4E", glow: "rgba(63,125,78,0.28)" },
  ];
  return <div className="war-panel"><div className="panel-topline" /><div className="war-map"><div className="map-grid" /><div className="map-line" /><div className="map-glow blue" /><div className="map-glow gold" /><div className="map-soft-markers" /><div className="war-map-header"><div><div className="war-map-title">Makgura War Map</div><div className="war-map-subtitle">Faction control, cities, veins, and warzones</div></div><div className="war-map-badge">Borders Shifting</div></div>{markers.map((marker) => <div key={marker.title} className={`map-marker ${marker.className}`} style={{ "--marker": marker.color, "--marker-glow": marker.glow }}><div className="pulse-ring" /><div className="marker-glow" /><div className="marker-card"><div className="marker-icon">{marker.logo ? <img src={marker.logo} alt={`${marker.title} faction logo`} /> : marker.icon}</div><div className="marker-title">{marker.title}</div><div className="marker-label">{marker.label}</div></div></div>)}</div><div className="map-stat-grid"><div><strong>CITY</strong><span>Attack and capture</span></div><div><strong>VEIN</strong><span>Dynamic resource war</span></div><div><strong>LOOT</strong><span>Risk on death</span></div></div></div>;
}

function LoopPanel() { return <div className="loop-panel"><div className="panel-topline" /><div className="loop-title">Core Gameplay Loop</div><div className="loop-list">{gameplayLoop.map((item, index) => <div key={item} className="loop-item"><span>{index + 1}</span><strong>{item}</strong></div>)}</div></div>; }
function DecreeBanner({ eyebrow, title, text, cta }) { return <div className="decree-banner hover-card"><div className="panel-topline" /><div className="decree-glow" /><div><div className="eyebrow">{eyebrow}</div><h3>{title}</h3><p>{text}</p></div><div className="decree-cta">{cta}</div></div>; }
function PremiumEffects() { return <div className="embers" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /></div>; }

function getPublishedPosts(blog) {
  return (blog?.posts || [])
    .filter((post) => post.status === "published")
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return String(b.publishedAt || "").localeCompare(String(a.publishedAt || ""));
    });
}

function blogArtStyle(post) {
  if (post.imageUrl) {
    return {
      backgroundImage: `linear-gradient(rgba(0,0,0,.16), rgba(0,0,0,.32)), url("${post.imageUrl}")`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    };
  }
  return { background: post.imageStyle || "radial-gradient(circle at 50% 10%, rgba(240,179,91,.42), transparent 22%), linear-gradient(135deg,#1a0d09,#070606)" };
}

function formatPostDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function usePostSeo(post, fallbackTitle, fallbackDescription) {
  React.useEffect(() => {
    const previousTitle = document.title;
    let descriptionTag = document.querySelector('meta[name="description"]');
    const previousDescription = descriptionTag?.getAttribute("content") || "";
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }

    document.title = post?.seoTitle || post?.title || fallbackTitle;
    descriptionTag.setAttribute("content", post?.seoDescription || post?.excerpt || fallbackDescription);

    return () => {
      document.title = previousTitle;
      descriptionTag.setAttribute("content", previousDescription);
    };
  }, [post, fallbackTitle, fallbackDescription]);
}

function BlogSection({ blog, onOpenPost }) {
  const posts = getPublishedPosts(blog);
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="section">
      <div className="container">
        <SectionHeading eyebrow={blog.eyebrow || "War Chronicle"} title={blog.title || "Makgura dispatches from the front."} text={blog.intro || "Development updates and worldbuilding notes from Makgura."} />
        <div className="three-grid">
          {posts.map((post) => (
            <article className="blog-card hover-card" key={post.id || post.slug || post.title}>
              <div className="blog-art" style={blogArtStyle(post)}><span>{post.category}</span></div>
              <div className="blog-body">
                <div className="blog-meta">
                  {post.publishedAt && <span>{formatPostDate(post.publishedAt)}</span>}
                  {post.featured && <span>Featured</span>}
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <button className="blog-link" onClick={() => onOpenPost(post)}>Read Chronicle →</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogModal({ post, onClose }) {
  if (!post) return null;
  return (
    <div className="blog-modal">
      <article className="blog-modal-card">
        <div className="blog-modal-art" style={blogArtStyle(post)} />
        <div className="blog-modal-body">
          <div className="blog-meta">
            <span>{post.category}</span>
            {post.publishedAt && <span>{formatPostDate(post.publishedAt)}</span>}
            {post.author && <span>By {post.author}</span>}
          </div>
          <h2>{post.title}</h2>
          <p className="blog-excerpt">{post.excerpt}</p>
          <div className="blog-fulltext">{post.body}</div>
          <ShieldButton light onClick={onClose}>Close Chronicle</ShieldButton>
        </div>
      </article>
    </div>
  );
}

function NftSaleHud() {
  return (
    <div className="nft-sale-hud">
      <div className="hud-title"><div><p>Genesis Ownership</p><h3>Founder Cities + Land</h3></div><span>603 NFTs</span></div>
      <div className="nft-city-map">
        {founderCityDrops.map((drop) => (
          <div className="nft-city-node" key={drop.name} style={{ "--nft-accent": drop.accent }}>
            <img src={drop.logo} alt={`${drop.race} logo`} />
            <strong>{drop.symbol}</strong>
            <span>1 Founder City NFT</span>
          </div>
        ))}
      </div>
      <div className="nft-plot-scale">
        {landPlotDrops.map((plot, index) => <span key={plot.size} style={{ "--plot-level": index + 1 }}>{plot.size}</span>)}
      </div>
    </div>
  );
}

function FounderCityCard({ drop, onAuthOpen }) {
  return (
    <article className="nft-drop-card founder" style={{ "--nft-accent": drop.accent }}>
      <div className="nft-drop-art">
        <span>{drop.race}</span>
        <img src={drop.logo} alt={`${drop.race} logo`} />
      </div>
      <div className="nft-drop-body">
        <div className="nft-drop-title"><div><h3>{drop.name}</h3><small>{drop.supply}</small></div><b>{drop.price}</b></div>
        <p>{drop.perk}</p>
        <div className="plot-breakdown"><span>{drop.plots}</span><span>{drop.small}</span><span>{drop.medium}</span><span>{drop.large}</span></div>
        <div className="tag-list"><span>Founder City</span><span>1 of 1</span><span>No Combat Power</span></div>
        <div className="button-row"><ShieldButton light onClick={onAuthOpen}>Connect Wallet</ShieldButton><ShieldButton onClick={onAuthOpen}>Register Interest</ShieldButton></div>
      </div>
    </article>
  );
}

function LandPlotCard({ plot, onAuthOpen }) {
  return (
    <article className="nft-drop-card plot">
      <div className="nft-drop-art plot-art">
        <span>{plot.size} Plot</span>
        <div className="plot-symbol">{plot.size.slice(0, 1)}</div>
      </div>
      <div className="nft-drop-body">
        <div className="nft-drop-title"><div><h3>{plot.name}</h3><small>{plot.supply}</small></div><b>{plot.price}</b></div>
        <p>{plot.perk}</p>
        <p><b>Pricing:</b> Small 0.15 SOL, medium 0.5 SOL, large 1 SOL.</p>
        <div className="button-row"><ShieldButton light onClick={onAuthOpen}>Connect Wallet</ShieldButton><ShieldButton onClick={onAuthOpen}>Plot Details</ShieldButton></div>
      </div>
    </article>
  );
}

function NftSalesPage({ onBack, onAuthOpen }) {
  React.useEffect(() => {
    document.title = "Makgura NFTs | Founder Cities and Land Plots";
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute("content", "Makgura NFTs include 3 Founder Capital City NFTs and 600 capital-city home plot NFTs with published SOL pricing by race and plot size.");
  }, []);

  return (
    <>
      <section className="hero nft-page-hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="hero-pills"><StatusPill>Founder NFT Sale</StatusPill><StatusPill>Cities. Land. Housing.</StatusPill></div>
            <h1 className="makgura-logo">Makgura NFTs</h1>
            <div className="makgura-subtitle">Founder cities and capital land plots.</div>
            <p className="hero-text">Makgura's NFT page is built like Ujura's dedicated ownership page, but the assets are different: 3 Founder Capital City NFTs plus 600 capital-city home plot NFTs. Rome is the largest at 100 SOL with 300 plots, Egypt is 50 SOL with 200 plots, and Barbarians are 25 SOL with 100 plots.</p>
            <div className="hero-ctas"><ShieldButton light onClick={onAuthOpen}>Connect Wallet</ShieldButton><ShieldButton onClick={onBack}>Back to Site</ShieldButton></div>
          </div>
          <NftSaleHud />
        </div>
        <div className="container stats-grid">{nftStats.map(([value, label]) => <MetricCard key={label} value={value} label={label} />)}</div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Founder Capital Cities" title="Three one-of-one capital city NFTs." text="Each race has one capital city ownership asset with fixed founder pricing and fixed home plot supply. These are not instant power items: value comes from city identity, faction control, player activity, and the future capital real-estate economy." />
          <div className="three-grid">{founderCityDrops.map((drop) => <FounderCityCard key={drop.name} drop={drop} onAuthOpen={onAuthOpen} />)}</div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Capital Land Plots" title="Real estate for player-built houses." text="Land plots are sold inside each capital city as small, medium, and large home plot NFTs. Small plots cost 0.15 SOL, medium plots cost 0.5 SOL, and large plots cost 1 SOL." />
          <div className="four-grid">{landPlotDrops.map((plot) => <LandPlotCard key={plot.size} plot={plot} onAuthOpen={onAuthOpen} />)}</div>
        </div>
      </section>
      <section className="section">
        <div className="container two-col">
          <div className="card big-panel"><div className="card-topline" /><div className="card-pattern" /><div className="eyebrow">How It Works</div><h3>NFT ownership supports the economy, not combat stats.</h3><p>Makgura NFTs are designed to create scarce city ownership and housing real estate. The war still belongs to players who level, fight, craft, trade, control territory, and defend what they own.</p></div>
          <div className="mini-grid">{nftHowItWorks.map((item) => <div className="loop-item" key={item}><span>›</span><strong>{item}</strong></div>)}</div>
        </div>
      </section>
    </>
  );
}

export default function App() {
  const control = useSiteControl("makgura");
  const auth = useSharedAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [activePage, setActivePage] = useState("home");
  const accountLabel = auth.user ? auth.user.email || "Account" : control.navigation?.walletLabel || "Connect Wallet";
  const visibleNavItems = control.blog?.enabled ? [...navItems, { label: "Blog", href: "#blog" }] : navItems;
  usePostSeo(
    activePost,
    activePage === "nfts" ? "Makgura NFTs | Founder Cities and Land Plots" : "Makgura | Ancient War MMO",
    activePage === "nfts" ? "Makgura NFTs include 3 Founder Capital City NFTs and 600 home plot NFTs priced by race and plot size." : "Makgura is a grounded ancient war MMO by Majori Games.",
  );

  function scrollHome(href) {
    setActivePage("home");
    setTimeout(() => {
      if (href === "#top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  function goHome() {
    scrollHome("#top");
  }

  function goNfts() {
    setActivePage("nfts");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  }

  function handleNav(item) {
    if (item.label === "NFTs") {
      goNfts();
      return;
    }
    scrollHome(item.href);
  }

  function handleCta(cta) {
    if (cta?.action === "auth") {
      setAuthOpen(true);
      return;
    }
    const href = cta?.href || "#vision";
    if (href.startsWith("#")) {
      scrollHome(href);
      return;
    }
    window.location.href = href;
  }

  return <div className="site-shell"><PremiumEffects /><div className="site-bg" /><div className="site-grid" />
    <header className="site-header"><div className="header-inner"><a className="brand" href="#top" aria-label="Makgura home" onClick={(event)=>{event.preventDefault();goHome();}}><div className="brand-mark">M</div><div><div className="brand-name">MAKGURA</div><div className="brand-subtitle">Ancient War MMO</div></div></a><nav className="desktop-nav" aria-label="Primary navigation">{visibleNavItems.map((item,index)=><React.Fragment key={item.label}>{index!==0&&<span>•</span>}<button className="nav-link-button" onClick={() => handleNav(item)}>{item.label}</button></React.Fragment>)}</nav><div className="header-actions">{control.toggles?.alphaAccessEnabled && <HeaderCommandButton primary onClick={() => setAuthOpen(true)}>{control.navigation?.playAlphaLabel || "Play Alpha"}</HeaderCommandButton>}{control.toggles?.walletButtonsEnabled && <HeaderCommandButton onClick={() => setAuthOpen(true)}>{accountLabel}</HeaderCommandButton>}</div><div className="mobile-action"><HeaderCommandButton primary onClick={() => setAuthOpen(true)}>{accountLabel}</HeaderCommandButton></div></div><div className="header-line" /></header>
    {control.statusBanner?.enabled && control.statusBanner?.text && <div className="control-banner">{control.statusBanner.text}</div>}
    <main id="top">{activePage === "nfts" ? <NftSalesPage onBack={goHome} onAuthOpen={() => setAuthOpen(true)} /> : <><section className="hero"><div className="container hero-inner"><div className="hero-copy"><div className="hero-pills"><StatusPill>{control.hero?.badge || "Grounded Ancient War MMO"}</StatusPill><StatusPill>{control.hero?.factionBadge || "Rome. Barbarians. Egypt."}</StatusPill></div><h1 className="makgura-logo">{control.hero?.title || "Makgura"}</h1><div className="makgura-subtitle">{control.hero?.subtitle || "Level. Fight. Conquer."}</div><p className="hero-text">{control.hero?.body || "A persistent, player-driven war MMO where players level from 1-60, fight for Rome, the Barbarian Horde, or Egypt, become a Gladiator in Colosseum PvP, capture cities, control territory, and compete over dynamic world resources."}</p><div className="feature-grid">{heroFeatures.map((item)=><FeaturePill key={item}>{item}</FeaturePill>)}</div><div className="hero-ctas"><ShieldButton light onClick={() => handleCta(control.hero?.primaryCta)}>{control.hero?.primaryCta?.label || "Explore Makgura"}</ShieldButton><ShieldButton onClick={() => handleCta(control.hero?.secondaryCta)}>{control.hero?.secondaryCta?.label || "Read Whitepaper"}</ShieldButton></div></div><WarMapPanel /></div><div className="container stats-grid">{heroStats.map(([value,label])=><MetricCard key={label} value={value} label={label}/>)}</div></section>
    <section id="vision" className="section"><div className="container two-col"><div><SectionHeading eyebrow="CORE VISION" title="WoW Classic Progression. DayZ Risk. EVE-Style Control." text="Makgura combines long-form leveling, meaningful death, player-driven economy, shifting territory, capital city governance, sieges, world events, and constant faction conflict into one ancient war MMO."/><div className="vision-stack">{visionCards.map((card)=><Card key={card.title} {...card}/>)}</div></div><LoopPanel /></div></section>
    <section id="factions" className="section"><div className="container"><SectionHeading eyebrow="PLAYABLE FACTIONS" title="Rome. Barbarians. Egypt." text="The game is primarily centered around Rome, but its world war is shaped by three playable powers with different identities, strengths, economies, and battlefield styles."/><div className="faction-grid">{factions.map((faction)=><FactionCard key={faction.title} faction={faction}/>)}</div></div></section>
    <section id="world" className="section"><div className="container two-col world-grid"><SectionHeading eyebrow="WORLD & GOVERNANCE" title="Cities can be attacked, captured, and governed." text="Major cities are economic and social hubs. Attackers breach gates, capture districts, and flip city control. Capital City NFTs act as permanent tradable deeds, but income and policy control only activate when the owner’s faction controls the city."/><div className="stack">{worldSystems.map((system)=><Card key={system.title} eyebrow={system.eyebrow} title={system.title} text={system.text}><TagList tags={system.tags}/></Card>)}</div></div></section>
    <section className="section"><div className="container"><SectionHeading eyebrow="DEATH & LAW" title="Inventory is at risk. Storage is safe. Crime has consequences." text="Makgura is built around risk versus recovery. Death matters, but players can rebuild through banks, housing, guild storage, crafting, trade, and smart preparation."/><div className="four-grid">{deathCards.map((card)=><Card key={card.title} title={card.title} text={card.text} compact/>)}</div></div></section>
    <section id="economy" className="section"><div className="container two-col"><div><SectionHeading eyebrow="ECONOMY" title="Cities, taxes, banks, housing, and trade." text="The economy is driven by marketplace trades, crafting fees, repairs, property taxes, storage, guild logistics, player housing, and faction control over valuable cities."/><div className="governor-card"><div className="eyebrow">Governor System</div><div className="heading-line"/><p>Governors earn a small percentage of city economic activity, such as 1–2%, while tax limits stay controlled around 2%–8%. High taxes reduce player activity, and cooldowns prevent constant abuse.</p></div></div><div className="two-card-grid">{economyCards.map((card)=><Card key={card.title} title={card.title} text={card.text}/>)}</div></div></section>
    <section id="professions" className="section"><div className="container"><SectionHeading eyebrow="PROFESSIONS & CRAFTING" title="A war economy needs workers, builders, and master crafters." text="Makgura professions let players build value outside pure combat. Gatherers, refiners, crafters, builders, traders, and guild suppliers all feed the same economy of gear loss, city markets, housing, sieges, and territory war."/><div className="four-grid">{professionCards.map((card)=><Card key={card.title} eyebrow={card.eyebrow} title={card.title} text={card.text}><TagList tags={card.tags}/></Card>)}</div><div className="four-grid after-banner">{craftingPillars.map((card)=><Card key={card.title} title={card.title} text={card.text} compact/>)}</div></div></section>
    <section id="nfts" className="section"><div className="container"><SectionHeading eyebrow="NFT OWNERSHIP" title="Founder cities and capital land plots." text="Makgura NFTs are similar to Ujura's ownership layer, but built for ancient-world real estate. The core structure is 3 Founder Capital City NFTs plus 600 home plot NFTs: Rome has 300 plots and a 100 SOL founder city NFT, Egypt has 200 plots and a 50 SOL founder city NFT, and Barbarians have 100 plots and a 25 SOL founder city NFT."/><div className="four-grid">{nftCards.map((card)=><Card key={card.title} title={card.title} text={card.text} compact/>)}</div><div className="three-grid after-banner">{nftCapitalCards.map((card)=><Card key={card.title} eyebrow={card.eyebrow} title={card.title} text={card.text}><TagList tags={card.tags}/></Card>)}</div><div className="four-grid after-banner">{landPlotCards.map((card)=><Card key={card.title} title={card.title} text={card.text} compact/>)}</div><div className="hero-ctas after-banner"><ShieldButton light onClick={goNfts}>Open NFT Page</ShieldButton></div></div></section>
    <section className="section"><div className="container"><SectionHeading eyebrow="DYNAMIC WORLD EVENTS" title="Gold veins create wars that move around the map." text="A high-value gold vein spawns in a dangerous contested region, gets announced, attracts players, triggers outpost building, creates extraction fights, then depletes and respawns elsewhere."/><div className="three-grid">{eventCards.map((card)=><Card key={card.title} {...card}/>)}</div></div></section>
    <section className="section"><div className="container"><DecreeBanner eyebrow="COLOSSEUM & MERCENARIES" title="Become a Gladiator in the Colosseum." text="Solo players can become Gladiators in ranked Colosseum PvP, fully level, craft, trade, bounty hunt, and temporarily join larger wars as mercenaries without needing to be permanently locked into a guild." cta={<ShieldButton light>Enter Colosseum</ShieldButton>}/><div className="two-card-grid after-banner">{soloGroupCards.map((card)=><Card key={card.title} title={card.title} text={card.text}/>)}</div></div></section>
    <section id="token" className="section"><div className="container"><SectionHeading eyebrow="MAKGURA COIN / MKG" title="A competitive reward token built to last decades." text="MKG is separate from in-game gold. It is earned through Gold Vein control and Top Gladiator performance, with predictable 22-minute reward intervals, 2-year halvings, and premium utility that never sells direct combat power."/><div className="four-grid">{tokenCards.map((card)=><Card key={card.title} title={card.title} text={card.text} compact/>)}</div><div className="two-card-grid after-banner">{tokenRewards.map((card)=><Card key={card.title} eyebrow={card.eyebrow} title={card.title} text={card.text}><TagList tags={card.tags}/></Card>)}</div><div className="map-stat-grid after-banner">{tokenDistribution.map(([value,label,detail])=><div key={label}><strong>{value}</strong><span>{label}<br />{detail}</span></div>)}</div><div className="three-grid after-banner">{tokenUtilityCards.map((card)=><Card key={card.title} title={card.title} text={card.text} compact/>)}</div></div></section>
    <section id="roadmap" className="section"><div className="container"><SectionHeading eyebrow="ROADMAP" title="Built around risk, recovery, and constant conflict." text="The roadmap prioritizes a real playable MMO foundation first, then expands into city sieges, economy systems, capital deeds, gold veins, outposts, Colosseum rewards, token emissions, and seasonal territory resets."/><div className="four-grid">{roadmap.map((item)=><Card key={item.eyebrow} {...item}/>)}</div></div></section>
    {control.blog?.enabled && <BlogSection blog={control.blog} onOpenPost={setActivePost} />}
    <section className="section"><div className="container"><DecreeBanner eyebrow={control.alpha?.eyebrow || "FINAL IDENTITY"} title={control.alpha?.title || "A persistent player-driven war MMO."} text={control.alpha?.body || "Players level, fight, lose gear, become Gladiators in Colosseum PvP, control territory, govern cities, compete over dynamic resources, and reshape a constantly shifting ancient world."} cta={<div className="final-ctas"><ShieldButton light onClick={() => setAuthOpen(true)}>{control.alpha?.primaryCtaLabel || "Play Alpha"}</ShieldButton><ShieldButton onClick={() => setAuthOpen(true)}>{accountLabel}</ShieldButton></div>}/></div></section></>}</main>
    <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuthenticated={auth.refresh} user={auth.user} signOut={auth.signOut} /><BlogModal post={activePost} onClose={() => setActivePost(null)} /><footer className="site-footer"><div className="container footer-inner"><div><div className="footer-brand">Makgura</div><div className="footer-subtitle">A grounded ancient war MMO by Majori Games.</div></div><div className="footer-links">{["Discord","Whitepaper","Founders Pass","Terms","Privacy"].map((item)=><a key={item} href="#">{item}</a>)}</div></div></footer>
  </div>;
}

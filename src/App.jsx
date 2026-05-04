
import React, { useState } from "react";
import AuthModal from "./auth/AuthModal";
import { useSharedAuth } from "./auth/sharedAuth";
import { useSiteControl } from "./useSiteControl";

const factionLogoPaths = {
  rome: "/rome_logo_transparent.png",
  barbarian: "/barbarian_logo_transparent.png",
  egypt: "/egypt_logo_transparent.png",
};

const navItems = ["Vision", "Factions", "World", "Economy", "Token", "Roadmap"].map((label) => ({
  label,
  href: `#${label.toLowerCase()}`,
}));

const heroFeatures = ["ROME-CENTERED MMO", "WOW CLASSIC 1–60", "DAYZ-STYLE RISK", "EVE-LIKE ECONOMY"];
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

const gameplayLoop = ["Level up from 1–60", "Acquire gear through loot, crafting, and trade", "Enter dangerous zones for better rewards", "Fight in PvP, PvE, sieges, raids, and world events", "Risk losing gear and resources on death", "Store valuables, rebuild, and return stronger"];
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
const eventCards = [
  { eyebrow: "WORLD EVENT", title: "Gold Vein Spawns", text: "A high-value resource vein appears in a dangerous contested zone, lasts 10–14 days, then depletes and respawns somewhere else on the map." },
  { eyebrow: "CONTROL", title: "Outposts & Extraction", text: "Players build mining infrastructure, defend it, upgrade it, hold the area during extraction, and fight through vulnerability windows." },
  { eyebrow: "REWARDS", title: "Shared But Competitive", text: "The majority goes to the controlling group, smaller shares go to contributors, and minor shares can go to nearby participants." },
];
const soloGroupCards = [
  { title: "Solo Players", text: "Solo players can level fully, compete in the Colosseum, craft, trade, bounty hunt, join small-scale PvP, and temporarily join wars as mercenaries." },
  { title: "Groups & Guilds", text: "Groups control territory, capture cities, dominate resources, run dungeons, fight raids, manage guild banks, and lead large-scale warfare." },
];
const tokenCards = [
  { title: "Gameplay Currency Stays Off-Chain", text: "Gold and normal economy activity stay in-game. The blockchain token is an endgame reward only, not a gameplay advantage." },
  { title: "No Pay-To-Win", text: "NFTs represent ownership or prestige systems, not combat power. Tokens should not let players buy strength." },
  { title: "8M Token Supply", text: "Total token supply is approximately 8,000,000, distributed across players, dev team, treasury, and public sale." },
  { title: "20-Minute Emissions", text: "Reward emissions occur around every 20 minutes with halvings approximately every 2 years." },
];
const roadmap = [
  { eyebrow: "PHASE 01", title: "World & Factions", text: "Rome, Barbarian Horde, and Egypt identity; faction regions; cities; law zones; class direction; and the core 1–60 leveling plan." },
  { eyebrow: "PHASE 02", title: "Combat & Progression", text: "Real-time MMO combat, PvE enemies, PvP rules, gear progression, death and loot logic, banks, housing, and early dungeon prototypes." },
  { eyebrow: "PHASE 03", title: "Territory & Economy", text: "City sieges, governors, taxes, faction control, guild banks, property, crafting fees, market activity, and seasonal territory reset." },
  { eyebrow: "PHASE 04", title: "World Events & Endgame", text: "Gold veins, outposts, Colosseum rewards, raids, bounty systems, token emissions, and live conflict loops that keep the world moving." },
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

export default function App() {
  const control = useSiteControl("makgura");
  const auth = useSharedAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const accountLabel = auth.user ? auth.user.email || "Account" : control.navigation?.walletLabel || "Connect Wallet";
  const visibleNavItems = control.blog?.enabled ? [...navItems, { label: "Blog", href: "#blog" }] : navItems;
  usePostSeo(activePost, "Makgura | Ancient War MMO", "Makgura is a grounded ancient war MMO by Majori Games.");

  function handleCta(cta) {
    if (cta?.action === "auth") {
      setAuthOpen(true);
      return;
    }
    const href = cta?.href || "#vision";
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.location.href = href;
  }

  return <div className="site-shell"><PremiumEffects /><div className="site-bg" /><div className="site-grid" />
    <header className="site-header"><div className="header-inner"><a className="brand" href="#top" aria-label="Makgura home"><div className="brand-mark">M</div><div><div className="brand-name">MAKGURA</div><div className="brand-subtitle">Ancient War MMO</div></div></a><nav className="desktop-nav" aria-label="Primary navigation">{visibleNavItems.map((item,index)=><React.Fragment key={item.label}>{index!==0&&<span>•</span>}<a href={item.href}>{item.label}</a></React.Fragment>)}</nav><div className="header-actions">{control.toggles?.alphaAccessEnabled && <HeaderCommandButton primary onClick={() => setAuthOpen(true)}>{control.navigation?.playAlphaLabel || "Play Alpha"}</HeaderCommandButton>}{control.toggles?.walletButtonsEnabled && <HeaderCommandButton onClick={() => setAuthOpen(true)}>{accountLabel}</HeaderCommandButton>}</div><div className="mobile-action"><HeaderCommandButton primary onClick={() => setAuthOpen(true)}>{accountLabel}</HeaderCommandButton></div></div><div className="header-line" /></header>
    {control.statusBanner?.enabled && control.statusBanner?.text && <div className="control-banner">{control.statusBanner.text}</div>}
    <main id="top"><section className="hero"><div className="container hero-inner"><div className="hero-copy"><div className="hero-pills"><StatusPill>{control.hero?.badge || "Grounded Ancient War MMO"}</StatusPill><StatusPill>{control.hero?.factionBadge || "Rome. Barbarians. Egypt."}</StatusPill></div><h1 className="makgura-logo">{control.hero?.title || "Makgura"}</h1><div className="makgura-subtitle">{control.hero?.subtitle || "Level. Fight. Conquer."}</div><p className="hero-text">{control.hero?.body || "A persistent, player-driven war MMO where players level from 1-60, fight for Rome, the Barbarian Horde, or Egypt, capture cities, control territory, and compete over dynamic world resources."}</p><div className="feature-grid">{heroFeatures.map((item)=><FeaturePill key={item}>{item}</FeaturePill>)}</div><div className="hero-ctas"><ShieldButton light onClick={() => handleCta(control.hero?.primaryCta)}>{control.hero?.primaryCta?.label || "Explore Makgura"}</ShieldButton><ShieldButton onClick={() => handleCta(control.hero?.secondaryCta)}>{control.hero?.secondaryCta?.label || "Read Whitepaper"}</ShieldButton></div></div><WarMapPanel /></div><div className="container stats-grid">{heroStats.map(([value,label])=><MetricCard key={label} value={value} label={label}/>)}</div></section>
    <section id="vision" className="section"><div className="container two-col"><div><SectionHeading eyebrow="CORE VISION" title="WoW Classic Progression. DayZ Risk. EVE-Style Control." text="Makgura combines long-form leveling, meaningful death, player-driven economy, shifting territory, capital city governance, sieges, world events, and constant faction conflict into one ancient war MMO."/><div className="vision-stack">{visionCards.map((card)=><Card key={card.title} {...card}/>)}</div></div><LoopPanel /></div></section>
    <section id="factions" className="section"><div className="container"><SectionHeading eyebrow="PLAYABLE FACTIONS" title="Rome. Barbarians. Egypt." text="The game is primarily centered around Rome, but its world war is shaped by three playable powers with different identities, strengths, economies, and battlefield styles."/><div className="faction-grid">{factions.map((faction)=><FactionCard key={faction.title} faction={faction}/>)}</div></div></section>
    <section id="world" className="section"><div className="container two-col world-grid"><SectionHeading eyebrow="WORLD & GOVERNANCE" title="Cities can be attacked, captured, and governed." text="Major cities are economic and social hubs. Attackers breach gates, capture districts, and flip city control. Capital City NFTs act as permanent tradable deeds, but income and policy control only activate when the owner’s faction controls the city."/><div className="stack">{worldSystems.map((system)=><Card key={system.title} eyebrow={system.eyebrow} title={system.title} text={system.text}><TagList tags={system.tags}/></Card>)}</div></div></section>
    <section className="section"><div className="container"><SectionHeading eyebrow="DEATH & LAW" title="Inventory is at risk. Storage is safe. Crime has consequences." text="Makgura is built around risk versus recovery. Death matters, but players can rebuild through banks, housing, guild storage, crafting, trade, and smart preparation."/><div className="four-grid">{deathCards.map((card)=><Card key={card.title} title={card.title} text={card.text} compact/>)}</div></div></section>
    <section id="economy" className="section"><div className="container two-col"><div><SectionHeading eyebrow="ECONOMY" title="Cities, taxes, banks, housing, and trade." text="The economy is driven by marketplace trades, crafting fees, repairs, property taxes, storage, guild logistics, player housing, and faction control over valuable cities."/><div className="governor-card"><div className="eyebrow">Governor System</div><div className="heading-line"/><p>Governors earn a small percentage of city economic activity, such as 1–2%, while tax limits stay controlled around 2%–8%. High taxes reduce player activity, and cooldowns prevent constant abuse.</p></div></div><div className="two-card-grid">{economyCards.map((card)=><Card key={card.title} title={card.title} text={card.text}/>)}</div></div></section>
    <section className="section"><div className="container"><SectionHeading eyebrow="DYNAMIC WORLD EVENTS" title="Gold veins create wars that move around the map." text="A high-value gold vein spawns in a dangerous contested region, gets announced, attracts players, triggers outpost building, creates extraction fights, then depletes and respawns elsewhere."/><div className="three-grid">{eventCards.map((card)=><Card key={card.title} {...card}/>)}</div></div></section>
    <section className="section"><div className="container"><DecreeBanner eyebrow="COLOSSEUM & MERCENARIES" title="Solo players still matter." text="Solo players can fully level, compete in ranked Colosseum arenas, craft, trade, bounty hunt, and temporarily join larger wars as mercenaries without needing to be permanently locked into a guild." cta={<ShieldButton light>Enter Colosseum</ShieldButton>}/><div className="two-card-grid after-banner">{soloGroupCards.map((card)=><Card key={card.title} title={card.title} text={card.text}/>)}</div></div></section>
    <section id="token" className="section"><div className="container"><SectionHeading eyebrow="TOKEN & OWNERSHIP" title="Blockchain rewards without pay-to-win." text="Makgura separates normal gameplay currency from blockchain rewards. Off-chain gold powers the game economy. The token exists as an endgame reward layer, while NFTs represent ownership or prestige rather than combat strength."/><div className="four-grid">{tokenCards.map((card)=><Card key={card.title} title={card.title} text={card.text} compact/>)}</div></div></section>
    <section id="roadmap" className="section"><div className="container"><SectionHeading eyebrow="ROADMAP" title="Built around risk, recovery, and constant conflict." text="The roadmap prioritizes a real playable MMO foundation first, then expands into city sieges, economy systems, capital deeds, gold veins, outposts, Colosseum rewards, token emissions, and seasonal territory resets."/><div className="four-grid">{roadmap.map((item)=><Card key={item.eyebrow} {...item}/>)}</div></div></section>
    {control.blog?.enabled && <BlogSection blog={control.blog} onOpenPost={setActivePost} />}
    <section className="section"><div className="container"><DecreeBanner eyebrow={control.alpha?.eyebrow || "FINAL IDENTITY"} title={control.alpha?.title || "A persistent player-driven war MMO."} text={control.alpha?.body || "Players level, fight, lose gear, control territory, govern cities, compete over dynamic resources, and reshape a constantly shifting ancient world."} cta={<div className="final-ctas"><ShieldButton light onClick={() => setAuthOpen(true)}>{control.alpha?.primaryCtaLabel || "Play Alpha"}</ShieldButton><ShieldButton onClick={() => setAuthOpen(true)}>{accountLabel}</ShieldButton></div>}/></div></section></main>
    <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuthenticated={auth.refresh} user={auth.user} signOut={auth.signOut} /><BlogModal post={activePost} onClose={() => setActivePost(null)} /><footer className="site-footer"><div className="container footer-inner"><div><div className="footer-brand">Makgura</div><div className="footer-subtitle">A grounded ancient war MMO by Majori Games.</div></div><div className="footer-links">{["Discord","Whitepaper","Founders Pass","Terms","Privacy"].map((item)=><a key={item} href="#">{item}</a>)}</div></div></footer>
  </div>;
}

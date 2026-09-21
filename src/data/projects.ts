export type Tone = 'wine' | 'ink' | 'rust' | 'plum' | 'charcoal'
export type Group = 'product' | 'graphic' | 'experiment' | 'archive'

/** Card-level fields. The full write-up for each project lives in `caseStudies.ts`, keyed by `slug`. */
export type Project = {
  slug: string
  group: Group
  title: string
  category: string
  description: string
  tone: Tone
  /** 3:2 cover used on cards and in the detail view. */
  thumb?: string
  /** The artwork itself, for posters. */
  image?: string
  /** One headline number, shown on the card and in the detail view. */
  metric?: { value: string; label: string }
}

const thumb = (name: string) => `/images/thumbs/${name}.webp`
const poster = (name: string) => `/images/graphic-design/${name}.webp`

export const projects: Project[] = [
  {
    slug: 'founderos',
    group: 'product',
    title: 'FounderOS: Business Automation Hub',
    category: 'AI / Shopify / Operations',
    description: 'AI-driven order reporting and operations workflow automation.',
    tone: 'wine',
    thumb: thumb('founderos'),
    metric: { value: '90%', label: 'less manual reporting' },
  },
  {
    slug: 'ai-feedback-analyst',
    group: 'product',
    title: 'AI Feedback Analyst System',
    category: 'AI & RAG / Vector Search',
    description: 'Semantic search and automated PRD generation system.',
    tone: 'ink',
    thumb: thumb('ai-feedback-analyst'),
    metric: { value: '10,000+', label: 'feedback records analysed' },
  },
  {
    slug: 'instamart-aov',
    group: 'product',
    title: 'Swiggy Instamart UX & AOV Case Study',
    category: 'UX Research / Product Strategy',
    description: 'Product strategy and user research proposing features to boost Average Order Value.',
    tone: 'rust',
    thumb: thumb('instamart-aov'),
    metric: { value: '10-15%', label: 'projected basket-size lift' },
  },
  {
    slug: 'medagent-ai',
    group: 'product',
    title: 'MedAgent AI: Healthcare Sales Framework',
    category: 'AI Agents / Healthcare B2B',
    description: 'POC-to-contract framework and objection-handling protocol de-risking enterprise contracts.',
    tone: 'ink',
    thumb: thumb('medagent-ai'),
    metric: { value: '₹12L/mo', label: 'enterprise contract de-risked' },
  },
  {
    slug: 'vantage-ai',
    group: 'product',
    title: 'Vantage AI: Manufacturing GTM Strategy',
    category: 'Go-To-Market / B2B SaaS',
    description: 'Proof-first GTM strategy and marketing funnel optimizing AI adoption for manufacturing ICPs.',
    tone: 'rust',
    thumb: thumb('vantage-ai'),
    metric: { value: '90 days', label: 'pilot validation cycle' },
  },
  {
    slug: 'greenscan',
    group: 'product',
    title: 'AI GreenScan: Eco-Classification App',
    category: 'AI Product / Computer Vision',
    description: 'First-place product strategy and AI recommendation engine classifying 20+ materials for sustainable disposal.',
    tone: 'plum',
    thumb: thumb('greenscan'),
    metric: { value: '1st', label: 'place among 8 teams' },
  },
  {
    slug: 'porter-driver-retention',
    group: 'product',
    title: 'Porter: Driver Retention Strategy',
    category: 'Marketplace Ops / Data Strategy',
    description: 'ML-driven demand positioning and retention strategy optimizing driver earnings on a 38K marketplace.',
    tone: 'charcoal',
    thumb: thumb('porter-driver-retention'),
    metric: { value: '42 → 60%', label: '90-day driver retention' },
  },
  {
    slug: 'nurture',
    group: 'product',
    title: 'Nurture: A Plant Care Companion',
    category: 'UI/UX Design / Mobile App',
    description: 'End-to-end UI/UX design of a plant care app: research, personas, IA and 25+ high-fidelity screens.',
    tone: 'ink',
    thumb: thumb('nurture'),
    metric: { value: '25+', label: 'high-fidelity screens' },
  },
  {
    slug: 'inhaus-coffee',
    group: 'product',
    title: 'INHAUS Coffee: Brand Launch & D2C Growth',
    category: 'Co-Founder / Growth Marketing',
    description: 'Co-founded and scaled a D2C coffee brand from 0 to 1.',
    tone: 'rust',
    thumb: thumb('inhaus-coffee'),
    metric: { value: '₹65k+', label: 'revenue, launched 0 → 1' },
  },
  {
    slug: 'zupper',
    group: 'product',
    title: 'Zupper: B2B Marketplace UI/UX Design',
    category: 'B2B SaaS / Mobile App',
    description: 'Onboarding, marketplace auctions, Store+ and BNPL financing screens.',
    tone: 'plum',
    thumb: thumb('zupper'),
    metric: { value: '45+', label: 'screens as first design hire' },
  },

  {
    slug: 'city-open',
    group: 'graphic',
    title: 'City Open - Tennis Event Poster',
    category: 'Canva / Typography',
    description: 'Sports event poster using clean layout, typography and motion tilt.',
    tone: 'plum',
    image: poster('city-open'),
  },
  {
    slug: 'retro-rides',
    group: 'graphic',
    title: 'Retro Rides - Classic Car Show',
    category: 'Retro / Grain',
    description: 'Vintage advertising poster inspired by 90s American retro aesthetics.',
    tone: 'charcoal',
    image: poster('retro-rides'),
  },
  {
    slug: 'soulstretch',
    group: 'graphic',
    title: 'SoulStretch: Yoga & Wellness',
    category: 'Figma / Branding',
    description: 'Instagram social posts promoting mindfulness through earthy visuals.',
    tone: 'wine',
    image: poster('soulstretch'),
  },
  {
    slug: 'velvoria',
    group: 'graphic',
    title: 'Velvoria Cupcake Delight Poster',
    category: 'Canva / Food Advertising',
    description: 'Premium food product advertising poster highlighting consumer indulgence.',
    tone: 'rust',
    image: poster('velvoria'),
  },

  {
    slug: 'zomato-aov',
    group: 'experiment',
    title: 'Zomato: Increasing AOV',
    category: 'Product Strategy / Growth',
    description: 'Product strategy and features designed to increase Average Order Value.',
    tone: 'charcoal',
    thumb: thumb('zomato-aov'),
  },
  {
    slug: 'zomato-text-reviews',
    group: 'experiment',
    title: 'Zomato: Increasing Text Reviews',
    category: 'Product PRD / Speech-to-Text',
    description: 'Speech-to-text review flows and NLU quality pipelines designed to boost user text reviews.',
    tone: 'wine',
    thumb: thumb('zomato-text-reviews'),
    metric: { value: '$0.836M', label: 'projected annual GOV lift' },
  },
  {
    slug: 'mesa-hackathon',
    group: 'experiment',
    title: 'MESA Hackathon: AI Wedding Planner',
    category: 'AI Matching / Product Design',
    description: 'Intelligent venue-matching platform and recommendation engine designed and shipped in 24 hours.',
    tone: 'wine',
    thumb: thumb('mesa-hackathon'),
    metric: { value: '24h', label: 'from idea to shipped' },
  },

  {
    slug: 'financial-market-dynamics',
    group: 'archive',
    title: 'Understanding Financial Market Dynamics',
    category: 'Linear Algebra / Python',
    description: 'A comprehensive capstone project analyzing how market shocks affect major Indian financial institutions.',
    tone: 'plum',
    thumb: thumb('financial-market-dynamics'),
    metric: { value: '4×4', label: 'interbank exposure matrix' },
  },
  {
    slug: 'simple-threads',
    group: 'archive',
    title: 'Simple Threads Business & Campaign Analysis',
    category: 'Data Analytics / Excel',
    description: 'Excel analytics report and campaign ROI audits for retail fashion collections.',
    tone: 'charcoal',
    thumb: thumb('simple-threads'),
  },
  {
    slug: 'gold-price-prediction',
    group: 'archive',
    title: 'Gold Price Prediction Model',
    category: 'Python / Machine Learning',
    description: 'Linear Regression machine learning forecasting model in Python with 99.97% accuracy.',
    tone: 'wine',
    thumb: thumb('gold-price-prediction'),
  },
  {
    slug: 'titanic-survival',
    group: 'archive',
    title: 'Titanic Survival Prediction Model',
    category: 'Python / Classification',
    description: 'Logistic Regression classification model predicting passenger survival probabilities.',
    tone: 'ink',
    thumb: thumb('titanic-survival'),
  },
  {
    slug: 'streamverse-etl',
    group: 'archive',
    title: 'Streamverse ETL Watch History Pipeline',
    category: 'Data Engineering / ETL',
    description: 'Python data engineering pipeline for ingesting and normalizing watch logs.',
    tone: 'rust',
    thumb: thumb('streamverse-etl'),
  },
]

export const groupLabels: Record<Group, string> = {
  product: 'Case study',
  graphic: 'Graphic design',
  experiment: 'Experiment',
  archive: 'Data & ML',
}

export const projectsByGroup: Record<Group, Project[]> = {
  product: projects.filter((p) => p.group === 'product'),
  graphic: projects.filter((p) => p.group === 'graphic'),
  experiment: projects.filter((p) => p.group === 'experiment'),
  archive: projects.filter((p) => p.group === 'archive'),
}

/** Order used by prev/next in the detail dialog. */
export const orderedProjects: Project[] = [
  ...projectsByGroup.product,
  ...projectsByGroup.graphic,
  ...projectsByGroup.experiment,
  ...projectsByGroup.archive,
]

export const projectBySlug = new Map(projects.map((p) => [p.slug, p]))

const pad = (n: number) => String(n).padStart(2, '0')

/** Position inside its own section ("01"), so numbering never has gaps. */
export const projectNumber = (project: Project) => pad(projectsByGroup[project.group].indexOf(project) + 1)
export const groupCount = (group: Group) => pad(projectsByGroup[group].length)

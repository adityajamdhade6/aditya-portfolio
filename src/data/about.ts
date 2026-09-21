// Carried over from the previous portfolio.
export type Experience = { period: string; role: string; company: string; tag: string; bullets: string[] }
export type SkillGroup = { title: string; items: string[] }
export type Achievement = { title: string; desc: string }

export const experience: Experience[] = [
  {
    "period": "Jun 2026 - Present",
    "role": "Co-Founder",
    "company": "INHAUS Coffee",
    "tag": "Product & Growth",
    "bullets": [
      "Spearheaded launch of a D2C coffee concentrate brand from 0 to 1, generating ₹65,000+ in revenue via online and offline channels.",
      "Built outbound GTM strategy reaching 1,500+ prospects across four channels, converting 32% of trials into recurring customers.",
      "Automated lifecycle email campaigns for 5,000+ leads, generating ₹9,500+ in attributed revenue through targeted outreach."
    ]
  },
  {
    "period": "Jun 2025 - Aug 2025",
    "role": "Growth Marketing Intern",
    "company": "Inventive AI (YC S23)",
    "tag": "Product Strategy",
    "bullets": [
      "Conducted competitive analysis across 12 platforms, benchmarking pricing, features, and positioning to refine product strategy.",
      "Synthesized insights from 800+ G2 and Capterra reviews to identify feature gaps, user pain points, and competitive differentiators.",
      "Diagnosed a 40% CAC inefficiency, designing 3 persona-specific lifecycle campaigns that improved conversion rates by 15%."
    ]
  },
  {
    "period": "May 2025 - Jun 2025",
    "role": "Business Development Intern",
    "company": "Younity.in",
    "tag": "Dev Intern",
    "bullets": [
      "Converted 35+ enrollments through 120+ sales pitches, generating ₹10,725 in direct program revenue across multiple cohorts.",
      "Reduced lead drop-offs by 22% through personalized follow-ups and objection handling, accelerating enrollment conversions."
    ]
  },
  {
    "period": "Sep 2024 - Nov 2024",
    "role": "UI/UX Designer Intern",
    "company": "Zupper",
    "tag": "Product",
    "bullets": [
      "Designed 45+ screens across onboarding, marketplace, auctions, and BNPL financing, delivering production-ready designs.",
      "Designed role-based onboarding, streamlining customer journeys and reducing onboarding steps by 30% through personalization."
    ]
  }
]

export const skills: SkillGroup[] = [
  {
    "title": "Data & Analytics",
    "items": [
      "Python",
      "SQL",
      "Pandas",
      "Excel",
      "Power BI",
      "Mixpanel",
      "Google Analytics (GA4)"
    ]
  },
  {
    "title": "Automation & Dev",
    "items": [
      "GitHub",
      "Postman",
      "Claude Code",
      "Cursor",
      "n8n",
      "Zapier",
      "Shopify",
      "Webflow"
    ]
  },
  {
    "title": "Design & Marketing",
    "items": [
      "Figma",
      "Canva",
      "Jira",
      "Notion",
      "Google Ads",
      "Meta Ads",
      "SEMrush"
    ]
  }
]

export const achievements: Achievement[] = [
  {
    "title": "IIT Bombay Finalist",
    "desc": "Top 3 Finalist Position among 250+ participants in Bid-n-Build & Ace the Case, E-Summit'25."
  },
  {
    "title": "Competitive Chess",
    "desc": "Represented Kendriya Vidyalaya Dhule in competitive chess for 4+ years across interschool and national tournaments in 8 states."
  }
]

export const CONFIG = {
  title: "The Talent Operator",
  description:
    "Practical insights on talent acquisition, AI-powered recruiting, and HR technology — written by a seasoned talent operator, David Brown.",
  baseURL: "https://talentoperatoros.io",
  darkBackground: "#1a1a1a",
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "", // Add your GA4 measurement ID
  resume: {
    link: "/resume.pdf",
    show: true,
  },
};

export const { title, description, baseURL, darkBackground, resume } = CONFIG;

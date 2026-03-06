export const CONFIG = {
  title: "The Talent Operator",
  description: "The Talent Operator",
  baseURL: "https://lotse.vercel.app", // replace with your domain
  darkBackground: "#1a1a1a",
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "", // Add your GA4 measurement ID
  resume: {
    link: "/resume.pdf",
    show: true,
  },
};

export const { title, description, baseURL, darkBackground, resume } = CONFIG;

export type Side = "left" | "right" | "center";

export type BridgeKind = "brick" | "footbridge" | "smoot" | "longfellow";

export type StopId = "schedule" | "location" | "faq" | "sponsors" | "signup";

export type StopMeta = {
  id: StopId;
  side: Side;
  landmark: string;
  bridge?: BridgeKind;
  title: string;
  navLabel?: string;
  accent: string;
};

export type ScheduleItem = { time: string; title: string; note?: string };

export type ScheduleDay = { label: string; items: ScheduleItem[] };

export type FaqItem = { question: string; answer: string; link?: { href: string; label: string } };

export type Sponsor = { name: string; url: string; logo: string };

export const event = {
  name: "RindgeHacks",
  tagline: "A day of building weird, wonderful things with other high schoolers, right by the Charles.",
  date: "Date TBA",
  city: "Cambridge, MA",
  signupUrl: "#signup",
  contactEmail: "hello@example.com",
  riverLengthSmoots: 3500,
};

export const riverPhoto: string | undefined = undefined;

export const venue = {
  name: "Cambridge Rindge and Latin School",
  address: ["459 Broadway", "Cambridge, MA 02138"],
  transit: "About a 10 minute walk from Harvard Square on the Red Line.",
  mapUrl: "https://www.openstreetmap.org/search?query=459%20Broadway%2C%20Cambridge%2C%20MA",
};

export const stops: StopMeta[] = [
  { id: "schedule", side: "left", landmark: "Anderson Memorial Bridge", bridge: "brick", title: "The schedule", navLabel: "Schedule", accent: "var(--red)" },
  { id: "location", side: "right", landmark: "Weeks Footbridge", bridge: "footbridge", title: "Where we're docking", navLabel: "Location", accent: "var(--blue)" },
  { id: "faq", side: "left", landmark: "Harvard Bridge", bridge: "smoot", title: "Questions? Answers.", navLabel: "FAQ", accent: "var(--orange)" },
  { id: "sponsors", side: "right", landmark: "Longfellow Bridge", bridge: "longfellow", title: "Our sponsors", navLabel: "Sponsors", accent: "var(--green)" },
  { id: "signup", side: "center", landmark: "Boston Harbor", title: "Come hack with us", accent: "var(--red)" },
];

export const schedule: ScheduleDay[] = [
  {
    label: "Saturday",
    items: [
      { time: "8:30 AM", title: "Doors open", note: "Check in, grab breakfast and a name tag" },
      { time: "9:30 AM", title: "Opening ceremony" },
      { time: "10:00 AM", title: "Hacking starts", note: "Find a team or fly solo" },
      { time: "11:00 AM", title: "Beginner workshop", note: "Never coded? Start here" },
      { time: "12:30 PM", title: "Lunch" },
      { time: "3:00 PM", title: "Snacks + mini events" },
      { time: "6:00 PM", title: "Dinner" },
      { time: "7:30 PM", title: "Demos", note: "Show off what you made" },
      { time: "8:30 PM", title: "Awards + closing" },
    ],
  },
];

export const faqs: FaqItem[] = [
  {
    question: "Who can come?",
    answer: "Any high schooler, 18 or under. You don't have to go to Rindge: come from anywhere.",
  },
  {
    question: "How much does it cost?",
    answer: "Nothing. Food, swag, and a full day of hacking are free, thanks to our sponsors and Hack Club.",
  },
  {
    question: "I've never coded before. Can I still come?",
    answer: "Yes! We'll run beginner workshops and have mentors around all day. Plenty of people build their very first project at a hackathon.",
  },
  {
    question: "What should I bring?",
    answer: "A laptop, a charger, a water bottle, and anything that keeps you comfy. We've got the food covered.",
  },
  {
    question: "What can I make?",
    answer: "Anything you want: games, apps, websites, hardware, art, music. Work alone or in a team of up to four.",
  },
  {
    question: "My parents have questions.",
    answer: "We love that. Have them email us and we'll walk them through safety, supervision, and the schedule.",
    link: { href: `mailto:${event.contactEmail}`, label: event.contactEmail },
  },
  {
    question: "What's Hack Club?",
    answer: "A nonprofit network of high school coders and makers around the world. RindgeHacks is run by students, with support from Hack Club.",
    link: { href: "https://hackclub.com/", label: "hackclub.com" },
  },
  {
    question: "Is there a code of conduct?",
    answer: "Yes. Everyone at RindgeHacks, from hackers to organizers, follows the Hack Club Code of Conduct.",
    link: { href: "https://hackclub.com/conduct/", label: "Read the code of conduct" },
  },
];

export const sponsors: Sponsor[] = [
  { name: "Hack Club", url: "https://hackclub.com/", logo: "https://assets.hackclub.com/icon-rounded.svg" },
];

export const openSponsorSlots = 3;

export const footerLinks = [
  { label: "Hack Club", href: "https://hackclub.com/" },
  { label: "Slack", href: "https://hackclub.com/slack/" },
  { label: "Clubs", href: "https://hackclub.com/clubs/" },
  { label: "Hackathons", href: "https://hackathons.hackclub.com/" },
  { label: "Code of Conduct", href: "https://hackclub.com/conduct/" },
];

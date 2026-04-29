export type Category = {
  slug: string;
  name: string;
  blurb: string;
};

export type Hog = {
  username: string;
  displayName: string;
  tagline: string;
  bio: string;
  categories: string[];
  pricePerMonth: number;
  followers: string;
  posts: number;
  likes: string;
  location: string;
  imageSrc?: string;
  coverImageSrc?: string;
};

export const categories: Category[] = [
  {
    slug: "paw-pics",
    name: "Paw Pics",
    blurb: "Four tiny toe beans, freshly dusted with garden soil.",
  },
  {
    slug: "extra-spikey",
    name: "Extra Spikey",
    blurb: "Quills up, attitude on. For the bold snufflers only.",
  },
  {
    slug: "curled-up",
    name: "Curled Up",
    blurb: "Maximum loaf. Minimum effort. Peak cosy.",
  },
  {
    slug: "foraging-content",
    name: "Foraging Content",
    blurb: "Slug raids, beetle bothering, late-night hedge patrols.",
  },
  {
    slug: "midnight-snuffles",
    name: "Midnight Snuffles",
    blurb: "ASMR grade. Headphones strongly recommended.",
  },
  {
    slug: "mud-baths",
    name: "Mud Baths",
    blurb: "Wet, muddy, a bit feral. You have been warned.",
  },
  {
    slug: "wheel-work",
    name: "Wheel Work",
    blurb: "3am cardio kings and queens doing laps for the fans.",
  },
  {
    slug: "sleepy-hogs",
    name: "Sleepy Hogs",
    blurb: "Hibernation szn. Subscribe for very little content.",
  },
];

export const hogs: Hog[] = [
  {
    username: "spikeysteve",
    displayName: "Spikey Steve",
    tagline: "Your favourite prickly boy",
    bio: "Professional hedge lurker. Garden regular. Will snuffle for mealworms. DMs open for serious snackers only.",
    categories: ["extra-spikey", "foraging-content"],
    pricePerMonth: 4.99,
    followers: "12.4k",
    posts: 186,
    likes: "84.2k",
    location: "Suburban Hedge, UK",
    imageSrc: "/art/hedgehog3.png",
  },
  {
    username: "mrs-bristles",
    displayName: "Mrs Bristles",
    tagline: "Glamorous and gently prickly",
    bio: "I spent the 90s on a compost heap and I have stories. Weekly mud bath content, nightly snuffle ASMR.",
    categories: ["mud-baths", "midnight-snuffles"],
    pricePerMonth: 6.5,
    followers: "28.1k",
    posts: 412,
    likes: "201.0k",
    location: "Back Garden, Bath",
    imageSrc: "/art/hedgehog2.png",
  },
  {
    username: "pawsitivelyprickly",
    displayName: "Paws-itively Prickly",
    tagline: "Toe beans. Every Tuesday.",
    bio: "Toe bean model. Former wheel athlete. Currently accepting fan art, dried mealworms, and polite compliments.",
    categories: ["paw-pics", "curled-up"],
    pricePerMonth: 3.99,
    followers: "9.8k",
    posts: 97,
    likes: "47.6k",
    location: "A Shoebox, Bristol",
    imageSrc: "/art/hedgehog1.png",
  },
  {
    username: "sir-snufflesworth",
    displayName: "Sir Snufflesworth III",
    tagline: "A gentlehog of leisure",
    bio: "Aristocratic loafer. Connoisseur of dry leaves. Retired from foraging, now exclusively horizontal.",
    categories: ["sleepy-hogs", "curled-up"],
    pricePerMonth: 2.5,
    followers: "41.0k",
    posts: 63,
    likes: "120.5k",
    location: "The Estate, Cotswolds",
    imageSrc: "/art/hedgehog1.png",
  },
  {
    username: "wheel-queen-winnie",
    displayName: "Wheel Queen Winnie",
    tagline: "3am cardio icon",
    bio: "I run so you don't have to. Nightly wheel streams, personal best charts, training diaries.",
    categories: ["wheel-work", "extra-spikey"],
    pricePerMonth: 7.99,
    followers: "54.3k",
    posts: 301,
    likes: "312.4k",
    location: "The Wheel, Manchester",
    imageSrc: "/art/hedgehog3.png",
  },
  {
    username: "muddy-morty",
    displayName: "Muddy Morty",
    tagline: "Feral but friendly",
    bio: "If it's wet and it's brown, I'm in it. Mud bath Mondays. Slug raid Fridays. No refunds.",
    categories: ["mud-baths", "foraging-content"],
    pricePerMonth: 5.0,
    followers: "17.6k",
    posts: 248,
    likes: "92.1k",
    location: "The Allotment, Leeds",
    imageSrc: "/art/hedgehog2.png",
  },
  {
    username: "quillian-quickfoot",
    displayName: "Quillian Quickfoot",
    tagline: "Spikes up, toes down",
    bio: "Competitive forager. Three-time Best In Hedge. Occasionally found inside watering cans.",
    categories: ["foraging-content", "paw-pics"],
    pricePerMonth: 4.5,
    followers: "21.9k",
    posts: 174,
    likes: "110.7k",
    location: "Community Garden, Oxford",
    imageSrc: "/art/hedgehog3.png",
  },
  {
    username: "loafy-lucinda",
    displayName: "Loafy Lucinda",
    tagline: "Professionally curled up",
    bio: "World-class loaf. Minimal movement. Maximum vibes. Subscribe for a mostly still photo every Sunday.",
    categories: ["curled-up", "sleepy-hogs"],
    pricePerMonth: 1.99,
    followers: "8.2k",
    posts: 34,
    likes: "29.3k",
    location: "Under the Sofa, Glasgow",
    imageSrc: "/art/hedgehog1.png",
  },
];

export function getHog(username: string): Hog | undefined {
  return hogs.find((h) => h.username === username);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function hogsByCategory(slug: string): Hog[] {
  return hogs.filter((h) => h.categories.includes(slug));
}

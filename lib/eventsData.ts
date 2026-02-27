
import { Flag, Music, Code, Gamepad, Award, Shield, Mic, Camera, Video, Palette, Zap, Cpu, Users, DollarSign, Briefcase, Aperture, Terminal, Shirt, BookOpen, Radio } from 'lucide-react'
import React from 'react'

export interface EventData {
  id: number;
  title: string;
  description: string;
  category: "UG" | "PG";
  image: string;
  // icon: React.ReactNode; 
  color: string;
  border: string;
  rules?: string[];
  registerLink?: string;
}

// Helper to create events since we can't store React components in JSON easily if we were fetching, 
// but since this is TS file, we can structure it differently or just keep the data part separate.
// Ideally, the icons should be mapped in the component, but I'll leave them here for now if I can, 
// OR simpler: I'll export the data without the icon component instance, and handle icons in the UI.
// But to minimize refactoring, I'll keep it simple.
// Actually, I can't easily seralize React Nodes if I wanted to. 
// But this is just a .ts file, so it's fine.

export const events: any[] = [
  // Cultural / Fine Arts
  {
    id: 1,
    title: "Razzle",
    description: "Dance events. Rhythm in every step.",
    category: "UG",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=2574&auto=format&fit=crop",
    iconName: "Users",
    color: "from-pink-500/20 to-rose-500/5",
    border: "group-hover:border-pink-500/50",
    rules: [
      "Time limit: 4-5 minutes",
      "Team size: 6-12 members",
      "Props allowed with prior permission",
      "Decent costume is mandatory"
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  },
  {
    id: 2,
    title: "Chords",
    description: "Musical events. Melodies that touch the soul.",
    category: "UG",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2670&auto=format&fit=crop",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules: [
      "Time limit: 4-5 minutes",
      "Team size: 6-12 members",
      "Props allowed with prior permission",
      "Decent costume is mandatory"
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  },
  {
    id: 3,
    title: "Captcha & Pixel",
    description: "Photography & Videography events.",
    category: "UG",
    image: "https://images.unsplash.com/photo-1552168324-d612d77725e3?q=80&w=2564&auto=format&fit=crop",
    iconName: "Camera",
    color: "from-cyan-500/20 to-blue-500/5",
    border: "group-hover:border-cyan-500/50",
      rules: [
      "Time limit: 4-5 minutes",
      "Team size: 6-12 members",
      "Props allowed with prior permission",
      "Decent costume is mandatory"
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  },
  {
    id: 4,
    title: "Mask",
    description: "Theatre events. The stage is yours.",
    category: "UG",
    image: "https://images.unsplash.com/photo-1507676184212-d0370baf27db?q=80&w=2669&auto=format&fit=crop",
    iconName: "Users",
    color: "from-orange-500/20 to-red-500/5",
    border: "group-hover:border-orange-500/50",
      rules: [
      "Time limit: 4-5 minutes",
      "Team size: 6-12 members",
      "Props allowed with prior permission",
      "Decent costume is mandatory"
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  },
  {
    id: 5,
    title: "Palette",
    description: "Art events. Colors of imagination.",
    category: "UG",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2680&auto=format&fit=crop",
    iconName: "Palette",
    color: "from-fuchsia-500/20 to-pink-500/5",
    border: "group-hover:border-fuchsia-500/50",
      rules: [
      "Time limit: 4-5 minutes",
      "Team size: 6-12 members",
      "Props allowed with prior permission",
      "Decent costume is mandatory"
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  },
  {
    id: 6,
    title: "Speakers & Literary",
    description: "The power of words and ideas.",
    category: "PG",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2573&auto=format&fit=crop",
    iconName: "BookOpen",
    color: "from-yellow-500/20 to-amber-500/5",
    border: "group-hover:border-yellow-500/50",
      rules: [
      "Time limit: 4-5 minutes",
      "Team size: 6-12 members",
      "Props allowed with prior permission",
      "Decent costume is mandatory"
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  },
  {
    id: 7,
    title: "Mock Press",
    description: "Handle the heat of the press.",
    category: "PG",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2670&auto=format&fit=crop",
    iconName: "Mic",
    color: "from-rose-500/20 to-red-500/5",
    border: "group-hover:border-rose-500/50",
      rules: [
      "Time limit: 4-5 minutes",
      "Team size: 6-12 members",
      "Props allowed with prior permission",
      "Decent costume is mandatory"
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  },
  
  // Technical
  {
    id: 8,
    title: "CTF",
    description: "Capture the Flag. Cybersecurity challenge.",
    category: "UG",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
    iconName: "Shield",
    color: "from-green-500/20 to-emerald-500/5",
    border: "group-hover:border-green-500/50",
      rules: [
      "Time limit: 4-5 minutes",
      "Team size: 6-12 members",
      "Props allowed with prior permission",
      "Decent costume is mandatory"
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  },
  {
    id: 9,
    title: "Mind2Circuit",
    description: "Circuit design competition.",
    category: "UG",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
    iconName: "Cpu",
    color: "from-blue-500/20 to-indigo-500/5",
    border: "group-hover:border-blue-500/50",
      rules: [
      "Time limit: 4-5 minutes",
      "Team size: 6-12 members",
      "Props allowed with prior permission",
      "Decent costume is mandatory"
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  },
  {
    id: 10,
    title: "Drone Edge",
    description: "Aerial robotics at its best.",
    category: "UG",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2670&auto=format&fit=crop",
    iconName: "Aperture",
    color: "from-teal-500/20 to-cyan-500/5",
    border: "group-hover:border-teal-500/50",
      rules: [
      "Time limit: 4-5 minutes",
      "Team size: 6-12 members",
      "Props allowed with prior permission",
      "Decent costume is mandatory"
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  },
  {
    id: 11,
    title: "Yudhastra",
    description: "The ultimate technical battle.",
    category: "UG",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2671&auto=format&fit=crop",
    iconName: "Gamepad",
    color: "from-red-500/20 to-orange-500/5",
    border: "group-hover:border-red-500/50",
      rules: [
      "Time limit: 4-5 minutes",
      "Team size: 6-12 members",
      "Props allowed with prior permission",
      "Decent costume is mandatory"
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  },
  {
    id: 12,
    title: "Vision X",
    description: "Future vision technology.",
    category: "PG",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
    iconName: "Video",
    color: "from-indigo-500/20 to-violet-500/5",
    border: "group-hover:border-indigo-500/50",
      rules: [
      "Time limit: 4-5 minutes",
      "Team size: 6-12 members",
      "Props allowed with prior permission",
      "Decent costume is mandatory"
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  },
  {
    id: 13,
    title: "Gen AI Prompt Battle",
    description: "Mastering the art of prompts.",
    category: "PG",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2670&auto=format&fit=crop",
    iconName: "Cpu",
    color: "from-purple-500/20 to-fuchsia-500/5",
    border: "group-hover:border-purple-500/50",
      rules: [
      "Time limit: 4-5 minutes",
      "Team size: 6-12 members",
      "Props allowed with prior permission",
      "Decent costume is mandatory"
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  },
  {
    id: 14,
    title: "Robo Soccer",
    description: "Bots battling on the field.",
    category: "PG",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670&auto=format&fit=crop",
    iconName: "Zap",
    color: "from-blue-500/20 to-cyan-500/5",
    border: "group-hover:border-blue-500/50",
      rules: [
      "Time limit: 4-5 minutes",
      "Team size: 6-12 members",
      "Props allowed with prior permission",
      "Decent costume is mandatory"
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  },

  // MBA / Management
  {
    id: 15,
    title: "Tidal-Clash",
    description: "Finance Event. Master the market.",
    category: "PG",
    image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2670&auto=format&fit=crop",
    iconName: "DollarSign",
    color: "from-emerald-500/20 to-green-500/5",
    border: "group-hover:border-emerald-500/50",
      rules: [
      "Time limit: 4-5 minutes",
      "Team size: 6-12 members",
      "Props allowed with prior permission",
      "Decent costume is mandatory"
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  },
  {
    id: 16,
    title: "The Titans",
    description: "Best Management Team.",
    category: "PG",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop",
    iconName: "Briefcase",
    color: "from-slate-500/20 to-gray-500/5",
    border: "group-hover:border-slate-500/50",
      rules: [
      "Time limit: 4-5 minutes",
      "Team size: 6-12 members",
      "Props allowed with prior permission",
      "Decent costume is mandatory"
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  },
  {
    id: 17,
    title: "Aqua Imperium",
    description: "Marketing Event. Dominate the brand.",
    category: "PG",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop",
    iconName: "Radio",
    color: "from-orange-500/20 to-amber-500/5",
    border: "group-hover:border-orange-500/50",
      rules: [
      "Time limit: 4-5 minutes",
      "Team size: 6-12 members",
      "Props allowed with prior permission",
      "Decent costume is mandatory"
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  },
  {
    id: 18,
    title: "Tide of Talents",
    description: "HR Event. Managing human capital.",
    category: "PG",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2668&auto=format&fit=crop",
    iconName: "Users",
    color: "from-indigo-500/20 to-blue-500/5",
    border: "group-hover:border-indigo-500/50",
      rules: [
      "Time limit: 4-5 minutes",
      "Team size: 6-12 members",
      "Props allowed with prior permission",
      "Decent costume is mandatory"
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  },

  // MCA
  {
    id: 19,
    title: "IT Manager",
    description: "IT Manager Challenge.",
    category: "PG",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop",
    iconName: "Terminal",
    color: "from-gray-500/20 to-zinc-500/5",
    border: "group-hover:border-gray-500/50",
      rules: [
      "Time limit: 4-5 minutes",
      "Team size: 6-12 members",
      "Props allowed with prior permission",
      "Decent costume is mandatory"
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  },
  {
    id: 20,
    title: "Code Red",
    description: "Coding crisis challenge.",
    category: "PG",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
    iconName: "Code",
    color: "from-red-600/20 to-red-500/5",
    border: "group-hover:border-red-500/50",
      rules: [
      "Time limit: 4-5 minutes",
      "Team size: 6-12 members",
      "Props allowed with prior permission",
      "Decent costume is mandatory"
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  },
  {
    id: 21,
    title: "Next Node",
    description: "Connecting the future.",
    category: "PG",
    image: "https://images.unsplash.com/photo-1558494949-ef2a0de493f0?q=80&w=2574&auto=format&fit=crop",
    iconName: "Cpu",
    color: "from-emerald-500/20 to-green-500/5",
    border: "group-hover:border-emerald-500/50",
      rules: [
      "Time limit: 4-5 minutes",
      "Team size: 6-12 members",
      "Props allowed with prior permission",
      "Decent costume is mandatory"
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  },

  // Mega Events
  {
    id: 22,
    title: "Battle of Bands",
    description: "The grand musical battle.",
    category: "UG",
    image: "https://images.unsplash.com/photo-1493225255756-d5829cd91f56?q=80&w=2668&auto=format&fit=crop",
    iconName: "Music",
    color: "from-yellow-500/20 to-orange-500/5",
    border: "group-hover:border-yellow-500/50",
      rules: [
      "Time limit: 4-5 minutes",
      "Team size: 6-12 members",
      "Props allowed with prior permission",
      "Decent costume is mandatory"
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  },
  {
    id: 23,
    title: "Fashion Walk",
    description: "Runway brilliance.",
    category: "UG",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2576&auto=format&fit=crop",
    iconName: "Shirt",
    color: "from-pink-500/20 to-rose-500/5",
    border: "group-hover:border-pink-500/50",
      rules: [
      "Time limit: 4-5 minutes",
      "Team size: 6-12 members",
      "Props allowed with prior permission",
      "Decent costume is mandatory"
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  },
  {
    id: 24,
    title: "Award Nite",
    description: "Celebrating excellence.",
    category: "UG",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2670&auto=format&fit=crop",
    iconName: "Award",
    color: "from-yellow-500/20 to-amber-500/5",
    border: "group-hover:border-yellow-500/50",
      rules: [
      "Time limit: 4-5 minutes",
      "Team size: 6-12 members",
      "Props allowed with prior permission",
      "Decent costume is mandatory"
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  }
]

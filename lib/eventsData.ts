
import { Flag, Music, Code, Gamepad, Award, Shield, Mic, Camera, Video, Palette, Zap, Cpu, Users, DollarSign, Briefcase, Aperture, Terminal, Shirt, BookOpen, Radio } from 'lucide-react'
import React from 'react'

export interface EventData {
  id: number;
  title: string;
  description: string;
  category: "General" | "UG" | "PG";
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
    title: "RHYTHMIC REVERENCE",
    description: "Western Group Dance",
    category: "UG",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=2574&auto=format&fit=crop",
    iconName: "Users",
    color: "from-pink-500/20 to-rose-500/5",
    border: "group-hover:border-pink-500/50",
    rules: `One team per college.
Each group must have minimum of 5 and maximum of 12 participants.
Duration: 4+1 minutes.
Styles allowed: Pure western dance forms such as hip-hop, jazz, locking and open style.`,
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
  },
  {
    id: 2,
    title: "Rhythm Rumble",
    description: "Dance Battle",
    category: "UG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules: `2 entries per college.
Dancer will be challenged impromptu on varied beats of a live dj.
The music genre will change for each pair of dancers and can range from any genre.
Judges will choose 1 dancer from each battle to advance to the next round.
The final battle will have 2 dancers competing.`,
    registerLink: ""
  },
  {
    id: 3,
    title: "TALES OF TAAL",
    description: "Eastern Group Dance",
    category: "UG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules: `One team per college.
Each group must have minimum of 5 and maximum of 12 participants.
Duration: 4+1 minutes.
Styles allowed: Semi-classical, fusion, contemporary, folk.`,
    registerLink: ""
  },{
    id: 4,
    title: "NADA SAGARA",
    description: "Eastern Group Singing",
    category: "UG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules: `One entry per collage.
Time limit: 4+1 mins.
Performance Style: Semi classical, Light Music genres such as Bhavageetha, Folk song, Devotional song, Ghazals.
Participants should bring their own musical instrument.`,
    registerLink: ""
  },{
    id: 5,
    title: "POSEIDON’S PLAYBACK DUETS",
    description: "Filmy Duet singing",
    category: "UG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules: `Two participants make a team.
One entry per college.
Duration: 4+1 mins.
Participants are allowed to use any kind of musical instrument or karaoke for the performance.`,
    registerLink: ""
  },{
    id: 6,
    title: "DRISHYAM",
    description: "Reel Making Contest",
    category: "UG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules: `Participation is limited to two members per team.
The reel must have a maximum duration of 60 seconds.
Only original content created by the participants will be accepted; copied or plagiarized content is not allowed.
The final video must be submitted within the given time frame as instructed by the organizers.`,
    registerLink: ""
  },{
    id: 7,
    title: "LENSCRAFT",
    description: "Photography Contest",
    category: "UG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules: `Participation is individual only.
All photographs must be taken within the campus premises.
Images must be captured using a digital camera only.
Editing or any form of image manipulation is not permitted.`,
    registerLink: ""
  }
  ,{
    id: 8,
    title: "RANGA VIMARSHA",
    description: "Street Play Competition",
    category: "UG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Team Size: 6–10 members
Selection Process:
Submit a 5-minute video for screening.
Top 5 teams will be shortlisted.
Final registration for shortlisted teams only.
Performance Details.
Outdoor event:
Time Limit: 8 + 2 minutes (incl. entry, exit & setup).
Rules:
Languages: English, Kannada, Hindi.
Topic announced via official social media.
Banners, posters and percussion instruments allowed.
No microphones, speakers, recorded audio, or electronic aids.
Content must be original, non-offensive and

`,
    registerLink: ""
  }
  
  ,{
    id: 9,
    title: "BINDAAS BRANDS",
    description: "Mad Ads",
    category: "UG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Team size : 5–8 members.
Time: 5 + 1 minutes.
Rules:
Perform ads only for imaginary products/services.
Real brands or indirect references are not allowed.
Languages: English, Kannada, Hindi.
Props not allowed: fire, liquids, sharp or hazardous items prohibited.
No offensive or obscene content.
Exceeding time limit leads to mark deduction.
Judging based on creativity, innovation, teamwork & presentation.
Judges’ decision is final and binding.
`,
    registerLink: ""
  }
  
  ,{
    id: 10,
    title: "SPELL",
    description: "Spell Bee Competition",
    category: "UG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Category: Vocabulary.
Participation: Individual.
Event Description:
SPELL is a vocabulary-based competition that tests spelling accuracy, pronunciation, and word knowledge.
Rules:
Open to individual participants only.
Words will be given orally by the moderator.
Participants must spell clearly and audibly.
No use of mobile phones, notes, or external help.
Once started, spelling cannot be changed.
Participants may ask for repetition, meaning, or sentence usage (if permitted).
Time limit per word: 10–15 seconds.
Incorrect spelling may lead to elimination or point deduction.
Difficulty level increases with each round.
Any misconduct will lead to disqualification.
Judges’ decision will be final and binding.
`,
    registerLink: ""
  }
  
  ,{
    id: 11,
    title: "MOCK PRESS",
    description: "",
    category: "UG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Category: Literary / Communication.
Participation: Individual.
Event Overview:
Mock Press is a simulation of real-world press conferences where participants play the roles of journalists and spokespersons, testing communication skills, critical thinking, teamwork, and presence of mind.
Rules:
Each team must consist of 2 participants.
Roles (Press/Media or Spokesperson/Celebrity) will be assigned or chosen before the event.
Professional conduct must be maintained at all times.
Offensive language or inappropriate behavior will lead to disqualification.
Mobile phones and external help are not allowed during active rounds.
Time limits must be strictly followed.
Judges’ decision will be final and binding.
`,
    registerLink: ""
  }
  
  ,{
    id: 12,
    title: "JAM (Flip Master)",
    description: "",
    category: "UG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Category: Speaking Event.
Participation: Individual.
Time Limit: 1 minute.
Rules:
Participants speak continuously on a given topic.
The moderator may announce “FLIP” at any time, instantly changing the topic.
Speaking must continue immediately without hesitation No preparation time is allowed.
Hesitation, repetition, grammatical errors, or long pauses will result in penalties or elimination.
Use of notes, mobile phones, or prompts is not allowed Offensive, political, or inappropriate content is strictly prohibited.
Language of the event: English only.
Judges’ decision will be final and binding.
`,
    registerLink: ""
  }
  
  ,{
    id: 13,
    title: "LIVING CANVAS",
    description: "Arm Painting event",
    category: "UG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Rules
Each team must consist of 2 participants.
Painting is allowed only on the arm.
Painting on the face, neck, or any other body part is strictly prohibited.
Only safe, skin-friendly colors are permitted.
At most, the full arm can be used for painting.
Participants must bring their own paints and materials.
The theme will be announced on the spot by the organizers.
Mobile phones, reference images, or external assistance are not allowed.
One design per participant or team is permitted.
The arm must be clean and dry before painting begins.
Any offensive, political, or inappropriate content will lead to disqualification.
Artwork must be completed within the given time limit.
The judges’ decision will be final and binding.
Time Duration: 1 Hour.
`,
    registerLink: ""
  }
  
  ,{
    id: 14,
    title: "CHROMAFATE",
    description: "Theme based Blind color pick round",
    category: "UG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Time Duration: 1 Hour.
Participation: Individual.
Rules:
Participants will be blind folded during color selection.
Each participant must randomly pick exactly four colors.
The blind fold will be removed only after color selection is completed.
The artwork must be created using only the selected four colors.
Participants must bring their own paints and materials.
No extra colors are allowed, and mixing with unselected colors is strictly prohibited.
The theme will be announced on the spot.
Mobile phones, reference images, or external assistance are not allowed.
One artwork per participant is permitted.
The artwork must be completed within the given time limit.
The judges’ decision will be final and binding.
`,
    registerLink: ""
  }
  
  ,{
    id: 15,
    title: "CTF",
    description: "Capture the flag",
    category: "UG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Team Size: 2 per team.
Format: Easy, Medium & Hard challenges.
Domains: Crypto, Stego, Blockchain, RE, Web, beginner tasks.
Scoring: Points by difficulty; flags via platform.
Fair Play: Unfair means = disqualification.
Duration: 3 hours with live scoreboard.
Ranking: Total points; ties by earliest solve.
`,
    registerLink: ""
  }
  
  ,{
    id: 16,
    title: "Code Chef",
    description: "",
    category: "UG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Entries: Max 2 teams per college; each team up to 2
members from the same college.
Restrictions: No books, notes, mobiles, or electronic gadgets allowed.
Rounds:
Round 1: Elimination – 30 objective programming aptitude questions.
Round 2: Final – Analyze problem statement and develop a programmatic solution.
Decision: Judges’ and organizers’ decisions are final and binding.
`,
    registerLink: ""
  }
  
  ,{
    id: 17,
    title: "Drone Edge",
    description: "",
    category: "UG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Type: Manually piloted quadcopter challenge
Team Size: Up to 4 members.
Drone Rules: Non-DJI quadcopter within specified size, motor, propeller & 3S/4S battery limits.
Mission:
Low-altitude takeoff.
Gate & chamber navigation.
Controlled spot landing.
Format & Rules:
Predefined obstacle course.
3 trials per team.
Missing gates, deviating from track, or any crash = disqualification.
Judging:
Based on completion time, accuracy & control.
Judges’ decision is final.
`,
    registerLink: ""
  }
  
  ,{
    id: 18,
    title: "WebCraft Design",
    description: "",
    category: "UG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Team Size: 2–4 members.
Theme: Announced at event start.
Originality: Only original designs; no templates (WordPress/Wix, etc.).
Anonymity: No branding, names, or logo during judging.
AI Use: AI-generated websites will be disqualified.
`,
    registerLink: ""
  }
  
  ,{
    id: 19,
    title: "Mind2Circuit",
    description: "",
    category: "UG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Team Size: 2 members.
Event Type: Hands-on Technical Challenge.
Challenge:
Design meaningful electronic circuits.
Simulate circuits using approved software.
Implement on breadboard with given components.
Demonstrate correct outputs.
Evaluation:
Maximum number of valid, unique, working circuits.
Judged on creativity, debugging, conceptual clarity & time management.
`,
    registerLink: ""
  }
  
  ,{
    id: 20,
    title: "Yudhastra",
    description: "",
    category: "UG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Objective: Build a purely mechanical launchpad to launch a 200 g projectile with power and precision.
Team Size: 2–4 members.
Restrictions:
No electronics, motors, batteries, or remote controls.
No explosives or chemical reactions.
Missile: 200 g projectile provided by organizers.
Launchpad: Student-built, ground-mounted, stable (no handheld use).
Rounds:
Round 1 – Range: 2 attempts; best distance counts; top 50% qualify.
Round 2 – Accuracy: Hit target (≤10 m); 3 launches; adjustable angle only; highest score advances.
Round 3 – Power: Clear a 2 m barrier and hit target zone; miss = zero score.
`,
    registerLink: ""
  }
  
  ,{
    id: 21,
    title: "VISION X",
    description: "",
    category: "UG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Objective: Autonomous navigation using camera-based vision only.
Main Processor: Raspberry Pi 3 / 4 / 5 (mandatory for vision).
Camera: Pi Camera or USB Camera.
Secondary Controllers: Arduino/ESP32 allowed only for motor control.
Robot Specs:
Fully autonomous.
Max size 20 × 20 × 20 cm.
Battery powered.
Any chassis configuration allowed.
Track & Arena:
Visible navigation path with turns.
Vision-based path following only.
Track layout decided by organizers.
Gameplay & Scoring:
2 attempts, best run counted.
Time limit: 5 minutes per run.
Touching or track exit = penalty.
Winner based on successful completion + fastest time.
Team Rules:
2–4 members per team.
Only 1 member near arena during run.
Unsafe robots prohibited.
Final: Judges’ decision is final & binding.
`,
    registerLink: ""
  }
  
  ,{
    id: 22,
    title: "Gen AI Prompt Engg. Battle",
    description: "",
    category: "UG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Participation: Individual or teams of up to 2.
Format: Multiple rounds (as decided by organizers).
Allowed Tools: Approved LLMs only (ChatGPT, Gemini, LLAMA).
Restrictions: No internet browsing or external prompt libraries.
Originality: Prompts must be created during the event.
Evaluation: Participants may explain prompt strategy to judges.
Fair Play: Malpractice leads to disqualification.
Decision: Judges’ decision is final and binding.
`,
    registerLink: ""
  }
  
  ,{
    id: 23,
    title: "Robo Soccer",
    description: "",
    category: "UG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Team Size: 2–4 college students; 1 bot per team (same members may form multiple teams).
Match Format: 3 minutes (2 halves of 1.5 minutes).
Robot Specs: Max 35 × 35 cm, 5 kg (±5%), voltage ≤ 12.5 V; no LEGO or pre-made kits.
Control & Power: Wired or wireless; onboard battery or stationary supply via cord.
Restrictions: No push, power-up, or locking mechanisms
Arena: 7 ft × 5 ft.
Gameplay: Bot must not be immobile > 10 sec; pushing opponent into goal allowed.
Timeouts: One 60-sec technical timeout; 1-min halftime with court swap.
`,
    registerLink: ""
  }
    
  ,{
    id: 24,
    title: "TIDAL-CLASH",
    description: "(Finance Event)",
    category: "PG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Team size - 2
Navigate high-stakes capital restructuring and liquidity crunches.
Teams must execute dynamic hedging and optimize risk-adjusted returns under extreme volatility to maintain fiscal.
Solvency and achieve peak alpha in this crucible.
`,
    registerLink: ""
  }
    
    
  ,{
    id: 25,
    title: "THE TITANS",
    description: "(Best Management Team)",
    category: "PG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Team size - 3
The challenge tests your team’s grit and synchronization in the face of professional pressure.
Only the most adaptive leaders will survive the gauntlet and claim the title of Best Management Team.
`,
    registerLink: ""
  }
      
  ,{
    id: 26,
    title: "AQUA IMPERIUM",
    description: "(Marketing Event)",
    category: "PG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Team size - 2
An immersive marketing crucible testing strategic acuity, brand resuscitation, persuasion, and marketcraft where insight, ideation, and data-driven positioning converge to showcase contemporary managerial marketing prowess.
`,
    registerLink: ""
  }
      
  ,{
    id: 27,
    title: "TIDE OF TALENTS",
    description: "(HR Event)",
    category: "PG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Team size - 2
An intensive HR huddle evaluating workforce agility, cognitive bandwidth, decision velocity, and situational judgment where talent orchestration, behavioral insight, and people-centric strategy converge under high-pressure conditions.
`,
    registerLink: ""
  }
      
  ,{
    id: 28,
    title: "IT MANAGER CHALLENGE",
    description: "",
    category: "PG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Rules:
Team size:4.
All participants must carry at least one copy of their resume.
Formal attire is mandatory.
Mobile phones are strictly prohibited during all rounds.
Laptops are not allowed unless explicitly permitted by the organizers.
Any malpractice will lead to immediate disqualification.
Judges’ decision will be final and binding.
`,
    registerLink: ""
  }
      
  ,{
    id: 29,
    title: "CODE RED",
    description: "",
    category: "PG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Rules:
Team size: 3.
Use of mobiles and laptops strictly prohibited.
Inter-team discussion not allowed.
Winning criteria: Correct identification of the murderer and the motive.
`,
    registerLink: ""
  }
      
  ,{
    id: 30,
    title: "NEXT NODE",
    description: "(Virtual Treasure Hunt)",
    category: "PG",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Rules:
Team size:2.
One system per team.
Clue-based rounds must be solved in sequence and revisiting previous rounds is not allowed.
Refreshing pages, manipulating URLs, or bypassing rounds will lead to disqualification.
Any form of malpractice or answer sharing with other teams is strictly prohibited.
The coordinators decisions are final and binding.
`,
    registerLink: ""
  }

        
  ,{
    id: 31,
    title: "Battle of Bands",
    description: "",
    category: "General",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Date: 26 March 2026
Venue: MITE Greens
Time: 6:45pm Onwards
`,
    registerLink: ""
  }
      
   ,{
    id: 32,
    title: "Fashion Walk",
    description: "",
    category: "General",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Date: 26 March 2026
Venue: MITE Greens
Time: 8:00pm Onwards
`,
    registerLink: ""
  }

      
  ,{
    id: 33,
    title: "TECH DUMB CHARADES (TDC)",
    description: "",
    category: "General",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Rules:
Team size: 2 members per team.
Standard Dumb Charades rules apply , no speaking, lip-syncing, writing or use of electronic devices is allowed - only gestures and body movements are permitted.
Prelims Round: 1-Minute Showdown for all teams, teams must guess as many words as possible within the allotted time.
Top 6 teams with the highest scores in prelims will qualify for the Finals.
Finals will consist of four rounds - Technical Basics Round, Advanced Concepts Round, Software & Tools Round, and Rapid Fire Team Round.
All three team members must actively participate in the Finals.
Any form of malpractice, rule violation, or unfair means will lead to disqualification.
Judges’/Coordinators’ decisions are final and binding.
`,
    registerLink: ""
  }
      
  ,{
    id: 34,
    title: "General Quiz",
    description: "",
    category: "General",
    image: "",
    iconName: "Music",
    color: "from-purple-500/20 to-violet-500/5",
    border: "group-hover:border-purple-500/50",
      rules:
`
Rules:
Make a team of 2.
Preliminary round followed by final round.
`,
    registerLink: ""
  }
 
]

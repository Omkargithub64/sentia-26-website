
import { Flag, Music, Code, Gamepad, Award, Shield, Mic, Camera, Video, Palette, Zap, Cpu, Users, DollarSign, Briefcase, Aperture, Terminal, Shirt, BookOpen, Radio } from 'lucide-react'
import React from 'react'

export interface EventData {
  id: number;
  title: string;
  description: string;
  category: "General" | "Razzle (Dance Events)"| "Chords (Musical Events)" | "Captcha & Pixel" | "Mask (Theatre Events)" | "Speakers & Literally" | "Pallet (Art events)" | "Technical Events" |"MCA Events" | "MBA Events";
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
    category: "Razzle (Dance Events)",
    image: "/events/Western Group Dance F7BE05 EBBA90.webp",
    iconName: "Users",
    color: "fEBBA9",
    border: "F7BE05",
    rules: `One team per college.
Each group must have minimum of 5 and maximum of 12 participants.
Duration: 4+1 minutes.
Styles allowed: Pure western dance forms such as hip-hop, jazz, locking and open style.`,
    registerLink: "https://forms.gle/v1h1aPJFRPWeCnbS7"
  },
  {
    id: 2,
    title: "Rhythm Rumble",
    description: "Dance Battle",
    category: "Razzle (Dance Events)",
    image: "/events/Dance Battle FD7583 06F2FE.webp",
    iconName: "Music",
    color: "06F2FE",
    border: "FD7583",
      rules: `2 entries per college.
Dancer will be challenged impromptu on varied beats of a live dj.
The music genre will change for each pair of dancers and can range from any genre.
Judges will choose 1 dancer from each battle to advance to the next round.
The final battle will have 2 dancers competing.`,
    registerLink: "https://forms.gle/LqF2PGZukQeoTQSx9"
  },
  {
    id: 3,
    title: "TALES OF TAAL",
    description: "Eastern Group Dance",
    category: "Razzle (Dance Events)",
    image: "/events/Eastern Group Dance E77D2F F2BF2F.webp",
    iconName: "Music",
    color: "F2BF2F",
    border: "E77D2F",
      rules: `One team per college.
Each group must have minimum of 5 and maximum of 12 participants.
Duration: 4+1 minutes.
Styles allowed: Semi-classical, fusion, contemporary, folk.`,
    registerLink: "https://forms.gle/8PPoFc9iYzC98jhz7"
  },{
    id: 4,
    title: "NADA SAGARA",
    description: "Eastern Group Singing",
    category: "Chords (Musical Events)",
    image: "/events/Eastern Group Singing 9B864E DAA693.webp",
    iconName: "Music",
    color: "DAA693",
    border: "9B864E",
      rules: `One entry per collage.
Time limit: 4+1 mins.
Performance Style: Semi classical, Light Music genres such as Bhavageetha, Folk song, Devotional song, Ghazals.
Participants should bring their own musical instrument.`,
    registerLink: "https://forms.gle/dT57FaGvMcvMs3xV9"
  },{
    id: 5,
    title: "POSEIDON’S PLAYBACK DUETS",
    description: "Filmy Duet singing",
    category: "Chords (Musical Events)",
    image: "/events/Filmy Duet singing E79F8A FEB870.webp",
    iconName: "Music",
    color: "FEB870",
    border: "E79F8A",
      rules: `Two participants make a team.
One entry per college.
Duration: 4+1 mins.
Participants are allowed to use any kind of musical instrument or karaoke for the performance.`,
    registerLink: "https://forms.gle/ae7WNQt9ASP898nt9"
  },{
    id: 6,
    title: "DRISHYAM",
    description: "Reel Making Contest",
    category: "Captcha & Pixel",
    image: "/events/reel making contest D97D32 EBBA90.webp",
    iconName: "Music",
    color: "EBBA90",
    border: "D97D32",
      rules: `Participation is limited to two members per team.
The reel must have a maximum duration of 60 seconds.
Only original content created by the participants will be accepted; copied or plagiarized content is not allowed.
The final video must be submitted within the given time frame as instructed by the organizers.`,
    registerLink: "https://forms.gle/jyvq7pn1ByKHLi8YA"
  },{
    id: 7,
    title: "LENSCRAFT",
    description: "Photography Contest",
    category: "Captcha & Pixel",
    image: "/events/Photography Contest A7573A D69676.webp",
    iconName: "Music",
    color: "D69676",
    border: "A7573A",
      rules: `Participation is individual only.
All photographs must be taken within the campus premises.
Images must be captured using a digital camera only.
Editing or any form of image manipulation is not permitted.`,
    registerLink: "https://forms.gle/ydEFaiS8Ej4P6L5R8"
  }
  ,{
    id: 8,
    title: "RANGA VIMARSHA",
    description: "Street Play Competition",
    category: "Mask (Theatre Events)",
    image: "/events/Street Play Competition 1B1C21 949BA1.webp",
    iconName: "Music",
    color: "949BA1",
    border: "1B1C21",
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
    registerLink: "https://forms.gle/AMp7MTVxMuzcntPbA"
  }
  
  ,{
    id: 9,
    title: "BINDAAS BRANDS",
    description: "Mad Ads",
    category: "Mask (Theatre Events)",
    image: "/events/Mad Ads 3BA130 C6E83A.webp",
    iconName: "Music",
    color: "C6E83A",
    border: "3BA130",
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
    registerLink: "https://forms.gle/3KRFuVMwmyCwRNqGA"
  }
  
  ,{
    id: 10,
    title: "SPELL",
    description: "Spell Bee Competition",
    category: "Speakers & Literally",
    image: "/events/",
    iconName: "Music",
    color: "fEBBA9",
    border: "F7BE05",
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
    registerLink: "https://forms.gle/9ZJZcobFm5qsUNAB7"
  }
  
  ,{
    id: 11,
    title: "MOCK PRESS",
    description: "",
    category: "Speakers & Literally",
    image: "/events/MOCK PRESS FFFAE8 D74D43.webp",
    iconName: "Music",
    color: "D74D43",
    border: "FFFAE8",
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
    registerLink: "https://forms.gle/pJnKVi8j1T5xPa8m6"
  }
  
  ,{
    id: 12,
    title: "JAM (Flip Master)",
    description: "",
    category: "Speakers & Literally",
    image: "/events/JAM FFFFFF B89182.webp",
    iconName: "Music",
    color: "B89182",
    border: "1B1C21",
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
    registerLink: "https://forms.gle/h8S7ygorrjxpEEzp8"
  }
  
  ,{
    id: 13,
    title: "LIVING CANVAS",
    description: "Arm Painting event",
    category: "Pallet (Art events)",
    image: "/events/arm painting.webp",
    iconName: "Music",
    color: "D74D43",
    border: "B89182",
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
    registerLink: "https://forms.gle/kSivsPoznLbyy9Wj9"
  }
  
  ,{
    id: 14,
    title: "CHROMAFATE",
    description: "Theme based Blind color pick round",
    category: "Pallet (Art events)",
    image: "/events/CHROMAFATE FEBEA2 2FB3D8.webp",
    iconName: "Music",
    color: "2FB3D8",
    border: "FEBEA2",
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
    registerLink: "https://forms.gle/vc8znQvNP6gr7Cii9"
  }
  
  ,{
    id: 15,
    title: "CTF",
    description: "Capture the flag",
    category: "Technical Events",
    image: "/events/Capture the flag B2DF20 000000.webp",
    iconName: "Music",
    color: "000000",
    border: "B2DF20",
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
    registerLink: "https://forms.gle/R9dQtt198ahiQVNc7"
  }
  
  ,{
    id: 16,
    title: "Code Chef Programming Contest",
    description: "",
    category: "Technical Events",
    image: "/events/Code Chef FEA3A0 A32238.webp",
    iconName: "Music",
    color: "A32238",
    border: "FEA3A0",
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
    registerLink: "https://forms.gle/jmaZCedDRfR5gFP47"
  }
  
  ,{
    id: 17,
    title: "Drone Edge",
    description: "",
    category: "Technical Events",
    image: "/events/Drone Edge.webp",
    iconName: "Music",
    color: "2FB3D8",
    border: "517393",
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
    registerLink: "https://forms.gle/TLLKFJ84YPK7x2jR6"
  }
  
  ,{
    id: 18,
    title: "WebCraft Design",
    description: "",
    category: "Technical Events",
    image: "/events/WebCraft Design E0E0E0 50A125.webp",
    iconName: "Music",
    color: "50A125",
    border: "E0E0E0",
      rules:
`
Team Size: 2–4 members.
Theme: Announced at event start.
Originality: Only original designs; no templates (WordPress/Wix, etc.).
Anonymity: No branding, names, or logo during judging.
AI Use: AI-generated websites will be disqualified.
`,
    registerLink: "https://forms.gle/oT7CGr3FoXfiu5Fn9"
  }
  
  ,{
    id: 19,
    title: "Mind2Circuit",
    description: "",
    category: "Technical Events",
    image: "/events/Mind2Circuit 003054 EFDABB.webp",
    iconName: "Music",
    color: "EFDABB",
    border: "003054",
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
    registerLink: "https://forms.gle/foMgMC9cuZR1YjnV9"
  }
  
  ,{
    id: 20,
    title: "Yudhastra",
    description: "",
    category: "Technical Events",
    image: "/events/Yudhastra 1B1B1B 483A37.webp",
    iconName: "Music",
    color: "483A37",
    border: "1B1B1B",
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
    registerLink: "https://forms.gle/VoRZoodUtSCuAzVN6"
  }
  
  ,{
    id: 21,
    title: "VISION X",
    description: "",
    category: "Technical Events",
    image: "/events/VISION X 3F485C FF9C02.webp",
    iconName: "Music",
    color: "FF9C02",
    border: "3F485C",
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
    registerLink: "https://forms.gle/FGRMwQt7m8ZAAtuc8"
  }
  
  ,{
    id: 22,
    title: "Gen AI Prompt Engg. Battle",
    description: "",
    category: "Technical Events",
    image: "/events/Gen AI Prompt Engg. Battle 5A8A74 FF9C02.webp",
    iconName: "Music",
    color: "FF9C02",
    border: "5A8A74",
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
    registerLink: "https://forms.gle/BLcehMxwsd6xKQ1V9"
  }
  
  ,{
    id: 23,
    title: "Robo Soccer",
    description: "",
    category: "Technical Events",
    image: "/events/robo soccer 687190 F68557.webp",
    iconName: "Music",
    color: "F68557",
    border: "687190",
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
    registerLink: "https://forms.gle/6apYkHqobrSPx3nC8"
  }
    
  ,{
    id: 24,
    title: "TIDAL-CLASH",
    description: "(Finance Event)",
    category: "MBA Events",
    image: "/events/TIDAL-CLASH 123668 B1BEA4.webp",
    iconName: "Music",
    color: "B1BEA4",
    border: "123668",
      rules:
`
Team size - 2
Navigate high-stakes capital restructuring and liquidity crunches.
Teams must execute dynamic hedging and optimize risk-adjusted returns under extreme volatility to maintain fiscal.
Solvency and achieve peak alpha in this crucible.
`,
    registerLink: "https://forms.gle/NmLoVBH6hQ6SjHDr9"
  }
    
    
  ,{
    id: 25,
    title: "THE TITANS",
    description: "(Best Management Team)",
    category: "MBA Events",
    image: "/events/THE TITANS 080D11 BFBB8B.webp",
    iconName: "Music",
    color: "BFBB8B",
    border: "080D11",
      rules:
`
Team size - 3
The challenge tests your team’s grit and synchronization in the face of professional pressure.
Only the most adaptive leaders will survive the gauntlet and claim the title of Best Management Team.
`,
    registerLink: "https://forms.gle/usWJs5oXeUQfvBSP7"
  }
      
  ,{
    id: 26,
    title: "AQUA IMPERIUM",
    description: "(Marketing Event)",
    category: "MBA Events",
    image: "/events/AQUA IMPERIUM D7D7D9 03B09D.webp",
    iconName: "Music",
    color: "03B09D",
    border: "D7D7D9",
      rules:
`
Team size - 2
An immersive marketing crucible testing strategic acuity, brand resuscitation, persuasion, and marketcraft where insight, ideation, and data-driven positioning converge to showcase contemporary managerial marketing prowess.
`,
    registerLink: "https://forms.gle/vEG2i4ByzwdbeEN38"
  }
      
  ,{
    id: 27,
    title: "TIDE OF TALENTS",
    description: "(HR Event)",
    category: "MBA Events",
    image: "/events/TIDE OF TALENTS D7D7D9 FB6C35.webp",
    iconName: "Music",
    color: "FB6C35",
    border: "D7D7D9",
      rules:
`
Team size - 2
An intensive HR huddle evaluating workforce agility, cognitive bandwidth, decision velocity, and situational judgment where talent orchestration, behavioral insight, and people-centric strategy converge under high-pressure conditions.
`,
    registerLink: "https://forms.gle/kC9gBv4XjHV2rP1d7"
  }
      
  ,{
    id: 28,
    title: "IT MANAGER CHALLENGE",
    description: "",
    category: "MCA Events",
    image: "/events/IT MANAGER CHALLENGE FEEFB4.webp",
    iconName: "Music",
    border: "3e9396",
    color: "FEEFB4",
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
    registerLink: "https://forms.gle/ghZUniSs5oWVNoTW7"
  }
      
  ,{
    id: 29,
    title: "CODE RED",
    description: "",
    category: "MCA Events",
    image: "/events/CODE RED 222F35 990030.webp",
    iconName: "Music",
    color: "990030",
    border: "222F35",
      rules:
`
Rules:
Team size: 3.
Use of mobiles and laptops strictly prohibited.
Inter-team discussion not allowed.
Winning criteria: Correct identification of the murderer and the motive.
`,
    registerLink: "https://forms.gle/uc1PBgBewC7FJ4Xu7"
  }
      
  ,{
    id: 30,
    title: "NEXT NODE",
    description: "(Virtual Treasure Hunt)",
    category: "MCA Events",
    image: "/events/Virtual Treasure Hunt BDD9E6 FFC800.webp",
    iconName: "Music",
    border: "FFC800",
    color: "BDD9E6",
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
    registerLink: "https://forms.gle/ZnZFKYHYmdLRnAzu8"
  }

        
  ,{
    id: 31,
    title: "Battle of Bands",
    main: true,
    description: "",
    category: "Main",
    image: "/events/fashion walk.webp",
    iconName: "Music",
    color: "fEBBA9",
    border: "F7BE05",
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
    main: true,
    description: "",
    category: "Main",
    image: "/events/fashion walk.webp",
    iconName: "Music",
    color: "fEBBA9",
    border: "F7BE05",
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
    image: "/events/TECH DUMB CHARADES 4F2E1C B69A8F.webp",
    iconName: "Music",
    color: "B69A8F",
    border: "4F2E1C",
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
    registerLink: "https://forms.gle/r1kXkcSCXPfMMV2e9"
  }
      
  ,{
    id: 34,
    title: "General Quiz",
    description: "",
    category: "General",
    image: "/events/General Quiz CBD1D7 1C2936.webp",
    iconName: "Music",
    color: "CBD1D7",
    border: "1C2936",
      rules:
`
Rules:
Make a team of 2.
Preliminary round followed by final round.
`,
    registerLink: "https://forms.gle/49biFbF87CArGKvj6"
  }
 
]


import { Flag, Music, Code, Gamepad, Award, Shield, Mic, Camera, Video, Palette, Zap, Cpu, Users, DollarSign, Briefcase, Aperture, Terminal, Shirt, BookOpen, Radio } from 'lucide-react'
import React from 'react'

export interface EventData {
  id: number;
  title: string;
  description: string;
  category: "General" | "Razzle (Dance Events)" | "Chords (Musical Events)" | "Captcha & Pixel" | "Mask (Theatre Events)" | "Speakers & Literally" | "Pallet (Art events)" | "Technical Events" | "MCA Events" | "MBA Events";
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
    rules: `
Event Description:
Rhythmic Reverence is a Western Dance Competition that showcases energy, creativity, coordination, and expressive performance through various Western dance styles.
Type of Event: Open to B.Tech, B.E., MCA, and MBA students.
Category: Western Group Dance.
Eligibility: From each college one team is allowed to participate.
Team Size: 5 to 12 members per team.
Time Limit: 4 minutes of performance time + 1 minute for setup/transition.
Dance Styles Allowed: Hip Hop, Jazz, Freestyle, Contemporary, and other recognized Western dance styles.
Rules and Regulations:
Only Western dance styles are permitted for this competition.
Music tracks must be submitted one day prior to the event.
Participants must report to the venue 30 minutes before the scheduled event time.
The use of fire, colors, smoke, or any hazardous materials is strictly prohibited.
Props may be used provided they are safe and do not damage the stage or surroundings.
Costumes must be decent and appropriate for a college- level competition.
Exceeding the allotted time limit will result in negative marking.
The judges’ decision shall be final and binding in all matters related to the event.`,
    time: "11:00 AM - 1:30 PM",
    date: "26-03-2026",
    venue: "Main Stage",
    type:"Open to All",
    contacts:`
    Manish - +91 99649 63003
Ayushi - +91 76761 95703
    `,
    region:"",
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
    rules: `
Event Description:
Dance Battle is an electrifying one-on-one dance competition where participants showcase their freestyle skills, creativity, and stage presence while performing to live DJ beats.
Type of Event: Open to B.Tech, B.E., MCA and MBA students.
Category: Western Dance
Eligibility: Individual participation.
Team Size: Solo (1 participant per entry).
Format: One-on-one elimination battle rounds.
Rules and Regulations:
Dancers will be challenged to perform to the beats of a live DJ.
Music genres may include Rap, Pop, Breakbeats, Funk, and other dynamic styles.
Judges will select one dancer from each battle to advance to the next round.
The competition will continue in elimination format until two dancers reach the final round.
Any form of misconduct or unsportsmanlike behavior will lead to disqualification.
The judges’ decision shall be final and binding in all matters related to the event`,
    time: "11:00 AM - 1:30 PM",
    date: "26-03-2026",
    venue: "TBD",
    type:"Open to All",
        contacts:`
    Anushree - +91 82818 06935
Amulya – +91 74112 76320
    `,
    region:"",
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
    rules: `
Event Description:
Tales of Taal is an Eastern Dance competition that celebrates the grace, discipline, and expressive beauty of classical and semi-classical Indian dance forms.
Type of Event: Open to B.Tech, BE, MCA, MBA.
Category: Eastern Group Dance.
Eligibility: From each college 1 team allowed to participate.
Team Size: 5 to 12 members per team.
Time Limit: 4 minutes performance time plus 1 minute for setup or transition.
Rules and Regulations:
Only Classical and Semi-Classical dance forms are permitted for this competition.
Music tracks must be submitted one day prior to the event.
Participants must report at the venue 30 minutes before the scheduled event time.
Use of fire, colors, smoke, or any hazardous materials is strictly prohibited.
Costumes must be decent, appropriate, and in accordance with the chosen dance form.
Exceeding the allotted time limit will result in negative marking.
The judges’ decision shall be final and binding in all matters related to the event.
    `,
    time: "11:00 AM - 1:30 PM",
    date: "26-03-2026",
    venue: "Main Stage",
    type:"Open to All",
            contacts:`
 Sinchana - 91 72045 76056
Khushi – +91 77600 12018
    `,
    registerLink: "https://forms.gle/8PPoFc9iYzC98jhz7"
  }, {
    id: 4,
    title: "NADA SAGARA",
    description: "Eastern Group Singing",
    category: "Chords (Musical Events)",
    image: "/events/Eastern Group Singing 9B864E DAA693.webp",
    iconName: "Music",
    color: "DAA693",
    border: "9B864E",
    rules: `
    Event Description:
    Nada Sagara is an Eastern Group Singing Competition that celebrates the richness, harmony, and cultural depth of traditional Indian music through live vocal and instrumental performances.
Type of Event: Open to B.Tech, B.E., MCA, and MBA students.
Category: Eastern Group Singing.
Eligibility: From each college one team is allowed to participate.
Team Size: Maximum 8 members per team.
Time Limit: 4 minutes of performance time + 1 minute for setup.
Performance Style: Only Eastern styles such as Indian Classical, Semi-Classical, Folk, Devotional, and Light Classical are permitted. Western or fusion styles are not allowed.
Instruments: Only Eastern instruments are allowed. Electronic or Western instruments are strictly prohibited. Participants must bring their own instruments. No instruments will be provided by the organizers.
Rules and Regulations:
The performance must consist of live singing accompanied by live instruments only.
Pre-recorded tracks, karaoke tracks, or backing tracks are not permitted.
Lyrics must be decent, respectful, and culturally appropriate.
Exceeding the allotted time limit may result in penalties or disqualification.
The judges’ decision shall be final and binding in all matters related to the event.
    `,
    time: "3:30 PM - 3:30 PM",
    date: "26-03-2026",
    venue: "AUDI - 03",
    type:"Open to All",
contacts:`
Shravan - +91 74112 89340
Dharini - +91 72592 35817
    `,
    registerLink: "https://forms.gle/dT57FaGvMcvMs3xV9"
  }, {
    id: 5,
    title: "POSEIDON’S PLAYBACK DUETS",
    description: "Filmy Duet singing",
    category: "Chords (Musical Events)",
    image: "/events/Filmy Duet singing E79F8A FEB870.webp",
    iconName: "Music",
    color: "FEB870",
    border: "E79F8A",
    rules: `
    Event Description:
    Poseidon’s Playback Duets is a Filmy Duet Singing Competition that celebrates melody, coordination, and on-stage chemistry through popular songs from Indian cinema.
Type of Event: Open to B.Tech, B.E., MCA, and MBA students.
Category: Filmy Duet Singing
Eligibility: From each college one team is allowed to participate.
Team Size: 2 members per team.
Time Limit: 4 minutes of performance time + 1 minute for setup.
Performance: Filmy songs from Indian cinema (any language) are permitted. Mashups are allowed within the allotted time limit.
Music:
Karaoke tracks are permitted. Live instruments are allowed within setup constraints. Participants must bring their own tracks and instruments. No instruments or backing tracks will be provided by the organizers.
Rules and Regulations:
Songs must be appropriate for a college audience.
Vulgar, explicit, or offensive lyrics are strictly prohibited.
Basic stage expressions are allowed; however, the use of props is not permitted.
Exceeding the allotted time limit may result in penalties or disqualification.
The judges’ decision shall be final and binding in all matters related to the event.
    
    `,
    time: "11:00 AM - 1:30 PM",
    date: "26-03-2026",
    venue: "AUDI - 03",
    type:"Open to All",
    contacts:`
Mayank - +91 76766 98766
Prathijna - +91 82174 85402
    `,
    registerLink: "https://forms.gle/ae7WNQt9ASP898nt9"
  }, {
    id: 6,
    title: "DRISHYAM",
    description: "Reel Making Contest",
    category: "Captcha & Pixel",
    image: "/events/reel making contest D97D32 EBBA90.webp",
    iconName: "Music",
    color: "EBBA90",
    border: "D97D32",
    rules: `
    Event Description:
    Drishyam is a Reel Making Contest that encourages creativity, storytelling, and visual expression through short-form video content.
Type of Event: Open to B.Tech, B.E., MCA, and MBA students.
Category: Reel Making.
Eligibility: Multiple entries from the same college are allowed.
Team Size: Participation is limited to two members per team.
Time Limit: The reel must have a maximum duration of 60 seconds.
Rules and Regulations:
Only original content created by the participants will be accepted. Copied or plagiarized content is strictly prohibited.
The final video must be submitted within the given time frame as instructed by the organizers.
Any inappropriate, offensive, or copyrighted content without permission will lead to disqualification.
The judges’ decision shall be final and binding in all matters related to the event.
    `,
    time: "11:00 AM - 1:30 PM",
    date: "26-03-2026",
    venue: "TBD",
    type:"Open to All",
    contacts:`
Shreesha - +91 79754 80395
Tushar - +91 91132 79350
    `,
    registerLink: "https://forms.gle/jyvq7pn1ByKHLi8YA"
  }, {
    id: 7,
    title: "LENSCRAFT",
    description: "Photography Contest",
    category: "Captcha & Pixel",
    image: "/events/Photography Contest A7573A D69676.webp",
    iconName: "Music",
    color: "D69676",
    border: "A7573A",
    rules: `
Event Description:
Lenscraft is a Photography Contest that challenges participants to capture compelling moments, perspectives, and creativity within the campus environment.
Type of Event: Open to B.Tech, B.E., MCA and MBA students.
Category: Photography.
Eligibility: Individual participation only.
Theme: The photography theme will be informed to the participants on campus.
Rules and Regulations:
All photographs must be taken within the campus premises.
Images must be captured using a digital camera only.
Editing or any form of image manipulation is not permitted.
Any inappropriate or plagiarized content will lead to disqualification.
The judges’ decision shall be final and binding in all matters related to the event.
    `,
    time:"11:00 AM - 1:30 PM",
    date:"26-03-2026",
    venue:"TBD",
    type:"Open to All",
    contacts:`
Chintan - +91 74837 13408
Darshan - +91 90358 60414
    `,
    registerLink: "https://forms.gle/ydEFaiS8Ej4P6L5R8"
  }
  , {
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
Event Description:
Ranga Vimarsha is a Street Play Competition that encourages powerful storytelling, social awareness, and impactful performances through live theatrical expression.
Type of Event: Open to B.Tech, B.E., MCA and MBA students.
Category: Street Play.
Eligibility: One team per college.
Team Size: 6 to 10 members per team.
Selection Process: A 5-minute screening video must be submitted. The top 5 teams will be shortlisted. Final registration is permitted only for shortlisted teams. 
Performance Details: Outdoor event.
Time Limit: 8 minutes of performance time + 2 minutes (including entry and exit). A warning bell will be given at 9 minutes. Exceeding the allotted time limit will result in penalties.
Languages Allowed: English, Kannada and Hindi.
Topic: The topic will be announced via official social media platforms.
Rules and Regulations:
Banners, posters, and percussion instruments are allowed.
Microphones, speakers, recorded audio, or any electronic aids are strictly prohibited.
The content must be original, meaningful, and non-offensive.
Any form of inappropriate or objectionable content will lead to disqualification.
The judges’ decision shall be final and binding in all matters related to the event.
`,
    time:"11:00 AM - 1:30 PM",
    date:"26-03-2026",
    venue:"TBD",
    type:"Open to All",
    contacts:`
Prathik Shetty - +91 87926 85809
Jeevan - +91 70195 78290
    `,
    registerLink: "https://forms.gle/AMp7MTVxMuzcntPbA"
  }

  , {
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
Event Description:
Bindaas Brands is a Mad Ads Competition that challenges participants to showcase creativity, humor, innovation, and teamwork by presenting entertaining advertisements for imaginary products or services.
Type of Event: Open to B.Tech, B.E.
Category: Mad Ads.
Eligibility: One team per entry.
Team Size: 5 to 8 members per team.
Time Limit: 5 minutes of performance time + 1 minute for setup.
Rules and Regulations:
Participants must perform advertisements only for imaginary products or services.
Real brands or indirect references to existing brands are strictly prohibited.
Languages permitted: English, Kannada, Hindi, and Tulu.
Props are allowed; however, the use of fire, liquids, sharp objects, or any hazardous materials is strictly prohibited.
Offensive, obscene, or inappropriate content will lead to disqualification.
Exceeding the allotted time limit will result in deduction of marks.
Judging will be based on creativity, innovation, teamwork, and presentation.
The judges’ decision shall be final and binding in all matters related to the event.
`,
    time:"3:30 PM - 4:45 PM",
    date:"26-03-2026",
    venue:"Main Stage",
    type:"Under Graduate",
    contacts:`
Deepak K - +91 99802 88315
Swasthik Acharya - +91 82963 23159
    `,
    registerLink: "https://forms.gle/3KRFuVMwmyCwRNqGA"
  }

  , {
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
Event Description:
SPELL is a Spell Bee Competition that tests participants’ spelling accuracy, pronunciation, vocabulary knowledge, and presence of mind through structured elimination rounds.
Type of Event: Open to B.Tech, B.E.
Category: Vocabulary.
Eligibility: Individual participation only.
Format: Words will be given orally by the moderator. The difficulty level will increase with each round.
Rules and Regulations:
Words will be pronounced orally by the moderator.
Participants must spell the word clearly and audibly.
The use of mobile phones, notes, or any external assistance is strictly prohibited.
Once a participant begins spelling a word, it cannot be changed.
Participants may request repetition, meaning, or sentence usage of the word (if permitted by the moderator).
The time limit per word is 10 to 15 seconds.
Incorrect spelling may result in elimination or deduction of points, depending on the round format.
Any form of misconduct will lead to immediate disqualification.
The judges’ decision shall be final and binding in all matters related to the event.
`,
    time:"11:00 AM - 1:30 PM",
    date:"26-03-2026",
    venue:"TBD",
    type:"Under Graduate",
    contacts:`
Sejal - +91 80500 26231
Muneeb Mustafa - +91 80500 26231
    `,
    registerLink: "https://forms.gle/9ZJZcobFm5qsUNAB7"
  }

  , {
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
Event Description: Mock Press is a simulation-based competition that recreates real-world press conferences where participants take on the roles of journalists and spokespersons.
The event evaluates communication skills, critical thinking, teamwork, confidence, and presence of mind.
Type of Event: Open to B.Tech, B.E., MCA, and MBA students.
Category: Literary / Communication.
Eligibility: Team participation only.
Team Size: 2 members per team.
Event Rounds:
Round 1 – Press Briefing.
Round 2 – Question & Answer (Q&A)
Round 3 – Crisis Management.
Rules and Regulations:
Each team must consist of two participants.
Roles (Press/Media or Spokesperson/Celebrity) will be assigned or chosen before the event.
Professional conduct must be maintained at all times during the competition.
Offensive language or inappropriate behavior will lead to immediate disqualification.
Mobile phones and any external assistance are strictly prohibited during active rounds.
All prescribed time limits must be strictly followed.
The judges’ decision shall be final and binding in all matters related to the event.
`,
    time:"1:45 PM - 4:00 PM",
    date:"26-03-2026",
    venue:"AUDI - 04",
    type:"Open to All",
    contacts:`
Abdul Rehaman - +91 96064 96577
    `,
    registerLink: "https://forms.gle/pJnKVi8j1T5xPa8m6"
  }

  , {
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
Event Description: Just-A-Minute (Flip Master) is a dynamic speaking event that tests participants’ spontaneity, fluency, clarity of thought, and presence of mind through rapid topic transitions.
Type of Event: Open to B.Tech, B.E., MCA, and MBA students.
Category: Speaking Event.
Eligibility: Individual participation only.
Time Limit: 1 minute per participant.
Language: English only.
Rules and Regulations:
Participants must speak continuously on a given topic.
The moderator may announce “FLIP” at any time, instantly changing the topic.
Participants must immediately continue speaking on the new topic without hesitation.
No preparation time will be provided.
Hesitation, repetition, grammatical errors, or long pauses will result in penalties or elimination.
The use of notes, mobile phones, or any prompts is strictly prohibited.
Offensive, political, or inappropriate content is strictly prohibited.
The judges’ decision shall be final and binding in all matters related to the event.
`,
    time:"2:00 PM - 3:30 PM",
    date:"26-03-2026",
    venue:"Main Stage",
    type:"Open to All",
    contacts:`
Pourshi V Rai - +91 84949 79944
Mazin - +91 73563 58277
    `,
    registerLink: "https://forms.gle/h8S7ygorrjxpEEzp8"
  }

  , {
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
Event Description:
Living Canvas is an Arm Painting event that encourages artistic creativity and precision, where participants transform an arm into a vibrant piece of live art based on a surprise theme.
Type of Event: Open to B.Tech, B.E., MCA, and MBA students.
Category: Art / Creative Event.
Eligibility: Team participation only.
Team Size: 2 members per team.
Time Limit: 1 hour.
Theme: The theme will be announced on the spot by the organizers.
Rules and Regulations:
Painting is allowed only on the arm.
Painting on the face, neck, or any other body part is strictly prohibited.
Only safe, skin-friendly colors are permitted.
Participants must bring their own paints and materials.
Mobile phones, reference images, or any external assistance are strictly prohibited.
Only one design per participant or team is permitted.
The model’s arm must be clean and dry before painting begins.
Any offensive, political, or inappropriate content will lead to disqualification.
The artwork must be completed within the allotted time limit.
The judges’ decision shall be final and binding in all matters related to the event.
`,
    time:"11:00 AM - 1:30 PM",
    date:"26-03-2026",
    venue:"TBD",
    type:"Open to All",
    contacts:`
Ananya - +91 90366 49956
Vijay Kumar - +91 97312 59184
    `,
    registerLink: "https://forms.gle/kSivsPoznLbyy9Wj9"
  }

  , {
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
Event Description:
Chromafate is a Theme-Based Blind Color Pick Round that challenges participants to showcase creativity and adaptability by creating artwork using randomly selected colors.
Type of Event: Open to B.Tech, B.E., MCA, and MBA students.
Category: Art / Creative Event.
Eligibility: Individual participation only.
Time Limit: 1 hour.
Theme: The theme will be announced on the spot by the organizers.
Rules and Regulations:
Participants will be blindfolded during the color selection process.
Each participant must randomly pick exactly four colors.
The blindfold will be removed only after the color selection is completed.
The artwork must be created using only the four selected colors.
Participants must bring their own paints and materials.
No extra colors are allowed, and mixing with unselected colors is strictly prohibited.
Mobile phones, reference images, or any external assistance are strictly prohibited.
Only one artwork per participant or team is permitted.
The artwork must be completed within the allotted time limit.
The judges’ decision shall be final and binding in all matters related to the event.
`,
    time:"11:00 AM - 1:30 PM",
    date:"26-03-2026",
    venue:"TBD",
    type:"Open to All",
    contacts:`
Omkar S Bhute - +91 7892 207231
Krishna Shetty - +91 74837 49595
    `,
    registerLink: "https://forms.gle/vc8znQvNP6gr7Cii9"
  }

  , {
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
Event Description:
Capture The Flag (CTF) is a cybersecurity- based competition where teams solve technical challenges to find hidden “flags” The event tests problem-solving skills, logical thinking, and knowledge of security concepts across multiple domains.
Type of Event: Open to B.E. and B.Tech students only.
Category: Technical / Cybersecurity.
Eligibility: Team participation only.
Team Size: 2 participants per team. Challenge
Format: Multiple challenges categorized into Easy, Medium, and Hard levels.
Domains Covered: Cryptography, Steganography, Blockchain, Reverse Engineering, Web Exploitation, and beginner-friendly tasks.
Event Duration: 3-hour competition with real-time scoreboard updates. Scoring & Ranking: Points will be awarded based on challenge difficulty. Teams will be ranked according to total points secured. In case of a tie, the team that completed the final challenge earlier will be ranked higher.
Rules and Regulations:
Flags must be correctly submitted on the official competition platform to earn points.
Any form of unfair practice, plagiarism, collaboration with external teams, or external assistance will lead to immediate disqualification.
Participants must follow the instructions provided by the event coordinators throughout the competition.
The use of unauthorized tools or disruptive activities affecting the competition platform is strictly prohibited.
The judges’ and organizers’ decisions shall be final and binding in all matters related to the event
`,
    time:"11:00 AM - 1:30 PM",
    date:"26-03-2026",
    venue:"TBD",
    type:"Under Graduate",
    contacts:`
Sujal - +91 88671 44895
Prathik Prashanth Nullipady - +91 76766 74150
    `,
    registerLink: "https://forms.gle/R9dQtt198ahiQVNc7"
  }

  , {
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
Event Description:
Code Chef is a Programming Contest that evaluates participants’ logical thinking, programming aptitude, and problem-solving skills through structured competitive rounds.
Type of Event: Open to B.E. and B.Tech students only.
Category: Technical / Programming .
Eligibility: A maximum of two entries per college is permitted.
Team Size: Maximum 2 members per team (both members must be from the same college).
Event Format: The contest will be conducted in two rounds Event Rounds:
Round 1 – Elimination Round: A Programming Aptitude Test consisting of 30 objective-type questions.
Round 2 – Final Round: Qualified teams must analyze the given problem statement and develop an appropriate programmatic solution.
Rules and Regulations:
Participants are strictly prohibited from carrying books, notes, mobile phones, or any electronic gadgets into the competition venue.
Only registered teams are allowed to participate in the respective rounds.
Teams qualifying in Round 1 will advance to the Final Round.
The solution submitted in the Final Round must be the team’s original work.
The decision of the organizing committee and judges shall be final and binding in all matters related to the competition.
`,
    time:"11:00 AM - 1:30 PM",
    date:"26-03-2026",
    venue:"TBD",
    type:"Under Graduate",
    contacts:`
Preetham U Shetty - +91 93533 96671
Sachin - +91 94824 59467
    `,
    registerLink: "https://forms.gle/jmaZCedDRfR5gFP47"
  }

  , {
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
Event Description:
Drone Edge is a manually piloted quadcopter challenge that tests precision flying, stability, navigation skills, and control through a structured obstacle-based mission.
Type of Event: Open to B.E. and B.Tech students only.
Category: Technical / Robotics.
Eligibility: Team participation only.
Team Size: Up to 4 members per team.
Event Type: Manually piloted quadcopter challenge.
Drone Specifications: Non-DJI quadcopters only, within the specified size, motor, propeller, and 3S/4S battery limits.
Event Format: Predefined obstacle course with three trials per team. Mission: Low-altitude takeoff, gate and chamber navigation, and controlled spot landing.
Rules and Regulations:
The competition will be conducted on a predefined obstacle course.
Each team will be provided with three trials.
Missing gates, deviating from the designated track, or any crash will result in disqualification.
Teams must strictly adhere to the specified drone configuration and battery limits.
Judging will be based on completion time, accuracy, and flight control.
Any unsafe flying behavior or violation of event guidelines will lead to immediate disqualification.
The judges’ decision shall be final and binding in all matters related to the event.
`,
    time:"11:00 AM - 1:30 PM",
    date:"26-03-2026",
    venue:"TBD",
    type:"Under Graduate",
    contacts:`
C Lakshith - +91 80501 09358
Tejas - +91 91106 23513
    `,
    registerLink: "https://forms.gle/TLLKFJ84YPK7x2jR6"
  }

  , {
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
Event Description:
WebCraft Design is a web development competition that challenges participants to design and develop an original website based on a given theme, showcasing creativity, technical skills, and user experience design.
Type of Event: Open to B.E. and B.Tech students only.
Category: Technical / Web Development.
Eligibility: Team participation only.
Team Size: 2 to 4 members per team.
Theme: The theme will be announced at the start of the event.
Rules and Regulations:
Only original website designs are permitted. The use of pre-built templates or platforms such as WordPress, Wix, or similar services is strictly prohibited.
Websites must not contain any branding, participant names, college names, or logos during the judging process to ensure anonymity.
AI-generated websites or fully AI-developed designs will result in immediate disqualification.
Participants must adhere to the theme announced at the beginning of the event.
Any form of plagiarism or unfair practice will lead to disqualification.
The judges’ decision shall be final and binding in all matters related to the event.
`,
    time:"11:00 AM - 1:30 PM",
    date:"26-03-2026",
    venue:"TBD",
    type:"Under Graduate",
    contacts:`
Abdul Khadar Jilani K K - +91 87924 01891
Akash - +91 63637 95182
    `,
    registerLink: "https://forms.gle/oT7CGr3FoXfiu5Fn9"
  }

  , {
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
Event Description:
Mind2Circuit is a hands-on technical challenge that tests participants’ understanding of electronics, circuit design, simulation skills, and practical implementation abilities.
Type of Event: Open to B.E. and B.Tech students only.
Category: Technical / Electronics
Eligibility: Team participation only.
Team Size: 2 members per team.
Event Type: Hands-on Technical Challenge.
Challenge Overview: Design meaningful electronic circuits, simulate them using approved software, implement the circuits on a breadboard using the provided components, and demonstrate correct outputs.
Rules and Regulations:
Teams must design and simulate circuits using only the approved software provided or permitted by the organizers.
Circuits must be implemented on a breadboard using the given components only.
Participants must demonstrate correct and functional outputs for validation.
Evaluation will be based on the maximum number of valid, unique, and working circuits developed within the allotted time.
Judging criteria include creativity, debugging skills, conceptual clarity, and effective time management.
Any form of unfair practice or external assistance will lead to disqualification.
The judges’ decision shall be final and binding in all matters related to the event
`,
    time:"11:00 AM - 1:30 PM",
    date:"26-03-2026",
    venue:"TBD",
    type:"Under Graduate",
    contacts:`
Shravan Kamath M - +91 99723 78107
Shravan Shedikaje - +91 74112 89340
    `,
    registerLink: "https://forms.gle/foMgMC9cuZR1YjnV9"
  }

  , {
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
Event Description:
Yudhastra is a mechanical engineering challenge that requires participants to design and build a purely mechanical launchpad capable of launching a 200 g projectile with power, precision, and stability.
Type of Event: Open to B.E. and B.Tech students only.
Category: Technical / Mechanical Design.
Eligibility: Team participation only.
Team Size: 2 to 4 members per team.
Objective: To build a ground-mounted, purely mechanical launchpad that launches a 200 g projectile efficiently and accurately.
Missile Specification: A 200 g projectile will be provided by the organizers. Launchpad Requirement: The launchpad must be student-built, ground-mounted, and stable. Handheld mechanisms are strictly prohibited.
Event Rounds:
Round 1 – Range: Each team will be given two attempts. The best distance will be considered for evaluation. The top 50% of teams will qualify for the next round.
Round 2 – Accuracy: Teams must hit a target placed within 10 meters. Three launches will be permitted. Only angle adjustments are allowed. The highest-scoring teams will advance to the final round.
Round 3 – Power: The projectile must clear a 2-meter barrier and land within the designated target zone. Missing the target zone will result in zero score.
Rules and Regulations:
The mechanism must be purely mechanical. The use of electronics, motors, batteries, remote controls, explosives, or chemical reactions is strictly prohibited.
The launchpad must remain stable during operation and must not be handheld at any stage.
Any unsafe design or violation of the specified restrictions will lead to immediate disqualification.
Participants must strictly adhere to the projectile specifications provided by the organizers.
The judges’ decision shall be final and binding in all matters related to the event.
`,
    time:"11:00 AM - 1:30 PM",
    date:"26-03-2026",
    venue:"TBD",
    type:"Under Graduate",
    contacts:`
Manoj Kumar B V - +91 79752 70723
    `,
    registerLink: "https://forms.gle/VoRZoodUtSCuAzVN6"
  }

  , {
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
Event Description:
Vision X is an autonomous robotics challenge that requires teams to design and build a visionbased robot capable of navigating a predefined track using camera-based processing and realtime decision-making.
Type of Event: Open to B.E. and B.Tech students only. Category:
Technical / Robotics & Embedded Systems Eligibility: Team participation only.
Team Size: 2 to 4 members per team.
Objective: To achieve fully autonomous navigation using camera-based vision only.
Main Processor: Raspberry Pi 3 / 4 / 5 (mandatory for vision processing).
Camera: Pi Camera or USB Camera.
Secondary Controllers: Arduino or ESP32 are allowed only for motor control.
Robot Specifications: Fully autonomous; maximum size 20 × 20 × 20cm; battery-powered; any chassis configuration is allowed.
Track & Arena: The arena will consist of a visible navigation path with turns. Only vision-based path following is permitted. The track layout will be decided by the organizers.
Gameplay & Scoring: Each team will be given two attempts, and the best run will be considered. The time limit is 5 minutes per run.
Touching the track boundaries or exiting the track will result in penalties. The winner will be determined based on successful completion and the fastest time.
Rules and Regulations:
The robot must operate fully autonomously without any manual control during the run.
Only one team member is allowed near the arena during the robot’s run.
The robot must comply with the specified size and hardware constraints.
Unsafe robots or designs that pose risk to participants or equipment will be disqualified.
Any form of unfair practice or violation of event guidelines will lead to disqualification.
The judges’ decision shall be final and binding in all matters related to the event.
`,
    time:"11:00 AM - 1:30 PM",
    date:"26-03-2026",
    venue:"TBD",
    type:"Under Graduate",
    contacts:`
Rakshan R Adapa - +91 90192 35817
Prajnesh - +91 81056 78286
    `,
    registerLink: "https://forms.gle/FGRMwQt7m8ZAAtuc8"
  }

  , {
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
Event Description:
Gen AI Prompt Engineering Battle is a competitive event that challenges participants to design effective, creative, and optimized prompts to generate high-quality outputs using approved Large Language Models (LLMs).
The event evaluates strategic thinking, clarity, originality, and understanding of AI systems.
Type of Event: Open to B.E. and B.Tech students only. Category:
Technical / Artificial Intelligence.
Eligibility: Individual participation or team participation (maximum 2 members per team).
Event Format: Multiple rounds as decided by the organizers.
Allowed Tools: Approved LLMs only (ChatGPT, Gemini, LLAMA).
Rules and Regulations:
Participants must create original prompts during the event.
Pre-prepared prompts are not allowed.
Internet browsing, external prompt libraries, or external assistance are strictly prohibited.
Only the approved AI tools specified by the organizers may be used.
Participants may be required to explain their prompt strategy and approach to the judges.
Any form of malpractice or violation of event guidelines will lead to immediate disqualification.
The judges’ decision shall be final and binding in all matters related to the event.
`,
    time:"11:00 AM - 1:30 PM",
    date:"26-03-2026",
    venue:"TBD",
    type:"Under Graduate",
    contacts:`
Joswin Mendonca - +91 76192 55171
Omkar Bhute - +91 78922 07231
    `,
    registerLink: "https://forms.gle/BLcehMxwsd6xKQ1V9"
  }

  , {
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
Event Description:
Robo Soccer is a competitive robotics event where teams design and control a custom-built robot to play a fast-paced soccer match in a structured arena. The event tests design efficiency, control precision, and strategic gameplay.
Type of Event: Open to B.E. and B.Tech students only.
Category: Technical / Robotics.
Eligibility: Team participation only.
Team Size: 2 to 4 members per team; one bot per team (the same members may form multiple teams).
Match Format: 3 minutes total(2 halves of 1.5 minutes each)
Arena Size: 7 ft × 5 ft. Robot Specifications: Maximum dimensions 35 × 35 cm; maximum weight 5 kg (±5% tolerance); operating voltage not exceeding 12.5 V. LEGO kits or pre-made robotic kits are strictly prohibited. Control & Power: Robots may be wired or wireless. Power may be supplied via onboard battery or a stationary supply through a cord.
Rules and Regulations:
The robot must not remain immobile for more than 10 seconds during gameplay.
Pushing the opponent’s robot into the goal area is allowed; however, deliberate damaging actions are prohibited.
Push mechanisms, power-up mechanisms, or locking mechanisms are strictly prohibited.
Each team is allowed one 60-second technical timeout per match.
A one-minute halftime break will be provided, during whic teams must swap sides of the court.
Any unsafe robot design or violation of the specified constraints will result in disqualification.
The judges’ decision shall be final and binding in all matters related to the event.
`,
    time:"11:00 AM - 1:30 PM",
    date:"26-03-2026",
    venue:"TBD",
    type:"Under Graduate",
    contacts:`
Krishna Prasad - +91 94821 61894
    `,
    registerLink: "https://forms.gle/6apYkHqobrSPx3nC8"
  }

  , {
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
Event Description:
Tidal Clash is a high-intensity financial strategy competition where teams navigate capital restructuring, manage liquidity crises, execute dynamic hedging strategies, and optimize riskadjusted returns under extreme market volatility. The challenge tests analytical thinking, financial acumen, and strategic decision-making to achieve peak performance while maintaining fiscal stability.
Type of Event: Open to MBA students only.
Category: Finance / Strategy.
Eligibility: Team participation only.
Team Size: 2 members per team.
Rules and Regulations:
Teams must develop strategies to manage capital restructuring and liquidity challenges within the given scenario.
Participants are expected to apply financial analysis, risk management, and hedging techniques to optimize outcomes.
All decisions must be based on the information and data provided during the competition.
Any form of external assistance or unfair practice will lead to disqualification.
Teams must adhere strictly to the time limits prescribed for each round or phase.
The judges’ decision shall be final and binding in all matters related to the event.
`,
    time:"11:00 AM - 1:30 PM",
    date:"26-03-2026",
    venue:"TBD",
    type:"MBA",
    contacts:`
Tushar G - + 91 80883 65972
    `,
    registerLink: "https://forms.gle/NmLoVBH6hQ6SjHDr9"
  }


  , {
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
Event Description:
The Titans is a high-stakes financial strategy competition where teams navigate capital restructuring, manage liquidity crises, execute dynamic hedging strategies, and optimize riskadjusted returns under extreme market volatility. The event tests strategic thinking, financial expertise, and decision-making under pressure to achieve sustainable fiscal performance and peak alpha.
Type of Event: Open to MBA students only.
Category: Finance / Strategy.
Eligibility: Team participation only.
Team Size: 2 members per team.
Rules and Regulations:
Teams must analyze the given financial scenario and formulate effective restructuring and liquidity management strategies.
Participants are expected to apply dynamic hedging and risk management techniques to optimize returns.
All decisions must be based solely on the data and information provided during the competition.
External assistance or any form of unfair practice will result in immediate disqualification.
Teams must strictly adhere to the prescribed time limits for each stage of the event.
The judges’ decision shall be final and binding in all matters related to the event.
`,
    time:"11:00 AM - 1:30 PM",
    date:"26-03-2026",
    venue:"TBD",
    type:"MBA",
    contacts:`
Tushar G - +91 80883 65972
    `,
    registerLink: "https://forms.gle/usWJs5oXeUQfvBSP7"
  }

  , {
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
Event Description:
Aqua Imperium is an advanced financial strategy competition where teams navigate capital restructuring challenges and liquidity crunches under extreme market volatility. Participants must apply dynamic hedging techniques and optimize risk-adjusted returns to maintain fiscal solvency and achieve peak alpha in a high-pressure environment.
Type of Event: Open to MBA students only.
Category: Finance / Strategy
Eligibility: Team participation only.
Team Size: 2 members per team.
Rules and Regulations:
Teams must analyze the provided financial scenario and develop effective capital restructuring and liquidity management strategies.
Participants are expected to implement dynamic hedging and risk optimization techniques within the given constraints.
All decisions must be based solely on the data and information provided during the competition.
External assistance or any form of unfair practice will lead to immediate disqualification.
Teams must adhere strictly to the prescribed time limits for each stage of the event.
The judges’ decision shall be final and binding in all matters related to the event.
`,
    time:"11:00 AM - 1:30 PM",
    date:"26-03-2026",
    venue:"TBD",
    type:"MBA",
    contacts:`
Tushar G - +91 80883 65972
    `,
    registerLink: "https://forms.gle/vEG2i4ByzwdbeEN38"
  }

  , {
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
Event Description:
Tide of Talents is an intensive HR-focused competition designed to evaluate workforce agility, cognitive bandwidth, decision-making speed, and situational judgment. The event emphasizes talent orchestration, behavioral insight, and people-centric strategy under high-pressure business scenarios.
Type of Event: Open to MBA students only.
Category: Human Resource Management / Strategy Eligibility:
Team participation only.
Team Size: 2 members per team.
Rules and Regulations:
Teams must analyze the given HR scenarios and propose effective people-centric strategies.
Participants are expected to demonstrate strong decision-making skills, behavioral insight, and strategic thinking.
All responses must be based solely on the information provided during the competition.
External assistance or any form of unfair practice will result in immediate disqualification.
Teams must strictly adhere to the prescribed time limits for each stage of the event.
The judges’ decision shall be final and binding in all matters related to the event.
`,
    time:"11:00 AM - 1:30 PM",
    date:"26-03-2026",
    venue:"TBD",
    type:"MBA",
    contacts:`
Tushar G - +91 80883 65972
    `,
    registerLink: "https://forms.gle/kC9gBv4XjHV2rP1d7"
  }

  , {
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
Event Description:
IT Manager Challenge is a managerial simulation event designed to assess leadership qualities, technical expertise, strategic thinking, and professional conduct in an IT management environment.
Type of Event: Open to MCA students only.
Category: Technical / Management
Eligibility: Team participation only.
Team Size: Exactly 4 members per team.
Rules and Regulations:
Each team must consist of exactly four members.
All participants must carry at least one copy of their resume.
Formal attire is mandatory for all participants.
Mobile phones are strictly prohibited during all rounds of the competition.
Laptops are not allowed unless explicitly permitted by the organizers.
Any form of malpractice will lead to immediate disqualification.
The judges’ decision shall be final and binding in all matters related to the event.
`,
    time:"11:00 AM - 1:30 PM",
    date:"26-03-2026",
    venue:"TBD",
    type:"MCA",
    contacts:`
K Vivek Acharya - +91 96865 06530
    `,
    registerLink: "https://forms.gle/ghZUniSs5oWVNoTW7"
  }

  , {
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
Event Description:
Code Red is a problem-solving and analytical challenge where teams must investigate clues, analyze scenarios, and apply logical reasoning to identify the culprit and determine the motive behind a simulated case.
Type of Event: Open to MCA students only.
Category: Technical / Analytical Challenge.
Eligibility: Team participation only.
Team Size: 3 members per team.
Rules and Regulations:
Each team must consist of three participants.
The use of mobile phones, laptops, or any electronic devices is strictly prohibited.
Inter-team discussion or collaboration is not allowed during the competition.
The winning criteria will be based on the correct identification of the murderer and the motive.
Any form of malpractice will lead to immediate disqualification.
The judges’ decision shall be final and binding in all matters related to the event.
`,
    time:"11:00 AM - 1:30 PM",
    date:"26-03-2026",
    venue:"TBD",
    type:"MCA",
    contacts:`
K Vivek Acharya - +91 96865 06530
    `,
    registerLink: "https://forms.gle/uc1PBgBewC7FJ4Xu7"
  }

  , {
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
Event Description: Next Node is a sequential clue-based
technical challenge where teams must solve interconnected
problems in a structured progression. The event tests logical
thinking, technical aptitude, and systematic problem-solving
skills.
Type of Event: Open to MCA students only.
Category: Technical / Problem-Solving.
Eligibility: Team participation only.
Team Size: 2 members per team (one Laptop per team).
Rules and Regulations:
Teams must consist of exactly two participants and use only
one Laptop per team.
Clue-based rounds must be solved in sequence. Revisiting
previous rounds is not permitted.
Refreshing pages, manipulating URLs, or attempting to
bypass rounds will lead to immediate disqualification.
Any form of malpractice or answer sharing with other teams
is strictly prohibited.
Participants must follow the instructions provided by the
event coordinators throughout the competition.
The coordinators’ decision shall be final and binding in all
matters related to the event.
`,
    time:"11:00 AM - 1:30 PM",
    date:"26-03-2026",
    venue:"TBD",
    type:"MCA",
    contacts:`
K Vivek Acharya - +91 96865 06530
    `,
    registerLink: "https://forms.gle/ZnZFKYHYmdLRnAzu8"
  }


  , {
    id: 31,
    title: "Battle of Bands",
    main: true,
    description: "",
    category: "Main",
    image: "/events/battlebands.webp",
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

  , {
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


  , {
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
    time:"2:00 PM - 3:15 PM",
    date:"26-03-2026",
    venue:"TBD",
    type:"Open to All",
    contacts:`
Sinchana - 91 72045 76056
Khushi – +91 77600 12018
    `,
    registerLink: "https://forms.gle/r1kXkcSCXPfMMV2e9"
  }

  , {
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
    time:"11:00 AM - 1:30 PM",
    date:"26-03-2026",
    venue:"TBD",
    type:"Open to All",
    contacts:`
Sinchana - 91 72045 76056
Khushi – +91 77600 12018
    `,
    registerLink: "https://forms.gle/49biFbF87CArGKvj6"
  }

]

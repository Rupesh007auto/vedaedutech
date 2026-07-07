export const stats = [
  { label: "Students Empowered", end: 45000, suffix: "+" },
  { label: "CSP Learning Centers", end: 320, suffix: "+" },
  { label: "States Reached", end: 3, suffix: "" },
  { label: "Expert Educators", end: 280, suffix: "+" },
];

export const whyChooseUs = [
  {
    title: "Technology-First Classrooms",
    description: "Interactive smart boards, curated digital content, and structured lesson plans bring every subject to life.",
    icon: "Monitor",
  },
  {
    title: "Community Learning Centers",
    description: "Our CSP network brings quality education directly into underserved towns and villages across Haryana, UP, and Bihar.",
    icon: "Building2",
  },
  {
    title: "Outcome-Driven Curriculum",
    description: "Every course is mapped to measurable learning outcomes, tracked through regular assessments and progress reports.",
    icon: "Target",
  },
  {
    title: "Affordable & Accessible",
    description: "Flexible fee structures and scholarship programs ensure no student is left behind due to financial constraints.",
    icon: "HeartHandshake",
  },
  {
    title: "Trained Local Educators",
    description: "We recruit and train educators from within the communities we serve, creating local employment and trusted mentorship.",
    icon: "Users",
  },
  {
    title: "Parent-Teacher Connect",
    description: "Regular progress updates and open communication channels keep parents informed and involved in their child's growth.",
    icon: "MessageSquare",
  },
];

export const testimonials = [
  {
    name: "Rekha Devi",
    role: "Parent, Muzaffarpur CSP Center, Bihar",
    quote:
      "My daughter used to struggle with English. After six months at the VedaEdutech center, she confidently reads and speaks in class. The teachers genuinely care.",
    rating: 5,
  },
  {
    name: "Amit Kumar",
    role: "Class 10 Student, Ghaziabad, UP",
    quote:
      "The smart class sessions made concepts I found difficult in school finally make sense. The practice tests helped me improve my board exam scores significantly.",
    rating: 5,
  },
  {
    name: "Suresh Yadav",
    role: "Franchise Partner, Haryana",
    quote:
      "Partnering with VedaEdutech gave me a ready curriculum, marketing support, and a trained team structure. My center broke even within the first year.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Teacher, Patna CSP Center",
    quote:
      "The training and teaching resources provided by VedaEdutech let me focus on what matters most — actually helping students learn and grow.",
    rating: 5,
  },
];

export const timeline = [
  { year: "2018", title: "Vedavaag Systems Ltd Founded", description: "Began as a technology and services company with a vision to bridge India's digital and educational divide." },
  { year: "2020", title: "First CSP Learning Center", description: "Launched our first community learning center in rural Bihar, combining digital literacy with core academics." },
  { year: "2022", title: "Expansion to UP & Haryana", description: "Scaled the CSP network to over 150 centers, introducing smart classrooms and structured teacher training." },
  { year: "2024", title: "VedaEdutech Platform Launch", description: "Introduced our dedicated online learning platform, course catalog, and franchise program for nationwide growth." },
  { year: "2026", title: "320+ Centers & Growing", description: "Today, VedaEdutech serves 45,000+ students through 320+ centers, with an expanding footprint across India." },
];

export const faqs = [
  {
    question: "What age groups and classes does VedaEdutech support?",
    answer: "We support learners from Nursery through Class 12, along with dedicated skill-development and competitive exam preparation tracks for young adults.",
  },
  {
    question: "How do CSP (Community Service Provider) centers work?",
    answer: "CSP centers are locally-run learning hubs equipped with smart classroom technology and staffed by trained educators, bringing VedaEdutech's curriculum directly to smaller towns and villages.",
  },
  {
    question: "Can I start a VedaEdutech franchise in my city?",
    answer: "Yes. We offer a structured franchise program that includes curriculum access, teacher training, marketing support, and operational guidance. Visit our Franchise page to apply.",
  },
  {
    question: "Are scholarships or fee concessions available?",
    answer: "Yes, need-based scholarships and flexible payment plans are available for eligible students. Speak with your nearest center coordinator or contact our admissions team.",
  },
  {
    question: "How is student progress tracked?",
    answer: "Students receive regular assessments, progress reports, and parent-teacher updates so families can track academic growth throughout the term.",
  },
  {
    question: "Do you offer both online and offline learning?",
    answer: "Yes. Our courses are available in Online, Offline, and Hybrid formats depending on the course and center, giving families the flexibility that works best for them.",
  },
];

export const seedCourses = [
  {
    title: "Smart Class Foundation Program",
    category: "smart-classes",
    description: "A structured K-8 program combining interactive smart-board lessons with hands-on practice worksheets across Math, Science, and English.",
    duration: "12 Months",
    mode: "Hybrid" as const,
    fee: 6000,
    syllabus: ["Foundational Mathematics", "Environmental Science", "English Grammar & Comprehension", "Monthly Assessments"],
    featured: true,
  },
  {
    title: "K-12 Curriculum Support",
    category: "k12",
    description: "Subject-wise support aligned to CBSE/State board syllabi for Classes 9-12, with focused board exam preparation.",
    duration: "10 Months",
    mode: "Offline" as const,
    fee: 8500,
    syllabus: ["Board-Aligned Subject Coaching", "Weekly Mock Tests", "Doubt-Clearing Sessions", "Exam Strategy Workshops"],
    featured: true,
  },
  {
    title: "Spoken English Mastery",
    category: "spoken-english",
    description: "Build confidence in everyday and professional English communication through structured speaking practice and vocabulary building.",
    duration: "3 Months",
    mode: "Hybrid" as const,
    fee: 2500,
    syllabus: ["Conversational Practice", "Grammar Fundamentals", "Public Speaking", "Interview Preparation"],
    featured: true,
  },
  {
    title: "Computer Basics & Digital Literacy",
    category: "computer",
    description: "An entry-level program covering computer fundamentals, MS Office, internet safety, and basic typing skills.",
    duration: "2 Months",
    mode: "Offline" as const,
    fee: 1800,
    syllabus: ["Computer Fundamentals", "MS Word, Excel & PowerPoint", "Internet & Email Basics", "Typing Practice"],
    featured: false,
  },
  {
    title: "Competitive Exam Preparation",
    category: "competitive",
    description: "Targeted preparation for state-level scholarship exams and entrance tests with regular practice tests and mentorship.",
    duration: "6 Months",
    mode: "Hybrid" as const,
    fee: 5000,
    syllabus: ["Quantitative Aptitude", "Reasoning & Logic", "General Knowledge", "Full-Length Mock Exams"],
    featured: false,
  },
  {
    title: "Vocational Skills Training",
    category: "vocational",
    description: "Practical, job-oriented training in tailoring, beautician skills, and basic electronics for post-school career readiness.",
    duration: "4 Months",
    mode: "Offline" as const,
    fee: 3200,
    syllabus: ["Hands-On Practical Sessions", "Industry Exposure Visits", "Certification on Completion", "Placement Assistance"],
    featured: false,
  },
];

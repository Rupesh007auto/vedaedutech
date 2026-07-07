export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Courses",
    href: "/courses",
    mega: [
      {
        heading: "Academic Programs",
        links: [
          { label: "Smart Classes", href: "/courses?category=smart-classes" },
          { label: "K-12 Curriculum Support", href: "/courses?category=k12" },
          { label: "Spoken English", href: "/courses?category=spoken-english" },
        ],
      },
      {
        heading: "Skill & Career",
        links: [
          { label: "Computer Basics", href: "/courses?category=computer" },
          { label: "Competitive Exam Prep", href: "/courses?category=competitive" },
          { label: "Vocational Training", href: "/courses?category=vocational" },
        ],
      },
    ],
  },
  { label: "Admissions", href: "/admissions" },
  { label: "Franchise", href: "/franchise" },
  { label: "CSP", href: "/csp" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Career", href: "/career" },
  { label: "Contact", href: "/contact" },
];

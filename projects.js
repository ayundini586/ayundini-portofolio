/*
  Portfolio project data.
  This shape can be mapped to Supabase later without changing the card layout.
*/
window.portfolioProjects = [
  {
    slug: "airline-flight-performance-data-warehouse",
    title: "Airline Flight Performance Data Warehouse",
    category: "Data Engineering / Business Intelligence",
    type: "Independent project",
    description: "An end-to-end analytics workflow that transforms January 2015 U.S. flight data into a dimensional warehouse, SQL analysis layer, and interactive Power BI dashboard.",
    contribution: "Built independently from raw-data preprocessing and dimensional modeling through Pentaho ETL, SQL analysis, KPI definition, and dashboard design.",
    technologies: ["Python", "Pandas", "MySQL", "MariaDB", "Pentaho", "SQL", "Power BI"],
    image: "assets/projects/airline-dashboard.png",
    imageAlt: "Power BI dashboard showing U.S. airline flight performance metrics",
    repository: "https://github.com/ayundini586/airline-flight-performance-data-warehouse",
    demo: "https://app.powerbi.com/view?r=eyJrIjoiMDRlNzAwYzEtZTE1Yi00ODE5LWI1N2YtY2E5OTA1NmJhMmYxIiwidCI6IjM0ODViOTYzLTgyYmEtNGE2Zi04MTBmLWI1Y2MyMjZmZjg5OCIsImMiOjEwfQ%3D%3D",
    demoLabel: "View live dashboard",
    featured: true,
    metrics: [
      { value: "469,968", label: "January flights" },
      { value: "20.42%", label: "Delay rate" },
      { value: "2.55%", label: "Cancellation rate" }
    ],
    pipeline: ["Raw CSV", "Python", "Staging", "Pentaho ETL", "Data Warehouse", "Power BI"]
  },
  {
    slug: "employee-attrition-tableau-dashboard",
    title: "Employee Attrition HR Analytics",
    category: "Data Visualization / HR Analytics",
    type: "Group project · Co-developer",
    description: "Two Tableau dashboards exploring attrition across 14,900 employee records, with executive and analyst views for workforce, retention, compensation, and employee-experience patterns.",
    contribution: "Developed and refined Tableau dashboards, supported KPI and layout design, and analyzed employee attrition insights.",
    technologies: ["Tableau", "Data Visualization", "HR Analytics"],
    image: "assets/projects/employee-attrition.png",
    imageAlt: "Tableau executive dashboard showing employee attrition metrics",
    repository: "https://github.com/ayundini586/employee-attrition-tableau-dashboard",
    featured: false,
    theme: "mint"
  },
  {
    slug: "equihire",
    title: "EquiHire Recruitment Platform",
    category: "Full-stack Web Application",
    type: "Group project · Integration support",
    description: "A role-based recruitment platform for job seekers, companies, and administrators, covering vacancy approval, CV review, applications, and applicant tracking.",
    contribution: "Tested complete recruitment workflows and resolved integration issues across the React frontend, Express API, CV upload flow, and SQL Server database.",
    technologies: ["React", "Node.js", "Express", "SQL Server", "JWT"],
    image: "assets/projects/equihire.png",
    imageAlt: "EquiHire job seeker home and job search interface",
    repository: "https://github.com/ayundini586/EquiHire",
    featured: false,
    theme: "lavender"
  },
  {
    slug: "myfood-plus",
    title: "MyFood+ Meal Planning App",
    category: "Mobile Application / API Integration",
    type: "Group project · Testing & debugging",
    description: "A mobile recipe discovery and meal-planning application with recipe search, favorites, a meal calendar, PostgreSQL persistence, and a basic meal-classification component.",
    contribution: "Tested user flows and backend endpoints, verified PostgreSQL connectivity, and identified frontend–backend and Python environment integration issues.",
    technologies: ["React Native", "Expo", "Express", "PostgreSQL", "Python"],
    image: "assets/projects/myfood-plus.png",
    imageAlt: "MyFood Plus recipe recommendation and meal planning interface",
    repository: "https://github.com/ayundini586/myfood-plus",
    featured: false,
    theme: "cream"
  },
  {
    slug: "shipdeckk",
    title: "ShipDeCKK Maritime Website",
    category: "Responsive Web Development",
    type: "Independent project",
    description: "A responsive multi-page company profile for a fictional maritime vessel dealer, featuring a product gallery, services, company information, and validated client-side forms.",
    contribution: "Designed and developed independently as a Human–Computer Interaction course project.",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    image: "assets/projects/shipdeckk.png",
    imageAlt: "ShipDeCKK maritime company profile homepage",
    repository: "https://github.com/ayundini586/ShipdecKK",
    demo: "https://ayundini586.github.io/ShipdecKK/",
    featured: false,
    theme: "blue"
  }
];

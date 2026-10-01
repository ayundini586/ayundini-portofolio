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

    description: "An end-to-end data engineering project analyzing January 2015 U.S. flight performance through ETL, SQL, and BI.",

    detailOverview: "This project transforms January 2015 U.S. flight data into a structured dimensional warehouse for analyzing flight delays and cancellations. The workflow covers raw-data preprocessing, ETL, SQL analysis, KPI development, and interactive BI reporting.",

    detailHeading: "Business questions",
    detailItems: [
      "Which airports and routes account for the largest delay volumes?",
      "Which airlines show higher average arrival delays?",
      "How do delay rates vary by day and what causes contribute to delays?"
    ],

    contribution: "Built independently from raw-data preprocessing and dimensional modeling through Pentaho ETL, SQL analysis, KPI definition, and dashboard design.",

    technologies: [
      "Python",
      "Pandas",
      "MySQL",
      "MariaDB",
      "Pentaho",
      "SQL",
      "Power BI"
    ],

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

    pipeline: [
      "Raw CSV",
      "Python",
      "Staging",
      "Pentaho ETL",
      "Data Warehouse",
      "Power BI"
    ]
  },

  {
    slug: "employee-attrition-tableau-dashboard",
    title: "Employee Attrition HR Analytics",
    category: "Data Visualization / HR Analytics",
    type: "Group project · Co-developer",

    description: "Two Tableau dashboards exploring employee attrition, workforce trends, and employee experience across 14,900 records.",

    detailOverview: "This project explores employee attrition across 14,900 records and five industries through two Tableau views: an executive dashboard and a more detailed analyst view.",

    detailHeading: "What we analyzed",
    detailItems: [
      "Attrition, workforce, and termination trends",
      "Job satisfaction and work-life balance",
      "Compensation, education, gender, and job-related patterns"
    ],

    contribution: "Developed and refined Tableau dashboards, supported KPI and layout design, and analyzed employee attrition insights.",

    technologies: [
      "Tableau",
      "Data Visualization",
      "HR Analytics"
    ],

    image: "assets/projects/employee-attrition.png",
    imageAlt: "Tableau executive dashboard showing employee attrition metrics",

    repository: "https://github.com/ayundini586/employee-attrition-tableau-dashboard",
    demo: "https://public.tableau.com/app/profile/ayundini.nursyahrin/viz/Group7HRDashboard_17907712388390/ANALYST?publish=yes",
    demoLabel: "View live dashboard",


    featured: false,
    theme: "mint"
  },

  {
    slug: "equihire",
    title: "EquiHire Recruitment Platform",
    category: "Full-stack Web Application",
    type: "Group project · Integration support",

    description: "A role-based recruitment platform connecting job seekers, companies, and administrators through a complete recruitment workflow.",

    detailOverview: "EquiHire is a full-stack recruitment platform designed around different user roles. The system supports the recruitment process from vacancy management and applications to CV review and applicant tracking.",

    detailHeading: "Platform scope",
    detailItems: [
      "Job vacancy creation, approval, and management",
      "Job searching, applications, and CV submission",
      "Applicant tracking and role-based administration"
    ],

    contribution: "Tested complete recruitment workflows and resolved integration issues across the React frontend, Express API, CV upload flow, and SQL Server database.",

    technologies: [
      "React",
      "Node.js",
      "Express",
      "SQL Server",
      "JWT"
    ],

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

    description: "A mobile recipe and meal-planning app for discovering recipes, saving favorites, and organizing meals.",

    detailOverview: "MyFood+ is a mobile application that combines recipe discovery with meal planning. The application connects a React Native frontend with backend services and PostgreSQL persistence, with an additional meal-classification component.",

    detailHeading: "What the app supports",
    detailItems: [
      "Recipe discovery and search",
      "Favorites and meal calendar management",
      "Backend API, database, and meal-classification integration"
    ],

    contribution: "Tested user flows and backend endpoints, verified PostgreSQL connectivity, and identified frontend–backend and Python environment integration issues.",

    technologies: [
      "React Native",
      "Expo",
      "Express",
      "PostgreSQL",
      "Python"
    ],

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

    description: "A responsive multi-page maritime website showcasing vessels, services, company information, and contact interactions.",

    detailOverview: "ShipDeCKK is a responsive company profile website created for a fictional maritime vessel dealer. The project focuses on presenting vessel products and company information through a structured multi-page interface.",

    detailHeading: "Website scope",
    detailItems: [
      "Vessel product gallery and detailed information",
      "Company services and business information",
      "Responsive layouts and client-side form validation"
    ],

    contribution: "Designed and developed independently as a Human–Computer Interaction course project.",

    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript"
    ],

    image: "assets/projects/shipdeckk.png",
    imageAlt: "ShipDeCKK maritime company profile homepage",

    repository: "https://github.com/ayundini586/ShipdecKK",

    demo: "https://ayundini586.github.io/ShipdecKK/",

    featured: false,
    theme: "blue"
  }
];
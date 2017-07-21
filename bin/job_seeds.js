/*jshint esversion: 6*/
const mongoose = require('mongoose');
const portDB = require('../config').portDB;
// const databaseName = require('../config').databaseName;
// mongoose.connect(`mongodb://localhost:${portDB}/${databaseName}`);
const dotenv = require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI);
const Job = require('../models/jobs');

const jobs = [
  {
    title: "Junior Back-End Developer",
    company: "Sellbytel",
    salary: "15.000",
    city: "Barcelona",
    country: "Spain",
    duration: "Full-Time",
    languages: "English",
    requirements: "1 year of experience",
    description: "Familiar with Node.js, Experience with HTTP protocols,  Good Communication Skills"
  },
  {
    title: "Front-End Developer",
    company: "ISS Professionalia",
    salary: "10.000",
    city: "Barcelona",
    country: "Spain",
    duration: "6-months contract",
    languages: "Spanish, Catalan",
    requirements: "2 years experience",
    description: "Can build beautiful responsive designs, HTML5, CSS, Javascript, JQuery"
  },
  {
    title: "Junior Full Stack Developer",
    company: "Start Ups",
    salary: "",
    city: "Barcelona",
    country: "Barcelona",
    duration: "full-time",
    languages: "Spanish is a must",
    requirements: "A la banda salarial hay que añadirle beneficios adicionales El Talento ha de dominar lenguaje Backend y Frontend (C++, C#, Java, PHP, Html5, JavaScript, CSS, etc.",
    description: "Estamos buscando a un desarrollador/a que haya llevado a cabo un proyecto en su totalidad (Frontend, Backend, Server site) para participar en diversos proyectos que tiene la compañía en march"
  },
  {
    title: "Java Software Developer at Dexma",
    company: "Dexma",
    salary: "Undiscolsed",
    city: "Barcelona",
    country: "Spain",
    duration: "full-time",
    languages: "Spanish is a must",
    requirements: "DEXMA is a SaaS startup based in Barcelona. We build software that tackles one of the world’s greatest challenges: saving energy. Our customers provide us with millions of energy measurements from their buildings’ consumption every day, which we analyze in real time.\n We are looking for a Java Software Engineer to join our team. You’ll be involved in the entire platform stack, which is a distributed system composed of dozens of modules, written mostly in Java 8 and Python, using backends such as Apache Storm, MongoDB and PostgreSQL. You’ll also develop high-quality code for our existing and new software products, with high availability and scalability standards, frequent releases thanks to TDD, CI and automated deployment.",
    description: "Great company to work for!"
  },
  {
    title: "Java Developer at Zopa",
    company: "Zopa",
    salary: "Undisclosed",
    city: "Barcelona",
    country: "Spain",
    duration: "full-time",
    languages: "Spanish,English",
    requirements: "At Zopa we're pragmatic programmers - both the cutting edge and the tried and tested get a voice. All of our Java infrastructure is deployed with Docker/Kubernetes when we need to via CI (Jenkins) and a completely automated test suite."
  },
  {
    title: "Mid-level / Senior full stack developer at SonoSuite",
    company: "SonoSuite",
    salary: "30.000-36.000",
    city: "Barcelona",
    country: "Spain",
    duration: "full-time",
    languages: "Spanish",
    requirements: "VUE.js,Spanish,PHP,LAMP,JIRA,JavaScript, English",
    description: "For us IT is not an aftertought, it is one of the cornerstones of our strategy. Our development team is responsible for an in-house born and raised SaaS digital distribution and royalties management solution."
  },
  {
    title: "Senior Ruby on Rails developer at Footy Addicts",
    company: "Footy Addicts",
    salary: "30.000-33.000",
    city: "Madrid",
    country: "Spain",
    duration: "full-time",
    languages: "Spanish, English",
    requirements: "Ruby on Rails, PostgreSQL",
    description: "At Footy Addicts we are looking for a full-time senior Ruby on Rails developer to work for fast-growing, innovative product. We are looking for someone brilliant and intelligent, with experience and expertise. Someone who loves to stay in touch with new technologies and wants to create a revolutionary product with us."
  },
  {
    title: "Senior Accountant / GL Specialist",
    company: "Packink",
    salary: "Undiscolsed",
    city: "Madrid",
    country: "Spain",
    duration: "full-time",
    languages: "Spanish,English",
    requirements: "Finance, Accounting",
    description: "Logistics"
  },
  {
    title: "Data Scientist at Nextail",
    company: "Nextail",
    salary: "Undisclosed",
    city: "Madrid",
    country: "Spain",
    duration: "full-time",
    languages: "Spanish,English",
    requirements: "Python,SQL,Ruby,Java,JavaScript,Project Management,C#,Machine Learning, SEO, TypeScript",
    description: "We want you to be a passionate of data. Data is one of the main assets of our company, so we want to nurture and make the most out of it. Experience in data visualization, data munging and descriptive analytics is a must."
  },
  {
    title: "Operations Manager - Iberia (Marketplace Efficiency) at Uber",
    company: "Uber",
    salary: "undisclosed",
    city: "Madrid",
    country: "Spain",
    duration: "full-time",
    languages: "Spanish,English",
    requirements: "SQL, Operations",
    description: "Someone to manager and make our operations more efficient."
  },
  {
    title: "Android Developer at Heetch",
    company: "Heetch",
    salary: "Undisclosed",
    city: "Paris",
    country: "France",
    duration: "full-time",
    languages: "French,Spanish,English",
    requirements: "Java, Android",
    description: "Simply put, we aim at offering the most playful ridesharing experience for party-goers, and the most satisfying night out for drivers. Our app is the centerpiece of the whole service, where drivers are able to get ride requests, where passengers are able to request rides, and where everyone is able to get in touch with us directly at anytime."
  },
  {
    title: "Senior Fullstack JS Developer at Content Square",
    company: "Content Square",
    salary: "55.000-65.000",
    city: "Paris",
    country: "France",
    duration: "full-time",
    languages: "French, English",
    requirements: "Nodejs,JavaScript,HTML,CSS,API,Angular",
    description: "Our technical team needs you to deal with performance issues / real time and big amount of data. In figures: 2 to 3 production launch per week, 150 000 requests per second, 250 000 tracking…"
  },
  {
    title: "UI/UX Designer in London",
    company: "Trouva",
    salary: "Undisclosed",
    city: "London",
    country: "England",
    duration: "Contract",
    languages: "French",
    requirements: "UI/UX, Sketch,JQuery,HTML,CSS",
    description: "We are looking for a UI/UX enginer that is awesome!"
  },
  {
    title: "Front End Developer - Javascript, CSS, HTML (Market Rate Salary plus share options) in London",
    company: "Logical Glue",
    salary: "Undisclosed",
    city: "London",
    country: "England",
    duration: "full-time",
    languages: "French",
    requirements: "React,javascript,HTML, Ember,CSS,Angular",
    description: "We are a fast-growing business within the cutting edge world of Big Data. Companies are increasingly making data driven decisions. Our goal at Logical Glue is to put machine learning directly into the hands of business experts and analysts, not just data scientists, so they can rapidly extract and operationalize highly accurate and actionable insights from their data. Due to growth, we're now looking for an exceptional Front-End Developer with demonstrable experience in Javascript, HTML and CSS to join us."
  },
  {
    title: "Senior Back End Python (Django) Developer in London",
    company: "Festicket",
    salary: "50,000",
    city: "London",
    country: "England",
    duration: "full-time",
    languages: "multi",
    requirements: "Python,Postgre, Continuous Integration, APIs",
    description: "Festicket is transforming the way music fans discover and book tickets and travel packages for festivals around the world. Our platform revolutionises the music festival industry by offering an end-to-end experience for music travellers through an efficient two-sided marketplace for 700+ music festivals across 45 different countries! In four short years, we have become Europe's largest music festival platform. 🚀"
  },
  {
    title: "Junior Operations Analyst – Middle Office in Amsterdam",
    company: "Safend",
    salary: "30,000",
    city: "Amsterdam",
    country: "Netherlands",
    duration: "full-time",
    languages: "English,Dutch",
    requirements: "MS Office, English, Analytical",
    description: "Come analyze stuff to analyze how you analyze things"
  },
  {
    title: "Senior Mobile Developer (Android) ",
    company: "Bunq",
    salary: "100,000",
    city: "Amsterdam",
    country: "Netherlands",
    duration: "full-time",
    languages: "English",
    requirements: "UX/UI,LAMP,Java,Android",
    description: "As our Senior Android Developer you will work with the absolute best. You get freedom and responsibility, so we expect a lot. Working in an outstanding startup culture and the chance of doing something truly disruptive are the greatest perks of the job. Do you want to be part of a game-changing initiative? This is your chance."
  },
  {
    title: "Country Manager at Bookabus",
    company: "Bookabus",
    salary: "15,000",
    city: "Amsterdam",
    country: "Netherlands",
    duration: "part-time",
    languages: "multi",
    requirements: "People Skills",
    description: "We book your bus so you don't have to bust your ass finding one"
  }
];

Job.create(jobs, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach((job) => {
    console.log(job.name);
  });
  mongoose.connection.close();
});

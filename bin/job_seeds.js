const mongoose = require('mongoose');
const portDB = require('../config').portDB;
const databaseName = require('../config').databaseName;
mongoose.connect(`mongodb://localhost:${portDB}/${databaseName}`);
const Job = require('../models/jobs');

const jobs = [
  {
    title: "Junior Back-End Developer",
    company: "Sellbytel",
    salary: 15,
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
    salary: 10,
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
  }
];

Job.create(jobs, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach((job) => {
    console.log(job.name)
  });
  mongoose.connection.close();
});
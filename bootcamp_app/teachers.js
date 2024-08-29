const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx"
});

const process = require('process');
const cohort = process.argv[2];

pool.query(`
  SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
  FROM teachers
  JOIN assistance_requests ON teachers.id = teacher_id
  JOIN students ON students.id = student_id
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name = $1
  ORDER BY teacher;
  `,[cohort])
  .then(res => {
    res.rows.forEach(assistance => {
      console.log(`${assistance.cohort}: ${assistance.teacher}`);
    });
  })
  .catch(err => console.error("query error:", err.stack));
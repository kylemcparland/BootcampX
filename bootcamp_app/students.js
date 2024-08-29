const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx"
});

const process = require('process');
const month = process.argv[2];
const limit = process.argv[3];

pool.query(`
  SELECT students.id AS student_id, students.name AS name, cohorts.name AS cohort
  FROM students
  JOIN cohorts ON cohort_id = cohorts.id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `, [month + '%', limit])
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    });
  })
  .catch(err => console.error("query error:", err.stack));
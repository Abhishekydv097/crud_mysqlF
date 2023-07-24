const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");

router.post("/create", (req, res) => {
  const {
    name,
    email,
    age,
    mobile,
    work,
    add,
    desc,
    region,
    state,
    city,
    priority,
    sourcedThrough,
    leadCreatedBy,
    leadOwner,
  } = req.body;

  if (
    !name ||
    !email ||
    !age ||
    !mobile ||
    !work ||
    !add ||
    !desc ||
    !region ||
    !state ||
    !city ||
    !priority ||
    !sourcedThrough ||
    !leadCreatedBy ||
    !leadOwner
  ) {
    res.status(422).json("Please fill in all data");
    return;
  }

  try {
    conn.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
      if (result.length) {
        res.status(422).json("This data already exists");
      } else {
        const userData = {
          name,
          email,
          age,
          mobile,
          work,
          add,
          desc,
          region,
          state,
          city,
          priority,
          sourcedThrough,
          leadCreatedBy,
          leadOwner,
        };

        conn.query("INSERT INTO users SET ?", userData, (err, result) => {
          if (err) {
            console.log("Error: " + err);
            res.status(500).json("Internal Server Error");
          } else {
            res.status(201).json(req.body);
          }
        });
      }
    });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json("Internal Server Error");
  }
});

// Get user data
router.get("/getusers", (req, res) => {
  conn.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log("Error: " + err);
      res.status(500).json("Internal Server Error");
    } else {
      res.status(200).json(result);
    }
  });
});

// Delete user
router.delete("/deleteuser/:id", (req, res) => {
  const { id } = req.params;

  conn.query("DELETE FROM users WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log("Error: " + err);
      res.status(500).json("Internal Server Error");
    } else {
      res.status(200).json("User deleted successfully");
    }
  });
});

// Get single user
router.get("/induser/:id", (req, res) => {
  const { id } = req.params;

  conn.query("SELECT * FROM users WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log("Error: " + err);
      res.status(500).json("Internal Server Error");
    } else {
      if (result.length) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).json("User not found");
      }
    }
  });
});

// Update user
router.patch("/updateuser/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;

  conn.query("UPDATE users SET ? WHERE id = ?", [data, id], (err, result) => {
    if (err) {
      console.log("Error: " + err);
      res.status(500).json("Internal Server Error");
    } else {
      res.status(200).json("User updated successfully");
    }
  });
});

module.exports = router;

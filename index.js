const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const port = 8000;

//Connect to mongoDB server
mongoose
  .connect("mongodb://127.0.0.1:27017/node_data")
  .then(() => console.log("MongoDB server listening on port 27017"))
  .catch((err) => console.log("Mongo error", err));

//schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: "string",
      required: true,
    },
    lastName: {
      type: "string",
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    jobTitle: {
      type: "string",
    },
    gender: {
      type: "string",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()}: ${req.ip}: ${req.method}: ${req.path}\n`,
    (err, data) => {
      next();
    }
  );
  req.myUserName = "test";
});

// REST API
app.get("/api/users", async (req, res) => {
  const allUsers = await User.find({});

  res.setHeader("X-MyName", "john doe");
  // console.log("first route 2", req.myUserName);
  res.json(allUsers);
});

app.get("/users", async (req, res) => {
  const allUsers = await User.find({});
  const html = `<ul>
    ${allUsers
      .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
      .join("")}
    </ul>`;
  res.send(html);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "error" });
    return res.json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
    res.json({ statusbar: "success" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ statusbar: "success" });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  console.log("result:", result);
  return res.status(200).json({ message: "success" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

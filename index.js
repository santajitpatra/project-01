const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const port = 8000;

//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

// REST API
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/users", (req, res) => {
  const html = `<ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
  res.send(html);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .put((req, res) => {
    res.json({ statusbar: "pending" });
  })
  .delete((req, res) => {
    res.json({ statusbar: "pending" });
  });

// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id)
//   const user = users.find((user) => user.id === id);
//   return res.json(user);
// });

app.post("/api/users", (req, res) => {
  const body = req.body;
  // console.log("body: ", body)
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ statusbar: "pending", id: users.length});
  });
});

// app.patch("/api/users/:id", (req, res) => {
//   res.json({ statusbar: "pending" });
// });

// app.delete("/api/users/:id", (req, res) => {
//   res.json({ statusbar: "pending" });
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

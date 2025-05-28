const express = require("express");
const postsRouter = require("./routes/posts");

const app = express();

// App Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routers
app.use("/posts", postsRouter);

app.get("/", (req, res) => {
    res.json({ message: "Hello, world" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});
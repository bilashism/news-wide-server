const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

const newsCategories = require("./data/newsCategories.json");
const newsDetails = require("./data/newsDetails.json");

app.get("/", (req, res) => {
  res.send("News-Wide running");
});

app.get("/news-categories", (req, res) => {
  res.send(newsCategories);
});

app.get("/category/:id", (req, res) => {
  const categoryId = req.params.id;
  let selectedCategory;
  if (categoryId === "08") {
    selectedCategory = newsDetails;
  } else {
    selectedCategory = newsDetails.filter(
      category => categoryId === category.category_id
    );
  }
  res.send(selectedCategory);
});

app.get("/news", (req, res) => {
  res.send(newsDetails);
});

app.get("/news/:id", (req, res) => {
  const newsId = req.params.id;
  const selectedNews = newsDetails.find(news => newsId === news._id);
  res.send(selectedNews);
});

app.listen(port, () => {
  console.log("running on:", port);
});

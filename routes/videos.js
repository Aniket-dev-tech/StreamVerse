const express = require("express");
const axios = require("axios");
const router = express.Router();

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

const perPage = 12;

router.get("/", async (req, res) => {
  const page = 1;
  const defaultQuery = "nature"; // Change to any default category you like

  try {
    const response = await axios.get("https://pixabay.com/api/videos/", {
      params: {
        key: PIXABAY_API_KEY,
        q: defaultQuery,
        per_page: perPage,
        page: page,
      },
    });

    const hits = response.data.hits;
    const totalHits = response.data.totalHits;
    const totalPages = Math.ceil(totalHits / perPage);

    const videos = hits.map((video) => ({
      id: video.id,
      title: video.tags,
      url: video.videos.medium.url,
      download: video.videos.medium.url,
    }));

    res.render("index", {
      videos,
      query: "",
      error: null,
      page,
      totalPages,
    });
  } catch (error) {
    console.error("Pixabay API error:", error.response?.data || error.message);
    res.render("index", {
      videos: [],
      query: "",
      error: "Failed to fetch videos.",
      page: 1,
      totalPages: 0,
    });
  }
});

router.get("/search", async (req, res) => {
  const query = req.query.q;
  const page = parseInt(req.query.page) || 1;

  try {
    const response = await axios.get("https://pixabay.com/api/videos/", {
      params: {
        key: PIXABAY_API_KEY,
        q: query,
        per_page: perPage,
        page: page,
      },
    });

    const hits = response.data.hits;
    const totalHits = response.data.totalHits;
    const totalPages = Math.ceil(totalHits / perPage);

    const videos = hits.map((video) => ({
      id: video.id,
      title: video.tags,
      url: video.videos.medium.url,
      download: video.videos.medium.url,
    }));

    res.render("index", {
      videos,
      query,
      error: null,
      page,
      totalPages,
    });
  } catch (error) {
    console.error("Pixabay API error:", error.response?.data || error.message);
    res.render("index", {
      videos: [],
      query,
      error: "Failed to fetch videos.",
      page: 1,
      totalPages: 0,
    });
  }
});

router.get("/about", (req, res) => {
  res.render("aboutus");
});

module.exports = router;

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getPosts } from "@/lib/posts";

export default function handler(req, res) {
  let posts;

  if (process.env.NODE_ENV === "production") {
    // Fetch from cache
    posts = require("../../cache/data").posts;
  } else {
    posts = getPosts();
  }

  const results = posts.filter(
    ({ frontmatter: { title, excerpt, category } }) =>
      title.toLowerCase().indexOf(req.query.q) != -1 ||
      excerpt.toLowerCase().indexOf(req.query.q) != -1 ||
      category.toLowerCase().indexOf(req.query.q) != -1
  );

  res.status(200).json(JSON.stringify({ results }));
}

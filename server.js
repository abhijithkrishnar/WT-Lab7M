const express = require("express");
const logger = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(logger("dev"));
server.use(express.json());

// Routes
server.get("/do_a_random", (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Setup static page serving for all the pages in "public"
const publicServedFilesPath = path.join(__dirname, "public");
server.use(express.static(publicServedFilesPath));
var story;

server.post("/itc505/lab7", (req, res) => {
  const { input1, input2, input3, input4, input5, input6, Game } = req.body;

  if (Game === "Wanderlust-Chronicles") {
    story = ` Amidst the bustling ${input1}, where the ${input2} rain meets the eager streets, a lone wanderer ${input3} with purpose. From the towering peaks of ${input4} to the tranquil shores of ${input4}, this intrepid soul seeks solace in the embrace of ${input5} landscapes. With each step, the traveler uncovers tales of ${input6} and encounters with ${input1} that weave into the fabric of their journey.
`;
  } else if (Game === "Romantic-Turmoil") {
    story = ` In a realm of ${input1} dreams and whimsical fantasies, two souls, ${input2} and ${input3}, collide. Their story unfolds in the ancient city of ${input5}, where ${input4} clash and passions ignite. From the depths of ${input5} to the glistening ${input5}, their love blossoms amidst the turmoil of ${input4} and the allure of ${input6}.
`;
  } else if (Game === "Journey-of-Discovery") {
    story = `Amongst the symphony of ${input1} and the fragrance of ${input2}, a seeker of ${input3} adventures roams. This wanderer embraces the thrill of ${input4} through ${input5} and ${input5}, seeking moments of ${input6} serenity in unexpected encounters. A connoisseur of ${input5}, this traveler revels in the fusion of ${input2} and the dance of ${input1}.
`;
  }

  // Form your story using the inputs

  // Redirect to another page and send story as query parameter
  //res.redirect(`/itc505/lab7/story?story=${encodeURIComponent(story)}`);
  res.json({
    redirectUrl: `/itc505/lab7/story?story=${encodeURIComponent(
      story
    )}&game=${encodeURIComponent(Game)}`,
  });
});

server.get("/itc505/lab7/story", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "itc505", "lab7", "story.html"));
});
// The server uses port 80 by default unless you start it with the extra
// command line argument 'local' like this:
//       node server.js local
let port = 8080;
if (process.argv[2] === "local") {
  port = process.env.PORT || 8080;
}

server.listen(port, () => console.log("Ready on localhost!"));

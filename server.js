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
    story = ` The name of the game is ${Game} Once upon a time, in a land of ${input1}, there lived a ${input2} ${input3}. This ${input3} had a peculiar pet—a ${input4} that could speak ${input5}. One day, while wandering through the ${input1}, they stumbled upon a hidden ${input5} cave. Little did they know, this cave held the key to unlocking an ancient ${input2} treasure. Excited and curious, they ventured into the cave, where they encountered a series of ${input1} challenges. With the help of their talking ${input4}, they solved each challenge and finally reached the heart of the cave, discovering the legendary ${input2} treasure that would change their lives forever.
`;
  } else if (Game === "Journey-of-Discovery") {
    story = ` The name of the game is ${Game} Once upon a time, in a land of ${input1}, there lived a ${input2} ${input3}. This ${input3} had a peculiar pet—a ${input4} that could speak ${input5}. One day, while wandering through the ${input1}, they stumbled upon a hidden ${input5} cave. Little did they know, this cave held the key to unlocking an ancient ${input2} treasure. Excited and curious, they ventured into the cave, where they encountered a series of ${input1} challenges. With the help of their talking ${input4}, they solved each challenge and finally reached the heart of the cave, discovering the legendary ${input2} treasure that would change their lives forever.
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
let port = 80;
if (process.argv[2] === "local") {
  port = 8080;
}

server.listen(port, () => console.log("Ready on localhost!"));

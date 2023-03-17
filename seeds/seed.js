const db = require("../config/connection");
const { Users, Thoughts } = require("../models");

const userData = require("./userData.json");
const thoughtData = require("./thoughtData.json");

db.once("open", async () => {
  //cleaning database
  await Users.deleteMany({});
  await Thoughts.deleteMany({});

  //bulk creating models
  const users = await Users.insertMany(userData);
  const thoughts = await Thoughts.insertMany(thoughtData);

  for (let i = 0; i < thoughts.length; i++) {
    // randomly adding thoughts to users
    const tempUser = users[Math.floor(Math.random() * users.length)];
    tempUser.thoughts.push(thoughts[i]._id);
    await tempUser.save();
  }
  console.log("all done!");
  process.exit(0);
});

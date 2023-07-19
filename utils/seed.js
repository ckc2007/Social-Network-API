const { mongoose, connectDB } = require("../config/db");
const { User, Thought, Reaction } = require("../models");
const {
  getRandomName,
  getRandomComments,
  getRandomPost,
  genRandomIndex,
  getRandomArrItem,
} = require("./data");

console.time("seeding");

connectDB().then(async () => {
  await User.deleteMany({});
  await Thought.deleteMany({});
  await Reaction.deleteMany({});

  const users = [];
  const thoughts = [];
  const reactions = [];

  // Generate and insert random users
  for (let i = 0; i < 10; i++) {
    const username = getRandomName();
    const email = `${username.toLowerCase().replace(" ", ".")}@example.com`;
    users.push({ username, email });
  }

  const createdUsers = await User.insertMany(users);

  // Generate and insert random thoughts with reactions
  for (let i = 0; i < 20; i++) {
    const thoughtText = getRandomPost(10);
    const username = getRandomArrItem(users).username;
    const reactionsCount = Math.floor(Math.random() * 5);

    const reactionsData = getRandomComments(reactionsCount);
    const reactionsIds = reactionsData.map(
      (reaction) => new Reaction(reaction)
    );

    const thought = new Thought({
      thoughtText,
      username,
      reactions: reactionsIds,
    });

    thoughts.push(thought);

    console.log(`Thought ${i + 1}:`, thought.toObject());
  }

  const createdThoughts = await Thought.insertMany(thoughts);

  // Generate and insert reactions
  createdThoughts.forEach((thought) => {
    const reactionsCount = Math.floor(Math.random() * 5);
    const reactionsData = getRandomComments(reactionsCount);
    reactionsData.forEach((reactionData) => {
      const reaction = new Reaction(reactionData);
      console.log("Reaction:", reaction.toObject());
      thought.reactions.push(reaction);
      reactions.push(reaction);
    });
  });

  // Add friends for each user
  for (const user of createdUsers) {
    const friendsCount = Math.floor(Math.random() * 5) + 1;
    const friends = createdUsers
      .filter((u) => u._id !== user._id) // Exclude the current user from friends
      .slice(0, friendsCount);
    user.friends = friends.map((friend) => friend._id);
    await user.save();
  }

  await Reaction.insertMany(reactions);

  console.log("Seeding complete 🌱");
  console.timeEnd("seeding");
  process.exit(0);
});

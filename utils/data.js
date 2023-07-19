const names = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Emma",
  "Fiona",
  "George",
  "Hannah",
  "Ian",
  "Jack",
  "Katherine",
  "Liam",
  "Mia",
  "Noah",
  "Olivia",
  "Patrick",
  "Quinn",
  "Ryan",
  "Sophia",
  "Thomas",
  "Uma",
  "Vincent",
  "Willow",
  "Xavier",
  "Yara",
  "Zachary",
  "Ava",
  "Benjamin",
  "Chloe",
  "Daniel",
];

const comments = [
  "Great post!",
  "I love this!",
  "Awesome content!",
  "Thanks for sharing!",
  "Very informative.",
  "Interesting read!",
  "Well said!",
  "Keep up the good work!",
  "This is so helpful!",
  "Impressive!",
  "You nailed it!",
  "Such a useful post.",
  "Brilliant!",
  "I couldn't agree more.",
  "You've got a new fan!",
  "This deserves more attention!",
  "Well written!",
  "You're killing it!",
  "Absolutely amazing!",
  "I learned a lot from this.",
  "Thanks for the insights!",
  "I'll definitely share this!",
  "This made my day.",
  "You're an inspiration!",
  "One of the best posts I've read.",
  "Thank you for this gem!",
  "This is pure gold!",
  "Mind-blowing!",
  "You've got a talent!",
];

const lorum = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "curabitur",
  "vel",
  "hendrerit",
  "libero",
  "eleifend",
  "blandit",
  "nunc",
  "ornare",
  "odio",
  "ut",
  "orci",
  "gravida",
  "imperdiet",
  "nullam",
  "purus",
  "lacinia",
  "a",
  "pretium",
  "quis",
  "vestibulum",
  "morbi",
];

const genRandomIndex = (arr) => Math.floor(Math.random() * arr.length);

const getRandomWord = () => `${lorum[genRandomIndex(lorum)]}`;

const getRandomPost = (words) => {
  let post = "";
  for (let i = 0; i < words; i++) {
    post += ` ${getRandomWord()}`;
  }
  return post;
};

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

const getRandomComments = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      text: getRandomArrItem(comments),
      username: getRandomName().split(" ")[0],
    });
  }
  return results;
};

module.exports = {
  getRandomName,
  getRandomComments,
  getRandomPost,
  genRandomIndex,
  getRandomArrItem,
};

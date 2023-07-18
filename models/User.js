const { Schema, model } = require("mongoose");

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      max_length: 50,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max_length: 50,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// A virtual property is a property that is not stored directly in the database but is calculated or derived from other properties.
// The .virtual() method is a Mongoose method used to define virtual properties for a schema
// The virtual property is useful for situations where you need to calculate or derive a property value on the fly based on other data in the document without storing it redundantly in the database.
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;

// refactor this
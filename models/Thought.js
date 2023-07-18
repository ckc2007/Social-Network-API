const { Schema, model } = require("mongoose");

const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 250,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      required: true,
      type: String,
      ref: "User", // Reference to the "User" model
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    //  Mongoose automatically assigns a timestamp to the createdAt field when you set timestamps: true.
    timestamps: true,
  }
);

// A virtual property is a property that is not stored directly in the database but is calculated or derived from other properties.
// The .virtual() method is a Mongoose method used to define virtual properties for a schema
// The virtual property is useful for situations where you need to calculate or derive a property value on the fly based on other data in the document without storing it redundantly in the database.
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;

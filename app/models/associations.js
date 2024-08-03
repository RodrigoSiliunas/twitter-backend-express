const User = require("./User");
const Tweet = require("./Tweet");

// Define o relacionamento
User.hasMany(Tweet, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  as: "tweets",
});
Tweet.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  as: "user",
});

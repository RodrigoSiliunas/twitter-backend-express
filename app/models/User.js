const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

// Definindo o modelo User
const User = sequelize.define("User", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Método para verificar senha
User.prototype.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Hook para hashear a senha antes de salvar
// User.beforeSave(async (user) => {
//   if (user.changed("password")) {
//     user.password = await bcrypt.hash(user.password, 10);
//   }
// });

module.exports = User;

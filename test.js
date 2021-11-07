const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const sequelize = new Sequelize("sequelize", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define(
  "user",
  {
    name: DataTypes.STRING,
    favoriteColor: DataTypes.STRING,
    age: DataTypes.INTEGER,
    cash: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  }
);

(async () => {
  const data = await User.findAll();
  data.forEach((a) => console.log(a.toJSON()));
})();

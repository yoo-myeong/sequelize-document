const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize("sequelize", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define("user", {
  name: DataTypes.TEXT,
  favoriteColor: {
    type: DataTypes.TEXT,
    defaultValue: "green",
  },
  age: DataTypes.INTEGER,
  cash: DataTypes.INTEGER,
});

(async () => {
  await sequelize.sync({ force: true });
  // insert
  const jane = await User.create({ name: "Jane", age: "4" });
  const seon = await User.create({ name: "seon", age: "10" });
  const may = await User.create({ name: "may", age: "20" });
  const ui = await User.create({ name: "ui", age: "4" });

  // findOrCreate
  // 두가지를 반환하는데 첫번째는 만드려고했던 인스턴스, 두번째는 새로만들어진거면 true 원래있던거면 false를 반환
  const [user, created] = await User.findOrCreate({
    where: { name: "jay" },
    defaults: {
      favoriteColor: "blue",
    },
  });
  console.log(user.toJSON());
  console.log(created);
})();

// paranoid는 삭제가 명령될 때 진짜 삭제하지 않고 deltedAt에 timestmap를 set해서
// hard-deletion이 아닌 soft-deletion을 만드는 것이다.
const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const sequelize = new Sequelize("sequelize", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define(
  "user",
  {
    name: DataTypes.TEXT,
    favoriteColor: {
      type: DataTypes.TEXT,
      defaultValue: "green",
    },
    age: DataTypes.INTEGER,
    cash: DataTypes.INTEGER,
  },
  { timestamps: true, paranoid: true }
);

(async () => {
  await sequelize.sync({ force: true });
  // insert
  const jane = await User.create({ name: "Jane", age: "4" });
  const seon = await User.create({ name: "seon", age: "10" });
  const may = await User.create({ name: "may", age: "20" });
  const ui = await User.create({ name: "ui", age: "4" });
  await ui.destroy();
})();

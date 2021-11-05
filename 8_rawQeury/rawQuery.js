const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
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

  //update
  const a = await sequelize.query(
    "UPDATE users SET age = 26 WHERE name = 'seon'"
  );
  console.log(a);

  //select
  let users = await sequelize.query("SELECT * FROM `users`", {
    type: QueryTypes.SELECT,
  });
  console.log(users);

  // replacement
  // 쿼리 안에 ?나 :를 사용해서 무언가를 집어넣을 수 있다.
  // replacements가 배열이면 ?에 배열의 원소가 순서대로 들어가고 :면 :뒤의 값을 키로 갖는 value가 대체되어 드간다.
  users = await sequelize.query(
    "SELECT * FROM users WHERE age = ? and name = ?",
    {
      replacements: [4, "ui"],
      type: QueryTypes.SELECT,
    }
  );
  console.log(users);
  console.log("-----------");
  users = await sequelize.query("SELECT * FROM users WHERE age = :age", {
    replacements: { age: 4 },
    type: QueryTypes.SELECT,
  });
  console.log(users);
  console.log("-----------");
})();

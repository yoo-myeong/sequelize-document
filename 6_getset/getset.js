// const { Sequelize, Model, DataTypes, Op } = require("sequelize");
// const sequelize = new Sequelize("sequelize", "root", "1234", {
//   host: "localhost",
//   dialect: "mysql",
// });

// get
// 클래스를 알아야 이해할 수 있을 것 같다.

// const User = sequelize.define("user", {
//   username: {
//     type: DataTypes.STRING,
//     get() {
//       const rawValue = this.getDataValue("username");
//       return rawValue ? rawValue.toUpperCase() : null;
//     },
//   },
// });

const user = User.build({ username: "SuperUser123" });
console.log(user.username); // 'SUPERUSER123'
console.log(user.getDataValue("username")); // 'SuperUser123'

const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const User = sequelize.define("user", {
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  hashedPassword: {
    type: DataTypes.STRING(64),
    validate: {
      is: /^[0-9a-f]{64}$/i,
    },
  },
});

(async () => {
  await sequelize.sync({ force: true });
  // Code here

  //unique, null
  const jane = await User.create({
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
  });
})();

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

  // SELECT query
  // SELECT foo, bar FROM ...
  const users = await User.findAll({
    attributes: ["name", "age"],
  });
  console.log("All users:", JSON.stringify(users));
  console.log("------------------------------");
  // API안에 object로 가져올 속성을 지정할 수 있다. 안하면 전부 다 가져옴
  // SELECT foo, bar AS baz, qux FROM ...
  const users2 = await User.findAll({
    attributes: ["name", ["age", "나이"]],
  });
  console.log("All users:", JSON.stringify(users2));
  console.log("------------------------------");
  // COUNT를 사용하기 위한 fn
  // SELECT foo, COUNT(hats) AS n_hats, bar FROM ...
  const users3 = await User.findAll({
    attributes: [
      "name",
      [sequelize.fn("COUNT", sequelize.col("age")), "n_age"],
    ],
  });
  console.log("All users:", JSON.stringify(users3));
  console.log("------------------------------");
  // 뽑아야할 행이 여러개 일 때 모든 행을 기입하기 보단 include를 사용한다.
  const users4 = await User.findAll({
    attributes: {
      include: [[sequelize.fn("COUNT", sequelize.col("age")), "include_n_age"]],
    },
  });
  console.log("All users:", JSON.stringify(users4));
  console.log("------------------------------");
  // 반대로 "이 행 제외하고 전부 다"는 exclude를 사용한다.

  // WHERE절 : filtering
  // Basic
  let data = await User.findAll({
    where: {
      id: 1,
    },
  });
  console.log(JSON.stringify(data));
  console.log("------------------------------");
  // Op
  // 위 basic 명령에서 사실 id 의 value로는 op를 사용한 object가 와야하는데 sequelize가 이를 추론한 것이다. 원래는 다음과 같다.
  data = await User.findAll({
    where: {
      id: {
        [Op.eq]: 1,
      },
    },
  });
  console.log(JSON.stringify(data));
  console.log("------------------------------");
  // AND
  data = await User.findAll({
    where: {
      name: "Jane",
      id: 1,
    },
  });
  console.log(JSON.stringify(data));
  console.log("------------------------------");
  // 이는 op.and가 생략된 것으로 op.and는 배열을 value로 받아서 그 원소들에 and문을 적용한다. 원래 명령은 다음과 같다.
  data = await User.findAll({
    where: {
      [Op.and]: [{ name: "Jane" }, { id: 1 }],
    },
  });
  console.log(JSON.stringify(data));
  console.log("------------------------------");
  // or, not 역시 같은 방식이다. Op는 !=, IS NULL, >= 등등 여러가지 연산자를 제공하기 때문에 document에서 참고해서 사용하면된다.
  // and, or, not 안에는 이 세개를 제외한 op연산자를 여러개 넣어서 복잡한 중첩 논리 비교를 만들 수 있다.
  data = await User.findAll({
    where: {
      [Op.and]: [
        { id: 1 },
        {
          name: {
            [Op.like]: "J%",
          },
        },
      ],
    },
  });
  console.log(JSON.stringify(data));
  console.log("------------------------------");
})();

// 모델인스턴스
// 인스턴스는 해당 모델이 추상화하는 테이블의 한 행을 매핑한다.

const { Sequelize, Model, DataTypes } = require("sequelize");
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

  // Create
  // 인스턴스를 만들기 위해서는 build나 create를 사용하면 되는데 일반적으로 create를 사용한다.

  const jane = await User.create({ name: "Jane" });
  // 원하는 필드만 선택해서 save할 수도 있다.
  const user = await User.create(
    {
      username: "alice123",
      isAdmin: true,
    },
    { fields: ["username"] }
  );
  // let's assume the default of isAdmin is false
  console.log(user.username); // 'alice123'
  console.log(user.isAdmin); // false

  // 로깅
  // 인스턴스에는 많은 것들이 있기 때문에 직접 기록하려하면 혼란스러울 수 있다.
  // .toJSON() 메서드를 사용해서 로깅하는 것을 추천한다
  console.log(jane.toJSON());

  // Update
  // 방법1. 인스턴스를 가져온 객체의 하나의 열 데이터를 바꾸고 save();
  // 방법2. 인스턴스 객체에 여러개의 열 데이터를 object형태로 바꾸고 save()
  jane.name = "Ada";
  // the name is still "Jane" in the database
  await jane.save();
  // Now the name was updated to "Ada" in the database!
  jane.set({
    name: "Ada",
    favoriteColor: "blue",
  });
  // As above, the database still has "Jane" and "green"
  await jane.save();

  // Delete
  // destroy API를 사용
  await jane.destroy();

  // reload
  // 인스턴스를 새로고침한다는 느낌
  // <instance>.reload()를 사용한다.

  // 일부필드만 저장하는법
  // 모델은 바꿨지만 일부필드만 저장한 경우 인스턴스를 리로드하면 일부만 변경된 인스턴스를 확인할 수 있다.
  const seon = await User.create({ name: "Jane" });
  console.log(seon.name); // "Jane"
  console.log(seon.favoriteColor); // "green"
  seon.name = "Jane II";
  seon.favoriteColor = "blue";
  await seon.save({ fields: ["name"] });
  console.log(seon.name); // "Jane II"
  console.log(seon.favoriteColor); // "blue"
  // The above printed blue because the local object has it set to blue, but
  // in the database it is still "green":
  await seon.reload();
  console.log(seon.name); // "Jane II"
  console.log(seon.favoriteColor); // "green"
})();

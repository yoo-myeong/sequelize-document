const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sequelize", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
});

// 모델은 DB의 테이블을 나타내는 추상화이다.
// 모델을 정의하는 방법은 두가지 방법이 있는데 더 익숙한 define API를 사용한다.

// sequlize.define : 부름을 통한 모델 정의
const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // 유일한 값을 가진다.
    },
    lastName: {
      type: DataTypes.STRING,
      defaultValue: "kim", // 열의 기본값을 전달할 수 있다.
    },
    Mydate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW(), // 타입의 NOW값을 기본값으로 준다.
    },
  },
  {
    // Other model options go here
  }
);
console.log(User === sequelize.models.User); // true 반환

// 이때 모델은 테이블을 추상화 하는 것이기 때문에 실제 테이블이 생성되면 테이블의 이름은 모델의 복수형이 된다.
// 테이블이름을 직접 설정하고 싶으면 'Other model options go here' 부분에 tableName: <"넣고 싶은 이름"> 을 기입하면 된다.

// 동기화는 테이블을 직접 동기화하는 방법과 모든 모델을 한번에 동기화하는 방법이 있다.
async function usersync() {
  await User.sync();
}
// usersync();
// 여기서 sync안에 {force:true}를 넣으면 테이블이 존재하면 삭제 후 생성하도록 할 수 있고 {alter:true}를 넣으면 테이블과 모델의 다른점을 찾아서 필요한 변경을 수행하여 모델과 일치하도록 할 수 있다.

// 모든 모델을 동기화 하려면 sequelize.sync({ force: true });를 사용하면 된다.

// 모델이나 sequelize에 drop API를 사용하면 해당 테이블 또는 모든 테이블을 삭제할 수 있다.

// 기본적으로 sequelize는 createdAt과 updatedAt을 모든 모델에 자동으로 추가한다. Datatype은 DATE이다.

// define API에서 옵션에 timestamps:false로 설정해줄 수 있고, 또는 true로 설정한 다음 createdAt:false로 하나만 비활성화 할 수도 있다.

// 데이터 타입은 기본적으로 문자열, 부울, 숫자, 날짜, UUID가 있다.

// 문자열
DataTypes.STRING; // VARCHAR(255)
DataTypes.STRING(1234); // VARCHAR(1234)
DataTypes.STRING.BINARY; // VARCHAR BINARY
DataTypes.TEXT; // TEXT
DataTypes.TEXT("tiny"); // TINYTEXT

// 부울
DataTypes.BOOLEAN; // TINYINT(1)

// 숫자
// MySql에서 unsigned와 zerofill을 설정할 수 있다.
DataTypes.INTEGER; // INTEGER
DataTypes.BIGINT; // BIGINT
DataTypes.BIGINT(11); // BIGINT(11)
DataTypes.FLOAT; // FLOAT
DataTypes.FLOAT(11); // FLOAT(11)
DataTypes.FLOAT(11, 10); // FLOAT(11,10)

DataTypes.INTEGER.UNSIGNED;
DataTypes.INTEGER.ZEROFILL;
DataTypes.INTEGER.UNSIGNED.ZEROFILL;

// 날짜
DataTypes.DATE; // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
DataTypes.DATE(6); // DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of precision
DataTypes.DATEONLY; // DATE without time

// foreighKey설정
// column의 옵션에 refernces:{
//     model : <참조할 모델>,
//     key : <참조할 모델의 열 이름>,
// }
// 로 설정할 수 있다.

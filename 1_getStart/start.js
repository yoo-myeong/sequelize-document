const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sequelize", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
});

//connection test
//async 함수안에 있지 않기 때문에 await는 빼야함
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// sequelize는 Sequelize를 refer하도록 코드가 짜여져 있다. 이는 공식문서에서 추천하는 컨벤션이다. 왜냐하면 이를 통해 하나의 DB에 연결되어 있음을 나타내주기 때문이다.

// sqlite를 사용해서 공식 문서 예제를 따라가기를 추천하지만, 그냥 mysql로 할거다.

// Logging
// 시퀄라이즈는 쿼리가 동작할 때마다 콘솔에 로그를 남긴다. options.logging 은 로깅을 맞춤제작하는 옵션이다. 기본적으로 console.log가 세팅되어있다. 보기 싫으면 logging:false를 설정해주면 된다.

const sequelize = new Sequelize("sequelize", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

// 시퀄라이즈가 제공하는 대부분의 method가 비동기방식이다. 그래서 프로미스를 반환하므로 then, catch, finally의 프로미스 API를 사용할 수 있다.

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sequelize", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
  // association은 4가지가 있다.
  // hasOne 과 belongTo는 둘 다 1대 1관계를 만드는 API지만
  // hasOne은 자식 모델에서 foregin key가 정의되는 것이고
  // belogsTo는 부모 모델에서 foregin key가 정의되는 것이다.
  // hasMany는 1대 다 관계를 맺게한다. belogsTo도 1대다가 가능하며 위와 마찬가지 차이를 가진다.
  // A.belongsToMany(B, { through: 'C' })는 다대다관계를 맺게 하는데 접합 테이블로 C를 사용한다.

  // 외래키를 어디에 설정할 지에 대해선 다음 고민을 해야한다.
  // A없이 B가 존재할 수 있나? B없이 A가 존재할 수 있나?
  const Bar = sequelize.define("bar" /* ... */);
  const Foo = sequelize.define("foo" /* ... */);

  // 표준적으로 has.. API는 belongsTo 와 함께 쓰인다.
  // n:m연결은 두개의 belongsToMany 를 사용한다.

  // 1:1 또는 1:다 를 설정하는 방식
  Foo.hasOne(Bar);
  Bar.belongsTo(Foo);
  // 이때 기본적으로 on delete는 set null, on update는 cascade로 설정되는데 그 의미는,
  // on delete는 부모테이블에서 primary 값이 삭제될 경우 SET NULL 로 정의되면 하위테이블의 reference값이  NULL 값으로 변경되면서 참조무결성을 유지한다.
  // on update는 부모테이블에서 primary 값이 수정될 경우 CASCADE 로 정의되면 하위테이블의 reference값은 변경된 상위테이블의 수정된 값을 가지면서 참조무결성을 유지한다.
  const b = await sequelize.sync({ force: true });
  const a = await Foo.create();
  console.log("--------------------------------");
  console.log(a.toJSON());
  Bar.create({
    fooId: 1,
  });

  // 다:다 를 설정하는 방식
  const Movie = sequelize.define("Movie", { name: DataTypes.STRING });
  const Actor = sequelize.define("Actor", { name: DataTypes.STRING });
  const ActorMovies = sequelize.define("ActorMovies", {
    MovieId: {
      type: DataTypes.INTEGER,
      references: {
        model: Movie, // 'Movies' would also work
        key: "id",
      },
    },
    ActorId: {
      type: DataTypes.INTEGER,
      references: {
        model: Actor, // 'Actors' would also work
        key: "id",
      },
    },
  }); // 참조하는 아이디를 설정하고, 연결테이블이기 때문에 따로 id가 필요하지 않으므로 자동으로 생성하지 않는다.
  Movie.belongsToMany(Actor, { through: ActorMovies });
  Actor.belongsToMany(Movie, { through: ActorMovies });
  // 1대몇 연결과 달리 on delete와 on update 모두 cascade가 기본으로 설정된다.
  // on delete가 cascade로 설정되면 primary키가 삭제될 때 fk도 함께 삭제되어 참조무결성을 유지한다.

  //Basics of queries involving associations
  // This is the setup of our models for the examples below
  const Ship = sequelize.define(
    "ship",
    {
      name: DataTypes.TEXT,
      crewCapacity: DataTypes.INTEGER,
      amountOfSails: DataTypes.INTEGER,
    },
    { timestamps: false }
  );
  const Captain = sequelize.define(
    "captain",
    {
      name: DataTypes.TEXT,
      skillLevel: {
        type: DataTypes.INTEGER,
        validate: { min: 1, max: 10 },
      },
    },
    { timestamps: false }
  );
  Captain.hasOne(Ship);
  Ship.belongsTo(Captain);
})();

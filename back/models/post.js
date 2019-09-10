module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', { // 테이블명은 posts
    content: {
      type: DataTypes.TEXT, // 매우 긴 글
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4', //  한글+이모티콘
    collate: 'utf8mb4_general_ci',
  });
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // 테이블에 UserId 컬럼이 생겨요
    db.Post.belongsTo(db.Subsidiary); // 홀딩스, 시큐리온, 아이넷캅 구분
    db.Post.belongsTo(db.Content);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
  };
  return Post;
};

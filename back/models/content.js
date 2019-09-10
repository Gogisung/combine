module.exports = (sequelize, DataType) => {
  const Content = sequelize.define('Content',{
    page: {
      type: DataType.STRING(20),
      allowNull: false,
    },
    subcontent: {
      type: DataType.STRING(20),
      allowNull: true,
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  Content.associate = (db) => {
    db.Subsidiary.hasMany(db.Post);
  };
  return Content;
}
module.exports = (sequelize, DataTypes) => {
  const Subsidiary =  sequelize.define('Subsidiary', {
    site: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  Subsidiary.associate = (db) => {
    db.Subsidiary.hasMany(db.Post);
  };
  return Subsidiary;
}
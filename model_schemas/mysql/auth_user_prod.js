/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('newcastlex_swl101x_1t2017_auth_user_prod', {
    primKey: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    }
  }, {
    tableName: 'newcastlex_swl101x_1t2017_auth_user_prod',
    timestamps: false,
    paranoid: false,
    freezeTableName: true
  });
};

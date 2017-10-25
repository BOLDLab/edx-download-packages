/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('newcastlex_swl101x_1t2017_student_languageproficiency_prod', {
    primKey: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    id: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    user_profile_id: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    code: {
      type: DataTypes.STRING(4),
      allowNull: true
    }
  }, {
    tableName: 'newcastlex_swl101x_1t2017_student_languageproficiency_prod',
    timestamps: false,
    paranoid: false,
    freezeTableName: true
  });
};

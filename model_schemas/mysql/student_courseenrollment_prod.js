/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('newcastlex_swl101x_1t2017_student_courseenrollment_prod', {
    primKey: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    }
  }, {
    tableName: 'newcastlex_swl101x_1t2017_student_courseenrollment_prod',
    timestamps: false,
    paranoid: false,
    freezeTableName: true
  });
};

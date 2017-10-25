/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('newcastlex_swl101x_1t2017_student_courseenrollment_prod', {
    primKey: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    id: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    user_id: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    course_id: {
      type: DataTypes.STRING(70),
      allowNull: true
    },
    created: {
      type: DataTypes.STRING(38),
      allowNull: true
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mode: {
      type: DataTypes.STRING(16),
      allowNull: true
    }
  }, {
    tableName: 'newcastlex_swl101x_1t2017_student_courseenrollment_prod',
    timestamps: false,
    paranoid: false,
    freezeTableName: true
  });
};

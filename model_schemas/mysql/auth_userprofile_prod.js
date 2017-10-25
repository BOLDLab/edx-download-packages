/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('newcastlex_swl101x_1t2017_auth_userprofile_prod', {
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
    name: {
      type: DataTypes.STRING(84),
      allowNull: true
    },
    language: {
      type: DataTypes.STRING(14),
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    meta: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    courseware: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    mailing_address: {
      type: DataTypes.STRING(192),
      allowNull: true
    },
    year_of_birth: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    level_of_education: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    goals: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    allow_certificate: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    profile_image_uploaded_at: {
      type: DataTypes.STRING(38),
      allowNull: true
    }
  }, {
    tableName: 'newcastlex_swl101x_1t2017_auth_userprofile_prod',
    timestamps: false,
    paranoid: false,
    freezeTableName: true
  });
};

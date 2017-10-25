/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('newcastlex_swl101x_1t2017_auth_user_prod', {
    primKey: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    id: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(48),
      allowNull: true
    },
    first_name: {
      type: DataTypes.STRING(26),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(34),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(82),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    is_staff: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_superuser: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    last_login: {
      type: DataTypes.STRING(52),
      allowNull: true
    },
    date_joined: {
      type: DataTypes.STRING(38),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email_key: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    avatar_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    show_country: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    date_of_birth: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    interesting_tags: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ignored_tags: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email_tag_filter_strategy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    display_tag_filter_strategy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    consecutive_days_visit_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'newcastlex_swl101x_1t2017_auth_user_prod',
    timestamps: false,
    paranoid: false,
    freezeTableName: true
  });
};

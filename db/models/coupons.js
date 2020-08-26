const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Coupons extends Sequelize.Model {}
    Coupons.init({
      coupon: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for "coupon"',
          },
          notEmpty: {
            msg: 'Please provide a value for "coupon"',
          },
        },
      },
     
      postedBy: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for "postedBy"',
          },
          notEmpty: {
            msg: 'Please provide a value for "postedBy"',
          },
        },
      },
    }, { sequelize });
  
    return Coupons;
  };
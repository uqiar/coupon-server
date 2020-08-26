
const {db} = require('..');
const { Coupons } = db.models;
const { Op } = db.Sequelize;
/**
 * Gets all coupons
 * @param None
 */
const getCoupons = () => {
  return new Promise(async (resolve, reject) => {
    const coupons = await Coupons.findAll();
    resolve(coupons)
  });
}

/**
 * Gets a specific coupon by ID
 * @param {number} id - Accepts the ID of the specified coupon.
 */
async function getCoupon(id) {
  return new Promise(async (resolve, reject) => {
    const coupons = await Coupons.findAll({
      where: {
        id
      },
    });
    resolve(coupons)
  });
}

/**
 * Creates a new coupon record 
 * @param {Object} newRecord - Object containing info for new coupon: the coupon text
 */
async function createCoupon(newRecord) {
  return new Promise(async (resolve, reject) => {
    const coupon = await Coupons.build(newRecord);
    await coupon.save();
    resolve(coupon)

  });
}

/**
 * Updates a single record 
 * @param {Object} newCoupon - An object containing the changes to coupon
 */
async function updateCoupon(data,id) {
  return new Promise(async (resolve, reject) => {
    const coupon = await Coupons.findByPk(id);
    await coupon.update(data);
    resolve(coupon)

  });
}

/**
 * Deletes a single record
 * @param {Object} record - Accepts record to be deleted. 
 */
async function deleteCoupon(id) {
  return new Promise(async (resolve, reject) => {
    const coupon = await Coupons.findByPk(id);
    await coupon.destroy();
    resolve(true)

  });
}

module.exports = {
  getCoupons,
  getCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
}

const express = require('express')
const router = express.Router()
const records = require('./db/controllers/coupons')
const users = require('./db/controllers/users')
const passport = require("passport");
const Authorize = passport.authenticate('jwt', { session: false })
function asyncHandler(callBack) {
    return async (req, res, next) => {
        try {
            await callBack(req, res, next)
        } catch (err) {
            res.status(400).json(err)
        }
    }
}

//Send a GET request to /Coupons to Read list of Coupons.
router.get('/coupons', Authorize, asyncHandler(async (req, res, next) => {
    const coupons = await records.getCoupons()
    res.json(coupons)

}))
//Send GET request to /coupons/:id to Read single Coupon
router.get('/coupons/:id', Authorize, asyncHandler(async (req, res, next) => {
    const coupon = await records.getCoupon(req.params.id)
    res.json(coupon)
}))



//Adding new Coupons
router.post('/coupons', Authorize, asyncHandler(async (req, res, next) => {
    console.log(req.body)
    if (!req.body.coupon ||!req.body.postedBy)
        return res.status(400).json({ message: "Coupon is required." })
    const data = {
        coupon: req.body.coupon,
        postedBy:req.body.postedBy
    }
    const coupon = await records.createCoupon(data)
    if (coupon)
        res.status(201).json(coupon)
    else
        res.status(404).json({ message: "Coupon not found." })
}))

//update coupon to passing id
router.put('/coupons/:id', Authorize, asyncHandler(async (req, res, next) => {
    const coupon = await records.getCoupon(req.params.id)
    if (coupon) {
        coupon.coupon = req.body.coupon;
        await records.updateCoupon(coupon, req.params.id)
        res.end()
    } else {
        res.status(404).json({ message: "Coupon not found." })
    }

}))
//Delete request using id to delete coupon
router.delete('/coupon/:id', Authorize, asyncHandler(async (req, res, next) => {
    await records.deleteCoupon(req.params.id)
    res.status(204).end()
}))


//register new users /api/register
router.post('/register', asyncHandler(async (req, res, next) => {
    const user = await users.RegisterUser(req.body)
    res.json(user)
}))

router.get('/users', Authorize, asyncHandler(async (req, res, next) => {
    const allUsers = await users.allUsers()
    res.json(allUsers)
}))
router.post('/login', asyncHandler(async (req, res, next) => {
    console.log(req.body)
    const user = await users.login(req.body)
    res.json(user)
}))

router.get('/test',(req,res)=>{
    res.json("Server is running!")
})
module.exports = router
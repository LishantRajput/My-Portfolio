const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");
const userModel = require("../schema/usermodel")
const SECRET_KEY = "21fd54sf5f4h54t6e4u45fd4g32da1g5er4y654fg1jg24j5t4iu6f1j5hg4img34u6yt4s32d1g3df54h8tj61gh5j4hy8"

router.post("/signup", async (req, res) => {

    const { name, email, password, username } = req.body;

    try {

        if (!name || !email || !password || !username) {
            return res.status(404).send({
                success: false,
                message: "All fields are required!"
            })
        }

        if (password.length < 8) {
            return res.status(400).send({
                success: false,
                message: "password must atleast 8 character!"
            })
        }

        let user = await userModel.findOne({ email })

        if (user) {
            return res.status(400).send({
                success: false,
                message: "Your email already exist!"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hassPass = await bcrypt.hash(password, salt)

        user = await userModel.create({ name, email, username, password: hassPass })

        res.status(201).send({
            success: true,
            message: "your account created successfully!",
            user
        })
    } catch (error) {
        console.log(error)
        let errmsg = "Internal Server Error"

        if (error.errors) {
            errmsg = Object.values(error.errors)[0].properties.message
        }

        console.log(errmsg)

        res.status(500).send({
            success: false,
            message: errmsg,
            user: null
        })
    }
});
router.post("/reset/otp-Genarator", async (req, res) => {

    try {

        const { email, password } = req.body
        const otp = Math.floor(Math.random() * 100000 + 100000)
        console.log(req.body)
        const emailFormate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailFormate.test(email)) {
            return res.status(400).send({
                success: false,
                message: "Invalid email format"
            });
        }
        console.log("Email formate check, and fiend acount")
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).send({
                sucess: false,
                message: "No Acount Fetch"
            })
        }
        user.otp = otp;
        user.otpExpire = Date.now() + 5 * 60 * 1000; // 5 min
        await user.save();
        console.log("acount fetch sucessfull")

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "raj.your.in@gmail.com",
                pass: "mmeohkvzgngkesvu"
            }
        });
        console.log("transporter created")

        const mailOptions = {
            from: "raj.your.in@gmail.com",
            to: email,
            subject: "One-Time Verification Code",
            text: `One Time Password is \n ${otp}`
        };

        console.log("Mail Option Done")
        await transporter.sendMail(mailOptions);
        const otpExpire = Date.now() + 5 * 60 * 1000; // 5 min

        res.send({
            sucess: true,
            message: "Otp Sent Sucessfully on your email",
            otpExpire,
            otp
        })

    } catch (error) {
        console.log(error)
        res.send(error)
    }
})
router.post("/reset/pass", async (req, res) => {
    console.log("Get Request")
    try {

        const { email, password } = req.body
        const emailFormate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailFormate.test(email)) {
            return res.status(400).send({
                success: false,
                message: "Invalid email format"
            });
        }
        console.log("Email formate check, and fiend acount")
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).send({
                sucess: false,
                message: "No Acount Fetch"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hassPass = await bcrypt.hash(password, salt)
        await userModel.updateOne(
            { email: email },   // 🔥 filter
            { $set: { password: hassPass } }
        );


        res.send({
            sucess: true,
            message: "Update Password"
        })

    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

// router.post("/verifyotp", async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const user = await userModel.findOne({ email });

//     if (!user) {
//       return res.status(400).send({
//         success: false,
//         message: "User not found"
//       });
//     }

//     // ❌ OTP wrong
//     if (user.otp != otp) {
//       return res.status(400).send({
//         success: false,
//         message: "Invalid OTP"
//       });
//     }

//     // ❌ OTP expired
//     if (user.otpExpire < Date.now()) {
//       return res.status(400).send({
//         success: false,
//         message: "OTP expired"
//       });
//     }

//     res.send({
//       success: true,
//       message: "OTP verified"
//     });

//   } catch (error) {
//     res.send(error);
//   }
// });


router.post("/new-password", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User not found"
            });
        }

        // password hash
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;

        // ✅ OTP clear कर दो
        user.otp = null;
        user.otpExpire = null;

        await user.save();

        res.send({
            success: true,
            message: "Password updated successfully"
        });

    } catch (error) {
        res.send(error);
    }
});
router.post("/login", async (req, res) => {
    const { username, password } = req.body
    let user;
    try {
        console.log("Check all fields")    
        if (!username || !password) { 
            return res.status(404).send({
                success: false,
                message: "username or Password are required"
            })
        }

        const emailFormate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailFormate.test(username)) {
            let email = username
            user = await userModel.findOne({ email })
        } else {
            user = await userModel.findOne({ username })
        }
        if (!user) {
            return res.status(400).send({
                sucess: false,
                message: "No Acount Fetch"
            })
        }
        const verifyPass = await bcrypt.compare(password, user.password)
        if (!verifyPass) {
            res.status(400).send({
                success: false,
                message: "Invalid password"
            })
        }
        const token = jwt.sign({ id: user._id }, SECRET_KEY)
        res.status(200).send({
            success: true,
            message: "your account login successfully!",
            token,
            user
        })

    } catch (error) {
        let errmsg = "Internal Server Error"

        if (error.errors) {
            errmsg = Object.values(error.errors)[0].properties.message
        }

        console.log(errmsg)

        res.status(500).send({
            success: false,
            message: errmsg
        })
    }
})



module.exports = router
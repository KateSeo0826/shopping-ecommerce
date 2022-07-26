const express = require('express')
const router = express.Router();
const userModel = require("../models/User");
const path = require("path");
const bcrypt = require("bcryptjs");
const isAuthenticated = require("../middleware/auth");
const dashBoardLoader = require("../middleware/authorization");
const proAddModel = require("../models/product");

router.get("/", (req, res) => {
    Promise.all([
        proAddModel.find({ bestseller: "Yes" }),
        proAddModel.find({ pCategory: "For Main" })
    ]).then(([bestpro, bestcate]) => {

        const best = bestpro.map(bestpro => {
            return {
                proPic: bestpro.proPic,
                id: bestpro._id
            }
        });
        const cateOnly = bestcate.map(bestcate => {
            return {
                proPic: bestcate.proPic,
                pCategory: bestcate.pCategory,
                pName: bestcate.pName
            }
        });
        res.render("general/home", {
            proBest: best,
            proCate: cateOnly
        });

    })
        .catch(err => console.log(`Error happened when pulling from the database: ${err}`));
});

//contact us route
router.get("/registration", (req, res) => {
    res.render("general/registration", {
    });
});

router.get("/admin", isAuthenticated, dashBoardLoader, (req, res) => {
    res.render("admin", {
    });
});


//Process contact us form for when 
//Route to process user's request and data when user submits registration form
router.post("/registration", (req, res) => {
    const errorMessaName = [];
    const errorMessaEmail = [];
    const errorMessaPassword = [];
    const errorValidPsw = [];
    const errorMessagesRe = [];
    const errorExistEmail = [];
    const errorMessagesNotMatch = [];

    if (!req.body.name) {
        errorMessaName.push("You must enter your name!");
    }
    if (!req.body.email) {
        errorMessaEmail.push("You must enter your email!");
    }

    if (!req.body.password) {
        errorMessaPassword.push("You must enter your password!");
    }
    const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/;
    if (!req.body.password.match(passRegex)) {
        errorValidPsw.push("Password must 6 to 15 characters with least one special character")
    }

    if (!req.body.pswre) {
        errorMessagesRe.push("You must enter your password again!");
    }

    if (req.body.password !== req.body.pswre) {
        errorMessagesNotMatch.push("Password is not matching!")
    }

    //If the user does not enter all the informatio
    userModel.findOne({ email: req.body.email })
        .then(isMatched => {
            if (req.body.email.length === 0) {
                res.render("general/registration", {
                    error0: errorMessaName,
                    error1: errorMessaEmail,
                    error2: errorMessaPassword,
                    error3: errorMessagesRe,
                    l_email: req.body.email,
                    l_name: req.body.name
                });
            }
            else if (!req.body.password.match(passRegex)) {
                res.render("general/registration", {
                    error0: errorMessaName,
                    error1: errorMessaEmail,
                    error2: errorMessaPassword,
                    error3: errorMessagesRe,
                    error5: errorExistEmail,
                    error6: errorMessagesNotMatch,
                    error7: errorValidPsw,
                    l_email: req.body.email,
                    l_name: req.body.name
                });

            }
            else if (req.body.password !== req.body.pswre) {
                res.render("general/registration", {
                    error0: errorMessaName,
                    error1: errorMessaEmail,
                    error2: errorMessaPassword,
                    error3: errorMessagesRe,
                    error5: errorExistEmail,
                    error6: errorMessagesNotMatch,
                    l_email: req.body.email,
                    l_name: req.body.name
                });

            }
            else if (isMatched) {
                errorExistEmail.push("Sorry, your email have already registered ");
                res.render("general/registration", {
                    error0: errorMessaName,
                    error1: errorMessaEmail,
                    error2: errorMessaPassword,
                    error3: errorMessagesRe,
                    error5: errorExistEmail,
                    l_email: req.body.email,
                    l_name: req.body.name
                });
            }

            else if (req.body.password.length != 0 && req.body.pswre != 0 && req.body.password == req.body.pswre && req.body.name && req.body.email) {
                const { name, email } = req.body;
                const sgMail = require('@sendgrid/mail');
                sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
                const msg = {
                    to: `${email}`,
                    from: `violetds0826@gmail.com`,
                    subject: `Registration Form Submit`,
                    html:
                        `visitor's Full Name : ${name} <br>
                             Visitor's Email Address : ${email} <br>
                        `
                };
                //Asynchronous operation(who don't know how long  this will take to execute)
                sgMail.send(msg)
                    .then(() => {
                        res.redirect("/login");
                    })
                    .catch(err => {
                        console.log(`Error ${err}`);
                    });
                const newUser =
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                }
                const user = new userModel(newUser);
                user.save()
                    .then(() => { })
                    .catch(err => console.log(`Error while inserting into the data ${err}`));
            }
        })
        .catch(err => console.log(`Error is email and password ${err}`));
});


router.get("/login", (req, res) => {
    res.render("general/login", {
    });
});


router.get("/userdashboard", isAuthenticated, (req, res) => {
    res.render("userdashboard", {
    });
});


//Route to process user's request and data when user submits login form
router.post("/login", (req, res) => {
    const errorMessaEmail = [];
    const errorMessaPassword = [];
    const errorNotMatched = [];

    if (!req.body.email) {
        errorMessaEmail.push("You must enter your email");
    }
    if (!req.body.password) {
        errorMessaPassword.push("You must enter your password");
    }

    //If the user does not enter all the informatio
    if (errorMessaEmail.length > 0 ||
        errorMessaPassword.length > 0) {
        res.render("general/login", {
            error1: errorMessaEmail,
            error2: errorMessaPassword,
            l_email: req.body.email
        });
    }
    else {
        userModel.findOne({ email: req.body.email })
            .then((user) => {
                const error = [];
                //email not found
                if (user == null) {
                    error.push("Sorry, there is no matching email in our database");
                    res.render("general/login", {
                        errors: error
                    })
                }
                //email is found
                else {
                    bcrypt.compare(req.body.password, user.password)
                        .then(isMatched => {
                            if (isMatched) {
                                //cretae our sessoin
                                req.session.userInfo = user;
                                if (user.type == "user") {
                                    res.redirect("/userdashboard");
                                } else if (user.type == "Admin") {
                                    res.redirect("/admin");
                                }
                            }
                            else {
                                errorNotMatched.push("Sorry, your email and/or password incorrect ");
                                res.render("general/login", {
                                    error4: errorNotMatched
                                })
                            }
                        })
                        .catch(err => console.log(`Error is email and password ${err}`));
                }

            })
            .catch(err => console.log(`Error: email & password are not matched ${err}`));
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login")
});


module.exports = router;
const express = require('express')
const router = express.Router();
const userModel = require("../models/User");
const proAddModel = require("../models/product");
const cartModel = require("../models/cart");
const path = require("path");
const isAuthenticated = require("../middleware/auth");
const dashBoardLoader = require("../middleware/authorization");


//Route productsAdd
router.get("/productsadd", isAuthenticated, dashBoardLoader, (req, res) => {
    res.render("productsadd", {
    });
});

//Route prodeditform
router.get("/proeditform", isAuthenticated, dashBoardLoader, (req, res) => {
    proAddModel.find()
        .then((tasks) => {
            const filteredTask = tasks.map(task => {
                return {
                    id: task._id,
                    pName: task.pName,
                    pPrice: task.pPrice,
                    pDetails: task.pDetails,
                    pCategory: task.pCategory,
                    quantity: task.quantity,
                    proPic: task.proPic,
                    bestseller: task.bestseller
                }
            });
            res.render("productsboard", {
                products: filteredTask
            });
        })
        .catch(err => console.log(`Error happened when pulling from the database: ${err}`));
});

//Route to process user's request and data when the user submits the add task form
router.post("/productsadd", isAuthenticated, dashBoardLoader, (req, res) => {
    const newPro = {
        pName: req.body.pName,
        pPrice: req.body.pPrice,
        pDetails: req.body.pDetails,
        pCategory: req.body.pCategory,
        quantity: req.body.quantity,
        bestseller: req.body.bestseller
    }

    const task = new proAddModel(newPro);
    task.save()
        .then((getPic) => {
            req.files.proPic.name = `pro_pic_${getPic._id}${path.parse(req.files.proPic.name).ext}`;
            req.files.proPic.mv(`public/uploads/${req.files.proPic.name}`)
                .then(() => {
                    proAddModel.updateOne({ _id: getPic._id }, {
                        proPic: req.files.proPic.name
                    })
                        .then(() => {
                            res.redirect(`/list`)
                        })
                })
        }).catch(err => console.log(`Error happened when inserting data into database ${err}`));
});

////Route to fetch all product
router.get("/list", isAuthenticated, dashBoardLoader, (req, res) => {
    //Pull from the database, get the results that was returned and then inject that results into 
    // the taskDashboard
    proAddModel.find()
        .then((tasks) => {
            const filteredTask = tasks.map(task => {
                return {
                    id: task._id,
                    pName: task.pName,
                    pPrice: task.pPrice,
                    pDetails: task.pDetails,
                    pCategory: task.pCategory,
                    quantity: task.quantity,
                    proPic: task.proPic,
                    bestseller: task.bestseller
                }
            });
            res.render("productsboard", {
                products: filteredTask
            });

        })
        .catch(err => console.log(`Error happened when pulling from the database: ${err}`));
});

// //Route to direct user to the task profile page
// router.get("/description",isAuthenticated,(req,res)=>{

router.get("/digueProduct", (req, res) => {
    proAddModel.find({ pCategory: "DigueProduct" })
        .then((tasks) => {
            const digueProduct = tasks.map(task => {
                return {
                    id: task._id,
                    pName: task.pName,
                    pPrice: task.pPrice,
                    pDetails: task.pDetails,
                    pCategory: task.pCategory,
                    quantity: task.quantity,
                    proPic: task.proPic,
                    bestseller: task.bestseller
                }
            });
            res.render("digueProduct", {
                digProduct: digueProduct
            });

        })
        .catch(err => console.log(`Error happened when pulling from the database: ${err}`));
});
//Route outwear
router.get("/outwear", (req, res) => {
    proAddModel.find({ pCategory: "Outwear" })
        .then((tasks) => {
            const outwearProduct = tasks.map(task => {
                return {
                    id: task._id,
                    pName: task.pName,
                    pPrice: task.pPrice,
                    pDetails: task.pDetails,
                    pCategory: task.pCategory,
                    quantity: task.quantity,
                    proPic: task.proPic,
                    bestseller: task.bestseller
                }
            });
            res.render("outwear", {
                pOutwear: outwearProduct
            });
        })
        .catch(err => console.log(`Error happened when pulling from the database: ${err}`));
});
//Route products top
router.get("/top", (req, res) => {
    proAddModel.find({ pCategory: "Top" })
        .then((tasks) => {
            const topProduct = tasks.map(task => {
                return {
                    id: task._id,
                    pName: task.pName,
                    pPrice: task.pPrice,
                    pDetails: task.pDetails,
                    pCategory: task.pCategory,
                    quantity: task.quantity,
                    proPic: task.proPic,
                    bestseller: task.bestseller
                }
            });
            res.render("top", {
                pTop: topProduct
            });
        })
        .catch(err => console.log(`Error happened when pulling from the database: ${err}`));
});

///Route product-dress
router.get("/dress", (req, res) => {
    proAddModel.find({ pCategory: "Dress" })
        .then((tasks) => {
            const dressProduct = tasks.map(task => {
                return {
                    id: task._id,
                    pName: task.pName,
                    pPrice: task.pPrice,
                    pDetails: task.pDetails,
                    pCategory: task.pCategory,
                    quantity: task.quantity,
                    proPic: task.proPic,
                    bestseller: task.bestseller
                }
            });
            res.render("dress", {
                pDress: dressProduct
            });
        })
        .catch(err => console.log(`Error happened when pulling from the database: ${err}`));
});

///Route product-bottom
router.get("/bottom", (req, res) => {
    proAddModel.find({ pCategory: "Bottom" })
        .then((tasks) => {
            const bottomProduct = tasks.map(task => {
                return {
                    id: task._id,
                    pName: task.pName,
                    pPrice: task.pPrice,
                    pDetails: task.pDetails,
                    pCategory: task.pCategory,
                    quantity: task.quantity,
                    proPic: task.proPic,
                    bestseller: task.bestseller
                }
            });
            res.render("bottom", {
                pBottom: bottomProduct
            });
        })
        .catch(err => console.log(`Error happened when pulling from the database: ${err}`));
});

///Route product-Acc
router.get("/acc", (req, res) => {
    proAddModel.find({ pCategory: "Acc" })
        .then((tasks) => {
            const accProduct = tasks.map(task => {
                return {
                    id: task._id,
                    pName: task.pName,
                    pPrice: task.pPrice,
                    pDetails: task.pDetails,
                    pCategory: task.pCategory,
                    quantity: task.quantity,
                    proPic: task.proPic,
                    bestseller: task.bestseller
                }
            });
            res.render("acc", {
                pAcc: accProduct
            });
        })
        .catch(err => console.log(`Error happened when pulling from the database: ${err}`));
});

//Route edit
router.get("/edit/:id", isAuthenticated, dashBoardLoader, (req, res) => {
    proAddModel.findById(req.params.id)
        .then((task) => {
            const { _id, pName, pPrice, pDetails, pCategory, quantity, bestseller, proPic } = task;
            res.render("proeditform", {
                _id,
                pName,
                pPrice,
                pDetails,
                pCategory,
                quantity,
                bestseller,
                proPic
            })

        })
        .catch(err => console.log(`Error happened when pulling from the database :${err}`));
});

// //Route to direct user to edit proudctBoard form
router.put("/update/:id", isAuthenticated, dashBoardLoader, (req, res) => {
    const update =
    {
        pName: req.body.pName,
        pPrice: req.body.pPrice,
        pDetails: req.body.pDetails,
        pCategory: req.body.pCategory,
        quantity: req.body.quantity,
        bestseller: req.body.bestseller,
        proPic: req.body.proPic
    }
    proAddModel.updateOne({ _id: req.params.id }, update)
        .then(() => {
            proAddModel.findOne({ _id: req.params.id })
                .then((task) => {
                    req.files.proPic.name = `pro_pic_${task._id}${path.parse(req.files.proPic.name).ext}`;
                    req.files.proPic.mv(`public/uploads/${req.files.proPic.name}`)
                        .then(() => {
                            proAddModel.updateOne({ _id: task._id }, {
                                proPic: req.files.proPic.name
                            })
                                .then(() => {
                                    res.redirect(`/list`)
                                })
                        })
                });
        }).catch(err => console.log(`Error happended when inserting data into database ${err}`));

});

//Delete
router.delete("/delete/:id", isAuthenticated, dashBoardLoader, (req, res) => {
    proAddModel.deleteOne({ _id: req.params.id })
        .then(() => {
            res.redirect("/list");
        })
        .catch(err => console.log(`Error happened when updating data from the database :${err}`));

});
router.get("/addcart", isAuthenticated, (req, res) => {
    cartModel.find()
        .then((carts) => {
            var price = 0;
            var quan = 0;
            for (var i = 0; i < carts.length; i++) {
                price += (carts[i].quantity * carts[i].pPrice);
            }
            for (var i = 0; i < carts.length; i++) {
                quan += carts[i].quantity;
            }

            const allCart = carts.map(carts => {
                return {
                    pName: carts.pName,
                    pPrice: carts.pPrice,
                    quantity: carts.quantity,
                    proPic: carts.proPic,
                }
            });
            res.render("addcart", {
                cartsAdd: allCart,
                totalprice: price.toFixed(2),
                totalquan: quan
            });
        })
        .catch(err => console.log(`Error happened when pulling from the database: ${err}`));
});

router.post("/addcart", isAuthenticated, (req, res) => {
    const newCart =
    {
        pName: req.body.pName,
        pPrice: req.body.pPrice,
        quantity: req.body.quantity,
        proPic: req.body.proPic
    }

    const cart = new cartModel(newCart);

    cart.save()
        .then(() => {
            res.redirect("addcart")
        })
        .catch(err => console.log(`Error while inserting into the data ${err}`));
});

router.delete("/delete/", isAuthenticated, (req, res) => {
    cartModel.find()
        .then((carts) => {
            const allCart = carts.map(carts => {
                return {
                    pName: carts.pName,
                    pPrice: carts.pPrice,
                    quantity: carts.quantity
                }
            });

            var price = 0;
            var quan = 0;
            for (var i = 0; i < allCart.length; i++) {
                price += (allCart[i].quantity * allCart[i].pPrice);
            }

            for (var i = 0; i < carts.length; i++) {
                quan += allCart[i].quantity;
            }

            const { name, email } = req.session.userInfo;
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
            const msg = {
                to: `${email}`,
                from: `violetds0826@gmail.com`,
                subject: `To confirm order to user Form shop`,
                html:
                    `visitor's Full Name : ${name} <br>
                             Product Name : ${allCart.map((element, i) => { return element.pName })} <br>
                             Total Amount : ${price}    <br>
                             Total Quantaty : ${quan} <br>
                        `
            };
            //Asynchronous operation(who don't know how long  this will take to execute)
            sgMail.send(msg)
            cartModel.deleteMany()
                .then(() => {
                    res.redirect("/addcart");
                })
                .catch(err => {
                    console.log(`Error ${err}`);
                });
        })
        .catch(err => console.log(`Error happened when updating data from the database :${err}`));
});

router.get("/products", (req, res) => {
    proAddModel.find()
        .then((task) => {
            const filteredTask = task.map(task => {
                return {
                    id: task._id,
                    pName: task.pName,
                    pPrice: task.pPrice,
                    pDetails: task.pDetails,
                    pCategory: task.pCategory,
                    quantity: task.quantity,
                    proPic: task.proPic,
                    bestseller: task.bestseller
                }
            });
            res.render("products/products", {
                productAll: filteredTask
            });

        })
        .catch(err => console.log(`Error happened when pulling from the database: ${err}`));

});
router.post("/products", (req, res) => {
    proAddModel.find({ pCategory: req.body.pCategory })
        .then((task) => {
            const fitProduct = task.map(task => {
                return {
                    id: task._id,
                    pName: task.pName,
                    pPrice: task.pPrice,
                    pDetails: task.pDetails,
                    pCategory: task.pCategory,
                    quantity: task.quantity,
                    proPic: task.proPic,
                    bestseller: task.bestseller
                }
            });
            res.render("products/products", {
                search: fitProduct
            });

        })
        .catch(err => console.log(`Error happened when pulling from the database: ${err}`));

});
router.get("/prodetails/:id", (req, res) => {
    proAddModel.findById(req.params.id)
        .then((detail) => {
            const { _id, pName, pPrice, pDetails, pCategory, quantity, bestseller, proPic } = detail;
            res.render("prodetails", {
                _id,
                pName,
                pPrice,
                pDetails,
                pCategory,
                quantity,
                bestseller,
                proPic
            })

        })
        .catch(err => console.log(`Error happened when pulling from the database :${err}`));

});

module.exports = router;

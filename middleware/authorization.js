const dashBoardLoader = (req, res, next) => {
    if (req.session.userInfo.type == "user") {
        res.render("userdashboard");
    }
    else {
        next();
    }
}

module.exports = dashBoardLoader;
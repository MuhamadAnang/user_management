const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  try {
    const token = req.cookies.accessToken;

    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
          console.log(err);
          // Jika token tidak valid, kembalikan error
          return res
            .status(401)
            .json({ message: "Unauthorized. Invalid token." });
        }

        // Jika token valid, simpan informasi pengguna dalam req.user
        req.user = decoded;

        // Lanjutkan ke route berikutnya
        next();
      });
    } else {
      // Jika tidak ada cookie atau token, kembalikan error
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = isAuthenticated;

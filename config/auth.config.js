const session = require("express-session");
const MongoStore = require("connect-mongo");

module.exports = (app) => {
  app.use(
    session({
      name: "strive",
      secret: process.env.SESS_SECRET,
      saveUninitialized: true,
      resave: false,
      cookie: {
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI || "mongodb://localhost/Strive",
        ttl: 2 * 24 * 60 * 60,
      }),
    })
  );
};

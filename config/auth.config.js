const session = require("express-session");
const MongoStore = require("connect-mongo");
const password = encodeURIComponent(process.env.MONGODB_PASSWORD) 
const MONGO_URI = `mongodb+srv://Conjectures:${password}@cluster0.ieaqtvk.mongodb.net/Strive?retryWrites=true&w=majority`;

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
        mongoUrl: MONGO_URI,
        ttl: 2 * 24 * 60 * 60,
      }),
    })
  );
};

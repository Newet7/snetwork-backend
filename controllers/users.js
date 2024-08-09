const Router = require("koa-router");

const User = require("../models/User");

const router = new Router().prefix("/users");

router.get("/:_id", async (ctx) => {
  const { _id } = ctx.params;
  const user = await User.findById(_id);
  if (user) {
    ctx.body = user;
  } else {
    ctx.throw(404);
  }
});

module.exports = router.routes();

const Router = require("koa-router");
const passport = require("koa-passport");

const Post = require("../models/Post");

const router = new Router().prefix("/posts");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    //console.log(err);
    const { body } = ctx.request.body;
    const { user } = ctx.state;
    ctx.body = await new Post({ body, user: user._id }).save();
    ctx.status = 201;
  }
);

router.get("/", async (ctx) => {
  const { query } = ctx;
  const { skip, limit } = query;
  delete query.skip;
  delete query.limit;
  const q =
    "users" in query ? { user: { $in: query.users.split(",") } } : query;
  ctx.set("x-total-count", await getTotalCount(q));
  ctx.body = await Post.find(q)
    .sort({ createdDate: -1 })
    .skip(+skip)
    .limit(+limit);
});

async function getTotalCount(query) {
  return await Post.countDocuments(query);
}

router.get("/:id", async (ctx) => {
  const { id } = ctx.params;
  const post = await Post.findById(id);
  if (post) {
    ctx.body = post;
  } else {
    ctx.throw(404, "Post has not been found");
  }
});

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const { _id, body } = ctx.request.body;
    const user = ctx.state.user._id;
    ctx.body = await Post.findOneAndUpdate(
      { _id, user },
      { $set: { body } },
      { new: true }
    );
  }
);

router.delete(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const { _id } = ctx.params;
    const user = ctx.state.user._id;
    const post = await Post.findOneAndDelete({ _id, user });
    if (post) {
      ctx.body = { message: "Post has been deleted" };
    } else {
      ctx.throw(404, "Post has not been found");
    }
  }
);

module.exports = router.routes();

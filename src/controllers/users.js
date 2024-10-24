router.get("/users", isLoggedIn, async (req, res) => {
  try {
    hasRole(req, res, ["admin", "superadmin", "helper"]);

    let {
      limit = 10,
      skip = 0,
      q,
      by = "created_at",
      order = "asc",
    } = req.query || {};
    let filter = {};

    if (q) {
      filter = { username: { $regex: new RegExp(q, "i") } };
    }

    limit = +limit;
    skip = +skip;

    const total = await User.countDocuments(filter);
    const data = await User.find(filter)
      .sort({ [by]: order })
      .limit(limit)
      .skip(limit * skip);
    res.json({ total, data, limit, skip });
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

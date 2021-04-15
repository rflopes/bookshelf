module.exports = app => {
  // when a get for / redirect to discover
  app.get(/^\/$/, (req, res) => res.redirect('/discover'));
};

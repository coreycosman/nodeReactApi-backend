const routes = [
  {
    name: "/users",
    middleware: "./user-routes"
  },
  {
    name: "/posts",
    middleware: "./post-routes"
  }
];

module.exports = app => {
  routes.forEach(route => {
    app.use(route.name, require(route.middleware));
  });
};

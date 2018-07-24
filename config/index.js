module.exports = {
  dbname: "demotest",
  uri: "mongodb://localhost:27017/demotest",
  opts: {
    useNewUrlParser: true,
    auto_reconnect: true,
    poolSize: 40,
  }
};

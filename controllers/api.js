// API for our resources
exports.api = function (req, res) {
  res.write("[");
  res.write('{"resource":"locations", ');
  res.write('"verbs":["GET","POST","PUT","DELETE"]}');
  res.write("]");
  res.send();
};

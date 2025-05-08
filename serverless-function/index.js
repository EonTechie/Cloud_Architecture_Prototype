exports.notify = (req, res) => {
  console.log("Notification triggered:", req.body);
  res.send("Notification received");
};

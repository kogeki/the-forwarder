const router = require("express").Router();
const conn = require("../utils/db");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const Discord = require("discord.js");

router.post("/:token", upload.any(), (req, res) => {
  const token = req.params.token;

  conn.query(
    `SELECT * FROM forwarder WHERE uuid = ?`,
    [token],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Something went wrong!");
      } else {
        if (results.length === 0) {
          return res.status(404).send("Not found!");
        } else {
          const webhookClient = new Discord.WebhookClient({
            url: results[0].discord_webhook,
          });
          if (req.body && Object.keys(req.body).length > 0) {
            webhookClient.send(req.body);
          }

          if (req.files) {
            console.log(req.files);
            req.files.forEach((file) => {
              webhookClient.send({
                files: [
                  {
                    attachment: file.buffer,
                    name: file.originalname,
                  },
                ],
              });
            });
          }
        }
      }
    }
  );

  res.status(200).send("lol");
});

module.exports = router;

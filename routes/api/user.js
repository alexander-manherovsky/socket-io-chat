const router = require("express").Router();
const userService = require("../../services/user");

router.get("/", (req, res, next) => {
  userService.findAll((err, data) => {
    if (!err) {
      res.data = data;
      res.json(res.data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

router.get("/:id", (req, res, next) => {
  userService.findOne(req.params.id, (err, data) => {
    if (!err) {
      res.data = data;
      res.json(res.data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

router.post("/", (req, res, next) => {
  userService.store(req.body, (err, savedInstance) => {
    if (!err) {
      res.send(savedInstance);
        // .send("item saved to database");
    } else {
      res.status(400).send("unable to save to database");
      res.end();
    }
  });
});

router.put("/:id", (req, res, next) => {
  userService.update(req.params.id, req.body, (err, updatedInstance) => {
    if (!err) {
      res.send(updatedInstance);
        // .send("item is updated in database");
    } else {
      res.status(400).send("unable to update in database");
      res.end();
    }
  });
});

router.delete("/:id", (req, res, next) => {
  userService.destroy(req.params.id, (err, deletedInstance) => {
    if (!err) {
      res.send(deletedInstance);
      // .send("item saved to database");
    } else {
      res.status(400).send("unable to delete from database");
      res.end();
    }
  });
});

module.exports = router;
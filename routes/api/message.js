const router = require("express").Router();
const messageService = require("../../services/message");

router.get("/", (req, res, next) => {
    messageService.getAllMessagesWithAuthor((err, data) => {
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
    messageService.getMessageWithAuthor(req.params.id, (err, data) => {
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
    messageService.store(req.body, (err, savedInstance) => {
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
    messageService.update(req.params.id, req.body, (err, updatedInstance) => {
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
    messageService.destroy(req.params.id, (err, deletedInstance) => {
        if (!err) {
            res.send(deletedInstance);
            // .send("item saved to database");
        } else {
            res.status(400).send("unable to delete from database");
            res.end();
        }
    });
});

router.get("/:user_id/senders-and-receivers", (req, res, next) => {
    messageService.findAllSendersAndReceivers(req.params.user_id, (err, data) => {
        if (!err) {
            res.data = data;
            res.json(res.data);
        } else {
            res.status(400);
            res.end();
        }
    });
});

module.exports = router;
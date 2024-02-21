const express = require("express");
const bodyParser = require("body-parser");

const Youtubes = require("../models/youtubes");
const youtubeRouter = express.Router();

youtubeRouter.use(bodyParser.json());

youtubeRouter
  .route("/")
  .get((req, res, next) => {
    Youtubes.find({})
      .then(
        (youtubes) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          console.log("Get success!!");
          res.json(youtubes);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Youtubes.create(req.body)
      .then(
        (youtube) => {
          console.log("Youtube created ", youtube);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(youtube);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /youtube");
  })
  .delete((req, res, next) => {
    Youtubes.deleteOne({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });


youtubeRouter
  .route("/:youtubesId")
  .get((req, res, next) => {
    Youtubes.findById(req.params.youtubesId)
      .then(
        (youtube) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(youtube);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(
      "POST operation not supported on /youtube/ " + req.params.youtubesId
    );
  })
  .put((req, res, next) => {
    Youtubes.findByIdAndUpdate(
      req.params.youtubesId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (youtubesId) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(youtubesId);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Youtubes.findByIdAndDelete(req.params.youtubesId)
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = youtubeRouter;

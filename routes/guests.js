/** @format */

const router = require("express").Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

//Guest model
const Guest = require("../models/GuestModel");

router.get("/", auth, async (req, res) => {
  try {
    const guests = await Guest.find({ user: req.user.id });
    res.json(guests);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  auth,
  [
    check("name", "Please provide a valid name")
      .not()
      .isEmpty(),
    check("phone", "Please provide phone")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { name, phone, dietary, isConfirmed } = req.body;

    try {
      let guest = new Guest({
        user: req.user.id,
        name,
        phone,
        dietary,
        isConfirmed
      });

      guest = await guest.save();
      res.json(guest);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/:id", auth, async (req, res) => {
  try {
    let guest = await Guest.findById(req.params.id);
    if (!guest) {
      return res.status(404).json({ msg: "Guest not found" });
    }

    if (guest.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorised" });
    }

    await Guest.findByIdAndRemove(req.params.id);
    res.send("Guest Removed");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", auth, async (req, res) => {
  const { name, phone, dietary, isConfirmed } = req.body;
  const updatedGuest = { name, phone, dietary, isConfirmed };
  try {
    let guest = await Guest.findById(req.params.id);
    if (!guest) {
      return res.status(404).json({ msg: "Guest not found" });
    }
    if (guest.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorised" });
    }

    guest = await Guest.findByIdAndUpdate(
      req.params.id,
      { $set: updatedGuest },
      { new: true }
    );
    res.send(guest);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

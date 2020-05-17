const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");
const Contact = require("../models/Contact");

// @route     GET api/contacts
// @desc      Get all users contacts
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST api/contacts
// @desc      Add new contact
// @access    Private
router.post(
  "/",
  [auth, [check("title", "title is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { link, title, content, favorite } = req.body;

    try {
      const newContact = new Contact({
        user: req.user.id,
        title,
        link,
        content,
        favorite
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     PUT api/contacts/:id
// @desc      Update contact
// @access    Private
router.put("/:id", auth, async (req, res) => {
  const { link, title, content, favorite, date } = req.body;
  // Build contact object
  const contactFields = {};
  if (title) contactFields.title = title;
  if (link) contactFields.link = link;
  if (content) contactFields.content = content;
  if (favorite) {
    contactFields.favorite = favorite
  } else if (!favorite) {
    contactFields.favorite = false
  }
  contactFields.date = Date()   // on update, automatically updates date to current date so react filter moves that item to top

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    // console.log(contactFields) logs what the update obj looks l ike
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields }
      // { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/contacts/:id
// @desc      Delete contact
// @access    Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: "Contact removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;


// // @route     PUT api/contacts/children/:id
// // @desc      Update contact children
// // @access    Private
// router.put("/children/:id", auth, async (req, res) => {
//   const { title, link, content } = req.body;
//   // DONT FORGET TO ADD auth  ------------------------------------------- TODO
//   // Build contact object
//   const contactFields = {};
//   if (title) contactFields.title = title;
//   if (link) contactFields.link = link;
//   if (content) contactFields.content = content;
//   if (type) contactFields.type = type;

//   try {
//     let contact = await Contact.findById(req.params.id);

//     if (!contact) return res.status(404).json({ msg: "Contact not found" });

//     // Make sure user owns contact
//     if (contact.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: "Not authorized" });
//     }

//     contact.children.unshift(contactFields);

//     res.json(contact);
//   } catch (err) {
//     console.error(er.message);
//     res.status(500).send("Server Error");
//   }
// });

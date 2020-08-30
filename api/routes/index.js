const express = require("express");
const router = express.Router();

var CRUDController = require("../controllers/CRUDController");


router.post(
  "/create_bookmark", 
  CRUDController.create_bookmark,
  CRUDController.create_tag
);

router.delete(
  '/delete_bookmark',
  CRUDController.delete_bookmark
)

router.post(
  '/set_tag',
  CRUDController.set_tag,
  CRUDController.create_tag
)

router.post(
  '/remove_tag',
  CRUDController.remove_tag
)

router.post(
  '/create_empty_tag',
  CRUDController.create_empty_tag
  )

router.get(
  '/get_bookmarks',
  CRUDController.get_bookmarks
)

router.get(
  '/get_tags',
  CRUDController.get_tags
)

module.exports = router;

const { Router } = require("express");
const controller = require("../controllers/itemController");
const { itemValidationRules } = require("../utils/formValidator");

const router = Router();

router.get("/", controller.list);
router.get("/new", controller.showCreateForm);
router.post("/", itemValidationRules, controller.create);
router.get("/:id", controller.details);
router.get("/:id/edit", controller.showEditForm);
router.post("/:id", controller.update);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
router.post("/:id/delete", controller.delete);

module.exports = router;
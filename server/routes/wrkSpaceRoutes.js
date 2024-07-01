const express = require('express');
const router=express.Router();
const wrkSpaceController=require('./../controllers/wrkspaceController');

router.route('/').post(wrkSpaceController.createWrkSpace);
router.route('/').patch(wrkSpaceController.addWrkSpace);
router.route('/:id').get(wrkSpaceController.getUser);
router.route('/wrk/:id').get(wrkSpaceController.getWrkSpace);
router.route('/card/').post(wrkSpaceController.createCard);
// router.route('/card/').patch(wrkSpaceController.addCards);
router.route('/list/').post(wrkSpaceController.createTask);
router.route('/card/:id').get(wrkSpaceController.getCard);

module.exports = router;
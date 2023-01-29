"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
//GYMS
router.get('/get-gyms'); //gets all gyms
router.post('/create-gym'); // creates new gym
router.get('/get-gym/:id'); //gets one gym
router.put('/update-gym/:id'); //update one gym
router.delete('/delete-gym/:id'); // deletes one gym
//gym,WALLS
router.get('/:gymId/walls/get-walls'); // gets all walls on a gym
router.get('/:gymId/walls/get-wall/:wallId'); // gets one wall
router.put('/:gymId/walls/update-wall/:wallId'); // updates wall
router.delete('/:gymId/walls/delete-wall/:wallId'); // deletes wall
//gym,walls, BOULDERS
router.get('/:gymId/walls/:wallId/boulders/get-boulders'); // gets all boulders
router.get('/:gymId/walls/:wallId/boulders/get-boulder/:boulderId'); // gets one boulder
router.put('/:gymId/walls/:wallId/boulders/update-boulder/:boulderId'); // updates one boulder
router.delete('/:gymId/walls/:wallId/boulders/delete-boulder/:boulderId'); // deletes one boulder
//direct Boulders
//# sourceMappingURL=gym.route.js.map
import { Router } from 'express';
import testchambersController from '../controllers/testchambers.controller';

const testchambers = Router();

testchambers.get('/', testchambersController.getAll);
testchambers.get('/main', testchambersController.getMain);
testchambers.get('/advanced', testchambersController.getAdvanced);
testchambers.get('/challenge', testchambersController.getChallenge);
testchambers.get('/still-alive-bonus', testchambersController.getStillAliveBonus);

export default testchambers;

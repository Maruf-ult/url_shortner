import { Router } from 'express';
import { sendUrl, getUrl ,tiny_Url } from '../modules/operation.js';

const router = Router();

router.post('/api/create_url', sendUrl);
router.get('/api/tiny_url/:short_url', tiny_Url);
router.get('/api/all_url', getUrl);

export default router;

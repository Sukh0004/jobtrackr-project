import express from 'express';
import verifyToken from '../middleware/requireAuth.js';
import User from '../models/User.js';
import { sendReminderEmail } from '../utils/mailer.js';

const router = express.Router();
router.use(verifyToken);

router.post('/', async (req, res) => {
  try {
    const { jobTitle, date, note } = req.body;
    const user = await User.findById(req.userId);
    const message = ` Reminder for Job Application:\n\nJob Title: ${jobTitle}\nDate: ${date}\nNotes: ${note}`;
    await sendReminderEmail({
      to: user.email,
      subject: `Reminder: ${jobTitle} on ${date}`,
      text: message
    });
    res.json({ message: 'Reminder email sent!' });
  } catch (err) {
     console.error(' Email send error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router;

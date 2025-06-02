exports.postContact = (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    res.json({ message: 'Contact form submitted successfully', data: { name, email, message } });
  };
  
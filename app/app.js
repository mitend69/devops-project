const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from Jenkins CI/CD Pipeline — deployed via Docker & Ansible!
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});


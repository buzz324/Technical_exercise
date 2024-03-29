// main.ts

import express from 'express';
import { getUsers } from './handlers';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/users', getUsers);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

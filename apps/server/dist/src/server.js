import express from 'express';
import { env } from '#src/env.ts';
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello, World');
});
console.group();
console.log(`Application version ${env.VERSION}`);
console.log(`Running on port ${env.PORT}...`);
console.groupEnd();
app.listen(env.PORT);

import * as express from 'express';
import * as fs from 'fs';

// Constants
const PORT = 3003;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.static('./build/public', {
  index: 'index.html'
}));

app.listen(PORT, HOST);

fs.readdir('./build/public/js', (error, list) => {
  console.log(list);
});

console.log(`Running on http://${HOST}:${PORT}`);

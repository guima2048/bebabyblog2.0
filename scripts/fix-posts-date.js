const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/posts.json');

const posts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const now = new Date().toISOString();

let changed = false;

for (const post of posts) {
  if (!post.data) {
    post.data = now;
    changed = true;
  }
}

if (changed) {
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
  console.log('Campo "data" preenchido automaticamente nos posts que não tinham.');
} else {
  console.log('Todos os posts já possuem o campo "data".');
} 
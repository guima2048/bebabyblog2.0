const fs = require('fs');
const { execSync } = require('child_process');
const path = './public';

// 1. Verifica e cria sitemap.xml
if (!fs.existsSync(`${path}/sitemap.xml`)) {
  console.log('📄 Criando sitemap.xml para localhost...');
  execSync(
    'npx sitemap-generator-cli http://localhost:3000 --filepath ./public/sitemap.xml --stripQuerystring',
    { stdio: 'inherit' }
  );
} else {
  console.log('📄 sitemap.xml já existe.');
}

// 2. Verifica e cria robots.txt
if (!fs.existsSync(`${path}/robots.txt`)) {
  console.log('🤖 Criando robots.txt para localhost...');
  fs.writeFileSync(
    `${path}/robots.txt`,
    `User-agent: *\nDisallow: /admin/\nDisallow: /login/\nSitemap: http://localhost:3000/sitemap.xml\n`
  );
} else {
  console.log('🤖 robots.txt já existe.');
}

// 3. Adiciona script update-sitemap no package.json se ainda não tiver
const pkgPath = './package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
if (!pkg.scripts['update-sitemap']) {
  pkg.scripts['update-sitemap'] = 'npx sitemap-generator-cli http://localhost:3000 --filepath ./public/sitemap.xml --stripQuerystring';
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  console.log('🔧 Script "update-sitemap" adicionado ao package.json');
} else {
  console.log('🔧 Script "update-sitemap" já existe no package.json');
}

console.log('✅ Indexação local configurada!'); 
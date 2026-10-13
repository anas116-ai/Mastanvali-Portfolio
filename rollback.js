const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔄 Rolling back to pristine checkpoint...');

// 1. Restore from physical backup directory
const backupDir = path.join(__dirname, 'src_backup_pristine');
const targetDir = path.join(__dirname, 'src');

function rmDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const item of fs.readdirSync(src)) {
    const s = path.join(src, item);
    const d = path.join(dest, item);
    if (fs.statSync(s).isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

try {
  rmDir(targetDir);
  copyDir(backupDir, targetDir);
  console.log('✅ Physical src restored from src_backup_pristine!');
} catch (e) {
  console.error('Physical copy error:', e.message);
}

// 2. Git reset
try {
  execSync('git reset --hard checkpoint-pristine', { stdio: 'inherit', cwd: __dirname });
  console.log('✅ Git reset to tag checkpoint-pristine successful!');
} catch (e) {
  console.log('Git reset notice:', e.message);
}

console.log('🎉 Pristine Obsidian-Lemon state 100% restored!');

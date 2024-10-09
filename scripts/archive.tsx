import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Post {
  name: string;
  path: string;
  lastUpdate: Date;
  ext: string;
}

/**
 * @param {string} dir
 * @param {string[]} blacklist
 * @returns {Post[]}
 */
export function getFiles(dir: string, blacklist: string[]): Post[] {
  let files: Post[] = [];
  const year = path.basename(dir);

  fs.readdirSync(dir).forEach((file) => {
    let filePath = path.join(dir, file);
    let stat = fs.statSync(filePath);

    if (stat.isDirectory() || file.startsWith(".")) {
      return;
    }

    if (path.basename(file).endsWith(".mdx") || path.basename(file).endsWith(".md")) {
      const content = fs.readFileSync(filePath, 'utf8');
      const matterData = matter(content);
      const lastUpdate = matterData.data.last_update ? new Date(matterData.data.last_update.date) : new Date();
      const fileName = path.basename(file).replace(/\.mdx$|\.md$/, "");

      if (!blacklist.includes(fileName)) {
        files.push({
          name: fileName,
          path: `${year}/${fileName}`,
          lastUpdate,
          ext: path.extname(file) || '.md'
        });
      }
    }
  });

  files.sort((a, b) => b.lastUpdate.getTime() - a.lastUpdate.getTime());

  return files;
}

export function generateArchiveContent() {
  const projectRoot = path.resolve(__dirname, '..');
  const docsDir = path.join(projectRoot, 'docs');
  const blacklist: string[] = [];

  let allFilesByYear = {};
  fs.readdirSync(docsDir).forEach((yearDir) => {
    const yearPath = path.join(docsDir, yearDir);
    if (fs.statSync(yearPath).isDirectory()) {
      const files = getFiles(yearPath, blacklist);
      allFilesByYear[yearDir] = files;
    }
  });

  const sortedYears = Object.keys(allFilesByYear).sort((a, b) => parseInt(b) - parseInt(a));

  let archiveContent = '';
  for (const year of sortedYears) {
    const files = allFilesByYear[year];
    archiveContent += `## ${year}\n\n`;
    files.forEach((file) => {
      const dateString = file.lastUpdate.toISOString().split('T')[0];
      archiveContent += `- **${dateString}**  \n [${file.name}](${file.path}${file.ext})\n\n`;
    });
  }

  return archiveContent;
}

export async function appendToIndex() {
  const archiveContent = generateArchiveContent();
  const docsDir = 'docs/';
  const indexPath = path.join(docsDir, 'index.md');

  let content = fs.readFileSync(indexPath, 'utf8');
  content += '\n\n' + archiveContent;
  fs.writeFileSync(indexPath, content);
  console.log('Archive content appended to index.md');
}

// 在构建时自动执行
if (process.env.NODE_ENV === 'production' || process.argv.includes('build')) {
  appendToIndex();
}
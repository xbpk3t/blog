import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Post {
  metadata: {
    date: string;
    permalink: string;
    title: string;
  };
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
      const slug = matterData.data.slug;

      if (!blacklist.includes(fileName) && slug != undefined) {
        files.push({
          metadata: {
            date: lastUpdate.toISOString().split('T')[0],
            permalink: `${slug}`,
            title: matterData.data.title || fileName,
          },
        });
      }
    }
  });

  files.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());

  return files;
}

export function generateArchiveData() {
  const projectRoot = path.resolve(__dirname, '..');
  const docsDir = path.join(projectRoot, 'docs');
  const blacklist: string[] = [];

  let allFilesByYear = {};
  fs.readdirSync(docsDir).forEach((yearDir) => {
    const yearPath = path.join(docsDir, yearDir);
    if (fs.statSync(yearPath).isDirectory()) {
      allFilesByYear[yearDir] = getFiles(yearPath, blacklist);
    }
  });

  const sortedYears = Object.keys(allFilesByYear).sort((a, b) => parseInt(b) - parseInt(a));

  let archiveData = {
    blogPosts: [],
  };

  for (const year of sortedYears) {
    const files = allFilesByYear[year];
    files.forEach((file) => {
      archiveData.blogPosts.push(file);
    });
  }

  return archiveData;
}

export function writeArchiveDataToFile(archiveData: any, filePath: string) {
  fs.writeFileSync(filePath, JSON.stringify(archiveData, null, 2), 'utf8');
  console.log(`Archive data written to ${filePath}`);
}

// 在构建时自动执行
// if (process.env.NODE_ENV === 'production' || process.argv.includes('build')) {
const archiveData = generateArchiveData();
const outputFilePath = path.join(__dirname, 'archive.json');
writeArchiveDataToFile(archiveData, outputFilePath);
// }
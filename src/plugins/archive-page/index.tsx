import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'

// 确保安装了必要的依赖
// npm install fs-extra gray-matter

/**
 * @param {string} dir
 * @param {string[]} blacklist
 * @returns {string[]}
 */
export function getFiles(dir: string, blacklist: string[]): string[] {
  let files = [];
  const year = path.basename(dir);

  fs.readdirSync(dir).forEach((file) => {
    let filePath = path.join(dir, file);
    let stat = fs.statSync(filePath);

    if (stat.isDirectory() || file.startsWith(".")) {
      return;
    }

    let f: string;

    if (path.basename(file).endsWith(".mdx") || path.basename(file).endsWith(".md")) {
      f = path.basename(file).replace(/\.mdx$|\.md$/, "");
    } else {
      return;
    }

    if (!blacklist.includes(f)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const matterData = matter(content);
      const lastUpdate = matterData.data.last_update ? matterData.data.last_update.date : null;

      if (lastUpdate) {
        files.push({
          name: f,
          path: `${year}/${f}`,
          lastUpdate: new Date(lastUpdate)
        });
      }
    }
  });

  // 根据日期降序排序
  files.sort((a, b) => b.lastUpdate - a.lastUpdate);

  // 只返回文件路径
  return files.map(file => file.path);
}

// export async function generateArchiveContent() {
//   // const docsDir = path.join(__dirname, '..', 'docs');
//   const projectRoot = path.resolve(__dirname, '..', '..', '..', '..');
//   const docsDir = path.join(projectRoot, 'docs');
//   const blacklist: string[] = []; // 定义黑名单
//
//   // 读取docs目录
//   const files = getFiles(docsDir, blacklist);
//
//   // 生成archive内容
//   return files.map(file => {
//     // return `<!--<li><a href="/${file}">${path.basename(file)}</a> - Last updated: ${file.lastUpdate}</li>-->`;
//
//     return `<li><a href="/${file}">${path.basename(file)}</a></li>`;
//   }).join('');
// }

export async function generateArchiveContent() {
  const projectRoot = path.resolve(__dirname, '..', '..', '..');
  const docsDir = path.join(projectRoot, 'docs');
  const blacklist: string[] = []; // 定义黑名单

  // 遍历docs目录下的所有子目录
  let allFiles = [];
  fs.readdirSync(docsDir).forEach((yearDir) => {
    const yearPath = path.join(docsDir, yearDir);
    if (fs.statSync(yearPath).isDirectory()) {
      const files = getFiles(yearPath, blacklist);
      allFiles = allFiles.concat(files);
    }
  });

  // 生成archive内容
  return allFiles.map(file => {
    return `<li><a href="/${file}">${path.basename(file)}</a></li>`;
  }).join('');
}



export async function appendToIndex() {
  const archiveContent = await generateArchiveContent();
  let docsDir = 'docs/'
  // 定义现有文件的路径
  const indexPath = path.join(docsDir, 'index.md');

  // 读取现有文件内容
  let content = fs.readFileSync(indexPath, 'utf8');

  // 直接追加archive内容到文件末尾
  content += '\n\n---\n\n## Archive\n\n<ul>\n' + archiveContent + '\n</ul>\n';

  // 写回文件
  fs.writeFileSync(indexPath, content);
  console.log('Archive content appended to index.md');
}

// 在构建时自动执行
// if (process.env.NODE_ENV === 'production' || process.argv.includes('build')) {
//   appendToIndex();
// }

appendToIndex();
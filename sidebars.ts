import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';


/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */


// @ts-check
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'

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


const sidebars: SidebarsConfig = {
  zzz: [
    'index',
    {
      type: 'category',
      label: '2024',
      items: getFiles("docs/2024", [])
    },
    {
      type: 'category',
      label: '2023',
      items: getFiles("docs/2023", [])
    },
    {
      type: 'category',
      label: '2000',
      items: getFiles("docs/2000", [])
    }
  ]
};

module.exports = sidebars;

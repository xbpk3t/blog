const fs = require("fs");
const path = require("path");
const matter = require('gray-matter');


// 打开新页面
function openWindow(url: string): void {
  const w: Window | null = window.open("about:blank");
  if (w) {
    w.opener = null;
    w.location.href = url;
  }
  return;
}

// 移动端检测
function isMobile(): boolean {
  const userAgent: string = navigator.userAgent.toUpperCase();
  if (/IPHONE|IPOD/.test(userAgent) && /MOBILE/.test(userAgent)) {
    return true;
  } else if (/ANDROID/.test(userAgent) && /MOBILE/.test(userAgent)) {
    return true;
  } else if (/IPAD/.test(userAgent) && /MOBILE/.test(userAgent)) {
    return false;
  } else {
    return false;
  }
}

// 从 url 获取 domain
function getDomain(url: string): string {
  return (new URL(url)).hostname;
}

// 复制文本
async function setClipBoardText(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}


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


export { openWindow, isMobile, setClipBoardText, getDomain };

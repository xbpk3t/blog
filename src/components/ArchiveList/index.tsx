// src/components/DynamicDocsList.tsx
import React from 'react';
import path from 'path';
import Link from '@docusaurus/Link';
// 导入你的getFiles函数
import {getFiles} from '@site/sidebars'; // 确保这是你getFiles函数的正确路径

// 定义文件类型
interface File {
  name: string;
  path: string;
  lastUpdate: Date;
}

// 定义你的getFiles函数的类型
interface GetFiles {
  (dir: string, blacklist: string[]): string[];
}

const DynamicDocsList: React.FC<{ dir: string }> = ({dir}) => {
  const year = path.basename(dir);
  const blacklist = ['README', 'index']; // 你可以根据需要调整黑名单
  const files = getFiles(dir, blacklist);

  return (
    <div>
      <h2>{year}</h2>
      <ul>
        {files.map((file) => (
          <li key={file}>
            <Link href={`/${file}/`}>{file}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DynamicDocsList;
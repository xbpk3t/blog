import React from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import {Icon} from '@iconify/react';
import styles from './styles.module.css';
import {motion} from 'framer-motion';

type ArchiveBlogPost = {
  metadata: {
    date: string;
    permalink: string;
    title: string;
  };
};

type YearProp = {
  year: string;
  posts: ArchiveBlogPost[];
};

// const variants = {
//   from: {opacity: 0.01, y: 50},
//   to: i => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       type: 'spring',
//       damping: 25,
//       stiffness: 100,
//       bounce: 0.2,
//       duration: 0.3,
//       delay: i * 0.1,
//     },
//   }),
// };

const variants = {
  // 移除动画效果，直接设置为要达到的状态
  from: {opacity: 0.01, y: 50},
  to: {opacity: 1, y: 0},
};

const formatDate = dateString => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${month}-${day}`;
};

function Year({posts}: YearProp) {
  return (
    <>
      <ul className={styles.archiveList}>
        {posts.map((post, i) => (
          <motion.li
            key={post.metadata.permalink}
            className={styles.archiveItem}
            custom={i}
            initial="from"
            animate="to"
            variants={variants}
            viewport={{once: true, amount: 0.8}}
            transition={{duration: 0}} // 设置动画时间为0ms，实现无动画效果
          >
            <Link to={post.metadata.permalink}>
              <time
                className={styles.archiveTime}>{formatDate(post.metadata.date)}</time>
              <span>{post.metadata.title}</span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </>
  );
}

function YearsSection({years}: { years: YearProp[] }) {
  return (
    <div className="margin-top--md">
      {years.map((_props, idx) => (
        <motion.div key={idx} initial="from" animate="to" custom={idx}
                    variants={variants}>
          <div className={styles.archiveYear}>
            <h3 className={styles.archiveYearTitle}>{_props.year}</h3>
            <span>
              <i>{(years[idx] as YearProp).posts.length} </i>
              <Translate
                id="theme.blog.archive.posts.unit">篇</Translate>
            </span>
          </div>
          <Year {..._props} />
        </motion.div>
      ))}
    </div>
  );
}

function listPostsByYears(blogPosts) {
  const postsByYear = blogPosts.reduce((posts, post) => {
    const year = post.metadata.date.split('-')[0];
    const yearPosts = posts.get(year) ?? [];
    return posts.set(year, [...yearPosts, post]);
  }, new Map());

  return Array.from(postsByYear, ([year, posts]) => ({
    year,
    posts,
  }))
    // 使用 sort 方法对年份进行降序排序
    .sort((a, b) => parseInt(b.year) - parseInt(a.year));
}

export default function BlogArchive({archive}) {
  const title = translate({
    id: 'theme.blog.archive.title',
    message: 'Archive',
    description: 'The page & hero title of the blog archive page',
  });
  const description = translate({
    id: 'theme.blog.archive.description',
    message: 'Archive',
    description: 'The page & hero description of the blog archive page',
  });

  const years = archive ? listPostsByYears(archive.blogPosts) : [];

  return (
    <>
      <div className="bg-background">
        <div className="container" style={{
          margin: '0 auto',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}>
          <main style={{
            textAlign: 'center',
            width: '100%',
            maxWidth: '700px', // 根据需要调整
            padding: '0 16px',
          }}>
            <h2 className={styles.archiveTitle}>
              <Icon icon="carbon:blog" width={24} height={24}/>
              {title}
            </h2>
            <p>
              <Translate id="theme.blog.archive.posts.total"
                         values={{total: archive ? archive.blogPosts.length : 0}}>
                {'当前共有 {total} 篇文章，请持续保持创作！'}
              </Translate>
            </p>
            {years.length > 0 && <YearsSection years={years}/>}
          </main>
        </div>
      </div>
    </>
  );
}
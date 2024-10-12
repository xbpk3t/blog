import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import type {Props} from '@theme/DocItem/Content';
import {useDateTimeFormat} from '@docusaurus/theme-common/internal';


import styles from './styles.module.css';
import Toolbar from "@site/src/components/Toolbar";

/**
 Title can be declared inside md content or declared through
 front matter and added manually. To make both cases consistent,
 the added title is added under the same div.markdown block
 See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120

 We render a "synthetic title" if:
 - user doesn't ask to hide it with front matter
 - the markdown content does not already contain a top-level h1 heading
 */
function useSyntheticTitle(): string | null {
  const {metadata, frontMatter, contentTitle} = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}

function useSyntheticDate(): number | null {
  const {metadata, frontMatter, contentTitle} = useDoc();
  // const shouldRender =
  //   !frontMatter.hide_title && typeof contentTitle === 'undefined';
  // if (!shouldRender) {
  //   return null;
  // }
  let dateTs = new Date(frontMatter.date).getTime()
  // console.log(dateTs)

  // return metadata.lastUpdatedAt;
  return dateTs;
  // return new Date(frontMatter.date).getTime();
}

function DateTime({
                    date,
                    formattedDate,
                  }: {
  date: string;
  formattedDate: string;
}) {
  return <time dateTime={date}>{formattedDate}</time>;
}

export default function DocItemContent({children}: Props): JSX.Element {
  const syntheticTitle = useSyntheticTitle();
  const ts = useSyntheticDate(); // 假设这是你的时间戳
  const date = new Date(ts);
  const formattedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  const dateTimeFormat = useDateTimeFormat({
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

  const formatDate = (blogDate: string) =>
    dateTimeFormat.format(new Date(blogDate));

  return (
    <div
      className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
          <div
            className={clsx(styles.container, 'margin-vert--md')}>
            <DateTime date={formattedDate}
                      formattedDate={formatDate(formattedDate)}/>
          </div>
        </header>
      )}

      <Toolbar></Toolbar>

      <MDXContent>{children}</MDXContent>
    </div>
  );
}

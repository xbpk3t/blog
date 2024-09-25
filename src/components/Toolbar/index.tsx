import React from 'react';
// import { useBlogPost } from '@docusaurus/theme-common';
// import QRCode from 'qrcode.react';
// import IconButton from '@material-ui/core/IconButton';
// import { useColorMode } from '@docusaurus/theme-common';
// import { FaCopy } from 'react-icons/fa';
// import { ImTwitter } from 'react-icons/im';
// import { AiFillWeiboCircle } from 'react-icons/ai';
// import { BiPlayCircle } from 'react-icons/bi';
import styles from './style.module.css';

const Toolbar = () => {
  // const { metadata, isBlogPostPage } = useBlogPost();
  // const { permalink } = metadata;
  // const blogUrl = siteConfig.url + '' + useBaseUrl(permalink);
  // const { colorMode } = useColorMode();
  // const [paused, setPaused] = useState(true);
  // const audioRef = useRef();
  //
  // const onCopy = () => {
  //   navigator.clipboard.writeText(blogUrl)
  //     .then(() => {
  //       console.log("复制链接成功");
  //     })
  //     .catch((error) => {
  //       console.error("复制时出错: ", error);
  //     });
  // };
  //
  // const onShareToWeibo = () => {
  //   const shareUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(blogUrl)}&title=${encodeURIComponent(metadata.title + "|" + metadata.description)}&pic=${metadata.frontMatter.image}`;
  //   window.open(shareUrl, '_blank');
  // };
  //
  // const onShareToTwitter = () => {
  //   const shareUrl = `https://twitter.com/share?url=${encodeURIComponent(blogUrl)}&text=${encodeURIComponent(metadata.title + "|" + metadata.description)}&image=${metadata.frontMatter.image}`;
  //   window.open(shareUrl, '_blank');
  // };
  //
  // const onPlayAudio = () => {
  //   if (metadata.frontMatter.audio) {
  //     audioRef.current.play();
  //     paused ? audioRef.current.play() : audioRef.current.pause();
  //     setPaused(!paused);
  //   } else {
  //     console.log("本文未上传音频");
  //   }
  // };

  return (
    <div className={styles.toolbar}>
      {/*<IconButton aria-label="复制链接" onClick={onCopy}>*/}
      {/*  <FaCopy size={24} color={colorMode === 'dark' ? '#fff' : '#000'} />*/}
      {/*</IconButton>*/}
      {/*<IconButton aria-label="分享到微博" onClick={onShareToWeibo}>*/}
      {/*  <AiFillWeiboCircle size={24} color={colorMode === 'dark' ? '#fff' : '#000'} />*/}
      {/*</IconButton>*/}
      {/*<IconButton aria-label="分享到Twitter" onClick={onShareToTwitter}>*/}
      {/*  <ImTwitter size={24} color={colorMode === 'dark' ? '#fff' : '#000'} />*/}
      {/*</IconButton>*/}
      {/*<IconButton aria-label="听全文" onClick={onPlayAudio}>*/}
      {/*  {paused ?*/}
      {/*    (<BiPlayCircle size={24} color={colorMode === 'dark' ? '#fff' : '#000'} />) :*/}
      {/*    (<BiPlayCircle size={24} color={colorMode === 'dark' ? '#fff' : '#000'} />)*/}
      {/*  }*/}
      {/*</IconButton>*/}
      {/*<audio ref={audioRef} src={metadata.frontMatter.audio}></audio>*/}
      {/*<QRCode value={blogUrl} size={64} />*/}
    </div>
  );
};

export default Toolbar;
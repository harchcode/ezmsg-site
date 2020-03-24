/* eslint no-console: 0 */

import util from 'util';
import fs from 'fs';
import path from 'path';
// import chalk from 'chalk';
import ejs from 'ejs';
import MarkdownIt from 'markdown-it';
import fm from 'front-matter';
import postcss from 'postcss';
import postcssConfig from './postcss.config';
import posthtmlC from 'posthtml';
import posthtmlConfig from './posthtml.config';
import hljs from 'highlight.js';

const posthtml = posthtmlC(posthtmlConfig.plugins);
const md = MarkdownIt({
  html: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    return '';
  }
});

// const error = (str: any) => console.error(chalk.bold.red(str));
// const log = (str: any) => console.log(chalk.gray(str));
// const success = (str: any) => console.log(chalk.bold.green(str));

const getPath = (rel: string) => path.join(__dirname, rel);
const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);
const readTextFile = (p: string) => readFile(p, { encoding: 'utf-8' });
const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);
const outputDir = getPath('/dist');
const isDir = (dirPath: string) =>
  fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory();

const layouts: Record<string, string> = {};

type PageAttribute = {
  title: string;
  description: string;
  layout?: string;
};

type SiteAttribute = {
  name: string;
};

type PathAttribute = {
  current: string;
  root: string;
  css: string;
  getDepth: (level: number) => string;
};

type GuideMenu = {
  label: string;
  link: string;
};

type EJSParams = {
  page: PageAttribute;
  site: SiteAttribute;
  path: PathAttribute;
  guideMenu: GuideMenu[];
};

const siteAttribute: SiteAttribute = {
  name: 'EzMsg'
};

const guideMenu = [];

async function processFile(name: string, dir: string) {
  const sDir = dir === '/' ? '' : dir;
  const isIndex = name === 'index.md';

  const level = sDir.split('/').length;
  const depth = isIndex ? level - 1 : level;

  let rootPath = depth === 0 ? './' : '';
  for (let i = 0; i < depth; i++) rootPath += '../';

  const cssPath = rootPath + 'assets/index.css';

  const mdFile = await readTextFile(getPath(`/pages${dir}/${name}`));

  const meta = fm<PageAttribute>(mdFile);
  const content = md.render(meta.body);

  const pagePath = isIndex ? sDir : `${sDir}/${name.split('.').shift()}`;

  const layoutKey = meta.attributes.layout || 'blank';
  const layout = layouts[layoutKey];
  const html = ejs.render(
    layout,
    {
      site: siteAttribute,
      page: { ...meta.attributes, content },
      path: {
        root: rootPath,
        css: cssPath,
        current: pagePath,
        getDepth: (level: number) => pagePath.split('/')[level]
      },
      guideMenu
    } as EJSParams,
    {
      filename: getPath(`/templates/${layoutKey}.ejs`)
    }
  );

  const res = await posthtml.process(html);

  if (isIndex) {
    await writeFile(`${outputDir}${sDir}/index.html`, res.html);
  } else {
    const newDir = `${outputDir}${pagePath}`;

    await mkdir(newDir);
    await writeFile(`${newDir}/index.html`, res.html);
  }
}

async function processDir(dir: string) {
  if (dir !== '/') {
    await mkdir(`${outputDir}${dir}`);
  }

  const dirPath = getPath(`/pages${dir}`);
  const files = await readdir(dirPath);

  files.forEach(file => processFileOrDir(file, dir));
}

async function processFileOrDir(name: string, dir: string) {
  const newDir = `${dir === '/' ? '' : dir}/${name}`;
  const inputDir = `pages${newDir}`;
  const inputPath = getPath(inputDir);

  if (isDir(inputPath)) {
    processDir(newDir);
  } else {
    processFile(name, dir);
  }
}

async function processCSS(
  inputPath: string,
  outputPath: string,
  purge = false
) {
  const css = await readTextFile(inputPath);

  const plugins = [...postcssConfig.plugins];
  if (purge) plugins.push(postcssConfig.purgecss);

  const cssRes = await postcss(plugins).process(css, {
    from: inputPath,
    to: outputPath
  });

  await writeFile(outputPath, cssRes.css);

  if (cssRes.map) {
    await writeFile(outputPath + '.map', cssRes.map);
  }
}

function titleCase(str) {
  const splitStr = str.toLowerCase().split(' ');

  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }

  return splitStr.join(' ');
}

async function main() {
  await mkdir(outputDir);

  const layoutFiles = await readdir(getPath('/templates'));
  layoutFiles.forEach(async l => {
    if (l === 'partials') return;

    const name = l.split('.').shift();
    layouts[name] = await readTextFile(getPath(`/templates/${l}`));
  });

  const guideFiles = await readdir(getPath('/pages/guide'));
  guideFiles.forEach(g => {
    const name = g.split('.').shift();
    const label = titleCase(name.split('-').join(' '));

    guideMenu.push({
      label,
      link: name
    });
  });

  processFileOrDir('', '');

  // Process CSS
  await mkdir(`${outputDir}/assets`);

  processCSS(
    getPath('/assets/index.css'),
    `${outputDir}/assets/index.css`,
    process.env.NODE_ENV === 'production'
  );
  processCSS(
    require.resolve('highlight.js/styles/vs.css'),
    `${outputDir}/assets/highlight.css`
  );
}

main();

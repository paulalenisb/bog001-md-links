const mocksLinks = {};

const arrMockLinks = [
  {
    href: 'es.wikipedia.org/wiki/Markdow',
    text: 'Markdown',
    userPath: 'C:/Users/Lenovo/Documents/PL/2020/Laboratoria/Bootcamp/bog001-md-links/test/test-file.md',
  },
  {
    href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
    text: 'md-links',
    userPath: 'C:/Users/Lenovo/Documents/PL/2020/Laboratoria/Bootcamp/bog001-md-links/test/test-file.md',
  },
  {
    href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
    text: 'md-links',
    userPath: 'C:/Users/Lenovo/Documents/PL/2020/Laboratoria/Bootcamp/bog001-md-links/test/test-file.md',
  },
  {
    href: 'https://stackoverflow.com/questions/25460574/find-files-by-extension-html-under-a-folder-in-nodejs',
    text: 'find files by extension, *.html under a folder in nodejs',
    userPath: 'C:/Users/Lenovo/Documents/PL/2020/Laboratoria/Bootcamp/bog001-md-links/test/test-file.md',
  },
  {
    href: 'https://github.com/nspragg/filehound',
    text: 'File found with npm',
    userPath: 'C:/Users/Lenovo/Documents/PL/2020/Laboratoria/Bootcamp/bog001-md-links/test/test-file.md',
  },
  {
    href: 'https://www.npmjs.com/package/axios#axios-api',
    text: 'Axios',
    userPath: 'C:/Users/Lenovo/Documents/PL/2020/Laboratoria/Bootcamp/bog001-md-links/test/test-file.md',
  },
  {
    href: 'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback',
    text: 'Read file with fs',
    userPath: 'C:/Users/Lenovo/Documents/PL/2020/Laboratoria/Bootcamp/bog001-md-links/test/test-file.md',
  },
  {
    href: 'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback',
    text: 'Read file with fs',
    userPath: 'C:/Users/Lenovo/Documents/PL/2020/Laboratoria/Bootcamp/bog001-md-links/test/test-file.md',
  },
];

const arrMockValidate = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdow',
    text: 'Markdown',
    userPath: 'C:\\Users\\Lenovo\\Documents\\PL\\2020\\Laboratoria\\Bootcamp\\bog001-md-links\\test\\test-file.md',
    status: 404,
    ok: false,
  },
  {
    href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
    text: 'md-links',
    userPath: 'C:\\Users\\Lenovo\\Documents\\PL\\2020\\Laboratoria\\Bootcamp\\bog001-md-links\\test\\test-file.md',
    status: 200,
    ok: true,
  },
  {
    href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
    text: 'md-links',
    userPath: 'C:\\Users\\Lenovo\\Documents\\PL\\2020\\Laboratoria\\Bootcamp\\bog001-md-links\\test\\test-file.md',
    status: 200,
    ok: true,
  },
  {
    href: 'https://stackoverflow.com/questions/25460574/find-files-by-extension-html-under-a-folder-in-nodejs',
    text: 'find files by extension, *.html under a folder in nodejs',
    userPath: 'C:\\Users\\Lenovo\\Documents\\PL\\2020\\Laboratoria\\Bootcamp\\bog001-md-links\\test\\test-file.md',
    status: 200,
    ok: true,
  },
  {
    href: 'https://github.com/nspragg/filehound',
    text: 'File found with npm',
    userPath: 'C:\\Users\\Lenovo\\Documents\\PL\\2020\\Laboratoria\\Bootcamp\\bog001-md-links\\test\\test-file.md',
    status: 200,
    ok: true,
  },
  {
    href: 'https://www.npmjs.com/package/axios#axios-api',
    text: 'Axios',
    userPath: 'C:\\Users\\Lenovo\\Documents\\PL\\2020\\Laboratoria\\Bootcamp\\bog001-md-links\\test\\test-file.md',
    status: 200,
    ok: true,
  },
  {
    href: 'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback',
    text: 'Read file with fs',
    userPath: 'C:\\Users\\Lenovo\\Documents\\PL\\2020\\Laboratoria\\Bootcamp\\bog001-md-links\\test\\test-file.md',
    status: 200,
    ok: true,
  },
  {
    href: 'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback',
    text: 'Read file with fs',
    userPath: 'C:\\Users\\Lenovo\\Documents\\PL\\2020\\Laboratoria\\Bootcamp\\bog001-md-links\\test\\test-file.md',
    status: 200,
    ok: true,
  },
];

const arrMockDirPath = [
  'C:\\Users\\Lenovo\\Documents\\PL\\2020\\Laboratoria\\Bootcamp\\bog001-md-links\\test\\test-file.md',
  'C:\\Users\\Lenovo\\Documents\\PL\\2020\\Laboratoria\\Bootcamp\\bog001-md-links\\test\\test-nolink.md',
  'C:\\Users\\Lenovo\\Documents\\PL\\2020\\Laboratoria\\Bootcamp\\bog001-md-links\\test\\test-prueba\\prueba2.md',
  'C:\\Users\\Lenovo\\Documents\\PL\\2020\\Laboratoria\\Bootcamp\\bog001-md-links\\test\\test-prueba\\prueba3.md',
];
mocksLinks.arrMockLinks = arrMockLinks;
mocksLinks.arrMockValidate = arrMockValidate;
mocksLinks.arrMockDirPath = arrMockDirPath;

module.exports = mocksLinks;

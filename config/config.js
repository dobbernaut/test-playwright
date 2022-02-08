export const Config = {
  baseURL: 'https://www.flybuys.co.nz/',
  blogPostURL: 'https://jsonplaceholder.typicode.com', // this is an example api service
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.81 Safari/537.36',
  headless: process.env.HEADLESS ? process.env.HEADLESS === 'true' : true,
  viewport: process.env.VIEWPORT
    ? (([width, height]) => ({ width, height }))(process.env.VIEWPORT.split('x').map(Number))
    : { width: 1440, height: 900 },
  videoPath: process.env.VIDEO_PATH ?? '',
  slowMo: process.env.SLOW_MO ? Number(process.env.SLOW_MO) : 0,
};

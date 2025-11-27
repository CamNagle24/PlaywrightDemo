const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.wikipedia.org/');
  await page.getByRole('link', { name: 'English 7,094,000+ articles' }).click();
  await page.getByRole('link', { name: 'Freedom from Want', exact: true }).click();
  await page.getByRole('link', { name: 'Thanksgiving' }).first().click();

  // ---------------------
  await context.close();
  await browser.close();
})();
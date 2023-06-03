// Created by Shishir Dwivedi 
// Submitted to AegisCovenant 
// 03/06/23

const puppeteer = require('puppeteer');

async function getFlightPrices() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();


  await page.goto('https://www.google.com/flights');


  await page.click('button[jsname="gWT7Wd"]');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });


  await page.waitForSelector('div[data-test-id="price-column"]');

  const flightPrices = await page.$$eval('div[data-test-id="price-column"]', (elements) => {
    const prices = {};

    elements.forEach((element) => {
      const airline = element.getAttribute('aria-label');
      const price = element.innerText;
      prices[airline] = price;
    });

    return prices;
  });

  await browser.close();

  return flightPrices;
}


getFlightPrices()
  .then((flightPrices) => {
    console.log(flightPrices);
  })
  .catch((error) => {
    console.error(error);
  });

// とりあえずインポート
const puppeteer = require("puppeteer");
const scraping = async (server, name) => {
  const browser = await puppeteer.launch({
    // ブラウザの設定
    headless: true, //ウィンドウを表示させるかどうか
    args: ["--proxy-server='direct://'", "--proxy-bypass-list=*"],
    defaultViewport: { width: 1080, height: 1080 },
  });
  //メインの処理
  const main = async (server, name) => {
    try {
      const page = await browser.newPage();

      await page.goto(
        "https://ja.fflogs.com/character/jp/" + server + "/" + name
      );

      await page.screenshot({ path: "./screenshot.png" });

      await browser.close();
    } catch (e) {
      throw e;
    }
  };
  await main(server, name);
};
module.exports = scraping;
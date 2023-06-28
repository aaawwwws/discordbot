// とりあえずインポート
const puppeteer = require("puppeteer");
const minimal_args = [
  "--autoplay-policy=user-gesture-required",
  "--disable-background-networking",
  "--disable-background-timer-throttling",
  "--disable-backgrounding-occluded-windows",
  "--disable-breakpad",
  "--disable-client-side-phishing-detection",
  "--disable-component-update",
  "--disable-default-apps",
  "--disable-dev-shm-usage",
  "--disable-domain-reliability",
  "--disable-extensions",
  "--disable-features=AudioServiceOutOfProcess",
  "--disable-hang-monitor",
  "--disable-ipc-flooding-protection",
  "--disable-notifications",
  "--disable-offer-store-unmasked-wallet-cards",
  "--disable-popup-blocking",
  "--disable-print-preview",
  "--disable-prompt-on-repost",
  "--disable-renderer-backgrounding",
  "--disable-setuid-sandbox",
  "--disable-speech-api",
  "--disable-sync",
  "--hide-scrollbars",
  "--ignore-gpu-blacklist",
  "--metrics-recording-only",
  "--mute-audio",
  "--no-default-browser-check",
  "--no-first-run",
  "--no-pings",
  "--no-sandbox",
  "--no-zygote",
  "--password-store=basic",
  "--use-gl=swiftshader",
  "--use-mock-keychain",
];
const scraping = async (server, first_name, second_name) => {
  const browser = await puppeteer.launch({
    // ブラウザの設定
    headless: true, //ウィンドウを表示させるかどうか
    args: minimal_args,
    defaultViewport: { width: 1080, height: 1080 },
    userDataDir: "./my/path",
  });
  //メインの処理
  const main = async (server, first_name, second_name) => {
    try {
      const page = await browser.newPage();
      const url =
        "https://ja.fflogs.com/character/jp/" +
        server +
        "/" +
        first_name +
        " " +
        second_name;
      await page.goto(url);

      await page.waitForSelector("#top-box");

      await page.screenshot({ path: "./screenshot.png" });

      await browser.close();
    } catch (e) {
      console.log(e);
    }
  };
  await main(server, first_name, second_name);
};
module.exports = scraping;

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});
const fs = require("fs");
const scraping = require("./sc.js");
//トークンをインポート token.Key でトークンを受け取る
const token = require("./token.json");
// サーバー一覧　別ファイルにするかも
const ServerLists = [
  "Aegis",
  "Atomos",
  "Carbuncle",
  "Garuda",
  "Gungnir",
  "Kujata",
  "Tonberry",
  "Typhon",
  "Alexander",
  "Bahamut",
  "Durandal",
  "Fenrir",
  "Ifrit",
  "Ridill",
  "Tiamat",
  "Ultima",
  "Anima",
  "Asura",
  "Chocobo",
  "Hades",
  "Ixion",
  "Masamune",
  "Pandaemonium",
  "Titan",
  "Belias",
  "Mandragora",
  "Ramuh",
  "Shinryu",
  "Unicorn",
  "Valefor",
  "Yojimbo",
  "Zeromus",
];
client.once("ready", () => {
  console.log("起");
});

client.on("messageCreate", async (msg) => {
  //自信の発言を無視する
  if (msg.author.id === client.user.id) return;
  //logsチャンネルでしか動作させない
  if (msg.channel.name === "logs") {
    if (ServerLists.includes(msg.content)) {
      // /でコメントを分ける
      const test = msg.content.split("/");
      const server = test[0];
      const name = test[1];
      //sc.jsを見てください。
      await scraping(server, name);
      // 返信
      await msg.reply({ files: ["./screenshot.png"] });
      // 最後にファイルを削除する
      try {
        fs.unlinkSync("./screenshot.png");
        console.log("削除しました。");
      } catch (error) {
        throw error;
      }
    }
  }
});

client.login(token.Key);

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
  "AEGIS",
  "ATOMOS",
  "CARBUNCLE",
  "GARUDA",
  "GUNGNIR",
  "KUJATA",
  "TONBERRY",
  "TYPHON",
  "ALEXANDER",
  "BAHAMUT",
  "DURANDAL",
  "FENRIR",
  "IFRIT",
  "RIDILL",
  "TIAMAT",
  "ULTIMA",
  "ANIMA",
  "ASURA",
  "CHOCOBO",
  "HADES",
  "IXION",
  "MASAMUNE",
  "PANDAEMONIUM",
  "TITAN",
  "BELIAS",
  "MANDRAGORA",
  "RAMUH",
  "SHINRYU",
  "UNICORN",
  "VALEFOR",
  "YOJIMBO",
  "ZEROMUS",
];

client.once("ready", () => {
  console.log("起");
});
//メイン関数
const main = async (msg) => {
  const test = msg.content.split("/");
  //大文字小文字区別なし
  const server = String(test[0].toUpperCase());
  //名前だけ切り取り
  const full_name = test[1].toUpperCase();
  const name_array = full_name.split(/[\s]/);
  const first_name = name_array[0];
  const second_name = name_array[1];

  //これでサーバーがリスト内にあるかどうか取れる
  const Comment_Server = ServerLists.includes(server);
  // 入力された内容がサーバー名がサーバーリストに含まれるか、名前がちゃんとファーストネームセカンドネームに分かれてて英文字かどうかを判定
  if (
    Comment_Server &&
    first_name.search(/^[A-Za-z\s]+$/) === 0 &&
    second_name.search(/^[A-Za-z\s]+$/) === 0
  ) {
    // sc.jsを見てください。
    await scraping(server, first_name, second_name);
    // 返信
    await msg.reply({ files: ["./screenshot.png"] });
  } else if (Comment_Server === false) {
    throw "サーバーが見つかりません";
  } else {
    return;
  }
};

//ファイルを削除する関数
const Image_File = async () => {
  try {
    fs.unlinkSync("./screenshot.png");
    console.log("削除しました。");
  } catch (error) {
    throw error;
  }
};

const Total_func = async (msg) => {
  try {
    // bot自身を無視
    if (msg.author.id === client.user.id) return;
    // logsチャンネル以外の発言を無視する
    if (
      msg.channel.name === "logs" &&
      msg.content.includes("/") &&
      msg.content.includes(" ")
    ) {
      await main(msg);
    } else if (msg.channel.name === "logs" && !msg.content.includes("/")) {
      throw "「/」が入力されていません。";
    } else if (msg.channel.name === "logs" && !msg.content.includes(" ")) {
      throw "なにかしらの表記がおかしいです";
    } else {
      return;
    }
    // 最後にファイルを削除する
    await Image_File();
    //エラー処理
  } catch (e) {
    msg.reply(e);
  }
};

client.on("messageCreate", Total_func);
client.login(token.Key);

const l = console.log
const config = require('../config')
const { cmd, commands } = require('../command')
const axios = require("axios");
const path = require("path");

cmd({
  pattern: "fb2",
  alias: ["facebook2", "fbdl2"],
  react: "🗳️",
  desc: "Download Facebook videos",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("https://")) {
      return reply("*`Need a valid Facebook URL!`*");
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://lance-frank-asta.onrender.com/api/downloader?url=${encodeURIComponent(q)}`;
    const response = await axios.get(apiUrl);

    const data = response.data;

    if (!data?.content?.status || !data?.content?.data?.result?.length) {
      throw new Error("Invalid API response or no video found.");
    }

    let videoData = data.content.data.result.find(v => v.quality === "HD") ||
                    data.content.data.result.find(v => v.quality === "SD");

    if (!videoData || !videoData.url) {
      throw new Error("No valid video URL found.");
    }

    await conn.sendMessage(from, {
      video: { url: videoData.url },
      caption: `✅ *Download Successful in ${videoData.quality} Quality*\n\n${config.DESCRIPTION}}`
    }, { quoted: m });

  } catch (error) {
    console.error("FB Download Error:", error);

    const ownerNumber = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    await conn.sendMessage(ownerNumber, {
      text: `⚠️ *FB Downloader Error!*\n\n📍 *Group/User:* ${from}\n💬 *Query:* ${q}\n❌ *Error:* ${error.message || error}`
    });

    reply("❌ *Error:* Unable to process the request. Please try again later.");
  }
});

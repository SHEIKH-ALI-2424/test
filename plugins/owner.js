const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "owner",
    react: "✅", 
    desc: "Get owner number",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER; // Fetch owner number from config
        const ownerName = config.OWNER_NAME;     // Fetch owner name from config

        const vcard = 'BEGIN:VCARD\n' +
                      'VERSION:3.0\n' +
                      `FN:${ownerName}\n` +  
                      `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}\n` + 
                      'END:VCARD';

        // Send the vCard
        const sentVCard = await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        });

        // Send the owner contact message with image and audio
        await conn.sendMessage(from, {
            image: { url: 'https://i.imghippo.com/files/JgI8278ypg.jpg' }, // Image URL from your request
            caption: `┏━━━━━━━━━━━━━━ 
┃𝐒𝐇𝐄𝐈𝐊𝐇-𝐀𝐋𝐈-𝐌𝐃
┃𝐎𝐖𝐍𝐄𝐑'𝐒
┃𝐃𝐄𝐓𝐀𝐈𝐋𝐒
┗━━━━━━━━━━━━━━━ 
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
 ★ || ᴄʀᴇᴀᴛᴏʀ = 𖥘👑𝐋𝚫𝐃𝐋𝚫 𝐒𝚯𝚵𝚰𝐊𝚯👑𖥘 
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
 ★ || ᴏᴡɴᴇʀ = https://wa.me/923143702270 
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
 ★ || ᴡʜᴀᴛsᴀᴘᴘ = https://whatsapp.com/channel/0029Vao1lnR1nozDF8jBNh3B
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
 ★ || ʙᴏᴛ ʀᴇᴘᴏ = https://github.com/SHEIKH-ALI-2424/SHEIKH-ALI-MD 
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
 ★ || ʏᴏᴜᴛᴜʙᴇ = https://youtube.com/@sheikh-ali-2412?si=jtHyERObmqci0YEo  
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
> © Pᴏᴡᴇʀᴇᴅ Bʏ 𒁂𓄂❥.𝑺𝑯𝑬𝑰𝑲𝑯 𝑨𝑳𝑰 🔥༽༼࿐ ♡••²⁴⁰²`, // Display the owner's details
            contextInfo: {
                mentionedJid: [`${ownerNumber.replace('+', '')}@s.whatsapp.net`], 
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363333032882285@newsletter',
                    newsletterName: '👑𝐋𝚫𝐃𝐋𝚫 𝐒𝚯𝚵𝚰𝐊𝚯👑',
                    serverMessageId: 143
                }            
            }
        }, { quoted: mek });

        // Send audio as per your request
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/SHEIKH-ALI-2402/SHEIKH-ALI-MD-DATA/raw/refs/heads/main/autovoice/menunew.m4a' }, // Audio URL
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});

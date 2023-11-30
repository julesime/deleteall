require('dotenv').config();
const { WebClient } = require('@slack/web-api');
const { SocketModeClient } = require('@slack/socket-mode');

// Initialize WebClient
const token = process.env.USER_TOKEN;
const web = new WebClient(token);

// Initialize SocketModeClient
const appToken = process.env.APP_TOKEN;
const app = new SocketModeClient({ appToken });

app.on('message', async ({ event }) => {
  if (event && event.type === 'message' && event.text === 'NUKEITALL') {
    await deleteMessages(event.channel);
  }
});

async function deleteMessages(channel) {
  try {
    const result = await web.conversations.history({ channel });

    if (result.messages) {
      for (const message of result.messages) {
        // Delete the parent message
        await web.chat.delete({
          channel: channel,
          ts: message.ts,
        });
        console.log(`Deleted message with timestamp: ${message.ts}`);

        // Check and delete threaded messages
        if (message.thread_ts) {
          const threadReplies = await web.conversations.replies({
            channel: channel,
            ts: message.thread_ts
          });

          if (threadReplies.messages) {
            for (const reply of threadReplies.messages) {
              if (reply.ts !== message.thread_ts) { // Not deleting the parent message again
                await web.chat.delete({
                  channel: channel,
                  ts: reply.ts,
                });
                console.log(`Deleted thread message with timestamp: ${reply.ts}`);
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}


(async () => {
  await app.start();
})();

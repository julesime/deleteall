# NUKEITALL Slack App

## Description
NUKEITALL is a Slack app designed to delete all messages from a Slack channel where the command `NUKEITALL` is invoked. This app is particularly useful in scenarios where quick and complete clearance of a Slack channel's messages is necessary.

## Prerequisites
To use NUKEITALL, a Slack app with the appropriate permissions is required. Specifically, the app needs permissions to read and delete messages in the channels where it will be used.

Both Slack Web API and Socket Mode are used for this project
- const { WebClient } = require('@slack/web-api');
- const { SocketModeClient } = require('@slack/socket-mode');

## Installation and Setup

### Set up a Slack App:
1. Create a new Slack App in your workspace.
2. Navigate to the 'OAuth & Permissions' section and add the following scopes:
   - `channels:history` (to read channel messages)
   - `chat:write` (to delete messages)
3. Install the app to your workspace and note the 'OAuth Access Token'.

### Environment Setup:
- Clone this repository to your local machine.
- Create a `.env` file in the root directory.
- Add your Slack 'User OAuth Token' and 'App Token' to the `.env` file like this:

USER_TOKEN=your-slack-user-oauth-token
APP_TOKEN=your-slack-app-token

## Usage
- Run the application by executing the following command:
node index.js
- In any Slack channel where the app is installed, type and send `NUKEITALL`.
- The app will then delete all messages in that channel, including threaded messages.

## Important Notes
- **Use with Caution:** This app will irreversibly delete all messages in the invoked channel. Ensure you have the necessary backups or approvals before using it.
- **Permissions & Compliance:** Ensure compliance with your organization's data retention policies when using this app.
- **Rate Limiting:** Slack API has rate limits. If you encounter rate limiting issues, you may need to implement a delay between delete requests.

## Contributing
Contributions are welcome. Please fork the repository and submit a pull request with your improvements.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

**Disclaimer:** This application is provided as-is with no warranty. Use at your own risk. The creators are not responsible for any misuse or data loss.


# bot-template
Standard issue bot template with the following features:
- Database Support
- Slash Command Support
- Config Channel
- Admin Role
- Administrative commands
- Multi-Server Support

### Debugging
It turns out you can use curl and a standard issue bot token to call up every necessary endpoint,<br>
this is particularly helpful when working with slash commands since it allows you to view values in plain text.
```
curl -H "Authorization: Bot <your-bot-token-goes-here>" https://discord.com/api/v9/channels/<channel-id>            
```

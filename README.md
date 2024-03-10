# DosRPG
Discord bot for making text based rpgs!

You can import games for testing at "https://www.jsonkeeper.com/" and use the link it gives you. (Something like https://www.jsonkeeper.com/b/FM8U). Then use /import-game and paste in the url. If you need to change your game and reimport it, you can use /refresh-games to keep it from being added over and over. If you want the game to persist through refreshed, it needs to be added to the "games" folder by the person running the but.

Example .json files are in the games folder. They are read differently based off of their format. Older formats don't have newer features. (v1 doesn't support custom variables)
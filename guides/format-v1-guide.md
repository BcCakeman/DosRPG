# Basics
*This is an extremely basic guide that assummes you no little to no JSON. If you are already familiar with JSON, then looking at the example files in the "games" folder should give you a sufficient understanding of how to make your own games.*

Format v1 is essentially a "choose your own adventure" book. A v1 game consists of several "scenes", each scene containing an id, some text, and one or more options. Each option contains a label and a new id. This new id is the scene the player will jump to if they choose that option.

## Importing and testing games
If you are working on a game but are NOT hosting the bot, then you can test out your game by using /import-game and pasting a link to the .json file. You can put your .json into "https://www.jsonkeeper.com/", and then use the link it gives you. If you aren't sure if you are hosting the bot, then you aren't hosting the bot.

Once your game has been imported, you can use /view-games to see the list of games the bot has loaded. You should see the game you just imported on this list, and take note of it's id. Use /new-game with your game's id to test it out!

If you ARE hosting the bot, you can add your .json file to the "games" folder and it will get automatically loaded when the bot starts.

# Example game.json
This is what an extremely simple game.json file may look like"
```
{
    "name": "Example Game",
    "description": "This is a neat game!",
    "format": "v1",
    "level": [
        {
            "id": "0",
            "text": "Welcome to Example Game!",
            "options": [
                [
                    "Start!",
                    "1"
                ]
            ]
        }
    ]
}
```
First, we find some basic information about the game such as it's name and description. Notice where it says `"format": "v1"`. The .json file will be interpreted by the bot differently based on the format se specify, so make sure you choose the right format or it will not work.

Next, we find the "level" array. This array contains ALL of the scenes within the game. In this example we have one scene:
```
{
    "id": "0",
    "text": "Welcome to Example Game!",
    "options": [
        [
            "Start!",
            "1"
        ]
    ]
}

```
This scene has an id of "0". You can also use words for ids, such as "start", or even "downstairs-center", use whatever convention you like. 

This scene only contains one option right now. This option has a text of "Start!", and will take us to the scene with an id of "1". Since we only have the one scene right now, this will cause an error. Let's make a new scene with id "1", by copy/pasting the one we have, and adding the new one inside of the "level" array. Now our game.json might look like this:
```
{
    "name": "Example Game",
    "description": "This is a neat game!",
    "format": "v1",
    "level": [
        {
            "id": "0",
            "text": "Welcome to Example Game!",
            "options": [
                [
                    "Start!",
                    "1"
                ]
            ]
        },
        {
            "id": "1",
            "text": "Welcome to the first room! What would you like to do?",
            "options": [
                [
                    "Start!",
                    "1"
                ]
            ]
        }
    ]
}
```
Notice how we have added a comma after the first scene in "level". We need to add a comma between each scene, since "level" is an array. We don't need a comma after the last scene, only between each scene in the list.

Now we can go from the start scene (id "0") to the second scene (id "1"). We can add multiple options by copy/pasting the one we already have, similar to scenes. Just like with scenes, we need to add a comma between each option. This might look something like:
```
{
    "name": "Example Game",
    "description": "This is a neat game!",
    "format": "v1",
    "level": [
        {
            "id": "0",
            "text": "Welcome to Example Game!",
            "options": [
                [
                    "Start!",
                    "1"
                ]
            ]
        },
        {
            "id": "1",
            "text": "Welcome to the first room! What would you like to do?",
            "options": [
                [
                    "Go back to the start.",
                    "0"
                ],
                [
                    "Go further in!",
                    "2"
                ]
            ]
        }
    ]
}
```
Now we can see that the second scene (id "1") has two options. The first option will take us back to the start, and the second option will take us to a new scene with an id of "2".

We can add a scene with an id of "2" just like we did before:
```
{
    "name": "Example Game",
    "description": "This is a neat game!",
    "format": "v1",
    "level": [
        {
            "id": "0",
            "text": "Welcome to Example Game!",
            "options": [
                [
                    "Start!",
                    "1"
                ]
            ]
        },
        {
            "id": "1",
            "text": "Welcome to the first room! What would you like to do?",
            "options": [
                [
                    "Go back to the start.",
                    "0"
                ],
                [
                    "Go further in!",
                    "2"
                ]
            ]
        },
        {
            "id": "2",
            "text": "You won! Amazing!",
            "options": [
                [
                    "Play again!",
                    "0"
                ]
            ]
        }
    ]
}
```
You can repeat this process of adding scenes and options to make whatever you want. Remember, you don't have to use numbers for the ids; you can use descriptive names such as "downstairs-left", "upstairs-right", "dead", etc. Or you could use some coordinates system such as "0-0", "0-1", "5-3", etc. Use whatever naming convention makes sense for your game.

If you want to understand why sometimes curly braces {} are used and sometimes square brackets are used [], you can look up how .json is formatted. As long as you follow what is used in this example you should be fine.

Each scene can have up to 25 options. There is no way to increase this, as it is a Discord limitation. You can have as many scenes in your game as you like.
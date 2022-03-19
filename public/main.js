// Following: https://github.com/kittykatattack/learningPixi#settingup


const pokemonScale = 3; // TODO: Tie into a game scale.

//Create a Pixi Application
const app = new PIXI.Application({width: 852, height: 480, antialias: true});
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

document.getElementById('gameCanvas').appendChild(app.view);

let sprite = PIXI.Sprite.from('https://pixijs.io/guides/static/images/sample.png');
app.stage.addChild(sprite);

let random = +(Math.floor(Math.random() * (151 - 1) + 1));

// Update loop
// Add a variable to count up the seconds our demo has been running
let elapsed = 0.0;
// Tell our application's ticker to run a new callback every frame, passing
// in the amount of time that has passed since the last tick
app.ticker.add((delta) => {
  // Add the time to our total elapsed time
  elapsed += delta;
  // Update the sprite's X position based on the cosine of our elapsed time.  We divide
  // by 50 to slow the animation down a bit...
  sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
});

// Change background color (HEX)
// app.renderer.backgroundColor = '0xadadad';

const graphics = new PIXI.Graphics();

graphics.beginFill(0xDE3249);
graphics.drawRect(50, 50, 100, 100);
graphics.endFill();

app.stage.addChild(graphics);

let pokemon1;
let pokemon2;

// Define player objects.
let player;
let opponent;

const apiLoadPokemonToScene = async (id1, id2, playerShiny, opponentShiny) => {
    pokemon1 = await getPokemonFromAPI(id1);
    pokemon2 = await getPokemonFromAPI(id2);


    player = (playerShiny) ? PIXI.Sprite.from(await pokemon1.sprites.back_shiny) : PIXI.Sprite.from(await pokemon1.sprites.back_default);
    player.scale = new PIXI.Point(pokemonScale, pokemonScale);
    app.stage.addChild(player);

    opponent = (opponentShiny) ? PIXI.Sprite.from(await pokemon2.sprites.front_shiny) : PIXI.Sprite.from(await pokemon2.sprites.front_default);
    opponent.scale = new PIXI.Point(pokemonScale, pokemonScale);
    opponent.y += 240;
    app.stage.addChild(opponent);
}

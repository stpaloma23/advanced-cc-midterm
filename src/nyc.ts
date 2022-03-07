import * as PIXI from "pixi.js"

const load = (app: PIXI.Application) => {
  return new Promise<void>((resolve) => {
      app.loader.add('skylines/nyc.png').load(() => {
          resolve();
      });
  });
};

const main = async () => {
  // Actual app
  let app = new PIXI.Application(); //making a new pixijs application 

  // Display application properly
  document.body.style.margin = '0';
  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = 'block';

  // View size = windows
  app.renderer.resize(window.innerWidth, window.innerHeight);

  // Load assets
  await load(app);

  let container = new PIXI.Container();
  let sprite = new PIXI.Sprite( 
    app.loader.resources['assets/hello-world.png'].texture //giving sprite a texture
    );
    sprite.scale.set(.25,.25)
    sprite.x = window.innerWidth / 2 - sprite.width / 2;
    sprite.y = window.innerHeight / 2 - sprite.height / 2;
    container.addChild(sprite);
  app.stage.addChild(container) ;

  // // Handle window resizing
  window.addEventListener('resize', (_e) => {
      app.renderer.resize(window.innerWidth, window.innerHeight);
    container.x = window.innerWidth/2;
    container.y = window.innerHeight/2;
  });

  document.body.appendChild(app.view);

};
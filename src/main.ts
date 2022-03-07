import * as PIXI from "pixi.js"

const load = (app: PIXI.Application) => {
  return new Promise<void>((resolve) => {
      app.loader
      .add('assets/hello-world.png')
      .add('assets/plane.png')
      .add('assets/cloud.png')
      .load(() => {
          resolve();
      });

  });
};
let mainContainer = new PIXI.Container();

const main = async () => {
    // Actual app
    let app = new PIXI.Application( {backgroundColor: 0xF6E2DF}); //making a new pixijs application 

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);

    // Load assets
    await load(app);
    app.stage.addChild(mainContainer) ;
    let text = new PIXI.Text('Where do you want to go?',{fontFamily : 'Arial', fontSize: 50, fill : 0xffffff, dropShadow:true});
    text.x = 400;
    text.y = 250;
    mainContainer.addChild(text);
    addingClouds();
    makingButtons();


//   let nycButton = new PIXI.Sprite(buttonN);

  // // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        mainContainer.x = window.innerWidth/2;
        mainContainer.y = window.innerHeight/2;
    });

    document.body.appendChild(app.view);

};

function addingClouds() {
    let cWidth = 160;
    let cHeight = 110;

    let cloud = PIXI.Sprite.from('assets/cloud.png');
    cloud.x = 150;
    cloud.y = 110;
    cloud.width = cWidth;
    cloud.height = cHeight;
    mainContainer.addChild(cloud);

    let cloud2 = PIXI.Sprite.from('assets/cloud.png');
    cloud2.x = screen.width - 400;
    cloud2.y = screen.height - 300;
    cloud2.width = cWidth;
    cloud2.height = cHeight;
    mainContainer.addChild(cloud2);
}

function makingButtons(){
    let buttonN = new PIXI.Graphics().beginFill(0xB0C7ED).drawRect(300, screen.height/2.5, 200, 100);
    let buttonB = new PIXI.Graphics().beginFill(0xB8E1ED).drawRect(600, screen.height/2.5, 200, 100);
    let buttonP = new PIXI.Graphics().beginFill(0xE0CAED).drawRect(900, screen.height/2.5, 200, 100);
    let anywhere = new PIXI.Graphics().beginFill(0xBCABFF).drawRect(300, 500, 800, 75);
    
    buttonN.buttonMode = true;
    buttonB.buttonMode = true;
    buttonP.buttonMode = true;
    anywhere.buttonMode = true;

    buttonN.interactive = true;
    buttonB.interactive = true;
    buttonP.interactive = true;
    anywhere.interactive = true;

    buttonN.on('pointerdown',()=>{ 
        mainContainer.visible = false;

    })

    buttonB.on('pointerdown',()=>{ 
        mainContainer.visible = false;

    })

    buttonP.on('pointerdown',()=>{ 
        mainContainer.visible = false;

    })

    anywhere.on('pointerdown',()=>{ 
        mainContainer.visible = false;

    })

    mainContainer.addChild(buttonN);
    mainContainer.addChild(buttonB);
    mainContainer.addChild(buttonP);
    mainContainer.addChild(anywhere);
}
main();

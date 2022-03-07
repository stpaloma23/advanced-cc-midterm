import * as PIXI from "pixi.js"
import { Application, Container } from "pixi.js";

const load = (app: PIXI.Application) => {
  return new Promise<void>((resolve) => {
      app.loader
      .add('addOns/plane.png')
      .add('addOns/cloud.png')
      .add('skylines/nyc.png')
      .add('skylines/paris.png')
      .add('skylines/beach.png')
      .add('skylines/farm.png')
      .add('addOns/farmsky.jpeg')
      .add('addOns/arrow.png')
      .add('addOns/sunset.jpeg')
      .add('addOns/parisbkg.png')
      .load(() => {
          resolve();
      });

  });
};
let mainContainer = new PIXI.Container();
let parisContainer = new PIXI.Container();
let nyContainer = new PIXI.Container();
let beachContainer = new PIXI.Container();
let farmContainer = new PIXI.Container();

let app = new PIXI.Application( {backgroundColor: 0xF6E2DF}); //making a new pixijs application 


const main = async () => {
    // Actual app

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);
    mainContainer.visible = true;
    parisContainer.visible = false;
    nyContainer.visible = false;
    beachContainer.visible = false;
    farmContainer.visible = false;
    // Load assets
    await load(app);

    app.stage.addChild(mainContainer) ;
    app.stage.addChild(parisContainer) ;
    app.stage.addChild(nyContainer) ;
    app.stage.addChild(beachContainer) ;
    app.stage.addChild(farmContainer) ;


    let text = new PIXI.Text('Where do you want to go?',{fontFamily : 'Arial', fontSize: 50, fill : 0xffffff, dropShadow:true});
    text.x = 400;
    text.y = 200;
    mainContainer.addChild(text);
    addingClouds();
    makingButtons();
    makingParis(parisContainer);
    makingFarm(farmContainer);
    makingBeach(beachContainer); 
    makingNYC(nyContainer);


//   let nycButton = new PIXI.Sprite(buttonN);

  // // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });

    document.body.appendChild(app.view);

};

function addingClouds() {
    let cWidth = 160;
    let cHeight = 110;

    let cloud = PIXI.Sprite.from('addOns/cloud.png');
    cloud.x = 150;
    cloud.y = 110;
    cloud.width = cWidth;
    cloud.height = cHeight;
    mainContainer.addChild(cloud);

    let cloud2 = PIXI.Sprite.from('addOns/cloud.png');
    cloud2.x = screen.width - 400;
    cloud2.y = screen.height - 300;
    cloud2.width = cWidth;
    cloud2.height = cHeight;
    mainContainer.addChild(cloud2);
}

function makingButtons(){
    let buttonN = new PIXI.Graphics().beginFill(0xB0C7ED).drawRect(150, screen.height/2.5, 200, 100);
    let buttonB = new PIXI.Graphics().beginFill(0xB8E1ED).drawRect(450, screen.height/2.5, 200, 100);
    let buttonP = new PIXI.Graphics().beginFill(0xE0CAED).drawRect(750, screen.height/2.5, 200, 100);
    let buttonF = new PIXI.Graphics().beginFill(0xE0CAED).drawRect(1050, screen.height/2.5, 200, 100);
    let anywhere = new PIXI.Graphics().beginFill(0xBCABFF).drawRect(150, 500, 1100, 75);
    
    buttonN.buttonMode = true;
    buttonB.buttonMode = true;
    buttonP.buttonMode = true;
    buttonF.buttonMode = true;
    anywhere.buttonMode = true;

    buttonN.interactive = true;
    buttonB.interactive = true;
    buttonP.interactive = true;
    buttonF.interactive = true;
    anywhere.interactive = true;

    buttonN.on('pointerdown',()=>{ 
        mainContainer.visible = false;
        nyContainer.visible = true;

    })

    buttonB.on('pointerdown',()=>{ 
        mainContainer.visible = false;
        beachContainer.visible = true;
    })

    buttonP.on('pointerdown',()=>{ 
        mainContainer.visible = false;
        parisContainer.visible = true;
    })

    buttonF.on('pointerdown', ()=>{
        mainContainer.visible = false;
        farmContainer.visible = true;
    })

    anywhere.on('pointerdown',()=>{ 
        mainContainer.visible = false;

    })

    mainContainer.addChild(buttonN);
    mainContainer.addChild(buttonB);
    mainContainer.addChild(buttonP);
    mainContainer.addChild(anywhere);
    mainContainer.addChild(buttonF);
}

function makingParis(container: Container){
    let bkg = PIXI.Sprite.from('addOns/parisbkg.png');
    container.addChild(bkg);
    backArrow(container);

}

function makingFarm(container: Container){
    let sky = PIXI.Sprite.from('addOns/farmsky.jpeg');
    container.addChild(sky);
    backArrow(container);
    
}

function makingNYC(container: Container){
    let bkg = new PIXI.Graphics().beginFill(0x000080).drawRect(0, 0, screen.width, screen.height);
    container.addChild(bkg);
    let silo = PIXI.Sprite.from('skylines/nyc1.png');
    silo.width = screen.width;
    silo.height = screen.height;
    silo.x = 0;
    silo.y = screen.height - 820;
    container.addChild(silo);
    backArrow(container);

}

function makingBeach(container: Container){
    let bkg = PIXI.Sprite.from('addOns/sunset.jpeg');
    bkg.width = screen.width;
    bkg.height = screen.height;
    container.addChild(bkg);
    backArrow(container);

}

function backArrow(container: Container){
    let arrow = PIXI.Sprite.from('addOns/arrow.png');
    arrow.x = 30;
    arrow.y = 30;
    arrow.width = 100;
    arrow.height = 70;
    arrow.buttonMode = true; 
    arrow.interactive = true; 
    arrow.on('pointerdown', ()=>{
        container.visible = false;
        mainContainer.visible = true;
    })
    container.addChild(arrow);
}

main();

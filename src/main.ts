import * as PIXI from "pixi.js"
import { Application, Container } from "pixi.js";


const load = (app: PIXI.Application) => {
  return new Promise<void>((resolve) => {
      app.loader
      .add('./assets/addOns/plane.png')
      .add('./assets/addOns/cloud.png')
      .add('./assets/skylines/nyc.png')
      .add('./assets/skylines/paris.png')
      .add('./assets/skylines/beach.png')
      .add('./assets/skylines/farm.png')
      .add('./assets/addOns/farmsky.jpeg')
      .add('./assets/addOns/arrow.png')
      .add('./assets/addOns/sunset.jpeg')
      .add('./assets/addOns/parisbkg.png')
      .add('./assets/addOns/moon.png')
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

let app = new PIXI.Application( {backgroundColor: 0xC96663}); //making a new pixijs application 


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

    app.stage.addChild(mainContainer, parisContainer, nyContainer, beachContainer, farmContainer);


    let text = new PIXI.Text('Where do you want to go?',{fontFamily : 'Arial', fontSize: 50, fill : 0xF6E2DF, dropShadow:true});
    text.x = 400;
    text.y = 200;
    mainContainer.addChild(text);

    // each container has a different location to display 
    makingMain();
    makingParis(parisContainer);
    makingFarm(farmContainer);
    makingBeach(beachContainer); 
    makingNYC(nyContainer);

  // // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });

    document.body.appendChild(app.view);

};

// this function makes the home page where students pick where they want to go 
function makingMain(){ 
    
    // i followed this tutorial https://www.youtube.com/watch?v=yob_-5KSl2g to make the plane move with the mouse 
    let plane = PIXI.Sprite.from('./assets/addOns/plane.png');
    
    plane.anchor.set(0.5, 0.5);
    plane.scale.set(0.4, 0.4);
    mainContainer.addChild(plane);
    app.stage.interactive = true;

    // making the place move where the mouse 
    app.stage.on('pointermove', (e)=>{
        let pos = e.data.global;
        plane.x = pos.x;
        plane.y = pos.y;
    })
    // creating the buttons 
    let buttonN = new PIXI.Graphics().beginFill(0x2F2E4F).drawRect(150, screen.height/2.5, 200, 100);
    let buttonF = new PIXI.Graphics().beginFill(0x2F2E4F).drawRect(1050, screen.height/2.5, 200, 100);
    let buttonP = new PIXI.Graphics().beginFill(0x2F2E4F).drawRect(750, screen.height/2.5, 200, 100);
    let buttonB = new PIXI.Graphics().beginFill(0x2F2E4F).drawRect(450, screen.height/2.5, 200, 100);
    let anywhere = new PIXI.Graphics().beginFill(0x2F2E4F).drawRect(150, 500, 1100, 75);

    // text that is says which city/location 
    let nycWord = new PIXI.Text('New York City', {fontFamily : 'Arial', fontSize: 30, fill : 0xF6E2DF });
    nycWord.x = 157; 
    nycWord.y = screen.height/2.5 + 45;
    let beachtext = new PIXI.Text('The Beach', {fontFamily : 'Arial', fontSize: 30, fill : 0xF6E2DF });
    beachtext.x = 470; 
    beachtext.y = screen.height/2.5 + 40;
    let paristext = new PIXI.Text('Paris', {fontFamily : 'Arial', fontSize: 30, fill : 0xF6E2DF });
    paristext.x = 810; 
    paristext.y = screen.height/2.5 +40 ;
    let farmtext = new PIXI.Text('The Country', {fontFamily : 'Arial', fontSize: 30, fill : 0xF6E2DF });
    farmtext.x = 1070; 
    farmtext.y = screen.height/2.5 +40;
    let anywhereword = new PIXI.Text('Choose for me!', {fontFamily : 'Arial', fontSize: 30, fill : 0xF6E2DF });
    anywhereword.x = 590; 
    anywhereword.y = 520;
    
    // creating buttons 
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

    // when the button is pressed, the main container disappears and the appropriate city container is displayed 
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
        let ranNum =  (Math.random() *10);
        if(ranNum < 2.5){
            mainContainer.visible = false;
            nyContainer.visible = true;
        }
        else if(ranNum > 2.5 && ranNum < 5) {
            mainContainer.visible = false;
            beachContainer.visible = true;
        }
        else if (ranNum > 5 && ranNum < 7.5){
            mainContainer.visible = false;
            parisContainer.visible = true;
        }
        else if( ranNum > 7.5 && ranNum <=10){
            mainContainer.visible = false;
            farmContainer.visible = true;
        }

    })

    mainContainer.addChild(buttonN,buttonB, buttonP, anywhere,buttonF);
    mainContainer.addChild(anywhereword, paristext, nycWord, beachtext,farmtext);
    mainContainer.addChild(plane);


}
// the following functions are creating each destination 
function makingParis(container: Container){
    let bkg = PIXI.Sprite.from('./assets/addOns/parisbkg.png');
    container.addChild(bkg);
    let silo = PIXI.Sprite.from('./assets/skylines/paris.png');
    silo.width = innerWidth+40;
    silo.height = 700;
    silo.x = -20;
    silo.y = screen.height - 790;
    container.addChild(silo);
    backArrow(container);

}

function makingFarm(container: Container){
    let sky = PIXI.Sprite.from('./assets/addOns/farmsky.jpeg');
    container.addChild(sky);
    let silo = PIXI.Sprite.from('./assets/skylines/farm.png');
    silo.width = screen.width + 40;
    silo.height = 600;
    silo.x = -20;
    silo.y = 200;
    container.addChild(silo);
    let sun = PIXI.Sprite.from('./assets/addOns/sun.png');
    sun.x = 300;
    sun.y = 30;
    sun.height = 260;
    sun.width = 260;
    container.addChild(sun);
    backArrow(container);
    
}

function makingNYC(container: Container){
    let bkg = new PIXI.Graphics().beginFill(0x000080).drawRect(0, 0, screen.width, screen.height);
    container.addChild(bkg);
    makeStarrySky();
    let silo = PIXI.Sprite.from('./assets/skylines/nyc1.png');
    silo.width = screen.width+80;
    silo.height = screen.height;
    silo.x = -50;
    silo.y = screen.height - 820;
    container.addChild(silo);
    let moon = PIXI.Sprite.from('./assets/addOns/moon.png');
    moon.x = 700;
    moon.y = 70;
    moon.height = 150;
    moon.width = 150;
    container.addChild(moon);
    backArrow(container);

}

function makingBeach(container: Container){
    let bkg = PIXI.Sprite.from('./assets/addOns/sunset.jpeg');
    bkg.width = screen.width;
    bkg.height = screen.height;
    container.addChild(bkg);
    let beach = PIXI.Sprite.from('./assets/skylines/beach.png');
    beach.width = screen.width;
    beach.height = 700;
    beach.x = 0;
    beach.y = screen.height - 750;
    container.addChild(beach);
    let sun = PIXI.Sprite.from('./assets/addOns/sun.png');
    sun.x = 700;
    sun.y = 30;
    sun.height = 300;
    sun.width = 300;
    container.addChild(sun);
    backArrow(container);

}

// each destination has a back arrow that allows students to return to the home page 
// function takes a specified container and placed the arrow at the top left corner
function backArrow(container: Container){
    let arrow = PIXI.Sprite.from('./assets/addOns/arrow.png');
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

// this funciton creates the stars in the NYC background
function makeStarrySky(){
    // this is an array of various size stars
    let starSizes = [1,3,1,2.5,2,.5,1, 2];
    let amountOfStars = 3000;
    let size = 0;
    let xPos = 0;
    let ypos = 0; 
    // while 3000 stars havent been created, a new circle of a size thats determined by the positon in the array is placed on the screen
    while(amountOfStars != 0){
        let star = new PIXI.Graphics().beginFill(0xffffff).drawCircle(xPos, ypos, starSizes[size]);
        if(size > starSizes.length){
            size = 0;
        }
        else{
            size +=1
        }
        xPos+=20;
        if(xPos > screen.width){
            xPos = 0;
            ypos += 21;
        }
        nyContainer.addChild(star);
        amountOfStars -=1
    }
}

main();
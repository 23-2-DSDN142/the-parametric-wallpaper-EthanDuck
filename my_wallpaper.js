//your parameter variables go here!
let rect_width = 20;
let rect_height = 20;

let colorOffset = (Math.floor(Math.random() * 80));
let coolDown = 6

let arcRotation = 0

let currentSquare = 0;
let squareHide = [];
let stopBigArc = false;

function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(GRID_WALLPAPER);
  pWallpaper.resolution(FIT_TO_SCREEN);
  pWallpaper.show_guide(false); //set this to false when you're ready to print

  //Grid settings
  pWallpaper.grid_settings.cell_width = 100;
  pWallpaper.grid_settings.cell_height = 100;
  pWallpaper.grid_settings.row_offset = 0;
}

function wallpaper_background() {
  colorMode(HSB, 100);
  background((Math.floor(Math.random() * 20) + colorOffset), 30, 40);
}

function my_symbol() { // do not rename this function. Treat this similarly to a Draw function
  currentSquare += 1
  print("Current Square " + currentSquare)

  strokeWeight(0);
  colorMode(HSB, 100);

  fill((Math.floor(Math.random() * 50) + colorOffset), 30, 100);

  arcRotation = (Math.floor(Math.random() * 4)) + 1.

  if (stopBigArc == true) {
    if (squareHide.includes(currentSquare)) {
      squareHide.shift();
    } else if (squareHide === undefined || squareHide.length == 0) {
      stopBigArc = false;
      drawArc(arcRotation, currentSquare);
    } else {
      drawArc(arcRotation, currentSquare);
    }
  } else {
    if ((Math.floor(Math.random() * 11)) == 10 && currentSquare > 30) {
      drawBigArc(arcRotation, currentSquare)
    } else {
      drawArc(arcRotation, currentSquare);
    }
  }
}

function drawArc(num, currentSquare) {
  let ifNum = num
  num -= 1
  if (ifNum == 1) {
    arc(0, 0, 200, 200, 0 + (num * 90), 90 * (num + 1));
  } else if (ifNum == 2) {
    arc(100, 0, 200, 200, 0 + (num * 90), 90 * (num + 1));
  } else if (ifNum == 3) {
    arc(100, 100, 200, 200, 0 + (num * 90), 90 * (num + 1));
  } else if (ifNum == 4) {
    arc(0, 100, 200, 200, 0 + (num * 90), 90 * (num + 1));
  }
}

function drawBigArc(num, currentSquare) {

  let ifNum = num
  num -= 1
  if (ifNum == 1) {
    arc(0, 0, 400, 400, 0 + (num * 90), 90 * (num + 1));
  } else if (ifNum == 2) {
    arc(200, 0, 400, 400, 0 + (num * 90), 90 * (num + 1));
  } else if (ifNum == 3) {
    arc(200, 200, 400, 400, 0 + (num * 90), 90 * (num + 1));
  } else if (ifNum == 4) {
    arc(0, 200, 400, 400, 0 + (num * 90), 90 * (num + 1));
  }

  squareHide.push(Math.round((currentSquare + 1)));
  squareHide.push(currentSquare + Math.ceil(windowHeight / 100) + 2);
  squareHide.push(Math.round((currentSquare + 1) + (windowHeight / 100) + 3));

  stopBigArc = true;
}
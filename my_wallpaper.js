//your parameter variables go here!
let rect_width = 20;
let rect_height = 20;

let colorOffset = (Math.floor(Math.random() * 80));
let coolDown = 6


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
  strokeWeight(0);
  colorMode(HSB, 100);

  fill((Math.floor(Math.random() * 30) + colorOffset), 30, 100);

  if (coolDown == 6){
    let option = (Math.floor(Math.random() * 4)) + 1
    drawArc(option);
  } else {
    coolDown += 1;
  }
}

function drawArc(num) {
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
  } else if (ifNum == 5) {
    arc(0, 100, 400, 400, 0 + (num * 90), 90 * (num + 1));
    coolDown = 1
  }
}
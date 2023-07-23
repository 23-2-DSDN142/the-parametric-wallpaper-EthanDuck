//your parameter variables go here!
let rect_width = 20;
let rect_height = 20;

let circleArray = [1, 2, 3, 4]

let timer = 0;


//this is a change that I have made

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
  background(240, 255, 240); //light honeydew green colour
}

function my_symbol() { // do not rename this function. Treat this similarly to a Draw function
  noFill();
  strokeWeight(10);

  let option = 1

  if (circleArray === undefined || circleArray.length == 0) {
    circleArray = [1, 2, 3, 4]
  } else {
    option = circleArray[(Math.floor(Math.random() * 4))]
    // circleArray.splice(option, 1)
  }

  drawArc(option);
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
  }
}
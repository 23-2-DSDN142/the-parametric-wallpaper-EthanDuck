// wallMeters Parameters:
// [0] Color Offset: Number thats moves the colors round
// [1] Grid Size: Number that changes the size of the grid cells
// [2] Cell Shape: The shape of the wallpaper's cells
// [3] Grid Gap: The gap bewteen the cells
// [4] Big Ofteness: How often Big Shapes should appear

// Leave Wallapper Parameters (wallMeters) and the Saved Wallpaper (wallSaved) empty for a random wallpaper!
// Once you've found a wallpaper that you like, check the console for the code and put it below
var wallMeters = [];
var wallSaved = [];

//Not Parameters:
var currentCell = 0;
var cellPrison = [];
var wallSavedBackup = [];

if (wallMeters === undefined || wallMeters.length === 0) {
  wallMeters = [(Math.floor(Math.random() * 80)), ((Math.floor(Math.random() * 200)) + 50), ((Math.floor(Math.random() * 3) + 1)), (Math.floor(Math.random() * 10)), (Math.floor(Math.random() * 10) + 1), false];
}

function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(GRID_WALLPAPER);
  pWallpaper.resolution(FIT_TO_SCREEN);
  pWallpaper.show_guide(false); //set this to false when you're ready to print

  //Grid settings
  pWallpaper.grid_settings.cell_width = wallMeters[1];
  pWallpaper.grid_settings.cell_height = wallMeters[1];
  pWallpaper.grid_settings.row_offset = 0;
}

function wallpaper_background() {
  colorMode(HSB, 100);
  background((Math.floor(Math.random() * 20) + wallMeters[0]), 30, 40);
}

function my_symbol() {
  strokeWeight(0)
  colorMode(HSB, 100);

  currentCell += 1;

  let shapeFill;
  let isBig;
  let shapeRotation;

  if (wallMeters[5] == false) {
    shapeFill = Math.floor(Math.random() * 50);

    if (wallMeters[2] == 1) {
      shapeRotation = (Math.floor(Math.random() * 4)) + 1;
    } else {
      shapeRotation = (Math.floor(Math.random() * 3)) + 1;
    }

    if ((Math.floor(Math.random() * wallMeters[4])) == 1 && !cellPrison.includes(currentCell + 1) && !cellPrison.includes(currentCell - 1) && wallMeters[5] == false) {
      isBig = true;
    } else {
      isBig = false;
    }

    wallSaved.push(shapeFill);
    wallSaved.push(isBig);
    wallSaved.push(shapeRotation);

    let gridHeight = (Math.ceil(windowHeight / wallMeters[1]));
    let gridWidth = (Math.ceil(windowWidth / wallMeters[1]));

    if ((((gridHeight + 3) * gridWidth) + gridHeight + 4) == currentCell) {
      wallMeters.pop();
      wallMeters.push(true);

      print("Wallpaper Parameters: ")
      print(wallMeters);

      print("Saved Wallpaper: ")
      print(wallSaved);
    }

  } else {
    shapeFill = wallSaved[0];
    wallSaved.shift();
    isBig = wallSaved[0];
    wallSaved.shift();
    shapeRotation = wallSaved[0];
    wallSaved.shift();
  }

  fill((shapeFill + wallMeters[0]), 30, 100);

  if (cellPrison.includes(currentCell)) {
    cellPrison = cellPrison.filter(item => item !== currentCell)
  } else if (isBig) {
    drawShape(shapeRotation, currentCell, true);
  } else {
    drawShape(shapeRotation, currentCell);
  }

}

function drawShape(rotation, currentCell, isBig) {
  let ifRotation = rotation
  rotation -= 1

  var shapeSize = wallMeters[1] - (wallMeters[3] * 2);
  var doubleShapeSize = shapeSize * 2 - (wallMeters[3] * 2);
  var shapeFrenzy = ((Math.floor(Math.random() * 3) + 1))

  if (isBig) {
    shapeSize = wallMeters[1] * 2 - (wallMeters[3] * 2);
    doubleShapeSize = shapeSize * 2 - (wallMeters[3] * 2);

    cellPrison.push(Math.round((currentCell + 1)));
    cellPrison.push(currentCell + Math.ceil(windowHeight / wallMeters[1]) + 2);
    cellPrison.push(Math.round((currentCell + 1) + Math.ceil(windowHeight / wallMeters[1]) + 2));
  };

  if (wallMeters[2] == 1) { // Cirlces
    if (ifRotation == 1) {
      arc(wallMeters[3], wallMeters[3], doubleShapeSize, doubleShapeSize, 0 + (rotation * 90), 90 * (rotation + 1));
    } else if (ifRotation == 2) {
      arc(shapeSize, wallMeters[3], doubleShapeSize, doubleShapeSize, 0 + (rotation * 90), 90 * (rotation + 1));
    } else if (ifRotation == 3) {
      arc(shapeSize, shapeSize, doubleShapeSize, doubleShapeSize, 0 + (rotation * 90), 90 * (rotation + 1));
    } else if (ifRotation == 4) {
      arc(wallMeters[3], shapeSize, doubleShapeSize, doubleShapeSize, 0 + (rotation * 90), 90 * (rotation + 1));
    }
  } else if (wallMeters[2] == 2) { // Squares
    square(wallMeters[3], wallMeters[3], (shapeSize));
  } else if (wallMeters[2] == 3) { //Triangles
    if (ifRotation == 1) {
      triangle(wallMeters[3], wallMeters[3], wallMeters[3], shapeSize, shapeSize, (shapeSize / 2))
    } else if (ifRotation == 2) {
      triangle(wallMeters[3], wallMeters[3], shapeSize, wallMeters[3], (shapeSize / 2), shapeSize)
    } else if (ifRotation == 3) {
      triangle(shapeSize, wallMeters[3], shapeSize, shapeSize, wallMeters[3], (shapeSize / 2))
    } else if (ifRotation == 4) {
      triangle(wallMeters[3], wallMeters[3], wallMeters[3], shapeSize, shapeSize, (shapeSize / 2))
    }
  }
}
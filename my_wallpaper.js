// wallMeters Parameters:
// [0] Color Palette Offset: Number thats moves the colors round
// [1] Grid Size: Number that changes the size of the grid cells
// [2] Cell Shape: The shape of the wallpaper's cells
//     1: Quater Circles
//     2: Squares
//     3: Triangles
//     4: Parallelograms
//     5: Shape Frenzy!
// [3] Grid Gap: The gap between the cells
// [4] Big Ofteness: How often Big Shapes should appear, when set to 1 no big shapes will appear

// Leave Wallpaper Parameters (wallMeters) and the Saved Wallpaper (wallSaved) empty for a random wallpaper!
// Once you've found a wallpaper that you like, check the console for the code and put it below
// The constraints of the random wallpaper can also be easily edited to change the look of the random wallpaper

var wallMeters = [];
var wallSaved = [];

// Everything now is static code!

if (wallMeters === undefined || wallMeters.length === 0) {
  wallMeters = [
    (Math.floor(Math.random() * 70)),         // [0] Color Palette Offset
    ((Math.floor(Math.random() * 200)) + 50), // [1] Grid Size
    ((Math.floor(Math.random() * 5) + 1)),    // [2] Cell Shape
    (Math.floor(Math.random() * 10)),         // [3] Grid Gap
    (Math.floor(Math.random() * 10) + 1),     // [4] Big Ofteness
    false
  ];
}

function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(GRID_WALLPAPER);
  pWallpaper.resolution(NINE_LANDSCAPE);
  pWallpaper.show_guide(false);
  pWallpaper.grid_settings.cell_width = wallMeters[1];
  pWallpaper.grid_settings.cell_height = wallMeters[1];
  pWallpaper.grid_settings.row_offset = 0;
}

//Not Parameters:
var currentCell = 0;
var cellPrison = [];
var wallSavedBackup = [];

function wallpaper_background() {
  colorMode(HSB, 100);
  background((Math.floor(Math.random() * 30) + wallMeters[0]), 30, 40);
}

function my_symbol() {
  strokeWeight(0);
  colorMode(HSB, 100);

  currentCell += 1;

  let shapeFill;
  let isBig;
  let shapeRotation;

  if (wallMeters[5] == false) { // If the wallpaper is being randomly generated
    shapeFill = Math.floor(Math.random() * 30);

    if (wallMeters[2] == 1) {
      shapeRotation = (Math.floor(Math.random() * 4)) + 1;
    } else {
      shapeRotation = (Math.floor(Math.random() * 3)) + 1;
    }

    if ((Math.floor(Math.random() * wallMeters[4])) == 1 && !cellPrison.includes(currentCell + 1) && !cellPrison.includes(currentCell - 1) && wallMeters[5] == false) {
      // Makes sure that the cell that is being drawing isn't going to be a big shape
      isBig = true;
    } else {
      isBig = false;
    }

    // Saves the wallpaper into the array which is then printed into the console
    wallSaved.push(shapeFill);
    wallSaved.push(isBig);
    wallSaved.push(shapeRotation);

    let gridHeight = (Math.ceil(height / wallMeters[1]));
    let gridWidth = (Math.ceil(width / wallMeters[1]));

    if ((((gridHeight + 3) * gridWidth)) == currentCell) {
      wallMeters.pop();
      wallMeters.push(true);

      print("Wallpaper Parameters: ");
      print(wallMeters);

      print("Saved Wallpaper: ");
      print(wallSaved);
    }

  } else { // If the wallpaper is being read from a previously saved wallpaper
    shapeFill = wallSaved[0];
    wallSaved.shift();
    isBig = wallSaved[0];
    wallSaved.shift();
    shapeRotation = wallSaved[0];
    wallSaved.shift();
  }

  fill((shapeFill + wallMeters[0]), 40, 100);

  if (cellPrison.includes(currentCell)) {
    cellPrison = cellPrison.filter(item => item !== currentCell)
  } else if (isBig) {
    drawShape(shapeRotation, currentCell, true);
  } else {
    drawShape(shapeRotation, currentCell);
  }
}

function drawShape(rotation, currentCell, isBig) {
  let ifRotation = rotation;
  rotation -= 1;

  var shapeSize = wallMeters[1] - (wallMeters[3] * 2);
  var doubleShapeSize = shapeSize * 2 - (wallMeters[3] * 2);
  var shapeFrenzy;

  if (isBig) {
    shapeSize = wallMeters[1] * 2 - (wallMeters[3] * 2);
    doubleShapeSize = shapeSize * 2 - (wallMeters[3] * 2);

    cellPrison.push(Math.round((currentCell + 1)));
    cellPrison.push(currentCell + Math.ceil(height / wallMeters[1]) + 2);
    cellPrison.push(Math.round((currentCell + 1) + Math.ceil(height / wallMeters[1]) + 2));
  }

  if (wallMeters[2] == 5) {
    shapeFrenzy = true;
    wallMeters[2] = ((Math.floor(Math.random() * 4) + 1));
  }

  if (wallMeters[2] == 1) {
    circle((shapeSize / 2), (shapeSize / 2), shapeSize);
  } else if (wallMeters[2] == 2) {
    if (ifRotation == 1) {
      arc(wallMeters[3], wallMeters[3], doubleShapeSize, doubleShapeSize, 0 + (rotation * 90), 90 * (rotation + 1));
    } else if (ifRotation == 2) {
      arc(shapeSize, wallMeters[3], doubleShapeSize, doubleShapeSize, 0 + (rotation * 90), 90 * (rotation + 1));
    } else if (ifRotation == 3) {
      arc(shapeSize, shapeSize, doubleShapeSize, doubleShapeSize, 0 + (rotation * 90), 90 * (rotation + 1));
    } else if (ifRotation == 4) {
      arc(wallMeters[3], shapeSize, doubleShapeSize, doubleShapeSize, 0 + (rotation * 90), 90 * (rotation + 1));
    }
  } else if (wallMeters[2] == 3) {
    square(wallMeters[3], wallMeters[3], (shapeSize));
  } else if (wallMeters[2] == 4) {
    if (ifRotation == 1) {
      triangle(wallMeters[3], wallMeters[3], wallMeters[3], shapeSize, shapeSize, (shapeSize / 2));
    } else if (ifRotation == 2) {
      triangle(wallMeters[3], wallMeters[3], shapeSize, wallMeters[3], (shapeSize / 2), shapeSize);
    } else if (ifRotation == 3) {
      triangle(shapeSize, wallMeters[3], shapeSize, shapeSize, wallMeters[3], (shapeSize / 2));
    } else if (ifRotation == 4) {
      triangle(wallMeters[3], wallMeters[3], wallMeters[3], shapeSize, shapeSize, (shapeSize / 2));
    }
  }

  if (shapeFrenzy == true) {
    wallMeters[2] = 5;
  }
}
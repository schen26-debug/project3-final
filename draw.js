function setup(){
  createCanvas(1250, 550);
  shapeColor = color(245,10,90);
  background(220,190,200); // draw once so it doesn't erase
}

function draw(){
  noStroke();
  fill(shapeColor);
  ellipse(mouseX, mouseY, 20, 20); // marker follows mouse
}

function mousePressed(){
  shapeColor = color(random(255), random(255), random(255));
}


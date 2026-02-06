function setup(){
  createCanvas(1250, 550);
  shapeColor = color(245,10,90);
  background(220,190,200); 
}

function draw(){
  noStroke();
  fill(shapeColor);
  ellipse(mouseX, mouseY, 20, 20);
}

function mousePressed(){
  shapeColor = color(random(255), random(255), random(255));
}


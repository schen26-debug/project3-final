
let ink;
let falling = [];
let recognition;
let micOn = false;

const SYMBOLS = "0!@2/.]][:@$$!<7392#$%+343#@%#@@!239[]{}";

function randomSymbolString(len) {
  let s = "";
  for (let i = 0; i < len; i++) {
    s += SYMBOLS.charAt(Math.floor(Math.random() * SYMBOLS.length));
  }
  return s;
}

function setup() {
  const c = createCanvas(windowWidth, windowHeight);
  c.position(0, 0);
  c.style("background", "transparent");
  c.style("z-index", "-1");


  ink = createGraphics(windowWidth, windowHeight);
  ink.clear();


  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    console.log("SpeechRecognition not supported (use Chrome)");
    return;
  }

  recognition = new SR();
  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const last = event.results[event.results.length - 1];
    const phrase = last[0].transcript.trim();
    if (!phrase) return;

    const words = phrase.split(/\s+/);

    for (let w of words) {
      falling.push({
        len: w.length,
        x: random(20, width - 20),
        y: -20,
        vy: random(1, 3),
      });
    }
  };
}

function draw() {
  clear();           
  image(ink, 0, 0);      

 
  noStroke();
  fill(0);
  textSize(40);

  for (let i = falling.length - 1; i >= 0; i--) {
    const f = falling[i];
    f.vy += 0.25;
    f.y += f.vy;

    text(randomSymbolString(f.len), f.x, f.y);

    if (f.y > height + 100) {
      falling.splice(i, 1);
    }
  }
}


function mouseDragged() {
  ink.noStroke();
  ink.fill(245, 10, 90);
  ink.ellipse(mouseX, mouseY, 20, 20);
}


function mousePressed() {
  if (recognition && !micOn) {
    recognition.start();
    micOn = true;
    console.log("mic started");
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  const old = ink;
  ink = createGraphics(windowWidth, windowHeight);
  ink.clear();
  ink.image(old, 0, 0);
}

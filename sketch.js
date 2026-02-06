


// https://ainsleyromero.com/

const PLACES = [
  { label: "Shanghai",   x: 72.2, y: 48.5, href: "shanghai.html", id:"shanghai" },
  { label: "California",    x: 23.5, y: 46, href: "california.html" , id:"california"},
  { label: "Providence", x: 33.5, y: 43, href: "providence.html", id:"providence" }
];
const pins = document.getElementById("pins");

PLACES.forEach(p => {
  const a = document.createElement("a");
  a.className = "pin";
  a.id = p.id;                 
  a.href = p.href;
  a.style.left = p.x + "%";
  a.style.top  = p.y + "%";
  a.title = p.label;
  pins.appendChild(a);
});


// https://www.webmasterworld.com/html/3080334.htm

function focusPinFromHash() {
  const targetId = location.hash.slice(1);
  if (!targetId) return;

  const place = PLACES.find(p => p.id === targetId);
  if (!place) return;

  const viewport = document.getElementById("viewport");
  const world = document.getElementById("world");
  if (!viewport || !world) return;

  const worldW = world.offsetWidth;
  const worldH = world.offsetHeight;

  const px = (place.x / 100) * worldW;
  const py = (place.y / 100) * worldH;


  const left = px - viewport.clientWidth / 2;
  const top  = py - viewport.clientHeight / 2;

  viewport.scrollLeft = Math.max(0, Math.min(left, worldW - viewport.clientWidth));
  viewport.scrollTop  = Math.max(0, Math.min(top,  worldH - viewport.clientHeight));
}

requestAnimationFrame(() => {
  focusPinFromHash();
  setTimeout(focusPinFromHash, 50);
  setTimeout(focusPinFromHash, 200);
});

window.addEventListener("hashchange", () => {
  focusPinFromHash();
});





focusPinFromHash();




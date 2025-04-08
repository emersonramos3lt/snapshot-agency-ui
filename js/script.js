// CURSOR

console.clear();

const circleDiv = document.querySelector(".circle");

const mouse = { x: 0, y: 0 };
const previousMouse = { x: 0, y: 0 };
const circle = { x: 0, y: 0 };

let getScale = 0;
let getAngle = 0;

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

const speed = 0.17;

const animate = () => {
  circle.x += (mouse.x - circle.x) * speed;
  circle.y += (mouse.y - circle.y) * speed;

  const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

  const deltaMouseX = mouse.x - previousMouse.x;
  const deltaMouseY = mouse.y - previousMouse.y;

  previousMouse.x = mouse.x;
  previousMouse.y = mouse.y;

  const mouseVelocity = Math.min(
    Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4,
    150
  );

  const scaleValue = (mouseVelocity / 150) * 0.5;

  getScale += (scaleValue - getScale) * speed;

  const scaleTransform = `scale(${1 + getScale}, ${1 - getScale})`;

  const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;

  if (mouseVelocity > 20) {
    getAngle = angle;
  }

  const rotateTransform = `rotate(${getAngle}deg)`;

  circleDiv.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

  window.requestAnimationFrame(animate)
};

animate();
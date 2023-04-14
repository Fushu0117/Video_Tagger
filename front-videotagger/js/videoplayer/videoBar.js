// export default class CustomRange extends HTMLElement {
//   constructor() {
//     super();
//     this.innerHTML = `
//     <div class="range__bar">
//       <div class="range__progress"></div>
//       <div class="range__thumb"></div>
//     </div>
//     `;

//     this.root = this.querySelector(".range__bar");
//     this.progress = this.root.querySelector(".range__progress");
//     this.thumb = this.root.querySelector(".range__thumb");

//     this.onMouseMove = this.onMouseMove.bind(this);
//     this.onMouseUp = this.onMouseUp.bind(this);

//     this.boundRect = this.root.getBoundingClientRect();
//     this.value_ = 0;

//     this.root.addEventListener("mousedown", (e) => {
//       this.boundRect = this.root.getBoundingClientRect();
//       e.preventDefault();
//       const changeStartEvent = new Event("changestart");
//       this.dispatchEvent(changeStartEvent);
//       if (e.target != this.thumb) {
//         this.setProgressByCoordinate(e.x);
//       }
//       this.root.classList.add("range__bar_focus");
//       document.addEventListener("mousemove", this.onMouseMove);
//       document.addEventListener("mouseup", this.onMouseUp);
//     });
//   }

//   setProgressByCoordinate(x) {
//     this.value = ((x - this.boundRect.x) / this.boundRect.width) * 100;
//   }

//   set value(val) {
//     this.value_ = val;
//     this.progress.style.width = val + "%";
//   }

//   get value() {
//     return this.value_;
//   }

//   onMouseMove(e) {
//     const afterStart = e.x > this.boundRect.x;
//     const beforeEnd = e.x < this.boundRect.x + this.boundRect.width;
//     if (afterStart && beforeEnd) {
//       this.setProgressByCoordinate(e.x);
//     } else if (!afterStart) {
//       this.setProgressByCoordinate(this.boundRect.x);
//     } else if (!beforeEnd) {
//       this.setProgressByCoordinate(this.boundRect.x + this.boundRect.width);
//     }
//   }

//   onMouseUp() {
//     const changeEvent = new Event("change");
//     this.dispatchEvent(changeEvent);
//     this.root.classList.remove("range__bar_focus");
//     document.removeEventListener("mousemove", this.onMouseMove);
//     document.removeEventListener("mouseup", this.onMouseUp);
//   }
// }

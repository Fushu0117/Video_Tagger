// import { formatTime } from "../utils/formatTime.js";

// export default class TimestampManager {
//   constructor({ onRewind }) {
//     this.info = [];
//     this.nextIndex = 0;
//     this.container = document.querySelector(".video-controls__timestamps");
//     this.editor = document.querySelector(".timestamp-editor");
//     this.timeBox = this.editor.querySelector(".timestamp-editor__time");
//     this.closeBtn = this.editor.querySelector(".timestamp-editor__close");
//     this.textField = this.editor.querySelector(".timestamp-editor__text");
//     this.saveBtn = this.editor.querySelector(".timestamp-editor__save");
//     this.deleteBtn = this.editor.querySelector(".timestamp-editor__delete");
//     // this.rewindBtn = this.editor.querySelector(".timestamp-editor__rewind");
//     this.activeTimestamp = null;
//     this.closeBtn.addEventListener("click", this.closeEditor.bind(this));
//     this.saveBtn.addEventListener("click", this.closeEditor.bind(this));
//     this.deleteBtn.addEventListener("click", () => {
//       this.deleteTimestamp(this.activeTimestamp.dataset.id);
//     });
//     // this.rewindBtn.addEventListener("click", (e) => {
//     //   onRewind(
//     //     this.info.find((el) => el.id == this.activeTimestamp.dataset.id).time
//     //   );
//     // });
//   }

//   addTimestamp(percent, time) {
//     let timestamp = document.createElement("li");
//     timestamp.classList.add("timestamp");
//     timestamp.style.left = percent + "%";
//     this.info.push({
//       id: this.nextIndex,
//       time: time,
//       content: "",
//     });
//     timestamp.setAttribute("data-id", this.nextIndex++);
//     this.container.insertAdjacentElement("beforeend", timestamp);
//   }

//   deleteTimestamp(id) {
//     this.info.filter((el) => el.id != id);
//     this.activeTimestamp.remove();
//     this.closeEditor();
//   }

//   openEditor(timestamp) {
//     const info = this.info.find((el) => el.id == timestamp.dataset.id);
//     this.textField.value = info.content;
//     this.timeBox.innerHTML = formatTime(info.time);
//     this.activeTimestamp = timestamp;
//     this.editor.style.left = `calc(${window
//       .getComputedStyle(timestamp)
//       .getPropertyValue("left")} - 5px)`;
//     this.editor.style.left = `calc(${timestamp.style.left} * 0.9 - 100px)`;
//     this.activeTimestamp.classList.add("timestamp_selected");
//     this.editor.style.visibility = "visible";
//   }

//   closeEditor() {
//     this.editor.style.visibility = "hidden";
//     if (this.activeTimestamp) {
//       this.activeTimestamp.classList.remove("timestamp_selected");
//       this.info.find((el) => el.id == this.activeTimestamp.dataset.id).content =
//         this.textField.value;
//     }
//   }

//   reset() {
//     this.closeEditor();
//     this.info = [];
//     this.nextIndex = 0;
//     this.activeTimestamp = null;
//   }
// }

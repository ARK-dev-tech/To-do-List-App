(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();class d{constructor(e,t){this.taskName=e,this.taskDetails=t||"Empty",this.id=Date.now(),this.done=0}}class n{static STORE_KEY="tasks";static getTasks(){try{return JSON.parse(localStorage.getItem(n.STORE_KEY))||[]}catch(e){return console.error("STORAGE Error parsing tasks from localStorage. ",e),[]}}static saveTasks(e){try{localStorage.setItem(n.STORE_KEY,JSON.stringify(e))}catch(t){console.error("STORAGE Error saving tasks to localStorage. ",t),console.log("Value: ",e)}}static addTasks(e){try{const t=n.getTasks();t.push(e),n.saveTasks(t)}catch(t){throw console.error("STORAGE Error adding task to localStorage. ",t),console.log("Value: ",e),new Error("STORAGE Failed to add task.")}}static removeTasks(e){try{const r=n.getTasks().filter(o=>o.id!==e);n.saveTasks(r)}catch(t){throw console.error("STORAGE Error removing task from localStorage. ",t),console.log("Value: ",e),new Error("STORAGE Failed to remove task.")}}static setDone(e){try{const t=n.getTasks();t.forEach(r=>{r.id==e&&(r.done=1)}),n.saveTasks(t)}catch(t){throw console.error("STORAGE Error updating done status in localStorage. ",t),console.log("Value: ",e),new Error("STORAGE Failed to update status.")}}}class a{static displayTasks(){try{const e=n.getTasks(),t=document.querySelector("#main-content");if(!t)throw new Error("main-content element not found");t.innerHTML="",e.forEach(r=>{r.done===0?a.addTasksToList(r):a.addTasksToListDone(r)})}catch(e){console.error("UI Error displaying tasks. ",e),alert("Failed to load tasks.")}}static addTasksToList(e){try{const t=document.querySelector("#main-content"),r=document.createElement("div");r.dataset.id=e.id,r.innerHTML=`
            <div class="task-item bg-white border border-gray-200 rounded-lg w-full flex justify-between items-center text-lg font-medium min-h-14 hover:scale-[1.01] shadow-sm hover:shadow-md mb-5 transition-all px-4 py-3">

            <!--TASK NAME-->
            <div class="task-name text-lg font-medium mr-4 ml-1">${e.taskName}</div>

            <!--BUTTONS CONTAINER-->
            <div class="task-buttons flex gap-2 box-border items-center pr-2">

            <!--DETAILS TASK BUTTON-->
                <div
            class="details-btn px-3 py-1 transition hover:bg-white hover:text-[#4ecdc4] border-2 text-white bg-[#4ecdc4] border-[#4ecdc4] rounded-lg unclick hover:cursor-pointer text-sm">
                Details
                </div>

            <!--DONE TASK BUTTON-->
                <div
                class="done-btn px-3 py-1 transition hover:bg-white hover:text-[#ff6b6b] border-2 text-white bg-[#ff6b6b] border-[#ff6b6b] rounded-lg unclick hover:cursor-pointer text-sm">
                Done
                </div>

            <!--DELETE TASK BUTTON-->
                <div
                class="delete-btn px-3 py-1 transition hover:bg-red-500 hover:text-white border-2 text-red-500 border-red-500 rounded-lg unclick hover:cursor-pointer text-sm">
                X
                </div>
            </div>
            </div>
            `,t.appendChild(r)}catch(t){console.error("UI Error adding task to display (not done). ",t),alert("Failed to add task")}}static addTasksToListDone(e){try{const t=document.querySelector("#main-content"),r=document.createElement("div");r.dataset.id=e.id,r.innerHTML=`
            <div class="task-item bg-white border border-gray-200 rounded-lg w-full flex justify-between items-center text-lg font-medium min-h-14 hover:scale-[1.01] shadow-sm hover:shadow-md mb-5 transition-all px-4 py-3">

            <!--TASK NAME-->
            <div class="task-name text-lg font-medium mr-4 ml-1">${e.taskName}</div>

            <!--BUTTONS CONTAINER-->
            <div class="task-buttons flex gap-2 box-border items-center pr-2">

            <!--DETAILS TASK BUTTON-->
                <div
            class="details-btn px-3 py-1 transition hover:bg-white hover:text-[#4ecdc4] border-2 text-white bg-[#4ecdc4] border-[#4ecdc4] rounded-lg unclick hover:cursor-pointer text-sm">
                Details
                </div>

            <!--DONE TASK BUTTON-->
                <div class="done-btn transition-all box-border border-1 p-1 rounded-lg hover:cursor-pointer text-gray-400">Done</div>

            <!--DELETE TASK BUTTON-->
                <div
                class="delete-btn px-3 py-1 transition hover:bg-red-500 hover:text-white border-2 text-red-500 border-red-500 rounded-lg unclick hover:cursor-pointer text-sm">
                X
                </div>

            </div>
            </div>
            `,t.appendChild(r)}catch(t){console.error("UI Error adding task to display (done) ",t),alert("Failed to add task (done)")}}static openDetails(e,t){try{const r=document.querySelector("body"),o=document.createElement("div");o.id="main-prompt",o.innerHTML=`
            <div class="fixed inset-0 flex justify-center items-center z-50 transition-all bg-black/30">

            <div id="prompt-box-details"
            class="bg-white w-[400px] min-h-[150px] max-h-[80vh] border-4 border-[#ff6b6b] rounded-xl shadow-xl flex flex-col">

            <div class="flex justify-between items-center px-4 py-3 border-b border-[#fccdcd] bg-[#fadada] rounded-t-lg">

                <div class="modal-header text-xl font-semibold"> ${t} </div>

                <div id="details-cross" class="text-xl font-bold text-gray-600 hover:text-red-500 hover:scale-110 transition cursor-pointer">X</div>

            </div>


            <div class="px-4 py-3 text-gray-700 overflow-y-auto">

                <p><span class="font-medium wrap-break-word italic text-sm">${e}</span></p>
                
            </div>

            </div>
            </div>
            `,document.querySelector("#main-container").classList.add("blur-xs"),r.appendChild(o)}catch(r){console.error("UI Error oppening details modal. ",r),alert("Failed to open details")}}static closeDetails(e){try{e.id.includes("details-cross")&&(document.querySelector("#main-prompt").remove(),document.querySelector("#main-container").classList.remove("blur-xs"))}catch(t){console.error("UI Error closing details. ",t),alert("Failed to close details")}}static createNewTaskPrompt(){try{const e=document.querySelector("body"),t=document.createElement("div");t.id="main-prompt",t.innerHTML=`
                <div class="fixed inset-0 flex justify-center items-center z-50 bg-black/30">

                    <div id="prompt-box"
                        class="bg-white w-[400px] max-h-[80vh] overflow-y-auto border-4 border-[#ff6b6b] rounded-xl shadow-xl flex flex-col">

                        <div class="modal-header bg-[#fadada] text-center text-xl font-semibold py-3 border-b border-[#fccdcd]">
                            Create New Task
                        </div>

                        <div class="flex flex-col gap-4 p-5">

                            <div class="flex flex-col">
                                <label for="nameInput" id="name" class="mb-1 font-medium">Task Name:</label>
                                <input type="text" id="nameInput" class="border-2 p-2 rounded focus:outline-none">
                            </div>

                            <div class="flex flex-col">
                                <label for="detailsInput" id="detailsLabel" class="mb-1 font-medium">Task Details:</label>
                                <input type="text" id="detailsInput" class="border-2 p-2 rounded focus:outline-none">
                            </div>

                        </div>


                        <div class="flex justify-between px-5 py-4 bg-[#fadada] border-t border-[#fccdcd] ">
                            <div id="createTaskButton" class="border-2 px-4 py-2 hover:bg-white hover:text-[#ff6b6b] bg-[#ff6b6b] rounded cursor-pointer">
                                Create</div>
                            <div id="cancelTaskButton" class="border-2 px-4 py-2 hover:bg-white hover:text-[#ff6b6b] bg-[#ff6b6b] rounded cursor-pointer">
                                Cancel</div>
                        </div>
                    </div>
                </div>
            `,document.querySelector("#main-container").classList.add("blur-xs"),e.appendChild(t),a.promptButtons(t)}catch(e){console.error("UI Error displaying create new task modal. ",e),alert("Failed display create new task modal")}}static promptButtons(e){try{e.querySelector("#createTaskButton").addEventListener("click",()=>{const t=document.querySelector("#nameInput").value,r=document.querySelector("#detailsInput").value;a.createTask(t,r)}),e.querySelector("#cancelTaskButton").addEventListener("click",a.removePrompt)}catch(t){console.error("UI Error with create new task prompt button. ",t),alert("Button Failed")}}static removePrompt(){try{document.querySelector("#main-prompt").remove(),document.querySelector("#main-container").classList.remove("blur-xs")}catch(e){console.error("UI Error removing create new task prompt modal. ",e),alert("Failed to remove prompt")}}static doneTask(e){try{if(e.classList.contains("unclick")&&e.classList.contains("done-btn")){const t=e.closest("[data-id]"),r=t.querySelector(".task-name"),o=Number(t.dataset.id);r.classList.add("line-through","text-gray-400"),e.classList.remove("unclick","hover:scale-[1.04]","hover:text-[#ff6b6b]","hover:bg-white","text-white","border-[#ff6b6b]","bg-[#ff6b6b]","hover:cursor-pointer"),e.classList.add("text-gray-400","hover:cursor-default"),n.setDone(o)}}catch(t){console.error("UI Error with Done Button. ",t),alert("Failed to update done button")}}static deleteTask(e){try{if(e.classList.contains("unclick")&&e.classList.contains("delete-btn")){const t=e.closest("[data-id]"),r=Number(t.dataset.id);t.remove(),n.removeTasks(r)}}catch(t){console.error("UI Error deleting task. ",t),alert("Failed to delete task")}}static detailsTask(e){try{if(e.classList.contains("unclick")&&e.classList.contains("details-btn")){const t=e.closest("[data-id]"),r=Number(t.dataset.id),s=n.getTasks().find(c=>c.id===r);s&&a.openDetails(s.taskDetails,s.taskName)}}catch(t){console.error("UI Error in details task button. ",t),alert("Details button failed")}}static createTask(e,t){try{const r=e.trim(),o=t.trim();if(!r){alert("Task name cannot be empty");return}const s=new d(e,o||"Empty");a.removePrompt(),a.addTasksToList(s),n.addTasks(s)}catch(r){console.error("UI Error creating task. ",r),alert("Failed to create task")}}static cancelTask(){try{a.removePrompt()}catch(e){console.error("UI Error cancelling create new task prompt modal. ",e),alert("Failed to cancel")}}}document.addEventListener("DOMContentLoaded",function(){try{a.displayTasks();const i=document.querySelector("#add-btn"),e=document.querySelector("#main-content");if(!i||!e)throw new Error("EVENTS Required elements not found");e.addEventListener("click",t=>{try{const r=t.target;r.classList.contains("done-btn")?a.doneTask(r):r.classList.contains("delete-btn")?a.deleteTask(r):r.classList.contains("details-btn")&&a.detailsTask(r)}catch(r){console.error("EVENTS Error handling buttons. ",r),alert("Buttons Error")}}),document.addEventListener("click",t=>{try{if(t.target.id==="details-cross"){const r=document.querySelector("#main-prompt");r&&(r.remove(),document.querySelector("#main-container").classList.remove("blur-xs"))}}catch(r){console.error("EVENTS Error closing modal. ",r)}}),i.addEventListener("click",()=>{try{a.createNewTaskPrompt()}catch(t){console.error("EVENTS Error opening create new task prompt modal. ",t),alert("Failed to open create new task modal")}})}catch(i){console.error("EVENTS Error initializing application. ",i),alert("Failed to initialize the application.")}});

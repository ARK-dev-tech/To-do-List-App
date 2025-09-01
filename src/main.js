// --- GLOBAL --- //



class Task {
    constructor(taskName, taskDetails) {
        this.taskName = taskName;
        this.taskDetails = taskDetails || "Empty"; //Detail set to empty if taskDetails is null (left side checked first)
        this.id = Date.now();
        this.done = 0;
    }
}

// --- STORAGE CLASS --- //

class Storage {

    //constant
    static STORE_KEY = 'tasks';

    static getTasks() {
        try {
            const tasks = JSON.parse(localStorage.getItem(Storage.STORE_KEY));
            return tasks || [];
        }
        catch (error) {
            console.error("STORAGE Error parsing tasks from localStorage. ", error);
            return []; //return empty array so app keeps working even if something went wrong 
        }
    }

    static saveTasks(task) {
        try{
            localStorage.setItem(Storage.STORE_KEY, JSON.stringify(task));
        }
        catch(error){
            console.error("STORAGE Error saving tasks to localStorage. ", error);
            console.log("Value: ", task);
            
        }   
        
    }

    static addTasks(task) {
        try{
            const tasks = Storage.getTasks();
            tasks.push(task); //added new task into the array recieved from localStorage
            Storage.saveTasks(tasks); //saved the new updated array into localStorage
        }
        catch(error){
            console.error("STORAGE Error adding task to localStorage. ", error);
            console.log("Value: ", task);
            throw new Error("STORAGE Failed to add task."); //
        }
        
    }

    static removeTasks(id) {
        try{
            const tasks = Storage.getTasks();
            const filteredTasks = tasks.filter(task => task.id !== id);
            Storage.saveTasks(filteredTasks);
            //can also write above like const tasks = Storage.getTasks().filter(task => task.id !== id);
            //below is the simplified, it works same tasks.filter()
            // let filteredTasks = [];
            // for (let i = 0; i < tasks.length; i++) {
            //     let task = tasks[i];
            //     // Only adding tasks that DON'T match the given id
            //     if (task.id !== id) {
            //         filteredTasks.push(task);
            //     }
            // }
        }
        catch(error){
            console.error("STORAGE Error removing task from localStorage. ", error);
            console.log("Value: ", id);
            throw new Error("STORAGE Failed to remove task."); //
        }
        
    }

    static setDone(id) { //function to set the tasks to done state
        try{
            const tasks = Storage.getTasks();
            tasks.forEach(temp => {
                if (temp.id == id) temp.done = 1 //don't need braces for one line
            });
            Storage.saveTasks(tasks);
        }
        catch(error){
            console.error("STORAGE Error updating done status in localStorage. ", error);
            console.log("Value: ", id);
            throw new Error("STORAGE Failed to update status."); //
        }
        
    }
}
// --- STORAGE END --- //



class UI {
    
    // Render ALL
    static displayTasks() {

        try{
            const tasks = Storage.getTasks();
            const main = document.querySelector('#main-content');

            if (!main) {
                throw new Error("main-content element not found");
            }

            main.innerHTML = ""; //clearing before doing each display, to avoid risk of duplicates
            tasks.forEach(task => {
                task.done === 0 ? UI.addTasksToList(task) : UI.addTasksToListDone(task);    // 0 not done, 1 done, for gray done button
            })
        }
        catch(error){
            console.error("UI Error displaying tasks. ", error);
            alert("Failed to load tasks."); //
        }
        
    }



    //ADD NEW TASK
    //(not done)
    static addTasksToList(task) {

        try{
            const main = document.querySelector('#main-content');
            const taskElement = document.createElement('div');
            taskElement.dataset.id = task.id;
            // older same way to write is taskElement.setAttribute("data-id", task.id);
            taskElement.innerHTML = `
            <div class="task-item bg-white border border-gray-200 rounded-lg w-full flex justify-between items-center text-lg font-medium min-h-14 hover:scale-[1.01] shadow-sm hover:shadow-md mb-5 transition-all px-4 py-3">

            <!--TASK NAME-->
            <div class="task-name text-lg font-medium mr-4 ml-1">${task.taskName}</div>

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
            `;
            main.appendChild(taskElement);
        }
        catch(error){
            console.error("UI Error adding task to display (not done). ", error);
            alert("Failed to add task"); //
        }
        

    }

    //(done)
    static addTasksToListDone(task) {

        try{
            const main = document.querySelector('#main-content');
            const taskElement = document.createElement('div');
            taskElement.dataset.id = task.id;
            taskElement.innerHTML = `
            <div class="task-item bg-white border border-gray-200 rounded-lg w-full flex justify-between items-center text-lg font-medium min-h-14 hover:scale-[1.01] shadow-sm hover:shadow-md mb-5 transition-all px-4 py-3">

            <!--TASK NAME-->
            <div class="task-name text-lg font-medium mr-4 ml-1">${task.taskName}</div>

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
            `;
            main.appendChild(taskElement);
        }
        catch(error){
            console.error("UI Error adding task to display (done) ", error);
            alert("Failed to add task (done)"); //
        }
        
    }

    //MODAL FOR TASK DETAILS
    static openDetails(details, name) {
        try{
            const parent = document.querySelector('body');
            const prompt = document.createElement('div');
            prompt.id = 'main-prompt';

            prompt.innerHTML = `
            <div class="fixed inset-0 flex justify-center items-center z-50 transition-all bg-black/30">

            <div id="prompt-box-details"
            class="bg-white w-[400px] min-h-[150px] max-h-[80vh] border-4 border-[#ff6b6b] rounded-xl shadow-xl flex flex-col">

            <div class="flex justify-between items-center px-4 py-3 border-b border-[#fccdcd] bg-[#fadada] rounded-t-lg">

                <div class="modal-header text-xl font-semibold"> ${name} </div>

                <div id="details-cross" class="text-xl font-bold text-gray-600 hover:text-red-500 hover:scale-110 transition cursor-pointer">X</div>

            </div>


            <div class="px-4 py-3 text-gray-700 overflow-y-auto">

                <p><span class="font-medium wrap-break-word italic text-sm">${details}</span></p>
                
            </div>

            </div>
            </div>
            `
            document.querySelector('#main-container').classList.add('blur-xs');
            parent.appendChild(prompt);
        }
        catch(error){
            console.error("UI Error oppening details modal. ", error);
            alert("Failed to open details"); //
        }
       
    }

    static closeDetails(target) {

        try{
            if (target.id.includes('details-cross')) {
                document.querySelector('#main-prompt').remove();
                document.querySelector('#main-container').classList.remove('blur-xs');
            }
        }
        catch(error){
            console.error("UI Error closing details. ", error);
            alert("Failed to close details"); //
        }
        

    }

    //MODAL FOR ADD NEW TASK
    static createNewTaskPrompt() {
        try{
            const parent = document.querySelector('body');
            const prompt = document.createElement('div');
            prompt.id = 'main-prompt';
            prompt.innerHTML = `
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
            `
            document.querySelector('#main-container').classList.add('blur-xs'); //consider making function
            parent.appendChild(prompt);
            UI.promptButtons(prompt); //event for buttons inside the create new task prompt
        }
        catch(error){
            console.error("UI Error displaying create new task modal. ", error);
            alert("Failed display create new task modal"); //
        }
        

    }

    //ADD NEW TASK RETURNING CREATE OR CANCEL
    static promptButtons(prompt) {
        try{
            prompt.querySelector('#createTaskButton').addEventListener('click', () => {
                const nameInput = document.querySelector('#nameInput').value;
                const detailsInput = document.querySelector('#detailsInput').value;
                UI.createTask(nameInput, detailsInput);
            })

            prompt.querySelector('#cancelTaskButton').addEventListener('click', UI.removePrompt); //do not UI.removePrompt()
        }
        catch(error){
            console.error("UI Error with create new task prompt button. ", error);
            alert("Button Failed"); //
        }
        
    }

    //REMOVE MODAL FOR ADD NEW TASK
    static removePrompt() {
        try{
            document.querySelector('#main-prompt').remove(); //function to add
            document.querySelector('#main-container').classList.remove('blur-xs'); //function to add
        }
        catch(error){
            console.error("UI Error removing create new task prompt modal. ", error);
            alert("Failed to remove prompt"); //
        }
        
    }

    //TASK DONE BUTTON
    static doneTask(target) {
        try{
            if (target.classList.contains('unclick') && target.classList.contains('done-btn')) {

                //Set variables
                const taskElement = target.closest('[data-id]');
                const taskElementName = taskElement.querySelector('.task-name');
                const id = Number(taskElement.dataset.id);

                //UI Task Name change
                taskElementName.classList.add('line-through', 'text-gray-400');

                //UI Task Button change
                target.classList.remove('unclick', 'hover:scale-[1.04]', 'hover:text-[#ff6b6b]', 'hover:bg-white', 'text-white', 'border-[#ff6b6b]', 'bg-[#ff6b6b]', 'hover:cursor-pointer');
                target.classList.add('text-gray-400', 'hover:cursor-default')

                //Update Storage
                Storage.setDone(id);
            }
        }
        catch(error){
            console.error("UI Error with Done Button. ", error);
            alert("Failed to update done button"); //
        }
        
    }

    //TASK DELETE BUTTON
    static deleteTask(target) {
        try{
            if (target.classList.contains('unclick') && target.classList.contains('delete-btn')) {
                //Set variables
                const taskElement = target.closest("[data-id]");
                const id = Number(taskElement.dataset.id);

                //UI Button change
                taskElement.remove();

                //Storage update
                Storage.removeTasks(id);

            }
        }
        catch(error){
            console.error("UI Error deleting task. ", error);
            alert("Failed to delete task"); //
        }
        
    }



    //TASK DETAILS BUTTON
    static detailsTask(target) {
        try{
            if (target.classList.contains('unclick') && target.classList.contains('details-btn')) {
                const taskElement = target.closest("[data-id]");
                const id = Number(taskElement.dataset.id);

                const tasks = Storage.getTasks();
                const task = tasks.find(t => t.id === id);

                if (task) {
                    UI.openDetails(task.taskDetails, task.taskName)
                }
            }
        }
        catch(error){
            console.error("UI Error in details task button. ", error);
            alert("Details button failed"); //
        }
        
    }



    //CREATE NEW TASK AFTER CREATE RETURNED FROM promptListen()
    static createTask(nameInput, detailsInput) {

        try{
            //Validating Input
            const trimmedName = nameInput.trim();
            const trimmedDetails = detailsInput.trim();

            if (!trimmedName) {
                alert("Task name cannot be empty");
                return;
            }

            //Create New Task
            const newTask = new Task(nameInput, trimmedDetails || "Empty");

            //Update UI and Storage
            UI.removePrompt();
            UI.addTasksToList(newTask);
            Storage.addTasks(newTask);
        }
        catch(error){
            console.error("UI Error creating task. ", error);
            alert("Failed to create task"); //
        }
        
    }

    //CANCEL THE MODAL FOR ADD NEW TASK
    static cancelTask() {
        try{
            UI.removePrompt();
        }
        catch(error){
            console.error("UI Error cancelling create new task prompt modal. ", error);
            alert("Failed to cancel"); //
        }
        
    }


} //UI CLASS END HERE



//EVENTS

document.addEventListener('DOMContentLoaded', function () {

    try{
        UI.displayTasks();

        //INITIALIZE ALL ELEMENTS TO USE
        const addButton = document.querySelector('#add-btn')
        const main = document.querySelector('#main-content');

        if (!addButton || !main) {
            throw new Error("EVENTS Required elements not found");
        }

        //Buttons
        main.addEventListener('click', (e) => {
            try{
                const element = e.target;
                if (element.classList.contains('done-btn')) {
                    UI.doneTask(element);
                }
                else if (element.classList.contains('delete-btn')) {
                    UI.deleteTask(element);
                }
                else if (element.classList.contains('details-btn')) {
                    UI.detailsTask(element);
                }
            }
            catch(error){
                console.error("EVENTS Error handling buttons. ", error);
                alert("Buttons Error");
            }
            
        })

        //Closing Modals
        document.addEventListener('click', (e) => {
            try{
                //This is for closing details modal when clicking the X
                //can implement it inside the UI function too, like closing add modal/prompt
                if (e.target.id === 'details-cross') {
                    const prompt = document.querySelector('#main-prompt');
                    if (prompt) {
                        prompt.remove();
                        document.querySelector('#main-container').classList.remove('blur-xs');
                    }
                }
            }
            catch(error){
                console.error("EVENTS Error closing modal. ", error);
            }            
        });


        //ADD NEW TASK
        addButton.addEventListener('click', () => {
            try{
                UI.createNewTaskPrompt();
            }
            catch (error){
                console.error("EVENTS Error opening create new task prompt modal. ", error);
                alert("Failed to open create new task modal");
            }
            
        })
    }
    catch(error){
        console.error("EVENTS Error initializing application. ", error);
        alert("Failed to initialize the application.");
    }
    

})































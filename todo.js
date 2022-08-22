const taskList = document.getElementById('list'),
    controlList = document.querySelector('.functionBlock');


let todo = [];
if(localStorage.getItem('todo').length !=0 ) todo = JSON.parse(localStorage.getItem('todo'));


let idIndex = 0;        //Счетчик для создания id у объектов-задач

let selectedTask;
let selectedIndex;


/*
    Смена классов при нажатии на объект
 */
document.addEventListener('DOMContentLoaded', () => {
    taskList.addEventListener('click', event => {

        let li = event.target.closest('li');


        if (!li) return;

        if (selectedTask) {
            selectedTask.classList.remove('active');
            selectedTask.classList.add('noActive')
        }

        selectedTask = li;
        selectedIndex = Number(li.id);
        li.classList.add('active');
        li.classList.remove('noActive');

        let checkbox = li.lastElementChild;
        if(checkbox.checked) {
            todo[selectedIndex].done = true;
        }
        else todo[selectedIndex].done = false;
        save();
    });

    render(todo, taskList);
})

function render(todo, elem) {
    // Очищается поле с задачами
    taskList.replaceChildren();

    // Блок заполняется задачами из массива 'todo';
    idIndex = 0;
    todo.forEach(task => {

        task.id = idIndex++;


        let li = document.createElement('li');
        li.setAttribute('id', `${task.id}`);

        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.checked = task.done;


        if(task.hasOwnProperty('color')) {
            li.style.backgroundColor = task.color;
        }


        li.append(task.text);
        li.append(checkbox);
        li.classList.add('noActive');

        elem.append(li);
    });

};

function save() {
    localStorage.setItem('todo', JSON.stringify(todo));
}

// let changed = selectedTask.closest('li');

class Control {
    constructor(option) {
        this.option = option;
        option.onclick = this.onClick.bind(this);
    }

    changeTask() {
        if (!selectedTask) return;

        let task = todo[selectedIndex];
        let newName = prompt("Введите изменения");
        if (newName == null || newName == '') {
            alert("Вы ничего не измении");
            return;
        }
        task.text = newName;

        let newColor = prompt('Новый цвет');
        todo[selectedIndex].color = newColor;

        selectedTask = null;

        render(todo, taskList);
    }

    addTask() {
        let taskName = prompt("Введите название задачи");
        if (taskName == null || taskName == '') return;
        let taskColor = prompt("Введице цвет задачи");
        let task = {
            text: taskName,
            done: false,
            color: taskColor
        }

        if (!selectedTask) todo.push(task);
        else todo.splice(selectedIndex + 1, 0, task);
    }

    deleteTask() {
        if (!selectedTask) return;

        todo.splice(selectedIndex, 1);
        selectedTask.remove();
    }

    upTask() {
        if (!selectedTask) return;
        if (selectedIndex == 0) return;

        let tempVariable = todo[selectedIndex];
        todo[selectedIndex] = todo[selectedIndex - 1];
        todo[selectedIndex - 1] = tempVariable;
    }

    downTask() {
        if (!selectedTask) return;
        if (selectedIndex == todo.length - 1) return;

        let tempVariable = todo[selectedIndex];
        todo[selectedIndex] = todo[selectedIndex + 1];
        todo[selectedIndex + 1] = tempVariable;
    }


    onClick(event) {
        let optionId = event.target.id;

        if (optionId) {
            this[optionId]();
            if(optionId != 'changeTask') render(todo, taskList);
            else {

            }
            save();
            selectedTask = null;
        }
    }
}

let control = new Control(controlList);








const list = document.querySelector('#list');
let idCounter = 0;

let todo = [
    {text: 'Пообедать', done: true, color: 'yellow'},
    {text: 'Сделать практику', done: false},
    {text: 'Написать программу', done: true, color: 'aqua'},
];

render(todo, list);


/**
 * Добавление новой задачи в список
 */
let addItem = function () {
    let task = prompt('Введите название задачи:');
    todo.push({text: task, done: false, color: 'orange'});
    render(todo, list);
};

let deleteItem = function () {

};

/**
 * добавление в список дел из массива
 * @param todo - массив дел
 * @param elem - список в html
 */
function render(todo, elem) {
    // Очищается поле с задачами
    let todoList = document.querySelectorAll('#taskBlock li');
    todoList.forEach(task => {
        task.remove();
    });

    // Блок заполняется задачами из массива 'todo';
    todo.forEach(task => {
        const li = document.createElement('li');
        li.setAttribute('id', 'task');

        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.checked = task.done;

        // if(task.color) {
        //     li.style.background = task.color;
        // }


        li.append(task.text);
        li.append(checkbox);
        li.classList.add('noActive');

        elem.append(li);
        li.setAttribute('data-index', todo.indexOf(task))
    });
};


const elemm = document.querySelectorAll('#task');
let current;

function elemmClick() {
    if(current && current !== this){
        current.classList.toggle("noActive");
        current.classList.toggle("active");
    }

    this.classList.toggle("noActive");
    this.classList.toggle("active");
    current = this;
}

for(let e of elemm) {
    e.addEventListener("click", elemmClick);
}

const buttonDelete = document.getElementById('deleteTask');
buttonDelete.addEventListener('click', () => {
    if(current) {
        let currentIndex = +current.dataset.index;
        todo.splice(currentIndex, 1);
        // for(let task of todo) {
        //     if(current.dataset.index == todo.indexOf(task)) todo.splice(currentIndex, 0);
        // }
        current.remove();
    }

});

const buttonAdd = document.getElementById('addTask');
buttonAdd.addEventListener('click', () => {
    let task = prompt('Введите название задачи:');
    let selectedIndex = +current.dataset.index;
    todo.splice(selectedIndex, 0, {text: task, done: false, color: 'red'});
    // todo.push({text: task, done: false, color: 'orange'});
    render(todo, list);
});

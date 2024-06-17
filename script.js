document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    // ローカルストレージからタスクを読み込む
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task.text, task.completed));
    };

    // ローカルストレージにタスクを保存する
    const saveTasks = () => {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('.task-text').textContent,
                completed: li.querySelector('.task-text').classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    addTaskButton.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText, false);
            newTaskInput.value = '';
            saveTasks();
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const li = e.target.closest('li');
            taskList.removeChild(li);
            saveTasks();
        }

        if (e.target.classList.contains('edit-btn')) {
            const li = e.target.closest('li');
            const taskTextElement = li.querySelector('.task-text');
            const taskText = taskTextElement.textContent;
            newTaskInput.value = taskText;
            addTaskButton.textContent = '更新';
            addTaskButton.onclick = () => {
                taskTextElement.textContent = newTaskInput.value.trim();
                addTaskButton.textContent = '追加';
                addTaskButton.onclick = addTaskEvent;
                newTaskInput.value = '';
                saveTasks();
            };
        }

        if (e.target.classList.contains('task-text')) {
            e.target.classList.toggle('completed');
            saveTasks();
        }
    });

    const addTask = (taskText, completed) => {
        const li = document.createElement('li');

        const taskTextElement = document.createElement('span');
        taskTextElement.className = 'task-text';
        if (completed) {
            taskTextElement.classList.add('completed');
        }
        taskTextElement.textContent = taskText;

        const taskActionsElement = document.createElement('span');
        taskActionsElement.className = 'task-actions';

        const editButton = document.createElement('button');
        editButton.className = 'edit-btn';
        editButton.textContent = '編集';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = '削除';

        taskActionsElement.appendChild(editButton);
        taskActionsElement.appendChild(deleteButton);

        li.appendChild(taskTextElement);
        li.appendChild(taskActionsElement);

        taskList.appendChild(li);
    };

    const addTaskEvent = addTaskButton.onclick;

    loadTasks();  // ページ読み込み時にタスクを読み込む
});

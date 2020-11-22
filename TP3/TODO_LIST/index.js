let vm = new Vue({
    el: document.querySelector('#app'),
    data: {
        title: null,
        content: null,
        toDos: [
            {
                title: "My ToDo Example",
                content: "This is an example to show u what a todo looks like",
                isDone: true,
            }
        ]
    },
    mounted() {
    },
    methods: {
        addTodo(title, content) {
            this.toDos.push({
                title: title,
                content: content,
                isDone: false,
            })
        },
        taskDone(i) {
            this.toDos[i].isDone = true
        },
    },

})
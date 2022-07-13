<template>
    <div class="Create_Task_Lockscreen">
    <form action="" class="Task_Form" @submit.prevent="CreateTask">
        <h1>Create Task</h1>
        <input type="text" name="code" id="code" placeholder="Task Code" v-model="Task_Code">
        <input type="text" name="title" id="title" placeholder="Title" v-model="Title">
        <div>
            <input type="number" v-model="Importance" id="importance" name="importance" placeholder="Importance from 1 to 5" min="1" max="5">
            <input type="date" id="date" name="date" :min="Today" v-model="Deadline">
        </div>
        <textarea name="description" id="description" cols="30" rows="10" placeholder="Description" v-model="Description"></textarea>
        <div>
            <button id="Create_Button">Create task</button>
            <button id="Cancel_Button" @click="CancelFunc">Cancel</button>
        </div>
    </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: {
        CancelFunc: Function,
        CancelFunc2: Function
    },
    data() {
        return {
            Task_Code: '',
            Title: '',
            Description: '',
            Importance: '',
            Deadline: '',
            Today: Date.now()
        }
    },
    methods: {
        async CreateTask() {
            const Response = await axios.put('http://localhost:4000/User/Task', {
                withCredentials: true,
                Cookies: $cookies.get('UserID'),
                code: this.Task_Code,
                title: this.Title,
                description: this.Description,
                importance: this.Importance,
                date: this.Deadline
            })
            alert(Response.data)
            this.CancelFunc()
        }
    }
}
</script>

<style lang="scss">
.Create_Task_Lockscreen {
    top: 0%;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.75);
}

.Task_Form {
    background-color: white;
    border: 1px solid black;
    margin: auto;
    margin-top: 4%;
    width: 37%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    border: 2px solid gainsboro;
    font-family: 'Dosis', 'sans-serif';
    padding: 20px;
    gap: 15px;

    input, textarea {
        width: 90%;
        padding: 10px;
        border: 1px solid rgb(161, 161, 161);
        border-radius: 10px;
        outline: none;
    }

    div {
        width: 90%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;

        button {
            padding: 7px;
            font-size: 1.3em;
            color: white;
            font-family: 'Poppins', 'sans-serif';
            width: 40%;
            cursor: pointer;
            border: none;

        }

        #Create_Button {
            background-color: green;
        }
        #Cancel_Button {
            background-color: red;
        }

        input {
            width: 45%;
        }
    }
}

@media (max-width: 880px) {
    .Task_Form {
        width: 80%;
    }
}
</style>
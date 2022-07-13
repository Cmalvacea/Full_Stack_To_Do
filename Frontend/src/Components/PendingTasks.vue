<script setup>
import axios from 'axios'
import BlockScreen from './BlockScreen.vue'
import BlockScreen1 from './BlockScreen.vue';
</script>

<template>
    <template v-if="Found && PTaskData">
    <div v-for="Task in PTaskData">
    <div class="Pending_Task_Preview">
        <div>
            <h1>
                {{Task.Title}}
            </h1>
            <p>
                {{Task.Codes.Task_Code}}
            </p>
        </div>
        <div>
            <p><ion-icon name="calendar-outline"></ion-icon>{{Date(Task.Deadline)}}</p>
            <p><ion-icon name="alert-circle-outline"></ion-icon>{{Task.Importance}}</p>
        </div>
        <div>
            <h3>Description</h3>
            <p>{{Task.Description}}</p>
        </div>
        <div class="Pending_Task_Options">
            <button @click="UpdateTask(Task.Codes.Task_Code)">Finish</button>
            <button @click="DeleteTask(Task.Codes.Task_Code)">Delete</button>
        </div>
    </div>
    </div>
    </template>
    <template v-else>
        <h1>{{PTaskData}}</h1>
    </template>
</template>

<script>


export default {
    data() {
        return {
            CurrentAction1: false,
            CurrentAction2: false,
            WarningMessage: "Are you sure you sure you want to do this?",
            Found: false,
            PTaskData: ''
        }
    },
    methods: {
        CancelAction() {
            this.CurrentAction1 = false
            this.CurrentAction2 = false
        },
        UpdateTask(arg) {
            axios.patch('http://localhost:4000/User/Task', {id: arg}).then(Response => {
                alert(Response.data)
            }).catch(err => {
                alert('This task was already finished')
            })
        },
        DeleteTask(arg) {
            axios.delete('http://localhost:4000/User/Task', {data: {id: arg}}).then(Response => {
                alert(Response.data)
            }).catch(err => {
                alert('This was already deleted')
            })
        }
    },
    async beforeMount() {
        await axios.get('http://localhost:4000/User/Pending_Tasks').then(Response => {
            this.Found = true
            this.PTaskData = Response.data
        }).catch(err => {
            this.Found = false,
            this.PTaskData = 'Not Found'
        })
    }
}
</script>

<style lang="scss">
.Pending_Task_Preview {
    border-radius: 9px;
    box-shadow: 3px 3px 3px gainsboro;
    padding: 10px;
    display: flex;
    width: 65%;
    flex-direction: column;
    justify-content: space-evenly;
    div {
        display:flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        #Task_Description {
            display: none;
        }

        button {
            width: 40%;
            border: none;
            background-color: rgb(219, 219, 219);
            padding: 4px;
            color: rgb(59, 59, 59);
            border-radius: 10px;
            cursor: pointer;
        }
        button:hover {
            padding: 8px;
            margin-bottom: 5px;
            background-color: rgb(59, 59, 59);
            color: rgb(219, 219, 219);
        }

    }
    .Pending_Task_Options {
        display: grid;
        grid-template-columns: repeat(2, 45%);

        button {
            border-radius: 0px;
            width: 100%;
        }
    }
}
</style>
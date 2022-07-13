<script setup>
import axios from 'axios'
</script>

<template>
    <template v-if="Found && FTaskData">
        <div class="Finished_Task_Preview" v-for="Task in FTaskData">
            <div>
                <h1>{{Task.Title}}</h1>
                <p>{{Task.Codes.Task_Code}}</p>
            </div>
            <div>
                <p><ion-icon name="calendar-outline"></ion-icon>Date</p>
                <p><ion-icon name="alert-circle-outline"></ion-icon>{{Task.Importance}}</p>
                <button id="Description_Display">Description</button>    
            </div>
            <div class="Finished_Task_Options">
                <button @click="EliminateTask(Task.Codes.Task_Code)">Delete</button>
            </div>
        </div>
    </template>
    <template v-else>
        <h1>{{FTaskData}}</h1>
    </template>
</template>

<script>
export default {
    data() {
        return {
            CurrentAction: false,
            WarningMessage: "Are you sure you sure you want to do this?",
            Found: false,
            FTaskData: ''
        }
    },
    methods: {
        CancelAction() {
            this.CurrentAction = false
        },
        async EliminateTask(arg) {
            await axios.delete('http://localhost:4000/User/Task', {data: {id: arg}}).then(Response => {
                alert(Response.data)
            }).catch(Err => {
                alert('This wask was already deleted')
            })
        }
    },
    async beforeMount() {
        await axios.get('http://localhost:4000/User/Finished_Tasks').then(Response => {
            this.Found = true
            this.FTaskData = Response.data
        }).catch(error => {
            this.Found = false
            this.FTaskData = 'Not found'
        })
    }
}
</script>

<style lang="scss">
.Finished_Task_Preview {
    align-self: flex-end;
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
    .Finished_Task_Options {
        width: 90%;
        margin: auto;
        button {
            border-radius: 0px;
            width: 100%;
        }
    }
}
</style>
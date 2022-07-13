<script setup>
import AboutPost from './Components/AboutPost.vue'
import BlockScreen from './Components/BlockScreen.vue'
import LoginPanel from './Components/LoginPanel.vue'
import CreateTask from './Components/CreateTask.vue'
import PendingTasks from './Components/PendingTasks.vue'
import FinishedTasks from './Components/FinishedTasks.vue'
</script>

<template>

<AboutPost v-if="ShowAbout" :CloseFunc="DisplayAbout"/>


<template v-if="Logged && AllowTasks">
    <nav v-if="DisplayNav">
    <button @click="DisplayCreatePanel">Create Task</button>
    <button @click="DisplayAbout">About</button>
    <button @click="LogOut">Log Out</button>
    </nav>
    <CreateTask v-if="DisplayCreate" :CancenlFunc2="LogOut" :CancelFunc="CancelCreatePanel"/>
    <div class="Tasks_Container" v-if="AllowTasks">
    <div class="Pending_Tasks_Container">
        <h1>Pending Tasks</h1>
        <PendingTasks/>
    </div>
    <div class="Finished_Tasks_Container">
        <h1>Finished Tasks</h1>
        <FinishedTasks/>
    </div>
</div>
</template>
<template v-else>
    <LoginPanel :Confirm="DisplayAll"/>
</template>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true

export default {
    data() {
        return {
            DisplayCreate: false,
            DisplayNav: false,
            AllowTasks: false,
            Logged: false,
            ShowAbout: false
        }
    },
    methods: {
        DisplayAll() {
            this.Logged = true,
            this.DisplayNav = true,
            this.AllowTasks = true
        },
        LogOut() {
            axios.get('http://localhost:4000/Log_Route/Log_Out').catch(error => {
                alert("There was an error during the operation")
            })
            $cookies.remove('UserID')
            this.Logged = false,
            this.AllowTasks = false,
            this.DisplayCreate = false
        },
        DisplayCreatePanel() {
            this.DisplayCreate = true
            this.DisplayNav = false
        },
        CancelCreatePanel() {
            this.DisplayCreate = false,
            this.DisplayNav = true
        },
        DisplayAbout() {
            this.ShowAbout = !this.ShowAbout
            this.DisplayNav = true
        }
    }
}
</script>

<style lang="scss">

body {
    margin: 0%;
}

nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 50%;
    padding: 35px;
    margin: auto;

    button {
        font-family: 'Dosis', 'sans-serif';
        border: none;
        font-size: 1.4em;
        padding: 10px;
        background: none;
        cursor: pointer;
    }

    button:hover {
        border-radius: 10px;
        background-color: rgb(245, 245, 245);
        box-shadow: 4px 4px 4px rgb(201, 201, 201);
    }
}

.Tasks_Container {
    width: 85%;
    margin: auto;
    margin-top: 1.5%;
    display: grid;
    grid-template-columns: 50% 50%;

    .Pending_Tasks_Container, .Finished_Tasks_Container {
        font-family: 'Poppins', 'sans-serif';
        display: flex;
        flex-direction: column;
        gap: 70px;
        h1 {
            text-align: center;
        }
    }
}

@media (max-width: 880px) {
    nav {
        width: 90%;
    }
}
</style>


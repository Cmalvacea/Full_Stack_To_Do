<template>
    <div class="Sign_In_Form">
        <form v-if="LoginStatus" @submit.prevent="LogAccount">
            <h1>Sign In</h1>
            <input type="text" name="username" id="username" placeholder="Username" v-model="LogUsername">
            <input type="text" name="password" id="password" placeholder="Password" v-model="LogPassword">
            <div>
                <button id="Sign_In_Button">Enter</button>
                <button id="Sign_Up_Button" @click="SwitchForm">Sign Up</button>
            </div>
        </form>
        <form v-else @submit.prevent="CreateAccount">
            <h1>Sign Up</h1>
            <input type="text" name="username" id="username" placeholder="Username" v-model="CreateUser">
            <input type="text" name="password" id="password" placeholder="Password" v-model="CreatePw">
            <div>
                <button id="Sign_In_Button" type="submit">Create</button>
                <button id="Sign_Up_Button" @click="SwitchForm">Sign In</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'


export default {
    props: {
        Confirm: Function
    },
    data() {
        return {
            LoginStatus: true,
            LogUsername: '',
            LogPassword: '',
            CreateUser: '',
            CreatePw: ''
        }
    },
    methods: {
        async LogAccount() {
            const Response = await axios.post('http://localhost:4000/Log_Route/Sign_In', {
                username: this.LogUsername,
                password: this.LogPassword
            }).catch(err => {
                alert('Username or password incorrect')
            })
            if(Response.status == 200) {
                $cookies.set('UserID', Response.data)
                this.Confirm()
            }
        },
        async CreateAccout() {
            alert('Hello world')
        },
        SwitchForm() {
            this.LoginStatus = !this.LoginStatus
        }
    }
}
</script>

<style lang="scss">
.Sign_In_Form {
    position: absolute;
    margin: auto;
    width: 100%;
    height: 100%;
    background-color: gray;
    border: 1px solid black;

    form {
        margin: auto;
        margin-top: 10%;
        background-color: white;
        border-radius: 8px;
        box-shadow: 4px 4px 4px rgb(100, 100, 100);
        width: 25%;
        height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        h1 {
            font-family: 'Poppins', 'sans-serif';
            text-align: center;
        }

        input {
            width: 80%;
            align-self: center;
            padding: 10px;
            border-radius: 6px;
            outline: none;
            border: 2px solid gainsboro;
        }

        #Sign_In_Button {
            background-color: green;
        }

        #Sign_Up_Button {
            background-color: orangered;
        }

        button {
            width: 70%;
            align-self: center;
            padding: 10px;
            font-size: 1.2em;
            color: white;
            border: none;
        }

        div {
            align-self: center;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            width: 90%;
        }
    }
}

@media (max-width: 880px) {
    .Sign_In_Form {
        form {
            width: 80%;
        }
    }
}
</style>
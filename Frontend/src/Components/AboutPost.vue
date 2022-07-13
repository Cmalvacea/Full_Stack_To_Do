<template>
    <div class="About_Lock_Screen">
        <div class="AboutPost">
        <div>
            <h2>What is this?</h2>
            <p>This is a full-stack todo app made with the MEVN stack, it is divided in two folders, one with the front-end and the other with the back-end</p>
        </div>
        <div>
            <h2>Can i use it?</h2>
            <p>Sure, it is open source, if it helps you, feel free to use it</p>
        </div>
        <button @click="CloseFunc">Accept</button>
    </div>
    </div>
</template>

<script>
export default {
    props: {
        CloseFunc: Function
    }
}
</script>

<style lang="scss">
.About_Lock_Screen {
    position: fixed;
    top: 0%;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.60);
    .AboutPost {
        border-radius: 10px;
        margin: auto;
        margin-top: 1%;
        width: 45%;
        background-color: white;
        text-align: center;
        padding: 30px;

        button {
            background-color: green;
            width: 40%;
            color: white;
            font-size: 1.4em;
            font-family: 'Dosis', 'sans-serif';
            border: none;
            border-radius: 5px;
        }

        div {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            padding: 20px;

            h2 {
                font-family: 'Dosis', 'sans-serif';
            }

            p {
                font-family: 'Poppins', 'sans-serif';
            }
        }
    }
}
</style>
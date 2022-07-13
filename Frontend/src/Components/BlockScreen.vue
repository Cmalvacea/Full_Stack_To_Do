<template>
    <div class="Block_Screen_Background">
        <div class="Block_Screen_Message">
            <h1>
                {{Message}}
            </h1>
            <button @click="ButtonFunc1">
                Ok
            </button>
            <button @click="ButtonFunc2">
                Cancel
            </button>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        Message: String,
        ButtonFunc1: Function,
        ButtonFunc2: Function
    }
}
</script>

<style lang="scss">
$Poppins: 'Poppins', 'sans-serif';
$Dosis: 'Dosis', 'sans-serif';

.Block_Screen_Background {
    position: fixed;
    top: 0%;
    left: 0%;
    background-color: rgba(0,0,0,0.75);
    height: 100%;
    width: 100%;
    border: 1px solid black;
}

.Block_Screen_Message {
    background-color: white;
    margin: auto;
    width: 40%;
    border-radius: 10px;
    text-align: center;
    font-family:'Courier New', Courier, monospace;
    padding: 20px;
    margin-top: 15%;

    h1 {
        font-family: $Poppins;
    }

    button {
        width: 40%;
        color: white;
        background-color: green;
        font-size: 1.4em;
        padding: 2.5px;
        border-radius: 8px;
        border: none;
        margin: 5px;
    }
}
</style>
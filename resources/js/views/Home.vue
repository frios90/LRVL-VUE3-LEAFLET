<template>
    <div>
        <h1>esta es la pagina : {{ name_page_computed }}</h1>
        <h2>{{ number }}</h2>
        <h2>{{ computedNumber }}</h2>
        <h2>{{ cuadrado }}</h2>

        <div>
            <button @click="increment()">aumentar</button>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from "vue";

    /**  Reactivas */
    const name_page = ref("Home page");
    const number = ref(0);

    /**  Funciones */
    const increment = () => number.value++;

    /**  Computed */
    const computedNumber = computed(() => number.value * 2)
    const cuadrado = computed(() => number.value ** 2)

    const name_page_computed = computed(() => {
        if ( number.value % 3 == 0 && number.value != 0 ) {
            return "multiplo de 3!!!"
        } else {
            return "Home page"
        }
    })
</script>

<style scoped>

</style>
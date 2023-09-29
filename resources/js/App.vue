<template>


    <v-toolbar color="blue-grey-darken-3">
        <v-spacer></v-spacer>

        <v-btn class="text-none" stacked>
            <RouterLink to="/home"><v-icon>mdi-home-outline</v-icon></RouterLink>
        </v-btn>

        <v-btn class="text-none" stacked>
            <RouterLink to="/map">map</RouterLink>
        </v-btn>

        <v-btn class="text-none" stacked>
            <RouterLink to="/test">test</RouterLink>

        </v-btn>

        <v-btn class="text-none" stacked>
            <RouterLink to="/vuetify">Vuetify</RouterLink>
        </v-btn>

        <v-btn class="text-none" stacked>
            <v-icon>mdi-menu</v-icon>
        </v-btn>

        <v-spacer></v-spacer>
    </v-toolbar>


    <RouterView />
</template>
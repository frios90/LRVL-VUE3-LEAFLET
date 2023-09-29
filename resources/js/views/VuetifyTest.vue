<template>
    <v-col cols="8">
        <v-carousel>
            <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover></v-carousel-item>

            <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg" cover></v-carousel-item>

            <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-carousel-item>
        </v-carousel>
    </v-col>
    <v-container class="bg-surface-variant">
        <v-parallax src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
            <div class="d-flex flex-column fill-height justify-center align-center text-white">
                <h1 class="text-h4 font-weight-thin mb-4">
                    Vuetify
                </h1>
                <h4 class="subheading">
                    Build your application today!
                </h4>
            </div>
        </v-parallax>
        <v-progress-linear indeterminate :height="2"></v-progress-linear>
        <v-progress-linear model-value="60" :height="2"></v-progress-linear>
        <v-row no-gutters>
            <v-col cols="2">
                <v-carousel>
                    <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover></v-carousel-item>

                    <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg" cover></v-carousel-item>

                    <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-carousel-item>
                </v-carousel>
            </v-col>
            <v-col>
                <h1>badges</h1>
                <v-badge :content="56">
                    <v-icon icon="$vuetify" size="x-large"></v-icon>
                </v-badge>
            </v-col>
            <v-col>
                <v-list border class="mx-auto" max-width="256">
                    <v-list-item link prepend-icon="mdi-inbox-arrow-down" title="Inbox">
                        <template v-slot:append>
                            <v-badge color="error" content="6" inline></v-badge>
                        </template>
                    </v-list-item>

                    <v-list-item link prepend-icon="mdi-send" title="Sent Mail"></v-list-item>

                    <v-list-item link prepend-icon="mdi-delete" title="Trash">
                        <template v-slot:append>
                            <v-badge color="info" content="12" inline></v-badge>
                        </template>
                    </v-list-item>

                    <v-list-item link prepend-icon="mdi-alert-circle" title="Spam"></v-list-item>
                </v-list>
            </v-col>
            <v-col>
                <v-toolbar color="blue-grey-darken-3">
                    <v-spacer></v-spacer>

                    <v-btn class="text-none" stacked>
                        <v-badge dot color="success">
                            <v-icon>mdi-home-outline</v-icon>
                        </v-badge>
                    </v-btn>

                    <v-btn class="text-none" stacked>
                        <v-icon>mdi-account-multiple-outline</v-icon>
                    </v-btn>

                    <v-btn class="text-none" stacked>
                        <v-badge content="9+" color="error">
                            <v-icon>mdi-store-outline</v-icon>
                        </v-badge>
                    </v-btn>

                    <v-btn class="text-none" stacked>
                        <v-badge content="2" color="error">
                            <v-icon>mdi-bell-outline</v-icon>
                        </v-badge>
                    </v-btn>

                    <v-btn class="text-none" stacked>
                        <v-icon>mdi-menu</v-icon>
                    </v-btn>

                    <v-spacer></v-spacer>
                </v-toolbar>
            </v-col>
            <v-col>

            </v-col>
        </v-row>
        <h1>Alertas</h1>
        <v-row>
            <v-col>
                <v-alert closable icon="$vuetify" title="Alert title" text="...">
                    Esto seri un lorem
                </v-alert>
            </v-col>
            <v-col>
                <v-alert closable type="success" title="Alert title"
                    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. agni doloremque veniam neque porro libero rerum unde voluptatem!"></v-alert>
            </v-col>
            <v-col>
                <v-alert closable type="warning" title="Alert title"
                    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. agni doloremque veniam neque porro libero rerum unde voluptatem!"></v-alert>
            </v-col>
            <v-col>
                <v-alert closable type="info" title="Alert title"
                    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. agni doloremque veniam neque porro libero rerum unde voluptatem!"></v-alert>
            </v-col>
            <v-col>
                <v-alert closable type="error" title="Alert title"
                    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. agni doloremque veniam neque porro libero rerum unde voluptatem!"></v-alert>
            </v-col>
        </v-row>

        <h1>banners</h1>
        <v-row>
            <v-banner lines="one" icon="mdi-wifi-strength-alert-outline" color="warning">
                <template v-slot:text>
                    No Internet connection
                </template>

                <template v-slot:actions>
                    <v-btn>
                        Dismiss
                    </v-btn>

                    <v-btn>
                        Retry
                    </v-btn>
                </template>
            </v-banner>
        </v-row>
        <v-row>
            <v-banner lines="one" icon="mdi-wifi-strength-alert-outline" color="success">
                <template v-slot:text>
                    No Internet connection
                </template>

                <template v-slot:actions>
                    <v-btn>
                        Dismiss
                    </v-btn>

                    <v-btn>
                        Retry
                    </v-btn>
                </template>
            </v-banner>
        </v-row>
        <v-row>
            <v-banner lines="two" color="deep-purple-accent-4">
                <template v-slot:prepend>
                    <v-avatar color="deep-purple-accent-4" icon="mdi-account-filter"></v-avatar>
                </template>

                <v-banner-text>
                    Banner with two lines of text. If the text is too long to fit on two lines then an ellipsis will be used
                    to hide the remaining content. So this next line will be hidden.
                </v-banner-text>

                <v-banner-actions>
                    <v-btn>Action</v-btn>

                    <v-btn>Action</v-btn>
                </v-banner-actions>
            </v-banner>
        </v-row>
        <v-row>
            <h1>img</h1>
            <v-img :width="396" aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
        </v-row>
    </v-container>
</template>

<script setup>
const name_page = "Pagina de prueba"
</script>

<style scoped></style>
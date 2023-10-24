<template>
    <v-tabs v-model="tab" background-color="transparent" hide-slider grow>
        <v-tab v-for="item in items" :key="item">
            {{ item }}
        </v-tab>
        <v-tabs-items
            style="border: 1px solid black; border-top: none;border-bottom:1px solid black; border-bottom-left-radius: 6px; border-bottom-right-radius: 6px ;position: relative;transform: translate(0%,-1.4%);"
            v-model="tab">
            <div class="backup-bar" style=" max-height: 69vh; margin: 0;overflow-x: hidden;">
                <slot></slot>
            </div>
        </v-tabs-items>
    </v-tabs>
</template> 
  
<script>
export default {
    name: "tabs",
    props: ['items'],
    data() {
        return {
            token: null,
            user: {},
            platform: {},
            platformList: [],
            tab: null,
        };
    },
};
</script>
  
<style >
.v-application {
    background: #eeeeee00;
}

.v-tab.v-tab--active {
    background: rgb(233, 233, 233);
    text-align: left;
    border: 1px solid #214353;
    border-bottom: 0px solid #214353;
    color: black;

}

.v-slide-group__prev {
    display: none !important;
}

.v-tab {
    background: #EAEEF0;
    color: #214353;
    font-size: 10px;
    letter-spacing: 1.1px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: 1px solid #214353;
    border-left: 1px solid #F9F9F9;
    border-right: 1px solid #F9F9F9;
    padding-right: 50px;
    height: 40px;

}

/* class="" */
.v-slide-group {
    height: 48px;
    background-color: red !important;
    transform: translate(0, 3%);
}

.v-window-item {
    background: #F9F9F9;
}

.v-input__slot::before {

    display: none;
}

.v-input__slot::after {
    display: none;
}




.backup-bar {
    overflow-y: auto;
    background-color: #F9F9F9;
}

.backup-bar::-webkit-scrollbar {
    width: 10px;
}

.backup-bar::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgb(206, 206, 206);
    border-radius: 4px;
}

.backup-bar::-webkit-scrollbar-thumb {
    background: rgba(133, 133, 133, 0.281);
    border: 1px solid rgba(0, 82, 48, 0.212);
    border-radius: 4px;
}

.backup-bar::-webkit-scrollbar-thumb:hover {
    background: rgba(29, 29, 29, 0.281);
}
</style>
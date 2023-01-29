<template>
  <nav class="new-nav">
    <h3 @click="selectFormat(1)" :class="{ selected: selected == 1 }">
      Format 1
    </h3>
    <h3 @click="selectFormat(2)" :class="{ selected: selected == 2 }">
      Format 2
    </h3>
  </nav>
  <New1 v-if="selected == 1" @addNew="addNew" />
  <New2 v-if="selected == 2" @addNew="addNew" />
  <p class="error" v-if="errorMsg">{{ errorMsg }}</p>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useMainStore } from "../stores/store";
import New1 from "../components/New1.vue";
import New2 from "../components/New2.vue";
const mainStore = useMainStore();
const router = useRouter();

let selected = ref(1);
let errorMsg = ref("");

const selectFormat = (format) => {
  console.log(format);
  selected.value = format;
};

const addNew = (newCup) => {
  console.log(newCup);
  axios
    .post(mainStore.host + "/api/admin/addCup", newCup, {
      headers: {
        Authorization: mainStore.token,
      },
    })
    .then((response) => {
      console.log(response.data);
      errorMsg.value = "";
      router.push({ name: "home" });
    })
    .catch((error) => {
      console.log(error);
      errorMsg.value = "Error submitting new cup";
    });
};
</script>

<style scoped>
.new-nav {
  text-align: center;
  margin: 40px auto;
}
.new-nav h3 {
  display: inline-block;
  text-decoration: none;
  margin: 0 50px;
  color: #999;
  font-size: 18px;
  cursor: pointer;
}
.new-nav h3.selected {
  border-bottom: 2px solid #00ce89;
  padding-bottom: 4px;
}

.error {
  color: red;
  text-align: center;
}
</style>

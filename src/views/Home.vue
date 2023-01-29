<template>
  <div>
    <h2>DASHBOARD</h2>
  </div>
  <!-- <div>
    <div @click="addResults(cup)" v-for="(cup, i) in mainStore.cupList">
      {{ cup.name }} -- active:{{ cup.active }} -- results:{{ cup.results }}
    </div>
  </div> -->
  <div>
    <div v-for="(cup, i) in mainStore.cupList">
      <SingleCup :cup="cup" @lock="lockCup" @addResults="addResults" />
    </div>
  </div>
  <button @click="addNew">Add new</button>
</template>

<script setup>
import { onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useMainStore } from "../stores/store";
import SingleCup from "../components/SingleCup.vue";
const mainStore = useMainStore();
const router = useRouter();

// send request to lock cup
const lockCup = (cup) => {
  axios
    .post(mainStore.host + "/api/admin/lock/" + cup.id, null, {
      headers: {
        Authorization: mainStore.token,
      },
    })
    .then((response) => {
      console.log(response.data.Status);
    })
    .catch((error) => {
      console.log(error);
      router.go(0);
    });
};

const addResults = (cup) => {
  console.log(cup);
  mainStore.cup = cup;
  switch (cup.format) {
    case 1:
      router.push({ name: "results1" });
      break;
    case 2:
      router.push({ name: "results2" });
      break;
  }
};

const addNew = () => {
  router.push({ name: "new" });
};

onMounted(() => {
  console.log("mounted");
  axios
    .get(mainStore.host + "/api/getAllCups", {
      headers: {
        Authorization: mainStore.token, //the token is a variable which holds the token
      },
    })
    .then((response) => {
      console.log(response.data);
      mainStore.cupList = [...response.data];
    })
    .catch((error) => console.log(error));
});
</script>

<style>
h2 {
  text-align: center;
}

button {
  display: block;
  margin: 20px auto 0;
  background: #00ce89;
  color: white;
  padding: 10px;
  border: 0;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}
</style>

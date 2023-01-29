<template>
  <div class="stage">
    <form @submit.prevent="create">
      <div class="container">
        <input class="title" v-model="title" placeholder="cup name" required />
      </div>
      <div class="container">
        <div class="group" v-for="(group, i) in groups">
          <h3>{{ group }}</h3>
          <input
            class="pill"
            v-for="(n, j) in 4"
            v-model="teams[i * 4 + j]"
            required
          />
        </div>
      </div>
      <div class="container">
        <input class="url" v-model="url" placeholder="logo url" />
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["addNew"]);

const groups = [
  "Group A",
  "Group B",
  "Group C",
  "Group D",
  "Group E",
  "Group F",
  "Group G",
  "Group H",
];

let teams = ref([]);
let title = ref("");
let url = ref("");

// emit addResults event to parent, send cup
const create = () => {
  console.log("clicked create");
  emit("addNew", {
    name: title.value,
    teams: teams.value,
    logoUrl: url.value,
    format: 1,
  });
};
</script>

<style scoped>
h4,
h3,
h2,
h1 {
  text-align: center;
}

h3 {
  margin: 8px 0px;
}

.stage h2 {
  margin: 10px auto;
}

.stage h4 {
  margin: 10px auto;
}

.stage {
  margin: 20px auto;
  background: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
}

.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.group {
  width: 330px;
  margin: 15px auto;
  background: #f2f2f2;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
}

input.url {
  padding: 10px;
  border: 0;
  margin: 10px auto;
  border-bottom: 1px solid #ddd;
  width: 50%;
  box-sizing: border-box;
  text-align: center;
}

input.title {
  padding: 10px;
  border: 0;
  margin: 10px auto;
  border-bottom: 1px solid #ddd;
  width: 50%;
  box-sizing: border-box;
  text-align: center;
  font-size: x-large;
}
input.pill {
  width: 100%;
  box-sizing: border-box;
}

.pill {
  margin: 5px auto;
  background: white;
  padding: 8px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
  font-size: larger;
  border: 1px solid #ccc;
}
</style>

<template>
  <div v-if="loaded">
    <h2>{{ mainStore.cup.name }}</h2>
  </div>

  <!-- round 1 -->
  <div class="stage" v-if="loaded">
    <h2>Round 1</h2>
    <div class="container">
      <div class="group" v-for="(n, i) in 64" :key="i">
        <h4>Match {{ i + 1 }}</h4>
        <div
          class="pill"
          @click="r1click(i, i * 2)"
          :class="{ selected: i * 2 == r1winners[i] }"
        >
          {{ allTeams[i * 2] }}
        </div>
        <h4>VS</h4>
        <div
          class="pill"
          @click="r1click(i, i * 2 + 1)"
          :class="{ selected: i * 2 + 1 == r1winners[i] }"
        >
          {{ allTeams[i * 2 + 1] }}
        </div>
      </div>
    </div>
  </div>

  <!-- round 2 -->
  <div class="stage" v-if="r1finished">
    <h2>Round 2</h2>
    <div class="container">
      <div class="group" v-for="(n, i) in 32" :key="i">
        <h4>Match {{ i + 1 }}</h4>
        <div
          class="pill"
          @click="r2click(i, r1winners[i * 2])"
          :class="{ selected: r1winners[i * 2] == r2winners[i] }"
        >
          {{ allTeams[r1winners[i * 2]] }}
        </div>
        <h4>VS</h4>
        <div
          class="pill"
          @click="r2click(i, r1winners[i * 2 + 1])"
          :class="{ selected: r1winners[i * 2 + 1] == r2winners[i] }"
        >
          {{ allTeams[r1winners[i * 2 + 1]] }}
        </div>
      </div>
    </div>
  </div>

  <!-- round 3 -->
  <div class="stage" v-if="r2finished">
    <h2>Round 3</h2>
    <div class="container">
      <div class="group" v-for="(n, i) in 16" :key="i">
        <h4>Match {{ i + 1 }}</h4>
        <div
          class="pill"
          @click="r3click(i, r2winners[i * 2])"
          :class="{ selected: r2winners[i * 2] == r3winners[i] }"
        >
          {{ allTeams[r2winners[i * 2]] }}
        </div>
        <h4>VS</h4>
        <div
          class="pill"
          @click="r3click(i, r2winners[i * 2 + 1])"
          :class="{ selected: r2winners[i * 2 + 1] == r3winners[i] }"
        >
          {{ allTeams[r2winners[i * 2 + 1]] }}
        </div>
      </div>
    </div>
  </div>

  <!-- round 4 -->
  <div class="stage" v-if="r3finished">
    <h2>Round 4</h2>
    <div class="container">
      <div class="group" v-for="(n, i) in 8" :key="i">
        <h4>Match {{ i + 1 }}</h4>
        <div
          class="pill"
          @click="r4click(i, r3winners[i * 2])"
          :class="{ selected: r3winners[i * 2] == r4winners[i] }"
        >
          {{ allTeams[r3winners[i * 2]] }}
        </div>
        <h4>VS</h4>
        <div
          class="pill"
          @click="r4click(i, r3winners[i * 2 + 1])"
          :class="{ selected: r3winners[i * 2 + 1] == r4winners[i] }"
        >
          {{ allTeams[r3winners[i * 2 + 1]] }}
        </div>
      </div>
    </div>
  </div>

  <!-- Quarterfinals -->
  <div class="stage" v-if="r4finished">
    <h2>Quarterfinals</h2>
    <div class="container">
      <div class="group" v-for="(n, i) in 4" :key="i">
        <h4>Quarterfinal {{ i + 1 }}</h4>
        <div
          class="pill"
          @click="r5click(i, r4winners[i * 2])"
          :class="{ selected: r4winners[i * 2] == r5winners[i] }"
        >
          {{ allTeams[r4winners[i * 2]] }}
        </div>
        <h4>VS</h4>
        <div
          class="pill"
          @click="r5click(i, r4winners[i * 2 + 1])"
          :class="{ selected: r4winners[i * 2 + 1] == r5winners[i] }"
        >
          {{ allTeams[r4winners[i * 2 + 1]] }}
        </div>
      </div>
    </div>
  </div>

  <!-- Semifinals -->
  <div class="stage" v-if="r5finished">
    <h2>Semifinals</h2>
    <div class="container">
      <div class="group" v-for="(n, i) in 2" :key="i">
        <h4>Semifinal {{ i + 1 }}</h4>
        <div
          class="pill"
          @click="r6click(i, r5winners[i * 2])"
          :class="{ selected: r5winners[i * 2] == r6winners[i] }"
        >
          {{ allTeams[r5winners[i * 2]] }}
        </div>
        <h4>VS</h4>
        <div
          class="pill"
          @click="r6click(i, r5winners[i * 2 + 1])"
          :class="{ selected: r5winners[i * 2 + 1] == r6winners[i] }"
        >
          {{ allTeams[r5winners[i * 2 + 1]] }}
        </div>
      </div>
    </div>
  </div>

  <!-- Final -->
  <div class="stage" v-if="r6finished">
    <h2>Final</h2>
    <div class="container">
      <div class="group" v-for="(n, i) in 1" :key="i">
        <h4>Final</h4>
        <div
          class="pill"
          @click="r7click(i, r6winners[i * 2])"
          :class="{ selected: r6winners[i * 2] == r7winners[i] }"
        >
          {{ allTeams[r6winners[i * 2]] }}
        </div>
        <h4>VS</h4>
        <div
          class="pill"
          @click="r7click(i, r6winners[i * 2 + 1])"
          :class="{ selected: r6winners[i * 2 + 1] == r7winners[i] }"
        >
          {{ allTeams[r6winners[i * 2 + 1]] }}
        </div>
      </div>
    </div>
  </div>

  <button v-if="r7finished" @click="submit">Submit</button>
  <p class="error" v-if="errorMsg">{{ errorMsg }}</p>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useMainStore } from "../stores/store";

const mainStore = useMainStore();
const router = useRouter();
var loaded = ref(false);
var r1finished = false;
var r2finished = false;
var r3finished = false;
var r4finished = false;
var r5finished = false;
var r6finished = false;
var r7finished = false;

let allTeams = [];

var r1winners = ref([
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
]);
var r2winners = ref([
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
]);
var r3winners = ref([
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
]);
var r4winners = ref([null, null, null, null, null, null, null, null]);
var r5winners = ref([null, null, null, null]);
var r6winners = ref([null, null]);
var r7winners = ref([null]);
let errorMsg = ref("");

// if new value is different from old, check if it influences next round and mark it as unfinished
const r1click = (i, id) => {
  if (
    r1winners.value[i] !== id &&
    r1winners.value[i] == r2winners.value[~~(i / 2)]
  ) {
    r2winners.value[~~(i / 2)] = null;
    r2finished =
      r3finished =
      r4finished =
      r5finished =
      r6finished =
      r7finished =
        false;
  }
  r1winners.value[i] = id;
  if (!r1winners.value.includes(null)) {
    r1finished = true;
  }
};
const r2click = (i, id) => {
  if (
    r2winners.value[i] !== id &&
    r2winners.value[i] == r3winners.value[~~(i / 2)]
  ) {
    r3winners.value[~~(i / 2)] = null;
    r3finished = r4finished = r5finished = r6finished = r7finished = false;
  }
  r2winners.value[i] = id;
  if (!r2winners.value.includes(null)) {
    r2finished = true;
  }
};
const r3click = (i, id) => {
  if (
    r3winners.value[i] !== id &&
    r3winners.value[i] == r4winners.value[~~(i / 2)]
  ) {
    r4winners.value[~~(i / 2)] = null;
    r4finished = r5finished = r6finished = r7finished = false;
  }
  r3winners.value[i] = id;
  if (!r3winners.value.includes(null)) {
    r3finished = true;
  }
};
const r4click = (i, id) => {
  if (
    r4winners.value[i] !== id &&
    r4winners.value[i] == r5winners.value[~~(i / 2)]
  ) {
    r5winners.value[~~(i / 2)] = null;
    r5finished = r6finished = r7finished = false;
  }
  r4winners.value[i] = id;
  if (!r4winners.value.includes(null)) {
    r4finished = true;
  }
};
const r5click = (i, id) => {
  if (
    r5winners.value[i] !== id &&
    r5winners.value[i] == r6winners.value[~~(i / 2)]
  ) {
    r6winners.value[~~(i / 2)] = null;
    r6finished = r7finished = false;
  }
  r5winners.value[i] = id;
  if (!r5winners.value.includes(null)) {
    r5finished = true;
  }
};
const r6click = (i, id) => {
  if (
    r6winners.value[i] !== id &&
    r6winners.value[i] == r7winners.value[~~(i / 2)]
  ) {
    r7winners.value[~~(i / 2)] = null;
    r7finished = false;
  }
  r6winners.value[i] = id;
  if (!r6winners.value.includes(null)) {
    r6finished = true;
  }
};
const r7click = (i, id) => {
  r7winners.value[i] = id;
  if (!r7winners.value.includes(null)) {
    r7finished = true;
  }
};

const submit = () => {
  var results = [];
  results.push(...r1winners.value);
  results.push(...r2winners.value);
  results.push(...r3winners.value);
  results.push(...r4winners.value);
  results.push(...r5winners.value);
  results.push(...r6winners.value);
  results.push(...r7winners.value);
  console.log(results);
  var data = {};
  data["CupID"] = mainStore.cup.id;
  data["Results"] = results;

  axios
    .post(mainStore.host + "/api/admin/submitResult/2", data, {
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
      errorMsg.value = "Error submitting results";
    });
};

onMounted(() => {
  axios
    .get(mainStore.host + "/api/getCup/" + mainStore.cup.id, {
      headers: {
        Authorization: mainStore.token,
      },
    })
    .then((response) => {
      console.log(response.data.teams);
      allTeams = [...response.data.teams];

      loaded.value = true;
    })
    .catch((error) => console.log(error));
});
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
.pill {
  margin: 5px auto;
  background: white;
  padding: 8px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
  font-size: larger;
  border: 1px solid #ccc;
  cursor: pointer;
  text-align: center;
}
.selected {
  background-color: greenyellow;
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
.error {
  color: red;
  text-align: center;
}
</style>

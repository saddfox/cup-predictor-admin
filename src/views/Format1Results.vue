<template>
  <div v-if="loaded">
    <h2>{{ mainStore.cup.name }}</h2>
  </div>
  <!-- group stage -->
  <div class="stage" v-if="loaded">
    <h2>Group Stage</h2>
    <div class="container">
      <div class="group" v-for="[key, group] in groupsMap">
        <h3>{{ key }}</h3>
        <Sortable
          :list="group"
          :options="sortableOpts"
          item-key="id"
          tag="div"
          @end="onEnd($event, group, key)"
        >
          <template #item="{ element, index }">
            <div
              class="draggable"
              :class="{ selected: index < 2 }"
              :key="element.id"
            >
              <b>{{ index + 1 }}</b
              >. {{ element.name }}
            </div>
          </template>
        </Sortable>
      </div>
    </div>
  </div>

  <!-- round of 16 -->

  <div class="stage" v-if="loaded">
    <h2>Round of 16</h2>
    <div class="container">
      <div class="group" v-for="(pair, i) in r16order" :key="i">
        <h4>Match {{ i + 1 }}</h4>

        <div
          class="pill"
          @click="r16click(i, groupsMap.get(pair[0])[0].name)"
          :class="{ selected: groupsMap.get(pair[0])[0].name == r16winners[i] }"
        >
          {{ groupsMap.get(pair[0])[0].name }}
        </div>
        <h4>VS</h4>
        <div
          class="pill"
          @click="r16click(i, groupsMap.get(pair[1])[1].name)"
          :class="{ selected: groupsMap.get(pair[1])[1].name == r16winners[i] }"
        >
          {{ groupsMap.get(pair[1])[1].name }}
        </div>
      </div>
    </div>
  </div>

  <!-- quarterfinals -->

  <div class="stage" v-if="r16finished">
    <h2>Quarterfinals</h2>
    <div class="container">
      <div class="group" v-for="(n, i) in 4">
        <h4>Quarterfinal {{ i + 1 }}</h4>
        <div
          class="pill"
          @click="r8click(i, r16winners[i * 2])"
          :class="{ selected: r16winners[i * 2] == r8winners[i] }"
        >
          {{ r16winners[i * 2] }}
        </div>
        <h4>VS</h4>
        <div
          class="pill"
          @click="r8click(i, r16winners[i * 2 + 1])"
          :class="{ selected: r16winners[i * 2 + 1] == r8winners[i] }"
        >
          {{ r16winners[i * 2 + 1] }}
        </div>
      </div>
    </div>
  </div>

  <!-- semifinals -->

  <div class="stage" v-if="r8finished">
    <h2>Semifinals</h2>
    <div class="container">
      <div class="group" v-for="(n, i) in 2">
        <h4>Semifinal {{ i + 1 }}</h4>
        <div
          class="pill"
          @click="r4click(i, r8winners[i * 2], r8winners[i * 2 + 1])"
          :class="{ selected: r8winners[i * 2] == r4winners[i] }"
        >
          {{ r8winners[i * 2] }}
        </div>
        <h4>VS</h4>
        <div
          class="pill"
          @click="r4click(i, r8winners[i * 2 + 1], r8winners[i * 2])"
          :class="{ selected: r8winners[i * 2 + 1] == r4winners[i] }"
        >
          {{ r8winners[i * 2 + 1] }}
        </div>
      </div>
    </div>
  </div>

  <!-- final -->

  <div class="stage" v-if="r4finished">
    <h2>Final</h2>
    <div class="container">
      <div class="group">
        <h4>3rd Place</h4>
        <div
          class="pill"
          @click="r2click(0, r4losers[0])"
          :class="{ selected: r4losers[0] == r2winners[0] }"
        >
          {{ r4losers[0] }}
        </div>
        <h4>VS</h4>
        <div
          class="pill"
          @click="r2click(0, r4losers[1])"
          :class="{ selected: r4losers[1] == r2winners[0] }"
        >
          {{ r4losers[1] }}
        </div>
      </div>
      <div class="group">
        <h4>Final</h4>
        <div
          class="pill"
          @click="r2click(1, r4winners[0])"
          :class="{ selected: r4winners[0] == r2winners[1] }"
        >
          {{ r4winners[0] }}
        </div>
        <h4>VS</h4>
        <div
          class="pill"
          @click="r2click(1, r4winners[1])"
          :class="{ selected: r4winners[1] == r2winners[1] }"
        >
          {{ r4winners[1] }}
        </div>
      </div>
    </div>
  </div>
  <button v-if="r2finished" @click="submit">Submit</button>
  <p class="error" v-if="errorMsg">{{ errorMsg }}</p>
</template>

<script setup>
import { Sortable } from "sortablejs-vue3";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { useMainStore } from "../stores/store";

const sortableOpts = {
  draggable: ".draggable",
  animation: 150,
  ghostClass: "ghost",
  dragClass: "drag",
  forceFallback: true,
};

const mainStore = useMainStore();
const router = useRouter();
var loaded = ref(false);
var r16finished = false;
var r8finished = false;
var r4finished = false;
var r2finished = false;

let allTeams = [];

const groups = ["A", "B", "C", "D", "E", "F", "G", "H"];
const r16order = [
  ["Group A", "Group B"],
  ["Group C", "Group D"],
  ["Group E", "Group F"],
  ["Group G", "Group H"],
  ["Group B", "Group A"],
  ["Group D", "Group C"],
  ["Group F", "Group E"],
  ["Group H", "Group G"],
];

const r16orderFlat = [
  "Group A",
  "Group B",
  "Group C",
  "Group D",
  "Group E",
  "Group F",
  "Group G",
  "Group H",
  "Group B",
  "Group A",
  "Group D",
  "Group C",
  "Group F",
  "Group E",
  "Group H",
  "Group G",
];

var groupsMap = ref(new Map());
var r16winners = ref([null, null, null, null, null, null, null, null]);
var r8winners = ref([null, null, null, null]);
var r4winners = ref([null, null]);
var r4losers = ref([null, null]);
var r2winners = ref([null, null]);
let errorMsg = ref("");

// reorder group array after dropping it
// if reordering affects r16 winners delete it and set r16 as unfinished
const onEnd = (e, array, group) => {
  //console.log(e.oldIndex, e.newIndex);
  if (e.oldIndex == 0 || e.newIndex == 0) {
    const i1 = ~~(r16orderFlat.indexOf(group) / 2);
    const i2 = ~~(r16orderFlat.indexOf(group, 8) / 2);
    if (
      array[0].name == r16winners.value[i1] ||
      array[1].name == r16winners.value[i1]
    ) {
      r16winners.value[i1] = null;
      r16finished = r8finished = r4finished = r2finished = false;
    } else if (
      array[0].name == r16winners.value[i2] ||
      array[1].name == r16winners.value[i2]
    ) {
      r16winners.value[i2] = null;
      r16finished = r8finished = r4finished = r2finished = false;
    }
  } else if (e.oldIndex == 1 || e.newIndex == 1) {
    const i1 = ~~(r16orderFlat.indexOf(group) / 2);
    const i2 = ~~(r16orderFlat.indexOf(group, 8) / 2);
    if (array[1].name == r16winners.value[i1]) {
      r16winners.value[i1] = null;
      r16finished = r8finished = r4finished = r2finished = false;
    } else if (array[1].name == r16winners.value[i2]) {
      r16winners.value[i2] = null;
      r16finished = r8finished = r4finished = r2finished = false;
    }
  }
  const item = array.splice(e.oldIndex, 1)[0];
  array.splice(e.newIndex, 0, item);
};

// if new value is different from old, check if it influences next round and mark it as unfinished
const r16click = (i, name) => {
  if (
    r16winners.value[i] !== name &&
    r16winners.value[i] == r8winners.value[~~(i / 2)]
  ) {
    r8winners.value[~~(i / 2)] = null;
    r8finished = r4finished = r2finished = false;
  }
  r16winners.value[i] = name;
  if (!r16winners.value.includes(null)) {
    r16finished = true;
  }
};
const r8click = (i, name) => {
  if (
    r8winners.value[i] !== name &&
    r8winners.value[i] == r4winners.value[~~(i / 2)]
  ) {
    r4winners.value[~~(i / 2)] = null;
    r4finished = r2finished = false;
  }
  r8winners.value[i] = name;
  if (!r8winners.value.includes(null)) {
    r8finished = true;
  }
};
const r4click = (i, winner, loser) => {
  if (
    r4winners.value[i] !== winner &&
    r4winners.value[i] == r2winners.value[1]
  ) {
    r2winners.value[1] = null;
    r2finished = false;
  } else if (
    r4winners.value[i] !== winner &&
    r4losers.value[i] == r2winners.value[0]
  ) {
    r2winners.value[0] = null;
    r2finished = false;
  }

  r4winners.value[i] = winner;
  r4losers.value[i] = loser;
  if (!r4winners.value.includes(null)) {
    r4finished = true;
  }
};
const r2click = (i, name) => {
  r2winners.value[i] = name;
  if (!r2winners.value.includes(null)) {
    r2finished = true;
  }
};

// create results object and submit results to api
const submit = () => {
  var results = {};
  results["cupID"] = mainStore.cup.id;
  for (let group of groups) {
    let v = eval('groupsMap.value.get("Group ' + group + '")');
    for (let i = 0; i < 4; i++) {
      results["Team" + group + (i + 1)] = v[i].id;
    }
  }
  for (let i = 0; i < 8; i++) {
    results["Round16_" + (i + 1)] = allTeams.indexOf(r16winners.value[i]) + 1;
  }
  for (let i = 0; i < 4; i++) {
    results["Quarter" + (i + 1)] = allTeams.indexOf(r8winners.value[i]) + 1;
  }
  for (let i = 0; i < 2; i++) {
    results["Semi" + (i + 1)] = allTeams.indexOf(r4winners.value[i]) + 1;
  }
  results["Third"] = allTeams.indexOf(r2winners.value[0]) + 1;
  results["Final"] = allTeams.indexOf(r2winners.value[1]) + 1;
  console.log(results);

  axios
    .post(mainStore.host + "/api/admin/submitResult/1", results, {
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
  console.log("mounted");
  axios
    .get(mainStore.host + "/api/getCup/" + mainStore.cup.id, {
      headers: {
        Authorization: mainStore.token,
      },
    })
    .then((response) => {
      allTeams = [...response.data.teams];

      let index = 0;
      for (let group of groups) {
        let teams = [];
        for (var i = 0; i < 4; i++) {
          teams.push({ name: allTeams[index], id: index + 1 });
          index++;
        }

        eval('groupsMap.value.set("Group ' + group + '",teams)');
      }

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

.draggable {
  margin: 5px auto;
  background: white;
  padding: 8px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
  font-size: larger;
  border: 1px solid #ccc;
  cursor: grab;
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

.ghost {
  opacity: 0.5;
  background: #fff;
  border: 1px dashed #ccc;
}
.drag {
  background: #f5f5f5;
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

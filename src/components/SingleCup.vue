<template>
  <div class="cup" :class="{ active: cup.active, results: cup.results }">
    <div class="actions">
      <h3 class="cupName" @click="addResults">{{ cup.name }}</h3>
      <div class="icons">
        <span @click="addResults" class="material-icons edit">edit</span>
        <span @click="lock" class="material-icons lock">lock</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cup: {},
});
const emit = defineEmits(["lock", "addResults"]);

// emit addResults event to parent, send cup
const addResults = () => {
  if (props.cup.results) {
    console.log("cup already has results");
  } else {
    props.cup.results = true;
    emit("addResults", props.cup);
  }
};

// emit lock event to parent, send cup
const lock = () => {
  if (!props.cup.active) {
    console.log("cup is locked already");
  } else {
    props.cup.active = false;
    emit("lock", props.cup);
  }
};
</script>

<style scoped>
.cup {
  margin: 20px auto;
  background: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
  /* border-left: 4px solid #e90074; */
}
h3 {
  cursor: pointer;
}
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.material-icons {
  font-size: 24px;
  margin-left: 10px;
  color: #bbb;
  cursor: pointer;
}
.material-icons:hover {
  color: #777;
}
.cup.active:not(.results) {
  border-left: 4px solid #00ce89;
}
.cup:not(.active):not(.results) {
  border-left: 4px solid #ce9e00;
}
.cup.results:not(.active) {
  border-left: 4px solid #0052ce;
}

.cup:not(.active) .lock {
  color: #ce9e00;
  cursor: default;
}
.cup.results .edit {
  color: #0052ce;
  cursor: default;
}
.cup.results .cupName {
  cursor: default;
}
</style>

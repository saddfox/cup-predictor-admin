<template>
  <div>
    <h2>LOGIN PAGE</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="username" required />
      <input
        v-model="password"
        placeholder="password"
        type="password"
        required
      />
      <button type="submit">Login</button>
    </form>
    <p class="error" v-if="errorMsg">{{ errorMsg }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { useMainStore } from "../stores/store";

const mainStore = useMainStore();
const router = useRouter();

let username = ref("");
let password = ref("");
let errorMsg = ref("");

// make post request to backend. if successful store auth token and expiry & redirect to main page
const login = () => {
  axios
    .post(mainStore.host + "/api/admin/login", {
      email: username.value,
      password: password.value,
    })
    .then((response) => {
      errorMsg.value = "";
      console.log(response.data.Auth_token, response.data.Expiry);
      mainStore.token = response.data.Auth_token;
      mainStore.expiry = response.data.Expiry;
      router.push({ name: "home" });
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response.status == 401) {
        errorMsg.value = "Wrong username or password";
        console.log(401);
      } else {
        errorMsg.value = "Unexpected error";
        console.log("else");
      }
      console.log(errorMsg.value);
    });
};

onMounted(() => {
  // wipe store
  mainStore.cup = null;
  console.log("mounted");
});
</script>

<style scoped>
form {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 300px;
  margin: auto;
}
input {
  padding: 10px;
  border: 0;
  margin: 10px;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}
form button {
  display: block;
  margin: 20px auto 0;
  background: #00ce89;
  color: white;
  padding: 10px;
  border: 0;
  border-radius: 6px;
  font-size: 16px;
}
h2 {
  text-align: center;
}
.error {
  color: red;
  text-align: center;
}
</style>

<template>
  <div class="home">
    <h1>Home Page</h1>
    <router-view></router-view>

    <!-- 测试自定义指令 -->
    <button v-permission="['admin', 'editor']">editor button</button>
    <button v-permission="['admin']">admin button</button>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
	name: "home",
	components: {
		HelloWorld
	}
};
</script>

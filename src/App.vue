<template>
  <div id="app">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  @select="handleSelect"
              background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="/button">button</el-menu-item>
      <el-menu-item index="button">button</el-menu-item>
    </el-menu>
    <div>
      <router-link to="/">home</router-link>
      <router-link to="/about">about</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
	name: 'app',
	components: {
		HelloWorld
	},
	data() {
		return {
			activeIndex: '1'
		};
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(this.$router)
			console.log(key)
			this.$router.push('/button')
		}
	}
}
</script>

<style>
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
body {
	margin: 0;
}
</style>

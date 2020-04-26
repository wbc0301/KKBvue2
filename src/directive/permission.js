import store from "@/store";

const permission = {
  // 指令已经添加到元素上，el-指令相关dom元素；binding-对象
  // binding: {name:'if', expression:'foo==1', value: true}
  // v-permission="['admin','editor']"

  inserted(el, binding) {
    const { value: bindRoles } = binding; // 结构value并取别名roles
    const currUserRoles = store.getters && store.getters.roles; // 用户角色
    
    if (bindRoles && bindRoles instanceof Array && bindRoles.length > 0) {      
      const hasPermission = currUserRoles.some(currUserRole => { // 判断
        return bindRoles.includes(currUserRole);
      }); 
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el); // 删除dom
      }
    } else {
      throw new Error(`需要指定按钮要求角色数组，如v-permission="['admin','editor']"`);
    }
  }
};

export default permission;
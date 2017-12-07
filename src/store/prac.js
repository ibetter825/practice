export default {
    //ball全局共用组件，状态通过vuex管理
    state: {
        last_no: -1
    },
    mutations: {
        prac_last_no(state, no) {
            state.last_no = no;
        }
    },
    actions: {
        prac_last_no(context, no) {
            context.commit('prac_last_no', no);
        }
    }
}
const user = {
  namespaced: true,
    state: () => ({ 
        mount:0,
        data:null
     }),
    mutations: { 
      setData(data,msg) {
        data.data = msg
      }
     },
    actions: {  },
    getters: {  }
  }

export default user
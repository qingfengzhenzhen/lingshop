const home = {
  namespaced: true,
  state: () => ({ 
        mount:0,
        data:null
     }),
    mutations: { 
      setData(data,msg) {
        console.log(data,msg);
      }
     },
    actions: {  },
    getters: {  }
  }

export default home
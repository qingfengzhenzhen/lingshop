const order = {
    namespaced: true,
      state: () => ({ 
          data:null,
          address:null,
          pay:null
       }),
      mutations: { 
        setData(data,msg) {
          data.data = msg
        },
        setAddress(data,msg) {
            data.address = msg
        },
        setPay(data,msg) {
            data.pay = msg
        }
       },
      actions: {  },
      getters: {  }
    }
  
  export default order
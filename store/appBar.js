export const state = () => {
  return {
    appBar: {
      drawer: null
    }
  }
}

export const mutations = {
  SET_APP_BAR(state, val) {
    state.appBar = val || {
      drawer: null
    }
  }
}

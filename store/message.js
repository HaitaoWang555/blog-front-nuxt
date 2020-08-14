export const state = () => {
  return {
    snackbarObj: {
      snackbar: false,
      color: 'success ',
      tips: ''
    }
  }
}

export const mutations = {
  SET_SNACKBAR(state, snackbar) {
    state.snackbarObj = snackbar || {
      snackbar: false,
      color: '',
      tips: ''
    }
  }
}

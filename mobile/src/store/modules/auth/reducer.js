import produce from 'immer';

const INITIAL_STATE = {
  id: null,
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.id = action.payload.token.id;
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.id = action.payload.id;
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.id = null;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.id = null;
        draft.token = null;
        draft.signed = false;
        break;
      }
      default:
    }
  });
}

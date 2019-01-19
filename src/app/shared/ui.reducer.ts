import { UnionLoadignAction, SHOW_LOADING, HIDE_LOADING } from './ui.actions';

export interface State {
    isLoading: boolean;
}

export const initState: State = {
    isLoading: false
};

export function uiReducer(state = initState, action: UnionLoadignAction) : State {

    switch (action.type) {
        case SHOW_LOADING: {
            return { isLoading:true };
        }
        case HIDE_LOADING: {
            return { isLoading:false };
        } 
        default: {
            return state;
        }
            
    }

}
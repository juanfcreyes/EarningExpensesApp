import { User } from '../models/user.model';
import { UnionAuthActions, SET_USER, UNSET_USER } from './auth.actions';

export interface AuthState {
    user: User;
}

export const initState: AuthState = {
    user: null
}

export function authReducer(state = initState, action: UnionAuthActions): AuthState {
    switch (action.type) {
        case SET_USER: {
            return { user : {... action.user} }
        }
        case UNSET_USER: {
            return { user :null }
        }
        default: {
            return state
        }
    }
}
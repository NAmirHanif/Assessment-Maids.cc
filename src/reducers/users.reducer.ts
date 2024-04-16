import { AppState, initialState } from '../models/app.state';


export function userReducer(state: AppState = initialState, action: any): AppState {
    switch (action.type) {
        case 'SET_USERS':
            return { ...state, users: action.payload, total_pages: action.total_pages, currentPage: action.currentPage };
        case 'SET_SELECTED_USER':
            return { ...state, selectedUser: action.payload };
        default:
            return state;
    }
}

export interface AppState {
    users: any[];
    total_pages: number;
    currentPage: number;
    selectedUser: any;
  }
  
  export const initialState: AppState = {
    users: [],
    total_pages: 0,
    currentPage: 1,
    selectedUser: null
  };
  
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EditPostPara {
    id: string | null;
    title: string;
    content: string;
    selectedCatId: string;
    imgSrc: string;
}

export interface editState {
    targetPost: EditPostPara | null;
}

const initialState: editState = {
    targetPost: null,
};

export const editPostSlice = createSlice({
    name: "editPost",
    initialState,
    reducers: {
        setEditPost: (state, action: PayloadAction<EditPostPara>) => {
            state.targetPost = action.payload;
        },

        clearEditPost: (state) => {
            state.targetPost = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setEditPost, clearEditPost } = editPostSlice.actions;

export default editPostSlice.reducer;

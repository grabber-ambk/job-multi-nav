import {
  BlogContentType,
  BlogSidebarType,
  BlogType,
} from '@crema/models/extrapages/Blog';
import { createReducer } from '@reduxjs/toolkit';
import {
  AddBlogAction,
  BlogDetailAction,
  BlogListAction,
  EditBlogAction,
} from './ActionTypes/Blog';

const initialState: {
  blogLists: BlogType;
  selectedBlog: {
    blogDetail: BlogContentType;
    blogSidebar: BlogSidebarType;
  } | null;
} = {
  blogLists: {} as BlogType,
  selectedBlog: null,
};

const blogReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(BlogListAction, (state, action) => {
      state.blogLists = action.payload;
    })
    .addCase(BlogDetailAction, (state, action) => {
      state.selectedBlog = action.payload;
    })
    .addCase(AddBlogAction, (state, action) => {
      state.blogLists = action.payload;
    })
    .addCase(EditBlogAction, (state, action) => {
      state.blogLists = action.payload;
    });
});

export default blogReducer;

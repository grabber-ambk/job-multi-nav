import {
  GET_BLOGS_LIST,
  GET_BLOGS_DETAIL,
  ADD_NEW_BLOG,
  EDIT_BLOG,
} from '@crema/actions/Blogs.action';
import { createAction } from '@reduxjs/toolkit';
import {
  BlogType,
  BlogContentType,
  BlogSidebarType,
} from '@crema/models/extrapages/Blog';

export const BlogListAction = createAction<BlogType>(GET_BLOGS_LIST);

export const BlogDetailAction = createAction<{
  blogDetail: BlogContentType;
  blogSidebar: BlogSidebarType;
}>(GET_BLOGS_DETAIL);

export const AddBlogAction = createAction<BlogType>(ADD_NEW_BLOG);

export const EditBlogAction = createAction<BlogType>(EDIT_BLOG);

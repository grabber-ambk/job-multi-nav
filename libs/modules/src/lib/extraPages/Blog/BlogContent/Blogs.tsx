import React from 'react';
import BlogCard from './BlogCard';
import PropTypes from 'prop-types';
import AppGrid from '@crema/components/AppGrid';
import type { BlogContentType } from '@crema/models/extrapages/Blog';
import { useRouter } from 'next/router';

type Props = {
  blogs: BlogContentType[];
};

const Blogs = ({ blogs }: Props) => {
  const router = useRouter();
  const onViewBlogDetail = (data: BlogContentType, isEdit?: boolean) => {
    if (isEdit) router.push(`/extra-pages/blog/edit-blog/${data.id}`);
    else router.push(`/extra-pages/blog/blog-details/${data.id}`);
  };

  return (
    <AppGrid
      responsive={{
        xs: 1,
        sm: 2,
        md: 2,
        lg: 2,
        xl: 3,
      }}
      data={blogs}
      renderRow={(blog: BlogContentType, index) => (
        <BlogCard key={index} blog={blog} onViewBlogDetail={onViewBlogDetail} />
      )}
    />
  );
};

export default Blogs;

Blogs.propTypes = {
  blogs: PropTypes.array,
};

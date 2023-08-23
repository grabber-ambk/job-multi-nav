import AppLoader from '@crema/components/AppLoader';
import AppAnimate from '@crema/components/AppAnimate';
import { BlogDetail } from '@crema/modules/extraPages/Blog';
import { useEffect } from 'react';
import { isEmptyObject } from '@crema/helpers';
import { useAppSelector, useAppDispatch } from '../../../toolkit/hooks';
import { getBlogDetail } from '../../../toolkit/actions';
import { useRouter } from 'next/router';

const BlogDetailPage = () => {
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  const selectedBlog = useAppSelector(({ blogs }) => blogs.selectedBlog);
  const { loading } = useAppSelector(({ common }) => common);

  useEffect(() => {
    dispatch(getBlogDetail(query?.all?.[0]));
  }, [dispatch, query.all]);

  return loading ? (
    <AppLoader />
  ) : !isEmptyObject(selectedBlog?.blogDetail) ? (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <BlogDetail
        blogSidebar={selectedBlog?.blogSidebar}
        blogDetail={selectedBlog?.blogDetail}
      />
    </AppAnimate>
  ) : null;
};
export default BlogDetailPage;

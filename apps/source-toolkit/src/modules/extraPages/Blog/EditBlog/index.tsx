import AppLoader from '@crema/components/AppLoader';
import AppAnimate from '@crema/components/AppAnimate';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isEmptyObject } from '@crema/helpers';
import CreateBlog from '../CreateBlog';
import { useAppSelector, useAppDispatch } from '../../../../toolkit/hooks';
import { getBlogDetail } from '../../../../toolkit/actions';

const BlogEditPage = () => {
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
      <CreateBlog selectedBlog={selectedBlog?.blogDetail} />
    </AppAnimate>
  ) : null;
};
export default BlogEditPage;

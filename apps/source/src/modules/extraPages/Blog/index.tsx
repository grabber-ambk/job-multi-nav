import { useGetDataApi } from '@crema/hooks/APIHooks';
import AppLoader from '@crema/components/AppLoader';
import { BlogContent } from '@crema/modules/extraPages/Blog';
import { BlogType } from '@crema/models/extrapages/Blog';

const Blogs = () => {
  const [{ apiData, loading }] = useGetDataApi<BlogType>('/pages/blogs');

  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <BlogContent
          blogSidebar={apiData.blogSidebar}
          blogContent={apiData.blogContent}
        />
      )}
    </>
  );
};
export default Blogs;

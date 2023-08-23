import React, { useEffect } from 'react';
import AppList from '@crema/components/AppList';
import PostItem from './PostItem';
import { useAppSelector, useAppDispatch } from '../../../../toolkit/hooks';
import { onGetPostsList } from '../../../../toolkit/actions';

const PostsList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onGetPostsList());
  }, [dispatch]);

  const postList = useAppSelector(({ wall }) => wall.postList);
  const wallData = useAppSelector(({ wall }) => wall.wallData);

  console.log('postList', postList);
  return (
    <AppList
      data={postList}
      renderRow={(post, index) => (
        <PostItem key={index} post={post} wallData={wallData} />
      )}
    />
  );
};

export default PostsList;

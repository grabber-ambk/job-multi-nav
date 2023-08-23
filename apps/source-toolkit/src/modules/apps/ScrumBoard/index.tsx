import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../toolkit/hooks';
import { onGetMemberList, onGetScrumLabelList } from '../../../toolkit/actions';
import BoardDetail from './BoardDetail';
import BoardList from './BoardList';
import { useRouter } from 'next/router';

const ScrumBoard = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    dispatch(onGetScrumLabelList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetMemberList());
  }, [dispatch]);

  const onGetMainComponent = () => {
    if (id) {
      return <BoardDetail />;
    } else {
      return <BoardList />;
    }
  };

  return <>{onGetMainComponent()}</>;
};

export default ScrumBoard;

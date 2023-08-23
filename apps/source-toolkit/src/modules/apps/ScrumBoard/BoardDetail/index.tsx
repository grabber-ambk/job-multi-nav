import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import AppsContainer from '@crema/components/AppsContainer';
import BoardDetailView from './BoardDetailView';
import { useAppSelector, useAppDispatch } from '../../../../toolkit/hooks';
import {
  onGetBoardDetail,
  onNullifyBoardDetail,
} from '../../../../toolkit/actions';
import { useRouter } from 'next/router';

const BoardDetail = () => {
  const router = useRouter();
  const { query } = router;
  const { id } = query;

  const boardDetail = useAppSelector(
    ({ scrumboardApp }) => scrumboardApp.boardDetail
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onGetBoardDetail(id as string));
    return () => {
      dispatch(onNullifyBoardDetail());
    };
  }, [dispatch, id]);

  const onGoToBoardList = () => {
    router.back();
  };
  if (!boardDetail) {
    return null;
  }

  return (
    <AppsContainer
      fullView
      title={
        <>
          <Box
            component="span"
            sx={{
              cursor: 'pointer',
              mr: 2,
              color: 'primary.main',
            }}
            onClick={onGoToBoardList}
          >
            Scrum Board
          </Box>
          &gt; {boardDetail.name}
        </>
      }
    >
      <BoardDetailView boardDetail={boardDetail} />
    </AppsContainer>
  );
};

export default BoardDetail;

import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import AppsContent from '@crema/components/AppsContent';
import 'react-trello-ts';

import Board from 'react-trello';
import { Box, useTheme } from '@mui/material';
import {
  AddCardButton,
  AddNewList,
  CardDetail,
  ListHeader,
  NewListButton,
} from '@crema/modules/apps/ScrumBoard';
import AddCard from './List/AddCard';
import { useAppDispatch } from '../../../../toolkit/hooks';
import {
  onAddNewList,
  onDeleteSelectedList,
  onEditBoardList,
  onUpdateCardCategory,
} from '../../../../toolkit/actions';
import {
  BoardType,
  CardListType,
  CardType,
} from '@crema/models/apps/ScrumbBoard';

type Props = {
  children: ReactNode;
};

const BoardWrapper = ({ children }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: 1,
        '& .smooth-dnd-container.horizontal': {
          height: 1,
        },
      }}
    >
      {children}
    </Box>
  );
};

type BoardDetailViewProps = {
  boardDetail: BoardType;
};

const BoardDetailView = (props: BoardDetailViewProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [list, setList] = useState<CardListType | undefined>(undefined);

  const [isAddCardOpen, setAddCardOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const { boardDetail } = props;

  const getBoardData = useCallback(() => {
    return {
      ...boardDetail,
      lanes: boardDetail.list,
    };
  }, [boardDetail]);

  const [boardData, setBoardData] = useState(getBoardData());

  useEffect(() => {
    setBoardData(getBoardData());
  }, [boardDetail, getBoardData]);

  const shouldReceiveNewData = (nextData: typeof getBoardData) => {
    setBoardData(nextData);
  };

  const onCloseAddCard = () => {
    setAddCardOpen(false);
  };

  const onClickAddCard = (listId: number) => {
    setList(boardData.lanes!.find((item) => item.id === listId));
    setSelectedCard(null);
    setAddCardOpen(true);
  };

  const onAddList = (name: string) => {
    dispatch(onAddNewList(boardDetail.id!, { name } as CardListType));
  };

  const getCardById = (lane: CardListType, cardId: number) =>
    lane.cards!.find((item) => item.id === cardId);

  const onEditCardDetail = (cardId: number) => {
    console.log('onEditCardDetail');
    const selectedList = boardData.lanes!.find((item) => {
      const correctCard = item.cards!.find((card) => card.id === cardId);
      if (correctCard) return item;
      return undefined;
    });
    const selectedCard = getCardById(selectedList!, cardId);
    setSelectedCard(selectedCard!);
    setList(selectedList);
    setAddCardOpen(true);
  };

  const handleDragCard = (
    cardId: any,
    sourceLaneId: number,
    targetLaneId: number,
    position: number,
    cardDetails: CardType
  ) => {
    if (sourceLaneId !== targetLaneId) {
      const boardId = boardDetail.id;
      dispatch(
        onUpdateCardCategory(
          cardDetails.id,
          sourceLaneId,
          targetLaneId,
          position,
          boardId
        )
      );
    }
  };

  return (
    <AppsContent
      sx={{
        flex: 1,
        '& .simplebar-wrapper': {
          my: '0 !important',
          height: '100%',
        },
        '& .simplebar-content': {
          height: '100%',
          maxHeight: '100%',
          py: '0 !important',
        },
      }}
    >
      <Board
        laneStyle={{
          borderRadius: 16,
          maxHeight: '98%',
          backgroundColor: theme.palette.background.default,
          width: 350,
        }}
        editable
        canAddLanes
        data={boardData}
        onDataChange={shouldReceiveNewData}
        handleDragEnd={handleDragCard}
        onCardAdd={(card: any, laneId: number) => {
          onClickAddCard(laneId);
        }}
        onCardClick={(cardId: number) => {
          onEditCardDetail(cardId);
        }}
        onLaneAdd={(name: string) => onAddList(name)}
        onLaneUpdate={(laneId: number, data: CardType) => {
          const lane = boardData.lanes!.find((item) => item.id === laneId);
          dispatch(
            onEditBoardList(boardDetail.id!, {
              ...lane,
              name: data.title,
            } as CardListType)
          );
        }}
        onLaneDelete={(laneId: number) =>
          dispatch(onDeleteSelectedList(boardDetail.id!, laneId))
        }
        t={(listId: number) => onClickAddCard(listId)}
        components={{
          BoardWrapper: BoardWrapper,
          Card: CardDetail,
          LaneHeader: ListHeader,
          AddCardLink: AddCardButton,
          NewCardForm: AddCard,
          NewLaneForm: AddNewList,
          NewLaneSection: NewListButton,
        }}
      />
      <AddCard
        isAddCardOpen={isAddCardOpen}
        onCloseAddCard={onCloseAddCard}
        list={list}
        board={boardDetail}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
    </AppsContent>
  );
};

export default BoardDetailView;

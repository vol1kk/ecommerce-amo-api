import { ItemDetails } from "../entities/item.entity";
import { CreateItemDto } from "../dto/create-item.dto";
import { UpdateItemDto } from "../dto/update-item.dto";

type Test<T> = T extends "create" ? CreateItemDto : UpdateItemDto;

export default function prepareItemDto<T>(itemDto: Test<T>) {
  // eslint-disable-next-line
  const { id, details, detailsId, ...itemData } = itemDto;

  // eslint-disable-next-line
  const { id: dId, comments, ...detailsData } = (details || {}) as ItemDetails;

  const commentsData = comments || [];
  // eslint-disable-next-line
  const commentsWithoutId = commentsData.map(({ id, ...comment }) => comment);

  return {
    itemData,
    detailsData,
    commentData: commentsWithoutId,
  };
}

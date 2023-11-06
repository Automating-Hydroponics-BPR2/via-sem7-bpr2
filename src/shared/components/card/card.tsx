import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

import { LazyImage, NoImage } from '../..';
import { CardProps } from './card.props';
import {
  CardButton,
  ContentHolder,
  ImageContainer,
  ItemDescription,
  ItemImageWrapper,
  ItemTitle,
  ItemTitleHolder,
  CardWrapper,
  ItemDate,
} from './card.styles';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

export const Card = React.memo((props: CardProps) => {
  const [isHovering, setIsHovering] = React.useState(false);
  const { width, height, padding } = props;
  return (
    <CardWrapper
      width={width}
      height={height}
      padding={padding}
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}>
      <ItemImageWrapper>
        <ImageContainer data-search-result-image>
          {props.imgSource ? <LazyImage src={props.imgSource} /> : <NoImage iconSize={80} />}
        </ImageContainer>
        {isHovering && (
          <>
            {props.showAdd && (
              <CardButton
                top="6px"
                right="-6px"
                type="button"
                onClick={(e: React.MouseEvent) => {
                  props.onAddClick?.(props.id);
                  e.stopPropagation();
                }}>
                <FontAwesomeIcon icon={faCirclePlus} />
              </CardButton>
            )}
            {props.showEdit && (
              <CardButton
                top="32px"
                right="-6px"
                type="button"
                onClick={(e: React.MouseEvent) => {
                  props.onEditClick?.(props.id);
                  e.stopPropagation();
                }}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </CardButton>
            )}
            {props.showDelete && (
              <CardButton
                top="58px"
                right="-6px"
                type="button"
                onClick={(e: React.MouseEvent) => {
                  props.onDeleteClick?.(props.id);
                  e.stopPropagation();
                }}>
                <FontAwesomeIcon icon={faTrashCan} 
                color='#ef5350'
                />
              </CardButton>
            )}
          </>
        )}
      </ItemImageWrapper>
      <ContentHolder>
        <ItemTitleHolder>
          <ItemTitle>{props.title}</ItemTitle>
          <ItemDate>{props.date}</ItemDate>
        </ItemTitleHolder>
        <ItemDescription>{props.description}</ItemDescription>
      </ContentHolder>
    </CardWrapper>
  );
});

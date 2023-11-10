import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

import { Dialog, LazyImage, NoImage } from '../..';
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
import { EditUserDialog, EditAddDeviceDialog } from '../../../components';
import { Typography } from '@mui/material';

export const Card = React.memo((props: CardProps) => {
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openEditUserDialog, setOpenEditUserDialog] = useState(false);
  const [openEditAddDeviceDialog, setOpenEditAddDeviceDialog] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isAddDeviceClicked, setIsAddDeviceClicked] = useState(false);
  const { width, height, padding } = props;
  return (
    <>
      <CardWrapper
        key={props.id}
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
          <ImageContainer>
            {props.imgSource ? <LazyImage src={props.imgSource} /> : <NoImage iconSize={80} />}
          </ImageContainer>
          {isHovering && (
            <>
              {props.showEdit && (
                <CardButton
                  top="6px"
                  right="-6px"
                  type="button"
                  onClick={(e: React.MouseEvent) => {
                    setIsAddDeviceClicked(false);
                    props.user ? setOpenEditUserDialog(true) : setOpenEditAddDeviceDialog(true);
                    e.stopPropagation();
                  }}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </CardButton>
              )}
              {props.showDelete && (
                <CardButton
                  top={props.showEdit ? '38px' : '6px'}
                  right="-6px"
                  type="button"
                  onClick={(e: React.MouseEvent) => {
                    setOpenConfirmationDialog(true);
                    e.stopPropagation();
                  }}>
                  <FontAwesomeIcon icon={faTrashCan} color="#ef5350" />
                </CardButton>
              )}
              {props.showAdd && (
                <CardButton
                  top={props.showEdit ? (props.showDelete ? '70px' : '38px') : '6px'}
                  right="-6px"
                  type="button"
                  onClick={(e: React.MouseEvent) => {
                    setIsAddDeviceClicked(true);
                    setOpenEditAddDeviceDialog(true);
                    e.stopPropagation();
                  }}>
                  <FontAwesomeIcon icon={faCirclePlus} />
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
      <Dialog
        open={openConfirmationDialog}
        onClose={() => {
          setOpenConfirmationDialog(false);
        }}
        title={'Confirm deletion?'}
        children={[
          <Typography variant="body1" mt={2}>{`${
            props.device
              ? 'Are you sure you want to delete this device'
              : props.user
              ? 'Are you sure you want to delete your account'
              : 'Confirm and proceed with selected action'
          }?`}</Typography>,
        ]}
        options={['Confirm', 'Cancel']}
        onOptionClick={(option: string) => {
          switch (option) {
            case 'Confirm':
              if (props.device?.id) {
                props.onDeviceDeleteClick?.(props.device.id);
              } else props.onUserDeleteClick?.();
              break;
            case 'Cancel':
              break;
            default:
              break;
          }
          setOpenConfirmationDialog(false);
        }}
        width="500px"
        height="200px"
      />
      <EditUserDialog
        open={openEditUserDialog}
        onClose={() => {
          setOpenEditUserDialog(false);
        }}
        user={props.user}
        onUserEdit={props.onUserEditClick}
      />
      <EditAddDeviceDialog
        open={openEditAddDeviceDialog}
        onClose={() => {
          setOpenEditAddDeviceDialog(false);
        }}
        device={props.device ? props.device : undefined}
        isAddDevice={isAddDeviceClicked}
        onDeviceEdit={props.onDeviceEditClick}
        onDeviceAdd={props.onDeviceAddClick}
      />
    </>
  );
});

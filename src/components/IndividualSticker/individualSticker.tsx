import useImage from "use-image";
import React, { useState, useEffect, useRef } from "react";
import { Image as KonvaImage, Group, Transformer } from "react-konva";
import { useHoverDirty, useLongPress } from "react-use";

export const IndividualSticker = ({ image, onDelete, onDragEnd,isSelected,onSelect }:any) => {

  const CLOSE_BUTTON_HIDE_TIME = 800;
  const imageRef = useRef(null);
  const trRef =  useRef<any>(null);

  const isHovered = useHoverDirty(imageRef);
  const [stickerImage] = useImage(image.src);
  const [deleteImage] = useImage("icons/cancel.svg");
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const onLongPress = () => {
    setShowDeleteButton(true);
  };


  image.resetButtonRef.current = () => {
    setShowDeleteButton(false);
  };
  const longPressEvent = useLongPress(onLongPress, { delay: 200 });
  const [isDragging, setIsDragging] = useState(false);

  const stickerWidth = image.width;
  const stickerHeight = stickerImage
    ? (image.width * stickerImage.height) / stickerImage.width
    : 0;

    useEffect(() => {

     // console.log('selected:',trRef);
      if (isSelected) {
         
        trRef.current?.nodes([imageRef.current])
        trRef.current?.getLayer().batchDraw();
      }
      
      if(!isSelected) hideRemoveButton(0);
    }, [isSelected]);

  useEffect(() => { 

    if (isHovered && !showDeleteButton) {
      setShowDeleteButton(true);
      
    } 
    
    hideRemoveButton(CLOSE_BUTTON_HIDE_TIME)
    console.log('X - isShowDeleteF {0}, isDragging {1}',showDeleteButton,isDragging);
  }, [isHovered]);

  const hideRemoveButton = (timer: number) => {

    setTimeout(() => {
      if(isSelected) return;
      setShowDeleteButton(false);
      console.log('Y - isShowDeleteF {0}, isDragging {1}',showDeleteButton,isDragging);
    }, timer);
  }

  return (
    <Group
      draggable
      x={image.x}
      y={image.y}
      onDragStart={() => {
        console.log('drag start');
        setIsDragging(true)
      }
    }
      onDragEnd={(event:any) => {
        hideRemoveButton(CLOSE_BUTTON_HIDE_TIME);
        console.log('drag end');

        setIsDragging(false);
        console.log('stickerShow H:',isHovered);
        console.log('stickerShow D',isDragging);
        onDragEnd(event);
      }}
    >
      <KonvaImage
        ref={imageRef}
        width={image.width}
        height={stickerHeight}
        image={stickerImage}
        onClick={onSelect}
        onTap={onSelect}
        {...longPressEvent}
      />

      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
      {showDeleteButton && !isDragging && (
        <KonvaImage
          onTouchStart={onDelete}
          onClick={onDelete}
          image={deleteImage}
          width={25}
          height={25}
          offsetX={-stickerWidth / 2 - 20}
        />
      )}
    </Group>
  );
};

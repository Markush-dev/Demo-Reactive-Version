import React, { useEffect } from 'react';
import ImageUploading from 'react-images-uploading';
import { useDispatch } from 'react-redux';
import { setFrame } from '../../stores/actions/videocam.actions';

export function ImageUploader() {
    const dispatch = useDispatch()
    const [images, setImages] = React.useState([]);
    const maxNumber = 1;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        console.log(`Uploaded img`)
        setImages(imageList);
    };

    useEffect(() => {

        console.log(`New image found in upload img`)
        console.log(images[0])

        if (images[0]) {
            dispatch(setFrame(images[0].data_url))
        }
    }, [images])

    console.log(images)

    return (
        <div className="App">
            <ImageUploading
                multiple
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        <button
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Click or Drop here
            </button>
            &nbsp;
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}
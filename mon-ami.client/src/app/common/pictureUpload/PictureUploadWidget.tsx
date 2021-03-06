import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Grid, Header } from "semantic-ui-react";
import PictureWidgetDropzone from "../../../app/common/pictureUpload/PictureWidgetDropzone";
import PictureWidgetCropper from "../../../app/common/pictureUpload/PictureWidgetCropper";

interface IPictureUploadWidgetProps {
  loading: boolean;
  uploadPicture: (file: Blob) => void;
}

const PictureUploadWidget: React.FC<IPictureUploadWidgetProps> = ({
  loading,
  uploadPicture,
}) => {
  const [files, setFiles] = useState<any>([]);
  const [image, setImage] = useState<Blob | null>(null);

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  });

  return (
    <Fragment>
      <Grid>
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 1 - Add Picture" />
          <PictureWidgetDropzone setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 2 - Resize image" />
          {files.length > 0 &&
            (console.log(files),
            (
              <PictureWidgetCropper
                setImage={setImage}
                imagePreview={files[0].preview}
              />
            ))}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 3 - Preview & Upload" />
          {files.length > 0 && (
            <Fragment>
              <div
                className="img-preview"
                style={{ minHeight: "200px", overflow: "hidden" }}
              />
              <Button.Group width={2}>
                <Button
                  positive
                  icon="check"
                  loading={loading}
                  onClick={() => uploadPicture(image!)}
                />
                <Button
                  icon="close"
                  disabled = {loading}
                  onClick={() => setFiles([])}
                />
              </Button.Group>
            </Fragment>
          )}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(PictureUploadWidget);

import React, { useContext, useState } from "react";
import { Tab, Header, Card, Image, Button, Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import PictureUploadWidget from "../../app/common/pictureUpload/PictureUploadWidget";
import { observer } from "mobx-react-lite";

interface ProfilePicturesProps {}

const ProfilePictures: React.FC<ProfilePicturesProps> = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    isCurrentUser,
    uploadPicture,
    uploadingPicture,
    setMainPicture,
    deletePicture,
    loading,
  } = rootStore.profileStore;
  const [addPictureMode, setAddPictureMode] = useState(false);
  const [target, setTarget] = useState<string | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<string | undefined>(
    undefined
  );

  const handleUploadImage = (picture: Blob) => {
    uploadPicture(picture).then(() => setAddPictureMode(false));
  };
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header floated="left" icon="image" content="Pictures" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={addPictureMode ? "Cancel" : "Add Picture"}
              onClick={() => setAddPictureMode(!addPictureMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPictureMode ? (
            <PictureUploadWidget
              uploadPicture={handleUploadImage}
              loading={uploadingPicture}
            />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile &&
                profile.pictures.map((picture) => (
                  <Card key={picture.id}>
                    <Image src={picture.url} />
                    {isCurrentUser && (
                      <Button.Group fluid widths={2}>
                        <Button
                          name={picture.id}
                          onClick={(e) => {
                            setMainPicture(picture);
                            setTarget(e.currentTarget.name);
                          }}
                          disabled={picture.isMain}
                          loading={loading && target === picture.id}
                          basic
                          positive
                          content="Main"
                        ></Button>
                        <Button
                          name={picture.id}
                          onClick={(e) => {
                            deletePicture(picture);
                            setDeleteTarget(e.currentTarget.name);
                          }}
                          disabled={picture.isMain}
                          loading={loading && deleteTarget === picture.id}
                          basic
                          negative
                          icon="trash"
                        ></Button>
                      </Button.Group>
                    )}
                  </Card>
                ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfilePictures);

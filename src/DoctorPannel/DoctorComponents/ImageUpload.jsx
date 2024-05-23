import React, { useState, useEffect } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import {
  Box,
  Container,
  IconButton,
  Stack,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { UploadButton } from "../../CustomStyles/Styles";
import { ProImageUpload } from "../../Service/Services";
import { toast } from "react-hot-toast";

const ImageUpload = ({
  setForm,
  fieldname,
  imageurl,
  emptyimage = false,
  card = false,
  tempimage,
  setTempImage,
  setImagechanged,
  name,
  edit,
  setEdit,
}) => {
  const [image, setImage] = useState({
    preview: "",
    data: "",
  });

  const theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#133680",
      },
      secondary: {
        main: "#f50057",
      },
      text: {
        primary: "#000000",
      },
    },
    typography: {
      fontFamily: "Montserrat",
    },
  });

  const forChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };

    if (card) {
      setEdit(name);
      setTempImage(img);
      setImagechanged(true);
    } else {
      setImage(img);
    }
  };

  const forSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("image", image.data);
    const response = await ProImageUpload(data);
    console.log(response);
    if (response.data.status) {
      toast.success(response.data.message);
      setForm((prevstate) => ({
        ...prevstate,
        [fieldname]: response.data.data.fileName,
      }));
    } else {
      toast.error(response.data.message);
    }
    if (emptyimage) {
      setImage({
        preview: "",
        data: "",
      });
    }
  };

  useEffect(() => {
    if (card) {
      setTempImage((prevImage) => ({
        ...prevImage,
        preview: imageurl !== "" ? imageurl : prevImage.preview,
      }));

      console.log(tempimage);
    } else {
      setImage((prevImage) => ({
        ...prevImage,
        preview: imageurl !== "" ? imageurl : prevImage.preview,
      }));
    }
  }, [imageurl]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Stack direction="row" alignItems="center" spacing={2}>
          {image.preview && (
            <img
              src={image.preview}
              alt="profile-preview"
              className="imgpreview"
            />
          )}
          {name == edit && tempimage?.preview && (
            <img
              src={tempimage.preview}
              alt="profile-preview"
              className="imgpreview"
            />
          )}
          <Box component={"div"}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input hidden accept="image/*" type="file" onChange={forChange} />
              <PhotoCamera />
            </IconButton>
            {!card && (
              <UploadButton
                onClick={forSubmit}
                type="button"
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                  height: 24,
                }}
              >
                Upload
              </UploadButton>
            )}
          </Box>
        </Stack>

        {/* <Divider sx={{ border: "1px solid #9BA4B5", marginTop: 1 }} /> */}
      </Container>
    </ThemeProvider>
  );
};

export default ImageUpload;

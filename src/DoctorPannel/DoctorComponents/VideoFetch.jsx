import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Stack,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  ThemeProvider,
  Typography,
  createTheme,
  TextField,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";

import Plyr from "plyr-react";
import { UploadButton } from "../../CustomStyles/Styles";
import {
  doctorDetailsGet,
  doctorDetailsUpdate,
  getDoctorVideos,
  createDoctorVideo,
  deleteDoctorVideo,
  updateDoctorVideo,
} from "../../Service/Services";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const VideoFetch = () => {
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

  const [videoInfo, setVideoInfo] = useState({
    link: "",
    title: "",
    description: "",
    category: "",
  });

  const [categories, setCategories] = useState([
    "General",
    "Brain and Nerves",
    "Bones and Muscles",
    "Skin/hair care",
    "Emergency care",
    "Pregnancy and Childbirth",
    "Eye care",
    "Child care",
    "Mental Health",
    "Lungs care",
    "Urinary System care",
    "Cancer Care",
    "Teeth and Oral care",
    "Veterinary - Animals care",
    "Diet/Nutrition",
    "Stomach-Intestines",
    "Liver care",
    "Kidney care",
    "Ear Nose Throat",
    "Acupressure therapy",
  ]);

  const [source, setSource] = useState(null);
  const [video, setVideo] = useState([]);
  const [edit, setEdit] = useState(false);
  const handleUpdate = async (index) => {
    if (edit) {
      return;
    }
    setEdit(true);
    const details = video[index];
    setVideoInfo(details);
    const updatedVideoList = video.filter((_, xd) => xd !== index);
    setVideo(updatedVideoList);
  };

  const forSubmit = () => {
    if (videoInfo.link) {
      setSource(videoInfo.link);
    }
  };

  const getDoctorDetails = async () => {
    const responseJson = await doctorDetailsGet();
    if (responseJson.data.status) {
      const doctorid = responseJson.data.data._id;
      const videos = await getDoctorVideos(doctorid);
      if (videos.data.status) {
        setVideo(videos.data.data);
      }
    }
  };

  // const handleDelete = (index) => {
  //   if (video?.length > 0) {
  //     const updatedApiQual = video.filter((_, xd) => xd !== index);
  //     setVideo(updatedApiQual);
  //     deleteVideo(updatedApiQual);
  //   }
  // };

  const handlePost = async () => {
    if (videoInfo.title && videoInfo.link) {
      setEdit(false);

      const responseJson = await createDoctorVideo(videoInfo);
      if (responseJson.data.status) {
        toast.success(responseJson.data.message);
        getDoctorDetails();
      } else {
        toast.error(responseJson.data.message);
      }
      setVideoInfo({ link: "", title: "", description: "" });
      setSource(null);
    }
  };

  const deleteVideo = async (id) => {
    const responseJson = await deleteDoctorVideo(id);
    if (responseJson.data.status) {
      toast.success(responseJson.data.message);
      getDoctorDetails();
    } else {
      toast.error(responseJson.data.message);
    }
  };

  const updateVideo = async () => {
    const responseJson = await updateDoctorVideo(videoInfo._id, videoInfo);
    if (responseJson.data.status) {
      toast.success(responseJson.data.message);
      setVideoInfo({
        link: "",
        title: "",
        description: "",
        category: "",
      });
      setEdit(false);
      getDoctorDetails();
    } else {
      toast.error(responseJson.data.message);
    }
  };

  useEffect(() => {
    getDoctorDetails();
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            required
            fullWidth
            value={videoInfo.link}
            autoComplete="off"
            name="fetchvideo"
            type="string"
            placeholder="Import URL*"
            onChange={(e) =>
              setVideoInfo({ ...videoInfo, link: e.target.value })
            }
            InputProps={{
              sx: {
                height: "2.2em",
              },
            }}
          />
          <UploadButton onClick={forSubmit}>Fetch</UploadButton>
        </Stack>

        <Box component={"div"} className="my-2">
          {source && (
            <Plyr
              source={{
                type: "video",
                sources: [
                  {
                    src: source,
                    provider: "youtube",
                  },
                ],
              }}
            />
          )}

          <TextField
            fullWidth
            autoComplete="off"
            InputProps={{
              sx: {
                height: "2.2em",
              },
            }}
            placeholder="Video Title*"
            value={videoInfo.title}
            onChange={(e) =>
              setVideoInfo({ ...videoInfo, title: e.target.value })
            }
            sx={{ mt: 2 }}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <Select
              placeholder="Video Category"
              labelId="demo-simple-select-label"
              sx={{ height: "2.4em" }}
              name="category"
              value={videoInfo.category}
              onChange={(e) =>
                setVideoInfo({ ...videoInfo, category: e.target.value })
              }
            >
              <MenuItem value="" disabled>
                Select Place
              </MenuItem>
              {categories &&
                categories.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <TextField
            multiline
            minRows={4}
            fullWidth
            autoComplete="off"
            placeholder="Description*"
            value={videoInfo.description}
            onChange={(e) =>
              setVideoInfo((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            sx={{ mt: 2 }}
          />
        </Box>

        <div className="mt-2">
          <UploadButton
            onClick={() => {
              edit ? updateVideo() : handlePost();
            }}
          >
            {edit ? "Update" : "Post"} Video
          </UploadButton>
        </div>
        {
          <div>
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 4,
              }}
            >
              {video !== "undefined" &&
                video.map((video, index) => (
                  <Grid item key={video._id} xs={12} sm={6} md={6} lg={6}>
                    <Card className="m-2">
                      <Box component={"div"}>
                        {video.link.length > 0 && (
                          <Plyr
                            source={{
                              type: "video",
                              sources: [
                                {
                                  src: video.link,
                                  provider: "youtube",
                                },
                              ],
                            }}
                          />
                        )}

                        <CardContent>
                          <Typography component={"p"}>{video.title}</Typography>
                        </CardContent>
                        <CardActions>
                          <IconButton onClick={() => handleUpdate(index)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => deleteVideo(video._id)}>
                            <DeleteIcon />
                          </IconButton>
                        </CardActions>
                      </Box>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </div>
        }
      </ThemeProvider>
    </React.Fragment>
  );
};

export default VideoFetch;

import React, { useEffect, useState } from "react";
import Plyr from "plyr-react";
import { useParams } from "react-router-dom";
import { videoHomePage } from "../Service/Services";
import DoctorProfile from "./DoctorProfile";
import {
  BookAppointmentFixedbar,
  SpecificVideoWrapper,
} from "../styles/SpecificVideo";
import { Helmet } from "react-helmet";
import LeadGenerationForm from "./common/Lead-Generation";
import RenderModalOrBottomSheet from "./common/RenderModalBS";
import { Flex } from "../styles/CommonStyles";
function SpecificVideo() {
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const videocode = queryParams.get("videocode");
  // const doctor = queryParams.get("doctor");
  const { videotitle } = useParams();
  const [url, setUrl] = useState("");

  const [data, setData] = useState(null);
  const [isBtsVisible, setShowBts] = useState(false);

  const fetchVideoData = async () => {
    var videoTitle2 = videotitle.split("-").join(" ");
    const responseJson = await videoHomePage(videoTitle2);
    console.log(responseJson.data.data[0]);
    setData(responseJson.data.data[0]);
    setUrl(responseJson.data.data[0].link);
  };

  useEffect(() => {
    if (videotitle) {
      fetchVideoData();
    }
  }, [videotitle]);

  const handleAppointmentBts = () => {
    document
      .querySelector(".widget-visible")
      .setAttribute("style", "display:none !important");
    setShowBts(true);
  };
  return (
    <>
      <Helmet>
        <title>{data?.title}</title>
        <meta name="description" content={data?.description} />
      </Helmet>
      <SpecificVideoWrapper justifyContent="center">
        <div className="videoDetails">
          {url.length > 0 && (
            <Plyr
              source={{
                type: "video",
                sources: [
                  {
                    src: url,
                    provider: "youtube",
                  },
                ],
              }}
            />
          )}
          <DoctorProfile doctorid={data?.doctorId} subprofile={true} />
        </div>
        <div className="leadFormWrapper">
          <div className="leadForm">
            <LeadGenerationForm
              title="Want to book appointment with doctor?"
              doctorid={data?.doctorId}
            />
          </div>
        </div>
      </SpecificVideoWrapper>
      <BookAppointmentFixedbar onClick={handleAppointmentBts}>
        Book Appointment Now
      </BookAppointmentFixedbar>
      <RenderModalOrBottomSheet
        isVisible={isBtsVisible}
        onClose={() => {
          document
            .querySelector(".widget-visible")
            .setAttribute("style", "display:block !important");
          setShowBts(false);
        }}
      >
        <Flex padding="20px">
          <LeadGenerationForm
            title="Want to book appointment with doctor?"
            doctorid={data?.doctorId}
          />
        </Flex>
      </RenderModalOrBottomSheet>
    </>
  );
}

export default SpecificVideo;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, FlexCol } from "../../styles/CommonStyles";
import {
  BookAppointment,
  BookAppointmentShare,
  DoctorCardWrapper,
} from "./DoctorCardStyles";
import { aws_url } from "../../Service/Services";

const DoctorCard = ({
  item,
  videocode,
  specificvideo = false,
  handleBtsModal,
}) => {
  const navigate = useNavigate();

  // const handleShareVideo = (link) => {
  //   navigator.clipboard.writeText(link);
  //   toast.success("Copied link to share");
  // };

  // const tempFunction = (url) => {
  //   console.log(decodeURIComponent(url.toString()));
  // };

  return (
    <>
      <DoctorCardWrapper key={item?._id} style={{ cursor: "pointer" }}>
        <FlexCol padding="12px">
          <h1 className="videoHomePageTitle">{item?.title}</h1>
          <Flex
            gap={10}
            onClick={() => {
              if (specificvideo) {
                navigate(`/doctor/${item._id}`);
              }
            }}
            alignItems="center"
          >
            <Flex width="80px" height="80px">
              <img
                className="doctorImage"
                src={`${aws_url}/${item?.profilepicurl}`}
                alt="doctor_image"
              />
            </Flex>
            <FlexCol gap={2}>
              <h2 className="doctorName">
                Dr {item?.firstname}{" "}
                {item?.qualifications?.length > 0 &&
                  ", " + item?.qualifications[0]?.degree}
              </h2>
              <h3 className="doctorSpecilization">{item?.specilization[0]}</h3>
              <h3 className="doctorExperience">
                {item?.experiences.map(
                  (xd) =>
                    xd.currentlyworking &&
                    xd.hosptalname + ", " + item?.location
                )}
              </h3>
            </FlexCol>
          </Flex>
        </FlexCol>
        <BookAppointmentShare onClick={(e) => handleBtsModal(e, item.doctorId)}>
          <BookAppointment>Book Appointment</BookAppointment>
        </BookAppointmentShare>
      </DoctorCardWrapper>
    </>
  );
};

export default DoctorCard;

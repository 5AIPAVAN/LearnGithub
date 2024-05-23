import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DoctorTabs from "./DoctorTabs";
import { useParams } from "react-router-dom";
import { aws_url, getSpecificDoctor } from "../Service/Services";
import toast from "react-hot-toast";
import { Flex } from "../styles/CommonStyles";
import { DoctorBriefDetails, DoctorPic } from "../styles/DoctorStyles";

const DoctorProfile = ({ doctorid, subprofile = false }) => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const getDoctorDetails = async () => {
    const responseJson = await getSpecificDoctor(subprofile ? doctorid : id);
    if (responseJson.data?.status) {
      setLoading(true);
      setDetails(responseJson.data?.data);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("Error while fetching details");
      toast.error(responseJson.data?.message);
    }
  };
  useEffect(() => {
    if (doctorid || id) {
      getDoctorDetails();
    }
  }, [id, doctorid]);

  return (
    <div className="mt-5">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <Flex
          justifyContent="space-between"
          alignItems="center"
          gap={20}
          padding="14px"
          style={{
            borderRadius: 5,
            backgroundColor: "#0A6EBD99",
            margin: 1,
          }}
        >
          <DoctorPic
            src={`${aws_url}/${details.profilepicurl}`}
            alt={details.firstname}
          />

          <DoctorBriefDetails>
            <h1>{details.firstname}</h1>

            <Flex alignItems="center" justifyContent="right">
              <LocationOnIcon className="icon" />{" "}
              <span>{details?.location}</span>
            </Flex>
            {details?.title && <p>{details?.title}</p>}
            <p>
              <span>Consults at:</span>{" "}
              <span>
                {" "}
                {details.hospitals &&
                  details?.hospitals.map((xd) => {
                    return xd.currentlyworking ? xd.hospitalName : "";
                  })}
              </span>
            </p>
          </DoctorBriefDetails>
        </Flex>
      )}

      <DoctorTabs details={details} loading={loading} />
    </div>
  );
};

export default DoctorProfile;

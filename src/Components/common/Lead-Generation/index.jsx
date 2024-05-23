import { validateTextOnly } from "../../../utils/helper.js";
import { validateMobileNo } from "../../../utils/validation.js";
import React, { useState } from "react";
import AnimatedButton from "../Button/animatedButton.jsx";
import Input from "../Form/input.jsx";
import {
  AnimatedBox,
  FormGrp,
  FormSubTitle,
  FormTitle,
  InnerDiv,
  Title6,
} from "./leadgenerationStyles.jsx";
import { FlexCol } from "../../../styles/CommonStyles.jsx";
import { createLeads } from "../../../Service/Services.jsx";

const LeadGenerationForm = ({
  title,
  subtitle,
  isShowForm = true,
  doctorid,
}) => {
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [nameError, setNameError] = useState("");
  const [isLeadGenerated, setLeadGeneration] = useState(false);

  const handleMobileChange = (value) => {
    setMobileError("");
    setPhoneNo(value);
  };
  const handleEmailChange = (value) => {
    setMobileError("");
    setEmail(value);
  };
  const handleNameChange = (value) => {
    if (validateTextOnly(value)) {
      setName(value);
    }
    setNameError("");
  };

  const postData = async () => {
    const responseJson = await createLeads({
      name: name,
      mobile: phoneNo,
      email: email,
      doctorId: doctorid,
      pageUrl: window.location.pathname,
    });
    if (responseJson) {
      setLeadGeneration(true);
    }
  };

  const handleSubmit = () => {
    let validate = validateMobileNo(phoneNo);
    if (validate === true && name.length) {
      setMobileError("");
      postData();
    }
    if (!(validate === true)) {
      setMobileError(validate);
    }

    if (!name.length) {
      setNameError("Required");
    }
  };

  return (
    <AnimatedBox>
      <InnerDiv>
        {isLeadGenerated ? (
          <FormTitle>
            Thank you! Our team will get in touch with you soon.
          </FormTitle>
        ) : (
          <>
            <FlexCol gap={16}>
              <FormTitle>{title}</FormTitle>
              <FormSubTitle>{subtitle}</FormSubTitle>
            </FlexCol>
            <FlexCol gap={24}>
              <FormGrp>
                <Title6 className="mb-2">Name</Title6>
                <Input
                  placeholder={"Your Name"}
                  type={"text"}
                  onChange={(e) => handleNameChange(e.target.value)}
                  value={name}
                  error={nameError}
                  name="tel"
                  maxLength={10}
                />
              </FormGrp>
              {isShowForm && (
                <FormGrp>
                  <Title6 className="mb-2">Phone Number</Title6>
                  <Input
                    placeholder={"Mobile number"}
                    type={"tel"}
                    onChange={(e) => handleMobileChange(e.target.value)}
                    value={phoneNo}
                    error={mobileError}
                    name="tel"
                    maxLength={10}
                  />
                </FormGrp>
              )}
              <FormGrp>
                <Title6 className="mb-2">Email id</Title6>
                <Input
                  placeholder={"Email address"}
                  type={"text"}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  value={email}
                  error={""}
                  name="email"
                />
              </FormGrp>
              <AnimatedButton onClick={handleSubmit}>Submit</AnimatedButton>
            </FlexCol>
          </>
        )}
      </InnerDiv>
    </AnimatedBox>
  );
};

export default LeadGenerationForm;

import { Button, styled } from "@mui/material";

export const CustomStyles = {
  btnNav: {
    background: "#133680",
    color: "#ffff",
    padding: "5px 22px 5px 22px",
    fontSize: "14px",
    borderRadius: "18px",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    margin: "0px 4px 0px 4px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#ffff",
      color: "#133680",
      border: "1px solid #133680",
    },
  },
  navLink: {
    mx: 2,
    cursor: "pointer",
    position: "relative",
    fontSize: "14px",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    "&:before": {
      content: "''",
      marginBottom: "-3.5px",
      position: "absolute",
      width: "0",
      height: "1.8px",
      bottom: "2px",
      left: "50%",
      transform: "translate(-50%,0%)",
      visibility: "hidden",
      transition: "all 0.3s ease-in-out",
      border: "1.5px solid #133680",
      borderRadius: "8px",
    },
    "&:hover:before": {
      visibility: "visible",
      width: "100%",
    },
  },
};

export const IconButton = styled(Button)`
  background: "#DDE6ED";
  color: "#ffff";
  height: "4em";
  width: "4em";
  font-size: 0.875rem;
  border-radius: 1em;
  cursor: pointer;
  margin-top: 1.2em;
  &:hover {
    background-color: "#DDE6ED";
  }
`;

export const EnquiryButton = styled(Button)`
  background: "#30A2FF";
  color: "#ffff";
  height: "2em";
  width: "4em";
  font-size: 0.875rem;
  border-radius: 2em;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid #6c9bcf;
  margin-top: 1.2em;
  padding: 0.4em;
  &:hover {
    background-color: "transparent";
  }
`;

export const SignButton = styled(Button)`
  color: "#ffff";
  border-radius: 6px;
  transition: all 150ms ease;
  cursor: pointer;
  margin-top: 1.2em;
  padding: 0.4em;
  text-transform: none;
  &:hover {
    background-color: "transparent";
  }
`;

export const LogButton = styled(Button)`
  background-color: "#133680";
  color: "#ffff";
  border-radius: 6px;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid #6c9bcf;
  margin-top: 1.2em;
  padding: 0.4em;
  text-transform: none;
  &:hover {
    background-color: "transparent";
  }
`;

export const UploadButton = styled(Button)`
  background-color: "#133680";
  color: "#ffff";
  border-radius: 6px;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid #6c9bcf;
  padding: 0.4em;
  text-transform: none;
  &:hover {
    background-color: "transparent";
  }
`;

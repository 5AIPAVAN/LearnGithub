import styled from "styled-components";

export const Flex = styled.div`
  display: flex;
  justify-content: ${(props) => props.justifyContent || "unset"};
  align-items: ${(props) => props.alignItems || "unset"};
  flex-wrap: ${(props) => props.flexWrap || "unset"};
  gap: ${(props) => props.gap + "px"};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
  flex-grow: ${(props) => props.flexGrow};
`;

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent || "unset"};
  align-items: ${(props) => props.alignItems || "unset"};
  flex-wrap: ${(props) => props.flexWrap || "unset"};
  gap: ${(props) => (props.gap ? props.gap + "px" : "none")};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  flex-grow: ${(props) => props.flexGrow};
`;

export const FlexFullWidth = styled(Flex)`
  width: 100%;
`;

export const FlexColFullWidth = styled(FlexCol)`
  width: 100%;
`;

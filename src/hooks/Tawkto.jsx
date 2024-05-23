import { createContext, useRef } from "react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

export const TawktoContext = createContext();

const TawktoProvider = ({ children }) => {
  const tawkMessengerRef = useRef();

  const handleMinimize = () => {
    tawkMessengerRef.current.minimize();
  };

  return (
    <TawktoContext.Provider>
      {children}
      <TawkMessengerReact
        propertyId="62b3f9147b967b1179960fc5"
        widgetId="1g67g9v4a"
      />
    </TawktoContext.Provider>
  );
};

export default TawktoProvider;

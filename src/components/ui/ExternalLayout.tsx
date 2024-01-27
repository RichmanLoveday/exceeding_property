import { Outlet, useNavigation } from "react-router-dom";
import Header from "../Header";

function ExternalLayout() {
  return (
    <>
      <Header />
      <Outlet />;
    </>
  );
}

export default ExternalLayout;

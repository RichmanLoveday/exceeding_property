import { Outlet, useNavigation } from "react-router-dom";
import Header from "../Header";

function AppLayout() {
  // use for loading states
  //   const navigation = useNavigation();
  //   const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {/* {isLoading && <Loader />}
      {isLoading && <Loader />}
      <Header /> */}
      <Header />
      <div className="h-auto">
        <main className="mx-auto overflow-hidden ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;

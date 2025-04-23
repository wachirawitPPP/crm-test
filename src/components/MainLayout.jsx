
import Header from "./Header";
import Menubar from "./Menubar";

const MainLayout = (props) => {
  return (
    <>
      <div className="">
        <Header />
        <div className="dark-overlay"></div>
        <div className="page-content space-top p-b65 mb-5">
          {props.children}
        </div>
        <Menubar />
      </div>
    </>
  );
};


export default MainLayout;

import Header from "./Header";
import "../styles/global.scss";
import Sidebar from "./Sidebar";
import GeneralSettings from "../components/GeneralSettings";
import ManageCategories from "../components/ManageCategories";

const Settings = () => {
  return (
    <>
      <div className="tab">
        <Sidebar />
        <div className="to-the-left-of-the-sidebar">
          <Header />
          <div className="content-part">
            <h1 className="title">Settings</h1>
            <section className="card-container">
              <GeneralSettings />
              <ManageCategories />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;

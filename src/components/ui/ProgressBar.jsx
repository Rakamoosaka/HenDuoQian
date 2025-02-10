import "../../styles/components.scss";
import useStore from "../../store/useStore";

const ProgressBar = ({ progress, large }) => {
  const { settings } = useStore();
  const isDarkMode = settings.darkmode;

  return (
    <div
      className={`progress-bar-bg ${
        large ? "large-progressbar" : "small-progressbar"
      } ${isDarkMode ? "dark-mode" : ""}`}
    >
      <div
        key={progress}
        className="progress-bar-fill"
        style={{
          "--progress": `${progress}%`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;

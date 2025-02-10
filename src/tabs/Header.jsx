import "../styles/global.scss";
import { Moon, Sun } from "lucide-react";
import useStore from "../store/useStore";
import { useEffect } from "react";
const Header = () => {
  const { settings, updateSettings } = useStore();
  useEffect(() => {
    if (settings.darkmode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [settings.darkmode]);
  return (
    <>
      <div className="inner-header">
        <nav className="navbar">
          {settings.darkmode ? (
            <Moon
              className="icon-button mode-toggle"
              size={16}
              onClick={() => updateSettings({ darkmode: false })}
            />
          ) : (
            <Sun
              className="icon-button mode-toggle"
              size={16}
              onClick={() => updateSettings({ darkmode: true })}
            />
          )}
        </nav>
      </div>
    </>
  );
};

export default Header;

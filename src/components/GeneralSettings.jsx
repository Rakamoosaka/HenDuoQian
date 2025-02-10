import "../styles/components.scss";
import ToggleSwitch from "./ui/ToggleSwitch";
import useStore from "../store/useStore";

const GeneralSettings = () => {
  const { settings, updateSettings, updateTransactionsCurrency } = useStore();

  return (
    <div className="content-card exchange-rates">
      <h1>General Settings</h1>
      <section className="justify-between">
        <span>Dark mode</span>
        <ToggleSwitch
          width={44}
          height={24}
          circleSize={21}
          isChecked={settings.darkmode}
          onToggle={() => updateSettings({ darkmode: !settings.darkmode })}
        />
      </section>
      <section className="column general-settings">
        <span>Currency</span>
        <select
          className="select"
          value={settings.currency}
          onChange={(e) => {
            updateTransactionsCurrency(settings.currency, e.target.value);
            updateSettings({ currency: e.target.value });
          }}
        >
          <option className="select" value="USD">
            USD
          </option>
          <option value="EUR">EUR</option>
          <option value="KZT">KZT</option>
          <option value="RUB">RUB</option>
        </select>

        <span>Language</span>
        <select
          className="select"
          value={settings.language}
          onChange={(e) => updateSettings({ language: e.target.value })}
        >
          <option value="en">English</option>
          <option value="kz">Kazakh</option>
        </select>
      </section>
    </div>
  );
};

export default GeneralSettings;

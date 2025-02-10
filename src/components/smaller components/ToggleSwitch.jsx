import "../../styles/components.scss";

const ToggleSwitch = ({
  isChecked,
  onToggle,
  width = 50,
  height = 28,
  circleSize = 22,
}) => {
  return (
    <label
      className="toggle-switch"
      style={{
        "--width": `${width}px`,
        "--height": `${height}px`,
        "--circle-size": `${circleSize}px`,
      }}
    >
      <input type="checkbox" checked={isChecked} onChange={onToggle} />
      <span className="slider"></span>
    </label>
  );
};

export default ToggleSwitch;

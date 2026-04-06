import './Checkbox.css'

export function Checkbox({ checked, onChange, label }) {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        className="checkbox-input"
        checked={checked}
        onChange={onChange}
      />
      <span className="checkbox-mark" />
      {label && <span className="checkbox-label">{label}</span>}
    </label>
  )
}

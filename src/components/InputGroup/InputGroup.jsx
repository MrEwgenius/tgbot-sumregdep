import React, { useState } from "react";
import styles from "./InputGroup.module.scss";
import QuestionSVG from "../../../public/Question";

const InputGroup = ({
  name,
  formData,
  handleChange,
  errors,
  min,
  max,
  label,
  hint,
}) => {
  const [showHint, setShowHint] = useState(false);

  const toggleHint = () => setShowHint((prev) => !prev);

  return (
    <div
      key={name}
      className={`${styles.field} ${errors[name] ? styles.errorInput : ""}`}
    >
      <input
        type={"text"}
        id={name}
        min={min}
        max={max}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className={`${styles.input} `}
        autoComplete="off"
        placeholder=" "
        required
      />
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>

      {errors[name] && <span className={styles.error}>{errors[name]}</span>}

      {/* Вопросительный знак */}
      <span className={styles.hintIcon} onClick={toggleHint}>
        <QuestionSVG color={showHint ? "red" : "#949494"} />
      </span>

      {/* Подсказка */}
      {showHint && <div className={styles.hint}>{hint}</div>}
    </div>
  );
};
export default InputGroup;

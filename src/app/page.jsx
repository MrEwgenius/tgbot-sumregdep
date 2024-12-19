"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import InputGroup from "@/components/InputGroup/InputGroup";
import { fieldsConfig } from "@/config/fieldsConfig";

export default function Home() {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    clickCost: "",
    clicksCount: 1000,
    k2rRate: "",
    r2dRate: "",
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "k2rRate" || name === "r2dRate") {
      if (value === "" || isNaN(value)) {
        updatedValue = "";
        setErrors((prev) => ({ ...prev, [name]: "Введите число" }));
      } else if (value < 0 || value > 100) {
        updatedValue = Math.min(100, Math.max(0, parseFloat(value)));
        setErrors((prev) => ({
          ...prev,
          [name]: "Введите значение от 0 до 100",
        }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: null }));
      }
    }

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   let updatedValue = value;

  //   // Замена запятой на точку для дробных чисел
  //   if (name === "k2rRate" || name === "r2dRate") {
  //     updatedValue = updatedValue.replace(",", ".");

  //     // Проверка, что введенное значение является числом и не содержит букв
  //     if (updatedValue === "" || isNaN(updatedValue) || /[a-zA-Z]/.test(updatedValue)) {
  //       setErrors((prev) => ({ ...prev, [name]: "Введите корректное число" }));
  //     } else if (updatedValue < 0 || updatedValue > 100) {
  //       setErrors((prev) => ({
  //         ...prev,
  //         [name]: "Введите значение от 0 до 100",
  //       }));
  //     } else {
  //       setErrors((prev) => ({ ...prev, [name]: null }));
  //     }
  //   }

  //   setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { clickCost, clicksCount, k2rRate, r2dRate } = formData;

    const costPerClick = parseFloat(clickCost);
    const totalClicks = parseInt(clicksCount);
    const k2r = parseFloat(k2rRate) / 100;
    const r2d = parseFloat(r2dRate) / 100;

    if (isNaN(costPerClick) || isNaN(totalClicks) || isNaN(k2r) || isNaN(r2d)) {
      alert("Пожалуйста, заполните все поля корректно.");
      return;
    }

    // Расчеты
    const spend = costPerClick * totalClicks; // Общий спенд
    const regs = Math.round(totalClicks * k2r); // Число рег
    const costPerReg = regs > 0 ? (spend / regs).toFixed(2) : 0; // Стоимость реги
    const deps = Math.round(regs * r2d); // Число депов
    const costPerDep = deps > 0 ? (spend / deps).toFixed(2) : 0; // Стоимость депа

    // Устанавливаем результаты
    setResults({
      spend: spend.toFixed(2),
      regs,
      costPerReg,
      deps,
      costPerDep,
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Введите данные</h2>

        {fieldsConfig.map((field) => (
          <InputGroup
            key={field.name}
            name={field.name}
            formData={formData}
            min={field.min}
            max={field.max}
            handleChange={handleChange}
            errors={errors}
            label={field.label}
            hint={field.hint}
          />
        ))}

        <button type="submit" className={styles.button}>
          Рассчитать
        </button>
      </form>
      {results && (
        <div className={styles.results}>
          <h3>Результаты расчета:</h3>
          <p>
            💵 Стоимость реги: <b>${results.costPerReg}</b>
          </p>
          <p>
            🏆 Стоимость депа: <b>${results.costPerDep}</b>
          </p>
        </div>
      )}
    </div>
  );
}

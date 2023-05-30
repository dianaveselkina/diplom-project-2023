import { Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AllContextData } from "../../context/context";
import "./form.css";

export const FormReg = ({ authReg, handleClose, setAuthReg }) => {
  const { singUp } = useContext({ ...AllContextData });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      group: "group-12",
    },
  });

  const cbSubmit = (data) => {
    singUp(data);
    handleClose();
  };

  return (
    <form className="authRegForm" onSubmit={handleSubmit(cbSubmit)}>
      <h5 className="authRegForm__header">
        Форма регистарции
        <br />
        <p className="authRegForm__header_text">
          (если желаете изменить заметку)
        </p>
      </h5>

      <label className="authRegForm__leble">
        {errors?.email?.message ? 
          <p className="authRegForm__leble_error">{errors?.email?.message}</p>
         : 
          "Ваш Email"
        }
        <input
          className="authRegForm__input"
          {...register("email", {
            required: {
              value: true,
              message: " обязательное поле",
            },

            pattern: {
              message: " неверный емаил",
            },
          })}
          type="email"
          placeholder="shla@Sobaka.poShosseISosalaSushku"
        ></input>
      </label>

      <label className="authRegForm__leble">
        {errors?.password?.message ? 
          <p className="authRegForm__leble_error">
            {errors?.password?.message}
          </p>
         : 
          "Введите пароль"
        }
        <input
          className="authRegForm__input"
          {...register("password", {
            required: {
              value: true,
              message: " обязательное поле",
            },
            minLength: {
              value: 3,
              message: " слишком коротко",
            },
          })}
          type="password"
          autoComplete="on"
          placeholder="пароль не менее 3 сиволов"
        ></input>
      </label>

      <label className="authRegForm__leble">
        {errors?.password?.message ? 
          <p className="authRegForm__leble_error">
            {errors?.password?.message}
          </p>
         : 
          "Укажите группу"
        }
        <input
          className="authRegForm__input"
          {...register("group", {
            required: {
              value: true,
              message: " обязательное поле",
            },
            minLength: {
              value: 2,
              message: " слишком коротко",
            },
          })}
          type="text"
          placeholder="не менее 2 символов"
        ></input>
      </label>

      <div className="authRegForm__BtnBlock">
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            setAuthReg(!authReg);
          }}
        >
          авторизация
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="success"
          size="small"
          disabled={!isValid}
        >
          Регистрация
        </Button>
      </div>
    </form>
  );
};

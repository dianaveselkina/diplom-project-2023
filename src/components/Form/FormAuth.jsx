import { Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AllContextData } from "../../context/context";
import "./form.css";
import { useNavigate } from "react-router-dom";

export const FormAuth = ({ authReg, handleClose, setAuthReg }) => {
  const { singIn } = useContext({ ...AllContextData });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "lou8@mail.ru",
      password: "123321",
    },
  });

  const cbSubmit = (data) => {
    singIn(data);
    handleClose();
    navigate("/");
  };

  return (
    <form className="authRegForm" onSubmit={handleSubmit(cbSubmit)}>
      <h5 className="authRegForm__header">
        Авторизация
        <br />
        <p className="authRegForm__header_text">
          (По умолчанию фейковые данные)
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
              message: " слишком короткий пароль",
            },
          })}
          type="password"
          autoComplete="on"
          placeholder="пароль не менее 3 сиволов"
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
          Регистрация
        </Button>

        {/* <Link to="/"> */}
        <Button
          type="submit"
          variant="contained"
          size="small"
          color="success"
          disabled={!isValid}
        >
          Войти
        </Button>
        {/* </Link> */}
      </div>
    </form>
  );
};

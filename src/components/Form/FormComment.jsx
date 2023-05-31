import { Button } from "@mui/material";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../Utils/api";
import { AllContextData } from "../../context/context";
import "./form.css";

export const FormComment = ({
  handleClose2,
  comments,
  _id,
  setPost,
  ...rest
}) => {
  const data = useContext(AllContextData)
  const updatePostState = data[4]

  /* const { updatePostState } = useContext(AllContextData); */
  /* console.log({ _id }); */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      text: "",
    },
  });

  const cbSubmit = (data) => {
    /* console.log(data); */
    api
      .addNewComments(data, _id)
      .then((newPost) => {
        updatePostState(newPost);
        /* console.log(data); */
        handleClose2();
        /* setPost(newPost); */
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <form onSubmit={handleSubmit(cbSubmit)} className="form">
        <label className="labelfor">
          {errors?.url?.message ? 
            <p className="paragrafor">{errors?.url?.message}</p>
           : 
            "Ваш комметарий"
          }
          <input
            className="inputfor"
            {...register("text", {
              required: {
                value: true,
                message: "Поле обязательно для заполнения",
              },
              minLength: {
                value: 5,
                message: "Вы не правы",
              },
            })}
            type="text"
            placeholder="Итак..."
          ></input>
        </label>

        <Button type="submit" variant="contained">{Object.entries(rest).length ? 'Сохранить изменения' : 'Опубликовать пост'}</Button>
          
      </form>
    </>
  );
};

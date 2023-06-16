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
  ...rest
}) => {
  const { updatePostState } = useContext(AllContextData)


  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    defaultValues: {
      text: '',
    }
  });

  const cbSubmit = (data) => {
    /* console.log(data); */
    api
      .addNewComments(data, _id)
      .then((newPost) => {
        updatePostState(newPost)
      })
    /* console.log(data); */
    handleClose2();
    /* .catch((e) => console.log(e)); */
  };

  return (
    <>
      <form onSubmit={handleSubmit(cbSubmit)} className="form">
        <label className="labelfor">
          {errors?.text?.message ?
            <p className="paragrafor">{errors?.text?.message}</p>
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
                value: 3,
                message:
                  'Текст должен состоять не менее чем из 3х символов',
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

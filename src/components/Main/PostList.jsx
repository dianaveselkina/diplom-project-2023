import { useContext } from 'react';
import { Post } from './Post';
import './style.module.css';
import { ErrorPage } from "../../pages/ErrorPage";
import { AllContextData } from "../../context/context";


export const PostList = () => {
  const { postData } = useContext(AllContextData)

  return (
    <>
      {
        !!postData.length
          ? postData.map(el => <Post key={el._id} {...el} />)
          : <ErrorPage />
      }
    </>
  )
}
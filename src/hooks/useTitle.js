import  { useEffect } from 'react';

export const useTitle = (title) => {
    useEffect(()=>{
        document.title=`${title} - CourseCrafter`
    },[title])
  return null;
}

import { useRef, useEffect } from 'react';

const useDocumentTitle = (title, prevailOnUnmount = false) => {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    const formattedTitle = prevailOnUnmount ? title : `Devcom - ${title}`;
    document.title = formattedTitle;
  }, [title, prevailOnUnmount]);

  useEffect(
    () => () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current;
      }
    },
    []
  );
};

export default useDocumentTitle;

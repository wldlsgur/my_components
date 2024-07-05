import { useEffect, useRef } from 'react';
import { Props } from './type';

const useResize = ({ onResize }: Props) => {
  const ref = useRef(null);
  const onResizeRef = useRef(onResize);

  useEffect(() => {
    onResizeRef.current = onResize;
  }, [onResize]);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      onResizeRef.current(entry.contentRect);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return ref;
};

export default useResize;

import { useEffect } from 'react';
import { useAppStore } from '../store/AppStore';

export const usePaste = () => {
  const { addElements } = useAppStore();

  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of Array.from(items)) {
        if (item.type.includes('image')) {
          const blob = item.getAsFile();
          if (blob) {
            const url = URL.createObjectURL(blob);
            addElements([{
              type: 'image',
              src: url,
              x: 100,
              y: 100
            }]);
          }
        }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, []);
};

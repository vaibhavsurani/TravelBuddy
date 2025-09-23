import React, { useState, useEffect } from 'react';

// Define the types for the component's props
interface TypingTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delay?: number;
}

const TypingText: React.FC<TypingTextProps> = ({ 
  words, 
  typingSpeed = 150, 
  deletingSpeed = 100, 
  delay = 1000 
}) => {
  const [index, setIndex] = useState<number>(0);
  const [subIndex, setSubIndex] = useState<number>(0);
  const [reverse, setReverse] = useState<boolean>(false);
  const [blink, setBlink] = useState<boolean>(true);

  // Typing logic
  useEffect(() => {
    if (index === words.length) {
      setIndex(0); // Loop back to the first word
      return;
    }

    if (!reverse && subIndex < words[index].length) {
      const timeout = setTimeout(() => {
        setSubIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }

    if (!reverse && subIndex === words[index].length) {
      const timeout = setTimeout(() => {
        setReverse(true);
      }, delay);
      return () => clearTimeout(timeout);
    }

    if (reverse && subIndex > 0) {
      const timeout = setTimeout(() => {
        setSubIndex((prev) => prev - 1);
      }, deletingSpeed);
      return () => clearTimeout(timeout);
    }

    if (reverse && subIndex === 0) {
      const timeout = setTimeout(() => {
        setReverse(false);
        // Use the modulo operator to loop back to 0 after the last word
        setIndex((prev) => (prev + 1) % words.length); // <--- THIS IS THE FIX
      }, delay / 2);
      return () => clearTimeout(timeout);
    }
  }, [subIndex, index, reverse, words, typingSpeed, deletingSpeed, delay]);

  // Cursor blink effect
  useEffect(() => {
    const cursorTimeout = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500); // Blink speed
    return () => clearTimeout(cursorTimeout);
  }, [blink]);

  return (
    <span className="inline-block relative">
      {`${words[index].substring(0, subIndex)}`}
      <span className={`align-middle border-l-2 border-white transition-opacity duration-500 ${blink ? 'opacity-100' : 'opacity-0'}`}>
        &nbsp;
      </span>
    </span>
  );
};

export default TypingText;
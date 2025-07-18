import { useState, useEffect, useCallback, RefObject } from "react";

// Custom hook for typing animation
export function useTypingEffect(texts: string[], typingSpeed = 100, deletingSpeed = 50, delayAfterTyping = 2000, delayBeforeTyping = 500) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingDelay, setTypingDelay] = useState(typingSpeed);

  useEffect(() => {
    const currentTextIndex = loopNum % texts.length;
    const fullText = texts[currentTextIndex];

    const timer = setTimeout(() => {
      if (isDeleting) {
        // Deleting text
        setDisplayText(prevText => prevText.substring(0, prevText.length - 1));
        setTypingDelay(deletingSpeed);
      } else {
        // Typing text
        setDisplayText(prevText => fullText.substring(0, prevText.length + 1));
        setTypingDelay(typingSpeed);
      }

      // Logic for transition between typing and deleting
      if (!isDeleting && displayText === fullText) {
        // Finished typing, delay before deleting
        setTimeout(() => setIsDeleting(true), delayAfterTyping);
        setTypingDelay(deletingSpeed);
      } else if (isDeleting && displayText === '') {
        // Finished deleting, move to next text
        setIsDeleting(false);
        setLoopNum(prevLoopNum => prevLoopNum + 1);
        setTypingDelay(delayBeforeTyping); // Pause before typing next
      }
    }, typingDelay);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, texts, typingSpeed, deletingSpeed, delayAfterTyping, delayBeforeTyping, typingDelay]);

  return { displayText, currentTextIndex: loopNum % texts.length };
}

// Custom hook for section scrolling detection
export function useSectionInView(sectionRefs: RefObject<HTMLElement>[]) {
  const [activeSection, setActiveSection] = useState<string>("home");

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    for (let i = sectionRefs.length - 1; i >= 0; i--) {
      const section = sectionRefs[i].current;
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(section.id);
        break;
      }
    }
  }, [sectionRefs]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return activeSection;
}

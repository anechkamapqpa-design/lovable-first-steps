import { motion } from "framer-motion";

/**
 * Animates text in per character, but keeps each word unbreakable so a line
 * never wraps in the middle of a word — breaks only happen between words.
 */
export function AnimatedText({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  let charIndex = 0;
  return (
    <span className={className}>
      {words.map((word, wi) => (
        <span key={wi}>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((char) => {
              const i = charIndex++;
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

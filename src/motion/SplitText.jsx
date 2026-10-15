/**
 * SplitText — renders text split into word/char spans.
 * - Keeps original string in aria-label on the wrapper.
 * - All spans are aria-hidden="true".
 * - Words wrapped in .word, chars in .char (when splitChars=true).
 *
 * Props:
 *   text       — the string to split
 *   splitChars — also split each word into individual chars (default false)
 *   className  — applied to the outer <span>
 *   Tag        — wrapper element (default 'span')
 */
export function SplitText({
  text,
  splitChars = false,
  className = '',
  Tag = 'span',
}) {
  const words = String(text).split(' ');

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span
          key={wi}
          className="word inline-block overflow-hidden"
          aria-hidden="true"
        >
          {splitChars
            ? word.split('').map((char, ci) => (
                <span key={ci} className="char inline-block">
                  {char}
                </span>
              ))
            : <span className="char inline-block">{word}</span>
          }
          {/* Non-breaking space between words except after last */}
          {wi < words.length - 1 && <span aria-hidden="true">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}

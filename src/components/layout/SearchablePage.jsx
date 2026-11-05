
import React, { useEffect, useRef } from 'react';
import './SearchablePage.css';

const HIGHLIGHT_NAME = 'global-page-search';

export default function SearchablePage({ query, children }) {
  const pageRef = useRef(null);

  useEffect(() => {
    const searchText = query?.trim();

    // Remove previous highlights.
    if (window.CSS?.highlights) {
      window.CSS.highlights.delete(HIGHLIGHT_NAME);
    }

    if (!searchText || !pageRef.current) {
      return;
    }

    // Modern Chrome / Edge browser support.
    if (!window.CSS?.highlights || !window.Highlight) {
      console.warn(
        'CSS Custom Highlight API is not supported in this browser.'
      );
      return;
    }

    const root = pageRef.current;
    const ranges = [];

    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const parent = node.parentElement;

          if (!parent || !node.nodeValue.trim()) {
            return NodeFilter.FILTER_REJECT;
          }

          // Ignore non-searchable elements.
          if (
            parent.closest(
              'script, style, noscript, input, textarea, select, option, [contenteditable="true"]'
            )
          ) {
            return NodeFilter.FILTER_REJECT;
          }

          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const searchLower = searchText.toLocaleLowerCase();

    let firstMatch = null;
    let textNode;

    while ((textNode = walker.nextNode())) {
      const text = textNode.nodeValue;
      const lowerText = text.toLocaleLowerCase();

      let startIndex = 0;

      while (true) {
        const matchIndex = lowerText.indexOf(
          searchLower,
          startIndex
        );

        if (matchIndex === -1) break;

        const range = document.createRange();

        range.setStart(textNode, matchIndex);
        range.setEnd(
          textNode,
          matchIndex + searchText.length
        );

        ranges.push(range);

        if (!firstMatch) {
          firstMatch = range;
        }

        startIndex = matchIndex + searchText.length;
      }
    }

    if (ranges.length > 0) {
      const highlight = new window.Highlight(...ranges);

      window.CSS.highlights.set(
        HIGHLIGHT_NAME,
        highlight
      );

      // Scroll to the first matching result.
      requestAnimationFrame(() => {
        if (firstMatch) {
          firstMatch.startContainer.parentElement?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
        }
      });
    }

    return () => {
      window.CSS?.highlights?.delete(HIGHLIGHT_NAME);
    };

  }, [query, children]);

  return (
    <div className="searchable-page" ref={pageRef}>
      {children}
    </div>
  );
}

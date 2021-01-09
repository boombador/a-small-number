// Credit to https://www.jayfreestone.com/writing/react-portals-with-hooks/

import { useRef, useEffect } from 'react';

/**
 * Hook to create a React Portal.
 * Automatically handles creating and tearing-down the root elements (no SRR
 * makes this trivial), so there is no need to ensure the parent target already
 * exists.
 * @example
 * const target = usePortal(id, [id]);
 * return createPortal(children, target);
 * @param {String} id The id of the target container, e.g 'modal' or 'spotlight'
 * @returns {HTMLElement} The DOM node to use as the Portal target.
 */
export const usePortal = (): HTMLElement => {
  const rootElemRef = useRef<HTMLElement | null>(null);

  useEffect(function setupElement() {
    const parentElem = document.getElementById('portal-root');
    const { current } = rootElemRef;

    if (!parentElem || !current) return;
    // Add the detached element to the parent
    parentElem.appendChild(current);

    return function removeElement() {
      current.remove();
    };
  }, []);

  /**
   * It's important we evaluate this lazily:
   * - We need first render to contain the DOM element, so it shouldn't happen
   *   in useEffect. We would normally put this in the constructor().
   * - We can't do 'const rootElemRef = useRef(document.createElement('div))',
   *   since this will run every single render (that's a lot).
   * - We want the ref to consistently point to the same DOM element and only
   *   ever run once.
   * @link https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
   */
  function getRootElem() {
    if (!rootElemRef.current) {
      const elem = document.createElement('div');
      elem.setAttribute('class', 'portal');
      rootElemRef.current = elem;
    }
    return rootElemRef.current;
  }

  return getRootElem();
};

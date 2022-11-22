import { useViewport } from '../../hooks/Viewport';

export const DateSearchPickerStyle = () => {
  const viewport = useViewport();

  return (
    <style>{`
      .rdp {
      --rdp-cell-size: ${viewport.width > 800 ? '50' : '40'}px;
      --rdp-accent-color: #0000ff;
      --rdp-background-color: #e7edff;
      --rdp-accent-color-dark: #3003e1;
      --rdp-background-color-dark: #180270;
      --rdp-outline: 2px solid var(--rdp-accent-color); /* Outline border for focused elements */
      --rdp-outline-selected: 3px solid var(--rdp-accent-color); /* Outline border for focused _and_ selected elements */

      margin: 2em;
    }
    `}</style>
  );
}

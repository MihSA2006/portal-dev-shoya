import { useCallback } from 'react';
import { applyAction } from '../utils/editorActions';

/** Applique le changement en gardant l'historique d'annulation (Ctrl+Z) quand le navigateur le permet. */
const applyEdit = (ta, { from, to, text, selStart, selEnd }) => {
  ta.focus();
  ta.setSelectionRange(from, to);
  let ok = false;
  try {
    ok = text === '' ? document.execCommand('delete') : document.execCommand('insertText', false, text);
  } catch {
    ok = false;
  }
  if (!ok) {
    ta.setRangeText(text, from, to, 'end');
    ta.dispatchEvent(new Event('input', { bubbles: true }));
  }
  ta.setSelectionRange(selStart, selEnd);
};

/** Renvoie run(action) : exécute une action Markdown sur le textarea référencé. */
export default function useMarkdownActions(textareaRef) {
  return useCallback(
    (action) => {
      const ta = textareaRef.current;
      if (!ta) return false;
      const edit = applyAction(action, ta.value, ta.selectionStart, ta.selectionEnd);
      if (!edit) return false;
      applyEdit(ta, edit);
      return true;
    },
    [textareaRef]
  );
}

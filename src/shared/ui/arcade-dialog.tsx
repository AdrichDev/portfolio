"use client";

import { useEffect, useRef, type ReactNode, type KeyboardEvent, type RefObject } from "react";

export function ArcadeDialog({ open, label, pauseLabel, backLabel, trigger, onClose, children }: {
  open: boolean; label: string; pauseLabel: string; backLabel: string; trigger: RefObject<HTMLElement | null>; onClose: () => void; children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const motion = useRef<Animation | null>(null);
  const originTransform = useRef("none");
  const closing = useRef(false);
  const generation = useRef(0);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !open) return;
    const opener = trigger.current;
    const origin = opener?.getBoundingClientRect();
    const openGeneration = ++generation.current;
    closing.current = false;
    dialog.showModal();
    dialog.querySelector<HTMLElement>("[data-dialog-scroll]")?.scrollTo(0, 0);
    if (origin) {
      const target = dialog.getBoundingClientRect();
      const dx = origin.x + origin.width / 2 - target.x - target.width / 2;
      const dy = origin.y + origin.height / 2 - target.y - target.height / 2;
      originTransform.current = `translate(${dx}px, ${dy}px) scale(${origin.width / target.width}, ${origin.height / target.height})`;
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        motion.current = dialog.animate([
          { transform: originTransform.current, opacity: 0.65 },
          { transform: "translate(0, 0) scale(1, 1)", opacity: 1 },
        ], { duration: 420, easing: "cubic-bezier(.2,.75,.2,1)" });
        motion.current.id = "button-to-dialog";
      }
    }
    return () => {
      generation.current = openGeneration + 1;
      motion.current?.cancel();
      motion.current = null;
      closing.current = false;
      dialog.close();
      opener?.focus();
    };
  }, [open, trigger]);

  function requestClose() {
    const dialog = ref.current;
    if (!dialog?.open || closing.current) return;
    closing.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }
    const current = getComputedStyle(dialog);
    const transform = current.transform;
    const opacity = current.opacity;
    motion.current?.cancel();
    const currentGeneration = generation.current;
    motion.current = dialog.animate([
      { transform, opacity },
      { transform: originTransform.current, opacity: 0.65 },
    ], { duration: 320, easing: "cubic-bezier(.55,0,.8,.35)", fill: "forwards" });
    motion.current.id = "dialog-to-button";
    motion.current.onfinish = () => {
      if (currentGeneration === generation.current && closing.current) onClose();
    };
  }

  function trapFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      requestClose();
      return;
    }
    if (event.key !== "Tab") return;
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], summary, [tabindex="0"]',
    )).filter((element) => element.getClientRects().length > 0);
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }

  return (
    <dialog ref={ref} aria-label={label} className="arcade-dialog" onCancel={(event) => { event.preventDefault(); requestClose(); }} onKeyDown={trapFocus}>
      <div className="dialog-toolbar"><span className="cabinet-label" aria-hidden="true">{pauseLabel} · {label}</span><div className="dialog-controls"><button type="button" autoFocus className="game-button return-button" onClick={requestClose}>{backLabel} <span aria-hidden="true">×</span></button></div></div>
      <div className="dialog-scroll" data-dialog-scroll tabIndex={0}>{children}</div>
    </dialog>
  );
}

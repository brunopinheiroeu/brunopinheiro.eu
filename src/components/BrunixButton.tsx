"use client";
import { useState } from "react";

export default function BrunixButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="fixed bottom-4 right-4 rounded-full border px-4 py-2 shadow"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        Brunix
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed bottom-20 right-4 w-[360px] max-w-[90vw] border rounded-lg bg-white shadow p-3"
        >
          <div className="flex items-center justify-between mb-2">
            <strong>Ask Brunix</strong>
            <button onClick={() => setOpen(false)} aria-label="Fechar">
              ✕
            </button>
          </div>
          <div className="text-sm text-zinc-600">
            (Aqui vai o chat depois. MVP: placeholder.)
          </div>
        </div>
      )}
    </>
  );
}

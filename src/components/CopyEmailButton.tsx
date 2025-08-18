"use client";

export default function CopyEmailButton({ email }: { email: string }) {
  return (
    <button
      className="px-4 py-2 border rounded"
      onClick={() => navigator.clipboard.writeText(email)}
      aria-label="Copiar e-mail"
    >
      Copiar email
    </button>
  );
}

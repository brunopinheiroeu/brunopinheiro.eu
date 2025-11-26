export default function Footer() {
  return (
    <footer className="bg-white py-6 text-center text-sm text-muted">
      © {new Date().getFullYear()} Bruno Pinheiro — Built with Next.js &
      Tailwind using LLMs and creativity.
    </footer>
  );
}

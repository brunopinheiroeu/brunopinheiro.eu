export default function Footer() {
  return (
    <footer className="bg-white py-6 text-center text-sm text-slate-500">
      © {new Date().getFullYear()} Bruno Pinheiro — Built with Next.js &
      Tailwind
    </footer>
  );
}

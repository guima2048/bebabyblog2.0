import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <h2>Página não encontrada</h2>
      <Link href="/" style={{ color: 'blue' }}>Voltar para a Home</Link>
    </div>
  );
} 
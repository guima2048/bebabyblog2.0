"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <h2>Ocorreu um erro inesperado.</h2>
      <pre style={{ color: 'red', margin: 16 }}>{error.message}</pre>
      <button onClick={() => reset()} style={{ marginTop: 16, padding: 8 }}>
        Tentar novamente
      </button>
    </div>
  );
} 
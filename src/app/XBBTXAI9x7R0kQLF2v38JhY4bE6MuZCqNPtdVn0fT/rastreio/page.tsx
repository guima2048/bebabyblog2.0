"use client";
import { useEffect, useState, useMemo } from "react";
import * as XLSX from 'xlsx';

interface GeoData {
    country?: string;
    regionName?: string;
    city?: string;
    isp?: string;
}

interface Comentario {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  data: string;
  status: "pendente" | "aprovado" | "rejeitado";
  ip?: string;
  geo?: GeoData;
}

const getNested = (obj: any, path: string) => {
    return path.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
}

export default function RastreioComentarios() {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>({ key: 'data', direction: 'descending' });

  const fetchComentarios = () => {
    setLoading(true);
    fetch(`/api/comments?all=true&status=${filtroStatus}`)
      .then((res) => res.json())
      .then((data) => {
        setComentarios(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchComentarios();
  }, [filtroStatus]);

  const sortedComentarios = useMemo(() => {
    let sortableItems = [...comentarios];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = getNested(a, sortConfig.key);
        const bValue = getNested(b, sortConfig.key);
        
        if (aValue === undefined || aValue === null) return 1;
        if (bValue === undefined || bValue === null) return -1;

        const valA = typeof aValue === 'string' ? aValue.toLowerCase() : aValue;
        const valB = typeof bValue === 'string' ? bValue.toLowerCase() : bValue;

        if (valA < valB) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (valA > valB) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [comentarios, sortConfig]);

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
  };
  
  const handleDownload = () => {
    const dataToExport = sortedComentarios.map(c => ({
        'Nome': c.nome,
        'Email': c.email,
        'Telefone': c.telefone,
        'Status': c.status,
        'Data e Hora': new Date(c.data).toLocaleString('pt-BR'),
        'IP': c.ip || 'N/A',
        'País': c.geo?.country || 'N/A',
        'Região': c.geo?.regionName || 'N/A',
        'Cidade': c.geo?.city || 'N/A',
        'Provedor': c.geo?.isp || 'N/A',
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Comentarios");
    XLSX.writeFile(workbook, "rastreio_comentarios.xlsx");
  };

  return (
    <section className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Rastreamento de Comentários</h1>
        <button onClick={handleDownload} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded font-semibold shadow" disabled={loading || comentarios.length === 0}>
            Baixar como Excel
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="mr-2">Filtrar por status:</label>
        <select id="status" value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)} className="p-2 rounded border">
          <option value="todos">Todos</option>
          <option value="pendente">Pendente</option>
          <option value="aprovado">Aprovado</option>
          <option value="rejeitado">Rejeitado</option>
        </select>
      </div>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-2 cursor-pointer" onClick={() => requestSort('nome')}>Nome{getSortIndicator('nome')}</th>
                <th className="p-2 cursor-pointer" onClick={() => requestSort('email')}>Email{getSortIndicator('email')}</th>
                <th className="p-2 cursor-pointer" onClick={() => requestSort('telefone')}>Telefone{getSortIndicator('telefone')}</th>
                <th className="p-2 cursor-pointer" onClick={() => requestSort('status')}>Status{getSortIndicator('status')}</th>
                <th className="p-2 cursor-pointer" onClick={() => requestSort('data')}>Data e Hora{getSortIndicator('data')}</th>
                <th className="p-2 cursor-pointer" onClick={() => requestSort('ip')}>IP{getSortIndicator('ip')}</th>
                <th className="p-2 cursor-pointer" onClick={() => requestSort('geo.country')}>País{getSortIndicator('geo.country')}</th>
                <th className="p-2 cursor-pointer" onClick={() => requestSort('geo.regionName')}>Região{getSortIndicator('geo.regionName')}</th>
                <th className="p-2 cursor-pointer" onClick={() => requestSort('geo.city')}>Cidade{getSortIndicator('geo.city')}</th>
                <th className="p-2 cursor-pointer" onClick={() => requestSort('geo.isp')}>Provedor{getSortIndicator('geo.isp')}</th>
              </tr>
            </thead>
            <tbody>
              {sortedComentarios.map((c, index) => (
                <tr key={`${c.id}-${index}`} className="border-t">
                  <td className="p-2 font-semibold">{c.nome}</td>
                  <td className="p-2">{c.email}</td>
                  <td className="p-2">{c.telefone}</td>
                  <td className="p-2 capitalize">{c.status}</td>
                  <td className="p-2">{new Date(c.data).toLocaleString('pt-BR')}</td>
                  <td className="p-2">{c.ip || 'N/A'}</td>
                  <td className="p-2">{c.geo?.country || 'N/A'}</td>
                  <td className="p-2">{c.geo?.regionName || 'N/A'}</td>
                  <td className="p-2">{c.geo?.city || 'N/A'}</td>
                  <td className="p-2">{c.geo?.isp || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
} 
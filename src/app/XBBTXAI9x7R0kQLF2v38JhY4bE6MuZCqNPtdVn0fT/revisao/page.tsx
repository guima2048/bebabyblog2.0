"use client";

import { useState, useEffect } from "react";

interface Status {
  adminAuth: boolean;
  crudPosts: boolean;
  crudFaq: boolean;
  crudAutores: boolean;
  uploads: boolean;
  newsletter: boolean;
  seo: boolean;
  analytics: boolean;
  backup: boolean;
  mobile: boolean;
  performance: boolean;
  security: boolean;
}

export default function RevisaoPage() {
  const [status, setStatus] = useState<Status>({
    adminAuth: false,
    crudPosts: false,
    crudFaq: false,
    crudAutores: false,
    uploads: true,
    newsletter: false,
    seo: false,
    analytics: false,
    backup: false,
    mobile: false,
    performance: false,
    security: false,
  });

  useEffect(() => {
    // Verificar autenticação
    fetch("/api/login")
      .then((res) => res.json())
      .then((data) => {
        setStatus((prev) => ({ ...prev, adminAuth: data.authenticated }));
      });

    // Verificar CRUD de posts
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setStatus((prev) => ({ ...prev, crudPosts: Array.isArray(data) }));
      });

    // Verificar CRUD de FAQ
    fetch("/api/faq")
      .then((res) => res.json())
      .then((data) => {
        setStatus((prev) => ({ ...prev, crudFaq: Array.isArray(data) }));
      });

    // Verificar CRUD de autores
    fetch("/api/autores")
      .then((res) => res.json())
      .then((data) => {
        setStatus((prev) => ({ ...prev, crudAutores: Array.isArray(data) }));
      });

    // Verificar uploads
    fetch("/api/upload")
      .then((res) => res.json())
      .then((data) => {
        setStatus((prev) => ({ ...prev, uploads: data.ok }));
      });

    // Verificar newsletter
    fetch("/api/newsletter")
      .then((res) => res.json())
      .then((data) => {
        setStatus((prev) => ({ ...prev, newsletter: Array.isArray(data) }));
      });

    // Verificar SEO
    fetch("/api/seo")
      .then((res) => res.json())
      .then((data) => {
        setStatus((prev) => ({ ...prev, seo: data.ok }));
      });

    // Verificar analytics
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => {
        setStatus((prev) => ({ ...prev, analytics: data.ok }));
      });

    // Verificar backup
    fetch("/api/backup")
      .then((res) => res.json())
      .then((data) => {
        setStatus((prev) => ({ ...prev, backup: data.ok }));
      });

    // Verificar mobile
    fetch("/api/mobile")
      .then((res) => res.json())
      .then((data) => {
        setStatus((prev) => ({ ...prev, mobile: data.ok }));
      });

    // Verificar performance
    fetch("/api/performance")
      .then((res) => res.json())
      .then((data) => {
        setStatus((prev) => ({ ...prev, performance: data.ok }));
      });

    // Verificar security
    fetch("/api/security")
      .then((res) => res.json())
      .then((data) => {
        setStatus((prev) => ({ ...prev, security: data.ok }));
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Revisão do Projeto</h1>
      <div className="grid gap-4">
        <span>
          <b>Autenticação/Admin Seguro:</b> <br />
          <span className="text-gray-400">
            {status.adminAuth ? "OK" : "Qualquer pessoa pode acessar o admin. Precisa de login/senha."}
          </span>
        </span>
        <span>
          <b>CRUD de Posts:</b> <br />
          <span className="text-gray-400">
            {status.crudPosts ? "OK" : "Precisa implementar CRUD completo de posts."}
          </span>
        </span>
        <span>
          <b>CRUD de FAQ:</b> <br />
          <span className="text-gray-400">
            {status.crudFaq ? "OK" : "Precisa implementar CRUD de FAQ."}
          </span>
        </span>
        <span>
          <b>CRUD de Autores:</b> <br />
          <span className="text-gray-400">
            {status.crudAutores ? "OK" : "Precisa implementar CRUD de autores."}
          </span>
        </span>
        <span>
          <b>Uploads:</b> <br />
          <span className="text-gray-400">
            {status.uploads
              ? "OK - Uploads dependem de permissão de escrita no VPS e não têm fallback/aviso robusto."
              : "Precisa implementar sistema de uploads."}
          </span>
        </span>
        <span>
          <b>Newsletter:</b> <br />
          <span className="text-gray-400">
            {status.newsletter ? "OK" : "Precisa implementar sistema de newsletter."}
          </span>
        </span>
        <span>
          <b>SEO:</b> <br />
          <span className="text-gray-400">
            {status.seo ? "OK" : "Precisa implementar meta tags, sitemap, etc."}
          </span>
        </span>
        <span>
          <b>Analytics:</b> <br />
          <span className="text-gray-400">
            {status.analytics ? "OK" : "Precisa implementar analytics."}
          </span>
        </span>
        <span>
          <b>Backup:</b> <br />
          <span className="text-gray-400">
            {status.backup ? "OK" : "Precisa implementar sistema de backup."}
          </span>
        </span>
        <span>
          <b>Mobile:</b> <br />
          <span className="text-gray-400">
            {status.mobile ? "OK" : "Precisa testar e ajustar responsividade."}
          </span>
        </span>
        <span>
          <b>Performance:</b> <br />
          <span className="text-gray-400">
            {status.performance ? "OK" : "Precisa otimizar performance."}
          </span>
        </span>
        <span>
          <b>Security:</b> <br />
          <span className="text-gray-400">
            {status.security
              ? "OK"
              : "Sem autenticação, sem logs, sem proteção de rotas."}
          </span>
        </span>
      </div>
    </div>
  );
} 
"use client";

import { useState } from 'react';

export default function LeadForm() {
  return (
    <form className="mt-8 p-4 border rounded bg-gray-50 dark:bg-zinc-800">
      <h3 className="text-lg font-semibold mb-2">Receba novidades!</h3>
      <input
        type="email"
        placeholder="Seu e-mail"
        className="border p-2 rounded w-full mb-2"
        required
      />
      <button
        type="submit"
        className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition"
      >
        Inscrever-se
      </button>
    </form>
  )
}

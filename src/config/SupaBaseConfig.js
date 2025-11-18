import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://esrfnmewtaammoktmfci.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzcmZubWV3dGFhbW1va3RtZmNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MjYzNjcsImV4cCI6MjA3OTAwMjM2N30.jjuYyG2KlMyV9BYuaWYim0Cv_OIqnMaT-inK6PnYeGo'

// 🔥 AQUI O ERRO — você criou mas NÃO exportou
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// util: converte "dd/mm/yyyy" -> "YYYY-MM-DD"
export function ddmmyyyyToIso(dateStr) {
  const [d, m, y] = dateStr.split('/');
  if (!d || !m || !y) throw new Error('data inválida');
  return `${y.padStart(4,'0')}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`;
}

export async function createUser(payload) {
  const isoDate = ddmmyyyyToIso(payload.data_de_admissao_ddmmyyyy);

  const { data, error } = await supabase
    .from('users')
    .insert([{
      nome: payload.nome,
      cpf: payload.cpf.replace(/\D/g,''),
      email: payload.email.trim().toLowerCase(),
      setor: payload.setor,
      status: payload.status || 'ativo',
      tipo: payload.tipo || 'Funcionario',
      data_de_admissao: isoDate
    }]);

  if (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
  return data;
}

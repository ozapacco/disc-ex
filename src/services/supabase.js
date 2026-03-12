import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.vite_supabase_url || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.vite_supabase_anon_key || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function salvarAvaliacao(dados) {
  const { data, error } = await supabase
    .from('avaliacoes')
    .insert([dados])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function buscarAvaliacao(id) {
  const { data, error } = await supabase
    .from('avaliacoes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function listarAvaliacoes() {
  const { data, error } = await supabase
    .from('avaliacoes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function excluirAvaliacao(id) {
  const { error } = await supabase
    .from('avaliacoes')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}

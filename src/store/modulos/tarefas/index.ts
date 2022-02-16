import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_TAREFAS,
} from "@/store/tipo-acoes";
import {
  ADICIONA_TAREFA,
  ALTERA_TAREFA,
  DEFINIR_TAREFAS,
} from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
  tarefas: ITarefa[];
}

export const tarefa: Module<EstadoTarefa, Estado> = {
  state: {
    tarefas: [],
  },
  mutations: {
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      console.log("ADICIONA_TAREFA...");
      state.tarefas.push(tarefa);
    },
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      console.log("DEFINIR_TAREFAS...");
      console.log("tarefas", tarefas);
      state.tarefas = tarefas;
    },

    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex((t) => t.id == tarefa.id);
      state.tarefas[index] = tarefa;
    },
  },
  actions: {
    [OBTER_TAREFAS]({ commit }, filtro: string) {
      console.log("OBTER_TAREFAS..");
      let url = 'tarefas'

      if(filtro){
          url += '?descricao='+filtro
      }  

      http
        .get(url)
        .then((response) => commit(DEFINIR_TAREFAS, response.data));
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      console.log("CADASTRAR_TAREFA...");
      return http
        .post("tarefas", tarefa)
        .then((resposta) => commit(ADICIONA_TAREFA, resposta.data));
    },
    [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http
        .put(`/tarefas/${tarefa.id}`, tarefa)
        .then(() => commit(ALTERA_TAREFA, tarefa));
    },
  },
};

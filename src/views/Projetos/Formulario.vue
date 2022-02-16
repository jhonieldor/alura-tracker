<template>
  <section class="projetos">
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjet"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/tipo-acoes";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String,
    },
  },

  setup(props) {
    const router = useRouter();
    const store = useStore();
    const { notificar } = useNotificador();
    const nomeDoProjeto = ref("");

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(
        (proj) => proj.id == props.id
      );
      nomeDoProjeto.value = projeto?.nome || "";
    }

    const lidarComSucesso = (msg: string) => {
      nomeDoProjeto.value = "";
      notificar(TipoNotificacao.SUCESSO, "Sucesso", msg);
      router.push("/projetos");
    };

    const salvar = () => {
      if (props.id) {
        //EDIT

        store
          .dispatch(ALTERAR_PROJETO, {
            id: props.id,
            nome: nomeDoProjeto.value,
          })
          .then(() => {
            lidarComSucesso("Projeto editado com sucesso!");
          })
          .catch((error) => {
            notificar(TipoNotificacao.FALHA, "Erro", error.message);
          });
      } else {
        //CREATE
        store
          .dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
          .then(() => {
            lidarComSucesso("Projeto incluído com sucesso!");
          })
          .catch((error) => {
            notificar(TipoNotificacao.FALHA, "Erro", error.message);
          });
      }
    };

    return {
      nomeDoProjeto,
      salvar
    };
  },
});
</script>



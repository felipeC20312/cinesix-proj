import { useState } from "react";
import DKActionButton from "../components/DKActioButton";
import { useNavigate } from "react-router-dom";

export const StartPage = () => {
  const [showDiolog, setShowDialog] = useState(false);
  const [dialogId, setDialogId] = useState(0);
  const navigate = useNavigate();

  const hdlShowDialog = (dialogId: number) => {
    if (showDiolog) {
      setShowDialog((prev: boolean) => !prev);
      setDialogId(0);
      return;
    }

    setShowDialog(true);
    setDialogId(dialogId);
  };

  return (
    <main className="relative flex">
      <section className="from-gradient-first-dark to-gradient-first-light relative flex h-dvh w-full items-center justify-center overflow-hidden bg-gradient-to-b p-3 md:p-0">
        <div className="flex h-full w-full flex-col items-center justify-around rounded-xl bg-white p-3 text-center md:h-1/2 md:w-1/2">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold">Descobrindo o Mundo!</h1>
            <h4 className="text-2xl font-extralight">
              Uma produção audiovisual interativa
            </h4>
            <p className="text-lg font-thin">selecione uma opção:</p>
          </div>

          <nav className="flex w-full flex-col gap-3 md:w-1/2">
            <DKActionButton
              onClick={() => hdlShowDialog(1)}
              className="border-background/50 bg-primary text-background w-full border-2 px-4 py-1 text-xl !font-bold !shadow-none"
            >
              Iniciar
            </DKActionButton>
            <DKActionButton
              onClick={() => hdlShowDialog(2)}
              className="text-primary border-background-darker w-full border-2 px-4 py-1 text-xl !font-bold !shadow-none"
            >
              Entenda o Projeto
            </DKActionButton>
            <DKActionButton
              onClick={() => hdlShowDialog(3)}
              className="border-background-darker text-primary w-full border-2 px-4 py-1 text-xl !font-bold !shadow-none"
            >
              Créditos
            </DKActionButton>
          </nav>
        </div>
      </section>

      {dialogId == 1 && (
        <>
          <dialog
            open={showDiolog}
            className="bg-background absolute top-1/2 left-1/2 z-20 flex w-11/12 -translate-1/2 flex-col items-center justify-center gap-3 rounded-xl p-3 text-center md:w-1/2"
          >
            <p>Deseja realmente inicial a experiência?</p>
            <div className="bg-background flex w-full items-center justify-center gap-3">
              <DKActionButton
                className="border-background/50 bg-primary rounded-lg border-2 px-4 py-1 font-bold text-red-900 !shadow-none"
                onClick={() => hdlShowDialog(0)}
              >
                Cancelar
              </DKActionButton>
              <DKActionButton
                onClick={() => navigate("/scene01")}
                className="border-background/50 rounded-lg border-2 bg-lime-300 px-4 py-1 font-bold text-lime-900 !shadow-none"
              >
                Iniciar
              </DKActionButton>
            </div>
          </dialog>
        </>
      )}

      {dialogId == 2 && (
        <>
          <dialog
            open={showDiolog}
            className="bg-background absolute top-1/2 left-1/2 z-20 flex max-h-5/6 w-11/12 -translate-1/2 flex-col items-center justify-center gap-3 rounded-xl p-3 text-left md:w-1/2"
          >
            <div
              className="flex flex-col gap-3 overflow-y-scroll p-4"
              role="document"
            >
              <header>
                <h1 className="text-2xl font-bold">
                  Projeto “Descobrindo o Mundo” (Vídeo Interativo Gamificado)
                </h1>
                <p className="text-sm text-gray-600">
                  Sistema audiovisual interativo gamificado para ensino
                  contextual de Libras e Português.
                </p>
              </header>

              <main>
                <section aria-labelledby="objetivo-geral">
                  <h2 id="objetivo-geral" className="text-xl font-semibold">
                    1. Objetivo Geral
                  </h2>
                  <p>Criar uma experiência educacional imersiva que:</p>
                  <ul className="ml-4 list-inside list-disc">
                    <li>
                      Reformule o processo de aprendizagem de Libras através de
                      interação contextual;
                    </li>
                    <li>Promova inclusão e acessibilidade comunicacional;</li>
                    <li>
                      Utilize narrativa, mecânicas de escolha e atividades
                      gamificadas para reforço de conteúdo.
                    </li>
                  </ul>
                </section>

                <section aria-labelledby="mecanica-funcionamento">
                  <h2
                    id="mecanica-funcionamento"
                    className="text-xl font-semibold"
                  >
                    2. Mecânica de Funcionamento
                  </h2>

                  <article
                    aria-labelledby="estrutura-interativa"
                    className="mt-2"
                  >
                    <h3
                      id="estrutura-interativa"
                      className="text-lg font-medium"
                    >
                      2.1 Estrutura Interativa
                    </h3>
                    <p>
                      Navegação por escolhas (point-and-select). Cada ambiente é
                      um módulo de aprendizagem que ativa microinterações
                      (reconhecimento de sinais, associação
                      imagem→palavra→sinal, escrita em português, escolhas de
                      diálogo).
                    </p>
                  </article>

                  <article aria-labelledby="gamificacao" className="mt-2">
                    <h3 id="gamificacao" className="text-lg font-medium">
                      2.2 Gamificação
                    </h3>
                    <ul className="ml-4 list-inside list-disc">
                      <li>Moedas virtuais por completar tarefas;</li>
                      <li>Lista de afazeres diária como sistema de missões;</li>
                      <li>Feedback imediato e progressão por ambiente.</li>
                    </ul>
                  </article>
                </section>

                <section aria-labelledby="personagens-funcoes" className="mt-4">
                  <h2
                    id="personagens-funcoes"
                    className="text-xl font-semibold"
                  >
                    3. Personagens e Funções Didáticas
                  </h2>

                  <dl className="ml-0">
                    <div className="mb-2">
                      <dt className="font-medium">Nina</dt>
                      <dd className="ml-4">
                        Protagonista surda; ponto de identificação do usuário.
                        Todas as interações passam por sua perspectiva.
                      </dd>
                    </div>
                    <div className="mb-2">
                      <dt className="font-medium">
                        Feirantes &amp; Transeuntes
                      </dt>
                      <dd className="ml-4">
                        Personagens ouvintes que simulam dificuldades reais de
                        comunicação.
                      </dd>
                    </div>
                    <div className="mb-2">
                      <dt className="font-medium">Padeiro</dt>
                      <dd className="ml-4">
                        Aliado que domina Libras — apoio didático no ambiente da
                        padaria.
                      </dd>
                    </div>
                    <div className="mb-2">
                      <dt className="font-medium">Professor</dt>
                      <dd className="ml-4">
                        Ensino formal: cores, gramática, vocabulário técnico e
                        situações práticas.
                      </dd>
                    </div>
                    <div className="mb-2">
                      <dt className="font-medium">Cobrador do Bondinho</dt>
                      <dd className="ml-4">
                        Personagem sem conhecimento de Libras — estimula uso do
                        português escrito.
                      </dd>
                    </div>
                  </dl>
                </section>

                <section
                  aria-labelledby="ambientes-funcionais"
                  className="mt-4"
                >
                  <h2
                    id="ambientes-funcionais"
                    className="text-xl font-semibold"
                  >
                    4. Ambientes Funcionais
                  </h2>

                  <article aria-labelledby="faculdade" className="mt-2">
                    <h3 id="faculdade" className="text-lg font-medium">
                      4.1 Faculdade
                    </h3>
                    <p>
                      Modulo pedagógico com atividades de alfabetização visual,
                      construção gramatical e vocabulário funcional (saúde,
                      segurança, dinheiro).
                    </p>
                  </article>

                  <article aria-labelledby="feira" className="mt-2">
                    <h3 id="feira" className="text-lg font-medium">
                      4.2 Feira de Rua (Demo)
                    </h3>
                    <p>
                      Ambiente principal da demo: seleção de barracas e itens;
                      cada item aciona apresentação do objeto, nome em
                      português, sinal em Libras (vídeo/avatar) e miniatividade
                      interativa.
                    </p>
                  </article>

                  <article aria-labelledby="padaria" className="mt-2">
                    <h3 id="padaria" className="text-lg font-medium">
                      4.3 Padaria
                    </h3>
                    <p>
                      Foco em transações financeiras simples, vocabulário de
                      alimentos, quantidades e pagamentos.
                    </p>
                  </article>

                  <article aria-labelledby="bondinho" className="mt-2">
                    <h3 id="bondinho" className="text-lg font-medium">
                      4.4 Bondinho
                    </h3>
                    <p>
                      Ensino de leitura de placas, compra de passagem e
                      exercícios de localização/roteamento.
                    </p>
                  </article>
                </section>

                <section aria-labelledby="arquitetura-sistema" className="mt-4">
                  <h2
                    id="arquitetura-sistema"
                    className="text-xl font-semibold"
                  >
                    5. Arquitetura Geral do Sistema
                  </h2>

                  <article
                    aria-labelledby="componentes-principais"
                    className="mt-2"
                  >
                    <h3
                      id="componentes-principais"
                      className="text-lg font-medium"
                    >
                      5.1 Componentes Principais
                    </h3>
                    <ul className="ml-4 list-inside list-disc">
                      <li>Vídeo base interativo com fluxos condicionais;</li>
                      <li>Motor de decisão (branching logic);</li>
                      <li>Módulo de atividades (exercícios modulares);</li>
                      <li>
                        Banco de conteúdos didáticos (Libras + Português);
                      </li>
                      <li>Sistema de progresso e gamificação;</li>
                      <li>
                        Camada de acessibilidade (legendas, descrição visual,
                        contraste, linguagem simples).
                      </li>
                    </ul>
                  </article>

                  <article aria-labelledby="fluxo-logico" className="mt-2">
                    <h3 id="fluxo-logico" className="text-lg font-medium">
                      5.2 Fluxo Lógico
                    </h3>
                    <ol className="ml-4 list-inside list-decimal">
                      <li>Carregamento da cena inicial (Nina sai de casa).</li>
                      <li>Usuário escolhe ambiente.</li>
                      <li>
                        Cena interativa é renderizada e personagens disparam
                        sinais/diálogos.
                      </li>
                      <li>
                        Módulos de aprendizado são ativados pós-interação.
                      </li>
                      <li>
                        Usuário recebe recompensa e atualiza lista de tarefas.
                      </li>
                      <li>
                        Ao concluir, pode selecionar outro ambiente ou encerrar
                        o dia.
                      </li>
                    </ol>
                  </article>
                </section>

                <section
                  aria-labelledby="expansao-modularidade"
                  className="mt-4"
                >
                  <h2
                    id="expansao-modularidade"
                    className="text-xl font-semibold"
                  >
                    6. Expansão e Modularidade
                  </h2>
                  <p>
                    Sistema preparado para adição de novos ambientes,
                    personagens, níveis de dificuldade e conteúdo adaptativo
                    baseado no desempenho do usuário.
                  </p>
                </section>

                <section
                  aria-labelledby="resultado-esperado"
                  className="mt-4 mb-4"
                >
                  <h2 id="resultado-esperado" className="text-xl font-semibold">
                    7. Resultado Esperado
                  </h2>
                  <ul className="ml-4 list-inside list-disc">
                    <li>
                      Facilitar aprendizado prático de Libras em contextos
                      reais;
                    </li>
                    <li>
                      Reforçar ensino de português escrito para usuários surdos
                      e afônicos;
                    </li>
                    <li>
                      Promover impacto social ao reduzir barreiras
                      comunicacionais.
                    </li>
                  </ul>
                </section>
              </main>

              <footer className="text-sm text-gray-500">
                <p>
                  Documento técnico — versão de apresentação. Disponível para
                  exportação como SRS, pitch para edital ou slides.
                </p>
              </footer>
            </div>
            <DKActionButton
              className="border-background/50 rounded-lg border-2 bg-lime-300 px-4 py-1 font-bold text-lime-900 !shadow-none"
              onClick={() => hdlShowDialog(0)}
            >
              Voltar
            </DKActionButton>
          </dialog>
        </>
      )}

      {dialogId == 3 && (
        <>
          <dialog
            open={showDiolog}
            className="bg-background absolute top-1/2 left-1/2 z-20 flex w-11/12 -translate-1/2 flex-col items-center justify-center gap-3 rounded-xl p-3 text-center md:w-1/2"
          >
            <section>
              <h1 className="text-2xl font-semibold">Fulano de tal</h1>
              <p>lorem ipsum dolor sit amet</p>

              <h1 className="text-2xl font-semibold">Fulano de tal</h1>
              <p>lorem ipsum dolor sit amet</p>

              <h1 className="text-2xl font-semibold">Fulano de tal</h1>
              <p>lorem ipsum dolor sit amet</p>
            </section>

            <DKActionButton
              className="border-background/50 rounded-lg border-2 bg-lime-300 px-4 py-1 font-bold text-lime-900 !shadow-none"
              onClick={() => hdlShowDialog(0)}
            >
              Voltar
            </DKActionButton>
          </dialog>
        </>
      )}

      {showDiolog && (
        <div className="absolute top-0 left-0 h-full w-full bg-black/80 content-none" />
      )}
    </main>
  );
};

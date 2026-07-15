# Permissionamento MCI — contexto e plano de implementação (front)

> Gerado em 2026-07-14 a partir da análise da API `mci-api` (NestJS/Prisma, em
> `Downloads\MCI-master\mci-api`), do projeto legado Laravel e deste front Next.js.

## 1. Modelo de permissão (fonte de verdade: API)

**Identidade do usuário** (devolvida no login em `POST /auth/login` → `usuario`, e em `GET /auth/me`):

```ts
{
  id_usuario: string;
  nome: string;
  email: string;
  role: string;   nivel: string;      // nomes legíveis
  id_role: number;                    // 1 = admin global, 2 = admin local
  id_nivel: number;                   // 1 = franqueadora, 2 = filial, 3 = departamento
  relacao: string | null;             // UUID da entidade do nível
  ano_ativo: number;
  hierarquia: {...};                  // cadeia resolvida pela API
}
```

**IMPORTANTE:** o JWT (`access_token`) carrega apenas `sub` e `email` — role/nível
NÃO estão no token. Para o middleware do Next conhecer o perfil, é preciso gravar
um segundo cookie de sessão no login com `id_role`/`id_nivel`/`relacao` (o payload
`usuario` da resposta do login já tem tudo).

**Escopo de dados (a API já filtra — o front não precisa filtrar nada):**

| Recurso | Admin global | Franqueadora | Filial | Departamento |
|---|---|---|---|---|
| Franqueadoras | todas | só a sua | a dona da sua filial | a dona da cadeia acima |
| Filiais | todas | todas da sua franqueadora | só a sua | a dona do seu departamento |
| Departamentos | todos | todos da sua cadeia | os da sua filial | só o seu |
| Copas / Jogos / Previdências | todos | toda a cadeia abaixo | dos seus departamentos | só do seu departamento |
| Usuários | todos | só da própria cadeia | filial + seus departamentos | só do departamento |
| Líderes | todos | da sua franqueadora | da franqueadora da cadeia | da franqueadora da cadeia |

- Níveis inferiores enxergam a cadeia para cima (1 registro de cada — útil p/ breadcrumb).
- Registro fora do escopo = **404** (não 403). 403 vem de role insuficiente.
- Copas/jogos têm recorte extra pelo `ano_ativo` do usuário nas listagens.
- Único endpoint restrito por role na API: `/usuarios/*` = **admin global apenas**
  (`@Roles(1)` em `usuarios.controller.ts`).

## 2. Decisão de arquitetura (já discutida e decidida)

**SEM tabela auxiliar de permissões no banco.** O modelo é estrutural (2 roles × 3 níveis).

1. **Sessão**: no `loginAction`, além do cookie `token`, gravar cookie httpOnly `sessao`
   com JSON `{ id_usuario, nome, id_role, id_nivel, relacao, ano_ativo }` (vem em
   `response.data.usuario`).
2. **Mapa estático único** (ex.: `src/lib/permissoes.ts`): regras rota → roles/níveis +
   helper `podeAcessar(pathname, sessao)`. Admin global (`id_role === 1`) ignora regras.
   Rota sem regra = liberada a qualquer autenticado (a API devolve dados já escopados).
   Regra inicial mínima espelhando a API: `/pages/cadastros/usuarios` → roles `[1]`.
3. **`src/middleware.ts`** com `matcher: ['/pages/:path*']`: sem cookie `token` →
   redirect para `/` (login); rota negada pelo mapa → redirect para `/pages`.
4. **Sidemenu**: `src/app/pages/layout.tsx` vira Server Component (hoje tem `"use client"`
   sem necessidade — não usa hooks), lê a sessão via helper server-side e passa como prop
   para `Sidebar`/`CadastroCollapse`/`ReuniaoCollapse`, que filtram seus itens com o MESMO
   `podeAcessar`. Menu e middleware nunca divergem.
5. **Front é UX, API é segurança**: mesmo forçando URL, a API devolve 403/404.

## 3. Estado atual deste front (levantado em 2026-07-14)

- Next 15 App Router + React 19, Tailwind 4, shadcn. Rotas sob `src/app/pages/*`
  (dashboard, centralmci, atualizacao, reuniaomci, relatorios, relatorios/analise,
  cadastros/{usuarios,franqueadoras,filiais,departamentos}, compromissos, reunioes).
- Login em `src/app/actions/auth.tsx` (`loginAction`): grava só o cookie `token`
  (httpOnly) e redireciona para `/pages`. **Não guarda role/nível.**
- Chamadas server-side via `src/app/services/serverApi.tsx` (axios + Bearer do cookie).
- **Não existe `middleware.ts`** — qualquer URL abre sem autenticação no front.
- Sidebar (`src/app/components/utils/sidebar/*`) é estática: todos veem todos os itens,
  inclusive "Cadastro > Usuários" (que a API nega a não-admins com 403).

## 4. Implementado em 2026-07-14

1. `src/app/types/auth/auth.tsx` — interface `ISessao`.
2. `src/app/utils/permissoes.tsx` — constantes de roles/níveis, `regrasRotas`,
   `canAccess(pathname, sessao)` e `parseSessao`. Mapa ÚNICO: alimenta middleware e sidebar.
3. `src/app/services/sessao.tsx` — `getSessao()` server-side lendo o cookie `sessao`.
4. `loginAction` (`app/actions/auth.tsx`) — grava cookies `token` + `sessao`;
   `logoutAction` limpa os dois (ainda sem botão na UI).
5. `src/middleware.ts` — sem token → redirect `/`; rota negada → redirect `/pages`;
   logado em `/` → redirect `/pages`. Sessão ausente com token válido passa
   (logins antigos; a API continua sendo a barreira real).
6. `pages/layout.tsx` virou Server Component e passa `sessao` ao `Sidebar`;
   `Sidebar`/`CadastroCollapse` filtram itens com `canAccess` (grupo "Cadastro"
   some se nenhum item restar).

Para restringir uma rota nova: adicionar uma linha em `regrasRotas` — menu e
bloqueio de rota acompanham juntos.

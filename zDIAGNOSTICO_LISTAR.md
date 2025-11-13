# 🔍 DIAGNÓSTICO: Problema do Listar.tsx

## 📋 Status
- **Problema**: Listar.tsx mostra erro "Erro ao carregar hóspedes"
- **DevTools**: Funciona perfeitamente (mostra todos os hospedes)
- **Conclusão**: O problema está no **frontend**, não no backend

---

## 🔎 Investigação

### O que NÃO mudou:
- ✅ Backend está funcionando (DevTools prova isso)
- ✅ Endpoint `/hospede/listar` retorna dados corretos

### O que pode estar errado:

#### 1. **URL da API duplicada** (Hipótese Principal)
```
PROBLEMA:
  - url.ts gera: "/sistema/hospede/listar"
  - axios baseURL: "http://localhost:8000/rest/sistema/v1"
  - URL final: "http://localhost:8000/rest/sistema/v1/sistema/hospede/listar" ❌

ESPERADO:
  - URL final: "http://localhost:8000/rest/sistema/v1/hospede/listar" ✅
```

#### 2. **Diferença entre React Router e APIs**
```
React Router (navegação do app):
  - Precisa de "/sistema" nas rotas
  - Exemplo: /sistema/dashboard, /sistema/hospede/listar
  - Usada em: useNavigate(), NavLink to=""

APIs (chamadas HTTP):
  - Precisa apenas da entidade
  - Exemplo: /hospede/listar, /funcao/listar
  - Usada em: http.get(), http.post()

Arquivo url.ts mistura os dois, causando a duplicação!
```

---

## 📂 Arquivos Envolvidos

### 1. `url.ts` (Problema!)
```
Atual: Gera rotas com "/sistema" para React Router
Problema: Mesmas rotas são usadas para APIs
Resultado: URL duplicada "/sistema/hospede/listar"
```

### 2. `api.hospede.ts`
```
Usa: ROTA.HOSPEDE.LISTAR que vem de url.ts
Deveria: Usar rota sem "/sistema" para API
```

### 3. `config.axios.ts`
```
baseURL: "http://localhost:8000/rest/sistema/v1"
Correto, mas não resolve o problema de duplicação
```

### 4. `Listar.tsx`
```
Chama: apiGetHospedes()
Recebe: Erro (causa desconhecida no backend)
Mostra: Toast "Erro ao carregar hóspedes"
```

---

## 🛠️ PRÓXIMOS PASSOS

### Opção A: Criar constante separada para APIs
```typescript
// Em url.ts, adicionar:
export const ROTA_API = {
  HOSPEDE: {
    LISTAR: "/hospede/listar",
    CRIAR: "/hospede/criar",
    // ... etc
  }
};

// Em api.hospede.ts, usar:
export const apiGetHospedes = async () => {
  return http.get(ROTA_API.HOSPEDE.LISTAR);
};
```

### Opção B: Corrigir url.ts para APIs
```typescript
// Remover "/sistema" da geração de rotas de API
// Manter "/sistema" apenas para React Router
```

### Opção C: Debug no Console
1. Abra DevTools (F12)
2. Console
3. Procure por logs `[axios]`
4. Verifique a URL completa sendo chamada
5. Compare com o que DevTools usa

---

## 📝 Documentação Adicionada

✅ `url.ts` - Explicação de React Router vs APIs
✅ `api.hospede.ts` - Logs para debug
✅ `config.axios.ts` - Interceptors melhorados com logs

---

## ✅ Checklist para Debug

- [ ] Abrir console (F12)
- [ ] Clicar em "Listar" na página
- [ ] Procurar por logs `[axios-request]` e `[axios-response]`
- [ ] Verificar URL completa montada
- [ ] Comparar com DevTools URL
- [ ] Identificar diferença

---

## 📊 Comparação: DevTools vs Listar

| Aspecto | DevTools | Listar.tsx |
|---------|----------|-----------|
| Funciona? | ✅ Sim | ❌ Não |
| API endpoint | ? (verificar) | `/sistema/hospede/listar` |
| Erro | Nenhum | "Erro ao carregar hóspedes" |
| Backend | 200 OK | ? (erro desconhecido) |

**Achado importante**: Se DevTools funciona mas Listar não, as URLs são diferentes!

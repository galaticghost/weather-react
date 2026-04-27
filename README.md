# 🌤️Weather React
Aplicativo web de previsão do tempo que permite buscar cidades e visualizar
informações climáticas atuais e previsão horária.

---

## Features
 - Detecção de localização aproximada por IP
 - Busca de cidades
 - Sugestões de cidades durante a busca
 - Exibição do clima atual:
    - Temperatura
    - Sensação térmica
    - Velocidade do vento
    - Precipitação
    - Cobertura de nuvens
    - Chance de chuva
- Previsão horária para o restante do dia:
  - Temperatura
  - Cobertura de nuvens
  - Chance de chuva
- Suporte a Português e Inglês

## ⚙️ Como rodar o projeto
### 1. Clone o repositório
```bash
  git clone https://github.com/galaticghost/weather-react
```

### 2. Entre na pasta do projeto
```bash
  cd weather-react
```

### 3. Instale as dependências
```bash
  npm install
```

### 4. Rode o projeto
```bash
  npm run dev
```

O projeto vai estar disponível em:
```
  http://localhost:5173
```

---
## 🛠️ Tecnologias utilizadas
  - React
  - TypeScript
  - Vite

---
## 🌐 APIs utilizadas
  - **Open-Meteo** - API responsável por fornecer dados meteorológicos atuais e previsão horária.
  - **IPinfo** - Utilizada para detectar a localização aproximada do usuário através do endereço IP.
  - **Photon** - Serviço de geocoding usado para buscar cidades e fornecer sugestões durante a digitação.

---
## 🌍 Deploy

A aplicação está disponível em:

[https://weather-react-nine-pi.vercel.app](https://weather-react-nine-pi.vercel.app)
# 📚 Plataforma de Nivelamento para Ensino Médio

![Banner da Plataforma](link_para_imagem_do_projeto.png) ## Sobre o Projeto(ainda será colocada uma imagem)

Este projeto consiste em uma **Plataforma Educacional de Nivelamento** desenvolvida para alunos do ensino médio, professores e gestão escolar. Nosso principal objetivo é oferecer uma ferramenta interativa e eficiente para que os estudantes possam identificar suas lacunas de aprendizado em diversas áreas (Exatas, Humanas e Natureza), recebendo feedback personalizado para aprimorar seus conhecimentos.

A plataforma contará com diferentes tipos de acesso (alunos, professores, gestão), cada um com funcionalidades específicas para atender às suas necessidades.

## Funcionalidades Principais

### Para Alunos:
* **Resolução de Questões:** Exercícios categorizados por área (Exatas, Humanas, Natureza).
* **Feedback Detalhado:** Análise do desempenho em cada área e sugestões de estudo para melhorar.
* **Acompanhamento de Progresso:** Visualização de históricos e evolução.

### Para Professores:
* **Visualização de Desempenho:** Acompanhamento do progresso individual e coletivo dos alunos.
* **Gestão de Conteúdo:** Criação e edição de questões e materiais de apoio.
* **Gerenciamento de Turmas:** Organização e acompanhamento dos grupos de alunos.

### Para a Gestão:
* **Gerenciamento de Usuários:** Cadastro e controle de alunos, professores e administradores.
* **Relatórios Estatísticos:** Visão geral do desempenho da instituição e áreas de melhoria.
* **Configurações do Sistema:** Ajustes e manutenção da plataforma.

## Tecnologias Utilizadas (Sugestão - pode ser ajustado)

* **Frontend:** `[HTML, CSS, TAILWINDCSS]`
* **Backend:** `[ Python (Django/Flask)]`
* **Banco de Dados:** `[PostgreSQL]`
* **Outras Ferramentas/Bibliotecas:** `[django.shortcuts,django.forms,Flask,Flask-SQLAlchemy,psycopg2-binary,Werkzeug]`

## Como Rodar o Projeto (Instruções a serem preenchidas)

Para configurar e rodar o projeto localmente, siga os passos abaixo:

### Pré-requisitos
* `[npm/yarn, Python, pip, etc.]`
* `[PostgreSQL instalado e configurado]`

## ⚙️ Configuração e Instalação

###  Passo a passo para configurar e instalar na sua maquina

```bash
git clone <Link para o Repositório>
cd Projeto-Avaliacao-EngSoftware

### 🧱 2. Criar e Ativar o Ambiente Virtual

#### 🔹 Windows:

```bash
python -m venv venv
.\venv\Scripts\activate

#### 🔸 macOS / Linux:

python3 -m venv venv
source venv/bin/activate

📦 3. Instalar Dependências
Instale o Django diretamente:

pip install Django

🗃️ 4. Configurar o Banco de Dados (EM BREVE)
Aplique as migrações iniciais:

python manage.py makemigrations auth_app
python manage.py migrate

👤 5. Criar um Superusuário (Opcional)
Para acessar o painel administrativo do Django:

python manage.py createsuperuser

🚀 Como Rodar o Projeto
Após tudo configurado, execute o servidor de desenvolvimento:

python manage.py runserver

Acesse o projeto no navegador em:

Página Inicial: http://127.0.0.1:8000/

Login: http://127.0.0.1:8000/login/

Cadastro: http://127.0.0.1:8000/cadastro/

Dashboard Aluno (temporário): http://127.0.0.1:8000/temp_dashboard/


## Contato

* **Seu Nome/Organização** - EM BREVE
* **Link do Projeto:** [git@github.com:tuleba1/Projeto-Avaliacao-EngSoftware.git]

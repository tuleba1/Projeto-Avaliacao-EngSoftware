from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required 
from .forms import CustomAuthenticationForm, CustomUserCreationForm



def login_view(request):
    if request.method == 'POST':
        form = CustomAuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            profile_type = form.cleaned_data.get('profile_type', 'aluno')

            login(request, user)
            messages.success(request, f"Bem-vindo(a), {user.username}!")

            if profile_type == 'diretor':
                return redirect('dashboard_diretor')
            elif profile_type == 'professor':
                return redirect('dashboard_professor')
            elif profile_type == 'aluno':
                return redirect('dashboard_aluno')
            else:
                return redirect('home')
        else:
            messages.error(request, "Usuário ou senha inválidos. Verifique suas credenciais e seu perfil.")
    else:
        form = CustomAuthenticationForm()

    return render(request, 'auth_app/login.html', {'form': form})



def cadastro_view(request):
    """
    View para o cadastro de novos usuários.
    Permite a criação de contas de usuário persistidas no banco de dados.
    Os dados são "temporários" no sentido de que, para este ambiente de desenvolvimento,
    o banco de dados SQLite pode ser facilmente resetado ou ignorado.
    """
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()  # Salva o novo usuário no banco de dados (db.sqlite3)
            login(request, user)  # Faz o login do novo usuário automaticamente
            messages.success(request, f"Cadastro realizado com sucesso! Bem-vindo(a), {user.username}!")
            # Redireciona o novo usuário para o dashboard do aluno como padrão
            return redirect('dashboard_aluno')
        else:
            # Se o formulário não for válido, exibe mensagens de erro
            # O Django fornece erros detalhados por campo e não de campo
            for field, errors in form.errors.items():
                for error in errors:
                    if field == '__all__': # Erros não relacionados a campos específicos (ex: senhas não batem)
                        messages.error(request, f"Erro: {error}")
                    else:
                        messages.error(request, f"Erro no campo '{field.replace('_', ' ').capitalize()}': {error}")
            messages.error(request, "Por favor, corrija os erros no formulário de cadastro.")
    else:
        form = CustomUserCreationForm() # Instancia um formulário vazio para requisições GET

    return render(request, 'auth_app/cadastro.html', {'form': form})


def logout_view(request):
    logout(request)
    messages.info(request, "Você foi desconectado(a).")
    return redirect('login')



def temp_dashboard_view(request, role='aluno'): 
    """
    *** TEMPORÁRIO: View para exibir o dashboard apenas para visualização/design. ***
    Não requer autenticação e pode ser acessada diretamente.
    Recebe um 'role' para simular diferentes dashboards.
    """
    template_map = {
        'aluno': 'auth_app/dashboard_aluno.html',
        'professor': 'auth_app/dashboard_professor.html',
        'diretor': 'auth_app/dashboard_diretor.html',
    }
    template_name = template_map.get(role, 'auth_app/dashboard_aluno.html')

    user_mock = type('UserMock', (object,), {
        'username': f"Usuário {role.capitalize()}",
        'is_authenticated': True
    })()

    messages.info(request, f"Você está visualizando o dashboard de {role.capitalize()} (modo de visualização temporário).")

    return render(request, template_name, {'user': user_mock, 'role': role.capitalize()})

@login_required
def render_dashboard(request, template_name, role_name):
    # Lógica de permissão e renderização do dashboard
    return render(request, template_name, {'user': request.user, 'role': role_name.capitalize()})


def home_page(request):
    if request.user.is_authenticated:
        if request.user.is_superuser:
            return redirect('dashboard_diretor')
        else:
            return redirect('dashboard_aluno')
    return redirect('login')

def cadastro_view(request):
    return render(request, 'auth_app/cadastro.html')

def questionario_materia_selecao(request):
    """
    View para a página de seleção de matéria do questionário.
    Apresenta as opções de matéria disponíveis no sistema (AGORA COM DADOS ESTÁTICOS).
    """
    # Use uma lista estática de matérias para fins visuais/temporários
    # Formato: ('valor_interno', 'Nome Exibido')
    materias_estaticas = [
        ('matematica', 'Matemática'),
        ('portugues', 'Português'),
        ('historia', 'História'),
        ('geografia', 'Geografia'),
        ('ciencias', 'Ciências'),
        ('biologia', 'Biologia'),
        ('fisica', 'Física'),
        ('quimica', 'Química'),
        ('redacao', 'Redação'),
        ('ingles', 'Inglês'),
        ('filosofia', 'Filosofia'), # Exemplo de adição de nova matéria só para visual
        ('sociologia', 'Sociologia'), # Exemplo de adição de nova matéria só para visual
    ]
    
    context = {
        'materias': materias_estaticas, # Passa a lista estática para o template
        # Você pode passar um objeto de usuário mockado se esta view for acessível sem login no modo dev
        'user': type('UserMock', (object,), {'username': 'Aluno Teste', 'is_authenticated': True})()
    }
    # Certifique-se que o 'context' é passado corretamente (sem 'context=') e o caminho do template.
    return render(request, 'questionario_materia_selecao.html', context)


def relatorios_view(request):
    """
    View para a página de Relatórios (visualização com gráfico fictício).
    """
    # Dados de desempenho fictícios para o relatório
    relatorio_disciplinas = [
        {'nome': 'Matemática', 'media': 78, 'percentual_acertos': 78},
        {'nome': 'Português', 'media': 65, 'percentual_acertos': 65},
        {'nome': 'Física', 'media': 70, 'percentual_acertos': 70},
        {'nome': 'Química', 'media': 82, 'percentual_acertos': 82},
        {'nome': 'História', 'media': 88, 'percentual_acertos': 88},
        {'nome': 'Geografia', 'media': 75, 'percentual_acertos': 75},
        {'nome': 'Biologia', 'media': 60, 'percentual_acertos': 60},
    ]

    context = {
        'user': type('UserMock', (object,), {'username': 'Aluno Teste', 'is_authenticated': True})(),
        'relatorio_disciplinas': relatorio_disciplinas, # Passa os dados para o template
        'periodo_relatorio': 'Janeiro - Junho 2024', # Exemplo de período
        'media_geral_acertos': '74%', # Exemplo de média geral
    }
    return render(request, 'relatorios.html', context)


def desempenho_view(request):
    """
    View para a página de Desempenho (visualização fictícia por enquanto).
    Pode incluir dados de desempenho mockados para exibição.
    """
    desempenho_disciplinas = [
        {'nome': 'Matemática', 'percentual': 85},
        {'nome': 'Português', 'percentual': 70},
        {'nome': 'Física', 'percentual': 60},
        {'nome': 'Química', 'percentual': 75},
        {'nome': 'História', 'percentual': 90},
        {'nome': 'Geografia', 'percentual': 65},
    ]

    context = {
        'user': type('UserMock', (object,), {'username': 'Aluno Teste', 'is_authenticated': True})(),
        'desempenho_disciplinas': desempenho_disciplinas,
        'nome_aluno': 'Nome Completo do Aluno Fictício',
        'ano_ensino': '2º Ano do Ensino Médio',
        'email_aluno': 'aluno.ficticio@email.com',
        'matricula_aluno': '202301010101',
        'rendimento_geral': {
            'PP': '80%',
            'PR': '75%',
            'Maior PR': '90%',
        },
        'mes_consulta': 'Julho 2024',
        'eventos_agenda': [
            {'data': '10 JUL', 'disciplina': 'Matemática', 'assunto': 'Prova de Geometria'},
            {'data': '15 JUL', 'disciplina': 'Português', 'assunto': 'Entrega de Redação'},
            {'data': '20 JUL', 'disciplina': 'Física', 'assunto': 'Trabalho de Cinemática'},
        ]
    }
    return render(request, 'desempenho_view.html', context)
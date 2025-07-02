from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required # <-- Esta linha
from .forms import CustomAuthenticationForm, CustomUserCreationForm # <-- E esta linha


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



def temp_dashboard_view(request, role='aluno'): # <-- O NOME DA FUNÇÃO DEVE ESTAR EXATO
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
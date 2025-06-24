# src/auth/login.py

import tkinter as tk
from tkinter import messagebox

def show_login_screen(root):
    """
    Cria e exibe a tela de login como uma janela Toplevel.
    Simula a autenticação e exibe mensagens de sucesso/erro.
    """
    login_window = tk.Toplevel(root)
    login_window.title("Sistema Educacional - Login")
    login_window.geometry("300x200")
    login_window.resizable(False, False) # Impede o redimensionamento da janela

    # Garante que a janela de login fique na frente
    login_window.grab_set()
    login_window.focus_set()

    # --- Widgets da Interface ---
    # Frame para centralizar os elementos
    input_frame = tk.Frame(login_window, padx=20, pady=20)
    input_frame.pack(expand=True)

    # Rótulo e campo para o nome de usuário
    tk.Label(input_frame, text="Usuário:").grid(row=0, column=0, pady=5, sticky="w")
    username_entry = tk.Entry(input_frame, width=30)
    username_entry.grid(row=0, column=1, pady=5)
    username_entry.focus_set() # Define o foco inicial para o campo de usuário

    # Rótulo e campo para a senha
    tk.Label(input_frame, text="Senha:").grid(row=1, column=0, pady=5, sticky="w")
    password_entry = tk.Entry(input_frame, show="*", width=30) # 'show="*" esconde a senha
    password_entry.grid(row=1, column=1, pady=5)

    def on_login_button_click():
        """
        Função chamada quando o botão 'Entrar' é clicado.
        Aqui a lógica de autenticação real seria implementada.
        """
        username = username_entry.get()
        password = password_entry.get()

        # --- Lógica de Autenticação Simplificada (para demonstração) ---
        # No projeto real, você chamaria uma função do src/database/db_manager.py
        # para verificar o usuário e a senha no seu banco de dados.
        # Ex: user = get_user_by_credentials(username, password)

        if username == "admin" and password == "123": # Exemplo de credenciais válidas
            messagebox.showinfo("Sucesso!", "Login realizado com sucesso!")
            login_window.destroy() # Fecha a janela de login
            # Aqui você chamaria a função para carregar a próxima tela
            # Ex: load_dashboard(user_role)
            print("Usuário logado! (Simulação)")
        elif username and password: # Se o usuário e senha não forem vazios mas estiverem errados
            messagebox.showerror("Erro de Login", "Usuário ou senha inválidos.")
        else: # Se um dos campos estiver vazio
            messagebox.showwarning("Atenção", "Por favor, preencha todos os campos.")

    # Botão de Login
    login_button = tk.Button(input_frame, text="Entrar", command=on_login_button_click, width=20)
    login_button.grid(row=2, column=0, columnspan=2, pady=15)

    # Centralizar a janela na tela
    login_window.update_idletasks()
    screen_width = login_window.winfo_screenwidth()
    screen_height = login_window.winfo_screenheight()
    window_width = login_window.winfo_width()
    window_height = login_window.winfo_height()

    x = (screen_width // 2) - (window_width // 2)
    y = (screen_height // 2) - (window_height // 2)
    login_window.geometry(f'+{x}+{y}')

    # Aguarda o fechamento da janela de login antes de continuar
    root.wait_window(login_window)
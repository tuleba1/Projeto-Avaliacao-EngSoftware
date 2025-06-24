import tkinter as tk
from src.auth.login import show_login_screen

def main():
    """
    Ponto de entrada principal da aplicação.
    """
    root = tk.Tk()
    root.withdraw() # Esconde a janela principal do Tkinter no início

    # Mostra a tela de login
    show_login_screen(root)

    # Após o login ser processado e a janela de login fechada (ou não, dependendo da lógica)
    # Você pode colocar aqui a lógica para abrir as telas de professor, aluno, diretor, etc.
    # Por enquanto, se a janela de login for fechada, o programa simplesmente terminará.

    if root.winfo_exists(): # Verifica se a janela principal ainda existe
        root.destroy() # Garante que a aplicação Tkinter seja encerrada

if __name__ == "__main__":
    main()
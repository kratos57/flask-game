from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')
@app.route('/memory-game')
def memory_game():
    return render_template('memory_game.html')
@app.route('/tic-tac-toe')
def tic_tac_toe():
    return render_template('tic_tac_toe.html')
@app.route('/rock-paper-scissors')
def rock_paper_scissors():
    return render_template('rock_paper_scissors.html')
@app.route('/hangman')
def hangman():
    return render_template('hangman.html')
if __name__ == '__main__':
    app.run(debug=True)

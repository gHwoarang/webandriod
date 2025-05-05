from flask import Flask, request, render_template, redirect
import mysql.connector

app = Flask(__name__)

# MySQL bağlantı ayarları
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': ' ',
    'database': '1ucuzpazar'
}

@app.route('/')
def index():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM services")
    data = cursor.fetchall()
    conn.close()
    return render_template("home.html", services=data)

@app.route('/register', methods=['POST'])
def register():
    name = request.form['name']
    phone = request.form['phone']
    service = request.form['service']

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO services (name, phone, service) VALUES (%s, %s, %s)", (name, phone, service))
    conn.commit()
    conn.close()

    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)

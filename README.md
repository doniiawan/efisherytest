<!-- # nodebe -->
# NodeJS Backend Auth App & Python Backend Fetching App

Theres two projects inside this repo

## NodeJS Backend Auth App

### Installation
```zsh
$ cd nodebe && cp .env.backup .env
```

```javascript
npm install
npm start
```

**Swagger Documentation :**
http://localhost:3000/api-docs


## Python Backend Fetching App

### Installation
```bash
$ cd pythonbe
```

```zsh
$ python3 -m venv venv  
$ . venv/bin/activate
$ pip install -r requirements.txt
$ export FLASK_APP=api.py
$ flask run
```

**Swagger Documentation :**
http://localhost:5000/api-docs


## System Diagram
![System Diagram](/System.png)

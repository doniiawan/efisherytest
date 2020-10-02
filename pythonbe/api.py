from flask import Flask, jsonify, request
from flask_swagger_ui import get_swaggerui_blueprint
import jwt
import requests
import requests_cache
app = Flask(__name__)
app.debug = True
app.use_reloader = True


# VARIABLES
efisheryapi = 'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list'
converterapi = 'https://free.currconv.com/api/v7/convert?q=USD_IDR&compact=ultra&apiKey=f11d2d47bed3c59653e8'

# ADD CACHING
requests_cache.install_cache(
    cache_name='currency', backend='memory', expire_after=60)
requests_cache.clear()
currencyreq = requests.get(converterapi)
print("CACHING : ", currencyreq.from_cache)

# SWAGGER
SWAGGER_URL = '/api-docs'
API_URL = '/static/swagger.json'
SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "Python Fetch API SWAGGER"
    }
)
app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)


@app.route('/', methods=['GET'])
def index():
    return jsonify({'code': 200, 'message': 'Hello!'}), 200


@app.route('/user', methods=['GET', 'POST'])
def auth():
    token = request.headers.get('Authorization').split(' ')[1]
    if request.method == 'GET':
        try:
            current_user = jwt.decode(token, '4nKJ3JripOUC8iPN4UZh', algorithms=[
                                      'HS256'])
            del current_user['exp']
            del current_user['iat']
            return jsonify(current_user), 200

        except Exception as e:
            print(e)
            return jsonify({'code': 401, 'message': 'Expired or invalid token!'}), 401


@app.route('/commodity', methods=['GET'])
def commodity():
    try:
        token = request.headers.get('Authorization').split(' ')[1]
        if request.method == 'GET':
            try:
                decoded = jwt.decode(token, '4nKJ3JripOUC8iPN4UZh', algorithms=[
                    'HS256'])

                httpreq = requests.get(efisheryapi)
                payload = httpreq.json()
                currencyreq = requests.get(converterapi)
                usd = currencyreq.json()['USD_IDR']

                print("CACHING : ", currencyreq.from_cache)
                for i in payload:
                    price = convertPrice(i.get('price'))
                    i.update({'price_usd': price / usd})

                if (decoded['role'] == 'admin'):
                    print(request.args.get('area_provinsi'))
                    if (request.args.get('area_provinsi') and request.args.get('tanggal')):
                        listdata = []
                        for i in payload:
                            if (i.get('area_provinsi') == request.args.get('area_provinsi')):
                                listdata.append(i)
                        return jsonify(listdata)
                    else:
                        return jsonify(payload)
                else:
                    return jsonify(payload)

            except Exception as e:
                print(e)
                return jsonify({'code': 401, 'message': 'Expired or invalid token!'}), 401
    except AttributeError:
        return jsonify({'code': 400, 'message': 'Please provide token!'}), 400


def convertPrice(price):
    if (type(price) == type(None)):
        return 0
    else:
        intprice = price.replace('.', '')
        return int(intprice)


if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)

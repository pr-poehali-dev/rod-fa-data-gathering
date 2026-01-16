import json
import os
import psycopg2
from datetime import datetime

def handler(event: dict, context) -> dict:
    '''API для поиска информации по номеру телефона в базе данных'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        phone = body.get('phone', '').strip()
        
        if not phone:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Номер телефона не указан'}),
                'isBase64Encoded': False
            }
        
        database_url = os.environ.get('DATABASE_URL')
        if not database_url:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Ошибка конфигурации сервера'}),
                'isBase64Encoded': False
            }
        
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor()
        
        query = '''
            SELECT phone, name, location, region, email, operator, 
                   social_networks, last_seen, additional_info
            FROM phone_records
            WHERE phone LIKE %s OR phone = %s
            LIMIT 1
        '''
        
        search_pattern = f'%{phone.replace("+", "")}%'
        cursor.execute(query, (search_pattern, phone))
        result = cursor.fetchone()
        
        cursor.close()
        conn.close()
        
        if not result:
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Информация по данному номеру не найдена'}),
                'isBase64Encoded': False
            }
        
        def time_ago(dt):
            if not dt:
                return 'Неизвестно'
            now = datetime.now()
            diff = now - dt.replace(tzinfo=None)
            
            if diff.days > 0:
                if diff.days == 1:
                    return '1 день назад'
                elif diff.days < 5:
                    return f'{diff.days} дня назад'
                elif diff.days < 7:
                    return f'{diff.days} дней назад'
                else:
                    weeks = diff.days // 7
                    return f'{weeks} неделю назад' if weeks == 1 else f'{weeks} недели назад'
            else:
                hours = diff.seconds // 3600
                if hours > 0:
                    return f'{hours} часов назад' if hours > 1 else '1 час назад'
                else:
                    minutes = diff.seconds // 60
                    return f'{minutes} минут назад' if minutes > 1 else '1 минуту назад'
        
        data = {
            'phone': result[0],
            'name': result[1],
            'location': result[2],
            'region': result[3],
            'email': result[4],
            'operator': result[5],
            'social': result[6] if result[6] else [],
            'lastSeen': time_ago(result[7]),
            'additionalInfo': result[8] if result[8] else {}
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(data, ensure_ascii=False),
            'isBase64Encoded': False
        }
        
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Неверный формат данных'}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Ошибка сервера: {str(e)}'}),
            'isBase64Encoded': False
        }
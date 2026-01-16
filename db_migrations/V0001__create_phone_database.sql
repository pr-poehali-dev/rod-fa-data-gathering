CREATE TABLE IF NOT EXISTS phone_records (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255),
    location VARCHAR(255),
    region VARCHAR(255),
    email VARCHAR(255),
    operator VARCHAR(100),
    social_networks JSONB,
    last_seen TIMESTAMP,
    additional_info JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_phone ON phone_records(phone);
CREATE INDEX idx_name ON phone_records(name);

INSERT INTO phone_records (phone, name, location, region, email, operator, social_networks, last_seen, additional_info) VALUES
('+79161234567', 'Иванов Иван Иванович', 'Москва, Россия', 'Московская область', 'ivan.ivanov@mail.ru', 'МТС', '["VK", "Instagram", "Telegram"]'::jsonb, NOW() - INTERVAL '2 days', '{"occupation": "Менеджер", "age": 35}'::jsonb),
('+79267654321', 'Петрова Мария Сергеевна', 'Санкт-Петербург, Россия', 'Ленинградская область', 'maria.petrova@gmail.com', 'Билайн', '["VK", "Facebook", "Одноклассники"]'::jsonb, NOW() - INTERVAL '5 hours', '{"occupation": "Дизайнер", "age": 28}'::jsonb),
('+79851112233', 'Сидоров Алексей Петрович', 'Екатеринбург, Россия', 'Свердловская область', 'alex.sidorov@yandex.ru', 'МегаФон', '["Telegram", "Instagram"]'::jsonb, NOW() - INTERVAL '1 day', '{"occupation": "Программист", "age": 32}'::jsonb),
('+79104445566', 'Кузнецова Елена Андреевна', 'Новосибирск, Россия', 'Новосибирская область', 'elena.kuz@inbox.ru', 'Теле2', '["VK", "Instagram", "TikTok"]'::jsonb, NOW() - INTERVAL '3 days', '{"occupation": "Учитель", "age": 42}'::jsonb),
('+79217778899', 'Смирнов Дмитрий Владимирович', 'Казань, Россия', 'Республика Татарстан', 'dmitry.smirnov@outlook.com', 'МТС', '["VK", "LinkedIn"]'::jsonb, NOW() - INTERVAL '12 hours', '{"occupation": "Инженер", "age": 39}'::jsonb),
('+79503334455', 'Волкова Ольга Николаевна', 'Ростов-на-Дону, Россия', 'Ростовская область', 'olga.volkova@rambler.ru', 'Билайн', '["VK", "Одноклассники"]'::jsonb, NOW() - INTERVAL '1 week', '{"occupation": "Бухгалтер", "age": 45}'::jsonb),
('+79659998877', 'Морозов Сергей Александрович', 'Красноярск, Россия', 'Красноярский край', 'sergey.morozov@mail.ru', 'МегаФон', '["Instagram", "YouTube"]'::jsonb, NOW() - INTERVAL '4 days', '{"occupation": "Блогер", "age": 26}'::jsonb),
('+79186665544', 'Павлова Анна Игоревна', 'Краснодар, Россия', 'Краснодарский край', 'anna.pavlova@gmail.com', 'Теле2', '["VK", "Instagram", "Pinterest"]'::jsonb, NOW() - INTERVAL '8 hours', '{"occupation": "Фотограф", "age": 30}'::jsonb);

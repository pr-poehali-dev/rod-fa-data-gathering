import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface SearchResult {
  phone: string;
  name: string;
  location: string;
  email: string;
  social: string[];
  lastSeen: string;
  operator: string;
  region: string;
}

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    setError('');
    
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Введите корректный номер телефона');
      return;
    }

    setIsSearching(true);
    
    setTimeout(() => {
      const mockResult: SearchResult = {
        phone: phoneNumber,
        name: 'Иванов Иван Иванович',
        location: 'Москва, Россия',
        email: 'ivan.ivanov@example.com',
        social: ['VK', 'Instagram', 'Telegram'],
        lastSeen: '2 дня назад',
        operator: 'МТС',
        region: 'Московская область'
      };
      
      setSearchResult(mockResult);
      setIsSearching(false);
    }, 1500);
  };

  const handleReset = () => {
    setPhoneNumber('');
    setSearchResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        
        {!searchResult ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in">
            <h1 className="font-display text-6xl md:text-7xl font-bold text-foreground mb-4 tracking-tight">
              RODFA
            </h1>
            <p className="text-muted-foreground text-lg mb-12">
              Поиск информации по номеру телефона
            </p>

            <div className="w-full max-w-md space-y-4">
              <div className="relative">
                <Input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="h-14 text-lg px-6 pr-14"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Icon name="Phone" size={20} />
                </div>
              </div>

              {error && (
                <p className="text-destructive text-sm text-center animate-fade-in">
                  {error}
                </p>
              )}

              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full h-14 text-lg font-medium"
              >
                {isSearching ? (
                  <>
                    <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                    Поиск данных...
                  </>
                ) : (
                  <>
                    <Icon name="Search" size={20} className="mr-2" />
                    Найти информацию
                  </>
                )}
              </Button>
            </div>

            <div className="mt-16 text-center text-sm text-muted-foreground">
              <p>Поиск производится по открытым источникам и базам данных</p>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleReset}
                  className="hover:bg-secondary"
                >
                  <Icon name="ArrowLeft" size={24} />
                </Button>
                <h1 className="font-display text-3xl font-bold">RODFA</h1>
              </div>
            </div>

            <div className="space-y-4">
              <Card className="border-2 animate-scale-in">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">{searchResult.name}</h2>
                      <p className="text-lg text-primary font-semibold">{searchResult.phone}</p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Icon name="User" size={28} className="text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Icon name="MapPin" size={20} className="text-primary" />
                    Местоположение
                  </h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Город:</strong> {searchResult.location}</p>
                    <p><strong>Регион:</strong> {searchResult.region}</p>
                    <p><strong>Оператор:</strong> {searchResult.operator}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Icon name="Mail" size={20} className="text-primary" />
                    Контакты
                  </h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Email:</strong> {searchResult.email}</p>
                    <p><strong>Последняя активность:</strong> {searchResult.lastSeen}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Icon name="Share2" size={20} className="text-primary" />
                    Социальные сети
                  </h3>
                  <div className="flex gap-2">
                    {searchResult.social.map((platform) => (
                      <div
                        key={platform}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium"
                      >
                        {platform}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="pt-4">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full h-12"
                >
                  <Icon name="RotateCcw" size={18} className="mr-2" />
                  Новый поиск
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

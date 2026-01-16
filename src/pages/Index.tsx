import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  additionalInfo?: {
    occupation?: string;
    age?: number;
  };
}

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Введите корректный номер телефона');
      return;
    }

    setIsSearching(true);
    
    try {
      const response = await fetch('https://functions.poehali.dev/a5a97cf4-6532-4586-a32e-922ec481d860', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phoneNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Информация не найдена в базе');
        setIsSearching(false);
        return;
      }

      setSearchResult(data);
    } catch (err) {
      setError('Ошибка подключения к системе');
    } finally {
      setIsSearching(false);
    }
  };

  const handleReset = () => {
    setPhoneNumber('');
    setSearchResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-background cyber-grid relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
        
        {!searchResult ? (
          <div className="flex flex-col items-center justify-center min-h-[90vh] animate-fade-in">
            <div className="text-center mb-12">
              <div className="inline-block mb-6 animate-pulse-glow">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center glow-effect">
                  <Icon name="Eye" size={40} className="text-primary" />
                </div>
              </div>
              
              <h1 className="font-display text-7xl md:text-8xl font-bold text-primary mb-4 tracking-tight glow-effect">
                RODFA
              </h1>
              <p className="text-muted-foreground text-xl mb-3">
                Глобальная система поиска
              </p>
              <p className="text-accent text-sm font-mono">
                [ GLOBAL DATABASE ACCESS ]
              </p>
            </div>

            <div className="w-full max-w-lg space-y-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/30 transition-all duration-300" />
                <div className="relative">
                  <Input
                    type="tel"
                    placeholder="Введите номер телефона..."
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="h-16 text-lg px-6 pr-16 bg-card/80 backdrop-blur border-primary/30 focus:border-primary transition-all duration-300 glow-effect"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 text-primary">
                    <Icon name="Phone" size={22} />
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg animate-fade-in">
                  <p className="text-destructive text-sm text-center flex items-center justify-center gap-2">
                    <Icon name="AlertCircle" size={16} />
                    {error}
                  </p>
                </div>
              )}

              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full h-16 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center justify-center gap-3">
                  {isSearching ? (
                    <>
                      <Icon name="Loader2" size={22} className="animate-spin" />
                      <span className="font-mono">SEARCHING...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="Search" size={22} />
                      <span>НАЧАТЬ ПОИСК</span>
                    </>
                  )}
                </span>
              </Button>

              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="p-3 bg-card/50 backdrop-blur rounded-lg border border-border">
                  <p className="text-primary text-2xl font-bold font-mono">28+</p>
                  <p className="text-muted-foreground text-xs">Стран в базе</p>
                </div>
                <div className="p-3 bg-card/50 backdrop-blur rounded-lg border border-border">
                  <p className="text-accent text-2xl font-bold font-mono">∞</p>
                  <p className="text-muted-foreground text-xs">Записей</p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center text-xs text-muted-foreground font-mono">
              <p className="flex items-center justify-center gap-2">
                <Icon name="Lock" size={14} />
                Encrypted • Anonymous • Secure
              </p>
            </div>
          </div>
        ) : (
          <div className="animate-slide-up space-y-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleReset}
                  className="hover:bg-secondary hover:text-primary transition-all"
                >
                  <Icon name="ArrowLeft" size={24} />
                </Button>
                <div>
                  <h1 className="font-display text-3xl font-bold text-primary">RODFA</h1>
                  <p className="text-xs text-muted-foreground font-mono">SEARCH RESULTS</p>
                </div>
              </div>
              <Badge variant="outline" className="border-primary/50 text-primary font-mono">
                <Icon name="CheckCircle" size={14} className="mr-1" />
                FOUND
              </Badge>
            </div>

            <Card className="border-primary/30 bg-card/80 backdrop-blur glow-effect animate-scale-in">
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2 text-foreground">{searchResult.name}</h2>
                    <p className="text-xl text-primary font-mono mb-4">{searchResult.phone}</p>
                    <div className="flex gap-2 flex-wrap">
                      {searchResult.additionalInfo?.occupation && (
                        <Badge variant="secondary" className="font-normal">
                          <Icon name="Briefcase" size={12} className="mr-1" />
                          {searchResult.additionalInfo.occupation}
                        </Badge>
                      )}
                      {searchResult.additionalInfo?.age && (
                        <Badge variant="secondary" className="font-normal">
                          <Icon name="User" size={12} className="mr-1" />
                          {searchResult.additionalInfo.age} лет
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse-glow">
                    <Icon name="UserCheck" size={36} className="text-background" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-border/50 bg-card/60 backdrop-blur animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Icon name="MapPin" size={20} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">Местоположение</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Город</span>
                      <span className="font-medium">{searchResult.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Регион</span>
                      <span className="font-medium">{searchResult.region}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Оператор</span>
                      <span className="font-medium text-primary">{searchResult.operator}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/60 backdrop-blur animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Icon name="Mail" size={20} className="text-accent" />
                    </div>
                    <h3 className="font-semibold text-lg">Контакты</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Email</span>
                      <span className="font-medium truncate ml-2">{searchResult.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Активность</span>
                      <span className="font-medium text-accent">{searchResult.lastSeen}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border/50 bg-card/60 backdrop-blur animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon name="Share2" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">Социальные сети</h3>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {searchResult.social.map((platform) => (
                    <Badge
                      key={platform}
                      variant="outline"
                      className="px-4 py-2 border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                    >
                      {platform}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex-1 h-12 border-primary/30 hover:bg-primary/10 hover:border-primary"
              >
                <Icon name="RotateCcw" size={18} className="mr-2" />
                Новый поиск
              </Button>
              <Button
                variant="outline"
                className="h-12 px-6 border-accent/30 hover:bg-accent/10 hover:border-accent"
              >
                <Icon name="Download" size={18} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

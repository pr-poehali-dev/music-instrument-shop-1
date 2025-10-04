import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

type Genre = 'All' | 'Hip-Hop' | 'Trap' | 'R&B' | 'Pop' | 'Electronic';

interface Beat {
  id: number;
  title: string;
  producer: string;
  producerAvatar: string;
  price: number;
  genre: Genre;
  coverArt: string;
  bpm: number;
}

interface CartItem extends Beat {
  quantity: number;
}

const mockBeats: Beat[] = [
  {
    id: 1,
    title: 'Midnight Dreams',
    producer: 'DJ Phantom',
    producerAvatar: '',
    price: 50,
    genre: 'Hip-Hop',
    coverArt: '/img/f6aaeda1-3a98-4c73-9138-1cd6b7b330c4.jpg',
    bpm: 85,
  },
  {
    id: 2,
    title: 'Neon Lights',
    producer: 'BeatMaker Pro',
    producerAvatar: '',
    price: 75,
    genre: 'Electronic',
    coverArt: '/img/6301d87f-5dcd-4cb1-9893-6d095deca425.jpg',
    bpm: 128,
  },
  {
    id: 3,
    title: 'Urban Flow',
    producer: 'TrapKing',
    producerAvatar: '',
    price: 60,
    genre: 'Trap',
    coverArt: '/img/ffbf6fa6-4a55-4e5e-b746-d1dc04d07a12.jpg',
    bpm: 140,
  },
  {
    id: 4,
    title: 'Smooth Vibes',
    producer: 'DJ Phantom',
    producerAvatar: '',
    price: 55,
    genre: 'R&B',
    coverArt: '/img/f6aaeda1-3a98-4c73-9138-1cd6b7b330c4.jpg',
    bpm: 90,
  },
  {
    id: 5,
    title: 'Pop Dreams',
    producer: 'BeatMaker Pro',
    producerAvatar: '',
    price: 65,
    genre: 'Pop',
    coverArt: '/img/6301d87f-5dcd-4cb1-9893-6d095deca425.jpg',
    bpm: 120,
  },
  {
    id: 6,
    title: 'Dark Energy',
    producer: 'TrapKing',
    producerAvatar: '',
    price: 70,
    genre: 'Trap',
    coverArt: '/img/ffbf6fa6-4a55-4e5e-b746-d1dc04d07a12.jpg',
    bpm: 145,
  },
];

const Index = () => {
  const [selectedGenre, setSelectedGenre] = useState<Genre>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [playingId, setPlayingId] = useState<number | null>(null);

  const genres: Genre[] = ['All', 'Hip-Hop', 'Trap', 'R&B', 'Pop', 'Electronic'];

  const filteredBeats = mockBeats.filter((beat) => {
    const matchesGenre = selectedGenre === 'All' || beat.genre === selectedGenre;
    const matchesSearch =
      beat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beat.producer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const addToCart = (beat: Beat) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === beat.id);
      if (existing) {
        return prev.map((item) =>
          item.id === beat.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...beat, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const togglePlay = (id: number) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Music" size={24} className="text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold">BeatStore</h1>
            </div>

            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name="ShoppingCart" size={24} />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                    ) : (
                      <>
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border"
                          >
                            <img
                              src={item.coverArt}
                              alt={item.title}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.title}</h3>
                              <p className="text-sm text-muted-foreground">{item.producer}</p>
                              <p className="text-sm font-bold text-primary">${item.price}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Icon name="Trash2" size={18} />
                            </Button>
                          </div>
                        ))}
                        <div className="border-t border-border pt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold">Итого:</span>
                            <span className="text-2xl font-bold text-primary">${cartTotal}</span>
                          </div>
                          <Button className="w-full" size="lg">
                            Перейти к оплате
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Button variant="ghost" size="icon">
                <Icon name="User" size={24} />
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <div className="relative">
              <Icon
                name="Search"
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Поиск битов или продюсеров..."
                className="pl-10 bg-secondary border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {genres.map((genre) => (
            <Button
              key={genre}
              variant={selectedGenre === genre ? 'default' : 'outline'}
              onClick={() => setSelectedGenre(genre)}
              className="whitespace-nowrap"
            >
              {genre}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBeats.map((beat) => (
            <Card
              key={beat.id}
              className="overflow-hidden bg-card border-border hover-scale animate-fade-in group"
            >
              <div className="relative">
                <div className="absolute top-3 left-3 z-10">
                  <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                    {beat.genre}
                  </Badge>
                </div>
                <img
                  src={beat.coverArt}
                  alt={beat.title}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    size="icon"
                    className="w-16 h-16 rounded-full"
                    onClick={() => togglePlay(beat.id)}
                  >
                    <Icon name={playingId === beat.id ? 'Pause' : 'Play'} size={32} />
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{beat.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-primary text-xs">
                      {beat.producer[0]}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm text-muted-foreground">{beat.producer}</p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Music2" size={16} />
                      <span>{beat.bpm} BPM</span>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-primary">${beat.price}</p>
                </div>

                <Button
                  className="w-full"
                  onClick={() => addToCart(beat)}
                >
                  Добавить в корзину
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredBeats.length === 0 && (
          <div className="text-center py-16">
            <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">Ничего не найдено</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;

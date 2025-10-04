import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LicenseSelector, { type License } from '@/components/LicenseSelector';
import AudioPlayer from '@/components/AudioPlayer';

interface Producer {
  id: string;
  name: string;
  avatar: string;
  coverImage: string;
  bio: string;
  totalBeats: number;
  totalSales: number;
  followers: number;
  verified: boolean;
  joinDate: string;
  genres: string[];
  socialLinks: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
}

interface Beat {
  id: number;
  title: string;
  producer: string;
  price: number;
  genre: string;
  coverArt: string;
  bpm: number;
  plays: number;
  likes: number;
  licenses: License[];
  audioUrl: string;
}

const mockProducers: Record<string, Producer> = {
  'dj-phantom': {
    id: 'dj-phantom',
    name: 'DJ Phantom',
    avatar: '/img/50723371-41bc-4eb3-93b9-4076123e3a39.jpg',
    coverImage: '/img/a95cec08-12bf-4647-b378-0d453f9a26f8.jpg',
    bio: 'Профессиональный продюсер с 10-летним опытом. Специализируюсь на Hip-Hop и R&B битах. Работал с артистами по всему миру.',
    totalBeats: 145,
    totalSales: 2340,
    followers: 15600,
    verified: true,
    joinDate: '2018',
    genres: ['Hip-Hop', 'R&B', 'Trap'],
    socialLinks: {
      instagram: '@djphantom',
      twitter: '@djphantom',
      youtube: 'DJ Phantom Beats',
    },
  },
  'beatmaker-pro': {
    id: 'beatmaker-pro',
    name: 'BeatMaker Pro',
    avatar: '/img/50723371-41bc-4eb3-93b9-4076123e3a39.jpg',
    coverImage: '/img/a95cec08-12bf-4647-b378-0d453f9a26f8.jpg',
    bio: 'Создаю качественные биты для современных артистов. Electronic и Pop - мои любимые жанры.',
    totalBeats: 98,
    totalSales: 1850,
    followers: 12300,
    verified: true,
    joinDate: '2019',
    genres: ['Electronic', 'Pop', 'Dance'],
    socialLinks: {
      instagram: '@beatmakerpro',
      youtube: 'BeatMaker Pro',
    },
  },
  'trapking': {
    id: 'trapking',
    name: 'TrapKing',
    avatar: '/img/50723371-41bc-4eb3-93b9-4076123e3a39.jpg',
    coverImage: '/img/a95cec08-12bf-4647-b378-0d453f9a26f8.jpg',
    bio: 'Король Trap-битов. Мои треки звучат на радио и в клубах. Постоянно экспериментирую со звуком.',
    totalBeats: 210,
    totalSales: 3100,
    followers: 22500,
    verified: true,
    joinDate: '2017',
    genres: ['Trap', 'Hip-Hop', 'Drill'],
    socialLinks: {
      instagram: '@trapking',
      twitter: '@trapking',
      youtube: 'TrapKing Official',
    },
  },
};

const defaultLicenses: License[] = [
  {
    type: 'basic',
    name: 'Basic',
    price: 30,
    features: [
      'MP3 файл (320kbps)',
      'До 5,000 стримов',
      'Некоммерческое использование',
      '1 музыкальное видео',
      'Тег продюсера обязателен',
    ],
  },
  {
    type: 'premium',
    name: 'Premium',
    price: 100,
    features: [
      'WAV + MP3 файлы',
      'До 500,000 стримов',
      'Коммерческое использование',
      '10 музыкальных видео',
      'Разделение прав (50/50)',
      'Тег продюсера опционален',
    ],
    popular: true,
  },
  {
    type: 'exclusive',
    name: 'Exclusive',
    price: 500,
    features: [
      'WAV + Stems (дорожки)',
      'Неограниченные стримы',
      'Полные права владения',
      'Бит снимается с продажи',
      'Без разделения прав',
      'Без тега продюсера',
    ],
  },
];

const mockBeats: Record<string, Beat[]> = {
  'dj-phantom': [
    {
      id: 1,
      title: 'Midnight Dreams',
      producer: 'DJ Phantom',
      price: 30,
      genre: 'Hip-Hop',
      coverArt: '/img/f6aaeda1-3a98-4c73-9138-1cd6b7b330c4.jpg',
      bpm: 85,
      plays: 15200,
      likes: 890,
      licenses: defaultLicenses,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      id: 4,
      title: 'Smooth Vibes',
      producer: 'DJ Phantom',
      price: 30,
      genre: 'R&B',
      coverArt: '/img/f6aaeda1-3a98-4c73-9138-1cd6b7b330c4.jpg',
      bpm: 90,
      plays: 12400,
      likes: 720,
      licenses: defaultLicenses,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    },
  ],
  'beatmaker-pro': [
    {
      id: 2,
      title: 'Neon Lights',
      producer: 'BeatMaker Pro',
      price: 30,
      genre: 'Electronic',
      coverArt: '/img/6301d87f-5dcd-4cb1-9893-6d095deca425.jpg',
      bpm: 128,
      plays: 18500,
      likes: 1050,
      licenses: defaultLicenses,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    {
      id: 5,
      title: 'Pop Dreams',
      producer: 'BeatMaker Pro',
      price: 30,
      genre: 'Pop',
      coverArt: '/img/6301d87f-5dcd-4cb1-9893-6d095deca425.jpg',
      bpm: 120,
      plays: 20100,
      likes: 1340,
      licenses: defaultLicenses,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    },
  ],
  'trapking': [
    {
      id: 3,
      title: 'Urban Flow',
      producer: 'TrapKing',
      price: 30,
      genre: 'Trap',
      coverArt: '/img/ffbf6fa6-4a55-4e5e-b746-d1dc04d07a12.jpg',
      bpm: 140,
      plays: 25600,
      likes: 1680,
      licenses: defaultLicenses,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
    {
      id: 6,
      title: 'Dark Energy',
      producer: 'TrapKing',
      price: 30,
      genre: 'Trap',
      coverArt: '/img/ffbf6fa6-4a55-4e5e-b746-d1dc04d07a12.jpg',
      bpm: 145,
      plays: 30200,
      likes: 2100,
      licenses: defaultLicenses,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    },
  ],
};

const ProducerProfile = () => {
  const { producerId } = useParams<{ producerId: string }>();
  const [isFollowing, setIsFollowing] = useState(false);
  const [playingId, setPlayingId] = useState<number | null>(null);

  const producer = producerId ? mockProducers[producerId] : null;
  const beats = producerId ? mockBeats[producerId] || [] : [];

  if (!producer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="UserX" size={64} className="mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Продюсер не найден</h2>
          <Link to="/">
            <Button>Вернуться на главную</Button>
          </Link>
        </div>
      </div>
    );
  }

  const togglePlay = (id: number) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Icon name="ArrowLeft" size={24} />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Icon name="Music" size={24} className="text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold">BeatStore</h1>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="ShoppingCart" size={24} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="User" size={24} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative h-64 overflow-hidden">
        <img
          src={producer.coverImage}
          alt={producer.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-end mb-8">
          <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
            <AvatarImage src={producer.avatar} />
            <AvatarFallback className="text-4xl bg-primary">
              {producer.name[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold">{producer.name}</h1>
              {producer.verified && (
                <Badge className="bg-primary">
                  <Icon name="BadgeCheck" size={16} className="mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mb-4">{producer.bio}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {producer.genres.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-6 text-sm mb-4">
              <div className="flex items-center gap-2">
                <Icon name="Music" size={18} className="text-primary" />
                <span className="font-semibold">{producer.totalBeats}</span>
                <span className="text-muted-foreground">битов</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="ShoppingBag" size={18} className="text-primary" />
                <span className="font-semibold">{producer.totalSales}</span>
                <span className="text-muted-foreground">продаж</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Users" size={18} className="text-primary" />
                <span className="font-semibold">{producer.followers.toLocaleString()}</span>
                <span className="text-muted-foreground">подписчиков</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={18} className="text-primary" />
                <span className="text-muted-foreground">С {producer.joinDate}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                onClick={() => setIsFollowing(!isFollowing)}
                variant={isFollowing ? 'outline' : 'default'}
              >
                <Icon name={isFollowing ? 'UserCheck' : 'UserPlus'} size={20} className="mr-2" />
                {isFollowing ? 'Подписан' : 'Подписаться'}
              </Button>

              <Button size="lg" variant="outline">
                <Icon name="Share2" size={20} className="mr-2" />
                Поделиться
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="beats" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="beats">Биты</TabsTrigger>
            <TabsTrigger value="about">О продюсере</TabsTrigger>
          </TabsList>

          <TabsContent value="beats">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {beats.map((beat) => (
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
                    <h3 className="font-bold text-lg mb-3">{beat.title}</h3>

                    <div className="mb-3 p-3 bg-secondary/30 rounded-lg">
                      <AudioPlayer
                        audioUrl={beat.audioUrl}
                        isPlaying={playingId === beat.id}
                        onPlayPause={() => togglePlay(beat.id)}
                      />
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Icon name="Music2" size={16} />
                        <span>{beat.bpm} BPM</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Play" size={16} />
                        <span>{(beat.plays / 1000).toFixed(1)}K</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Heart" size={16} />
                        <span>{beat.likes}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm text-muted-foreground">
                        От <span className="text-2xl font-bold text-primary">${beat.price}</span>
                      </p>
                    </div>
                    
                    <LicenseSelector
                      beat={beat}
                      licenses={beat.licenses}
                      onAddToCart={(license) => {
                        console.log('Added to cart:', beat.title, license.name);
                      }}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Award" size={24} className="text-primary" />
                  Достижения
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <span className="text-muted-foreground">Всего продаж</span>
                    <span className="font-bold text-xl">{producer.totalSales}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <span className="text-muted-foreground">Битов в каталоге</span>
                    <span className="font-bold text-xl">{producer.totalBeats}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <span className="text-muted-foreground">Подписчиков</span>
                    <span className="font-bold text-xl">{producer.followers.toLocaleString()}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Link" size={24} className="text-primary" />
                  Социальные сети
                </h3>
                <div className="space-y-3">
                  {producer.socialLinks.instagram && (
                    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                      <Icon name="Instagram" size={20} className="text-primary" />
                      <span>{producer.socialLinks.instagram}</span>
                    </div>
                  )}
                  {producer.socialLinks.twitter && (
                    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                      <Icon name="Twitter" size={20} className="text-primary" />
                      <span>{producer.socialLinks.twitter}</span>
                    </div>
                  )}
                  {producer.socialLinks.youtube && (
                    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                      <Icon name="Youtube" size={20} className="text-primary" />
                      <span>{producer.socialLinks.youtube}</span>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProducerProfile;
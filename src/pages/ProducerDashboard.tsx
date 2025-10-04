import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface ProducerProfile {
  name: string;
  bio: string;
  avatar: string;
  coverImage: string;
  genres: string[];
  socialLinks: {
    instagram: string;
    twitter: string;
    youtube: string;
  };
}

interface Beat {
  id: number;
  title: string;
  genre: string;
  bpm: number;
  price: number;
  audioFile?: File | null;
  coverArt?: File | null;
  status: 'draft' | 'published';
  plays: number;
  sales: number;
}

const ProducerDashboard = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProducerProfile>({
    name: 'DJ Phantom',
    bio: 'Профессиональный продюсер с 10-летним опытом. Специализируюсь на Hip-Hop и R&B битах.',
    avatar: '/img/50723371-41bc-4eb3-93b9-4076123e3a39.jpg',
    coverImage: '/img/a95cec08-12bf-4647-b378-0d453f9a26f8.jpg',
    genres: ['Hip-Hop', 'R&B', 'Trap'],
    socialLinks: {
      instagram: '@djphantom',
      twitter: '@djphantom',
      youtube: 'DJ Phantom Beats',
    },
  });

  const [beats, setBeats] = useState<Beat[]>([
    {
      id: 1,
      title: 'Midnight Dreams',
      genre: 'Hip-Hop',
      bpm: 85,
      price: 30,
      status: 'published',
      plays: 15200,
      sales: 45,
    },
    {
      id: 2,
      title: 'Smooth Vibes',
      genre: 'R&B',
      bpm: 90,
      price: 30,
      status: 'published',
      plays: 12400,
      sales: 38,
    },
  ]);

  const [newBeat, setNewBeat] = useState<Partial<Beat>>({
    title: '',
    genre: '',
    bpm: 120,
    price: 30,
    status: 'draft',
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleProfileUpdate = () => {
    toast({
      title: 'Профиль обновлен',
      description: 'Изменения успешно сохранены',
    });
    setIsEditingProfile(false);
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewBeat({ ...newBeat, audioFile: file });
      toast({
        title: 'Файл загружен',
        description: `${file.name} готов к публикации`,
      });
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewBeat({ ...newBeat, coverArt: file });
      toast({
        title: 'Обложка загружена',
        description: 'Изображение готово',
      });
    }
  };

  const handlePublishBeat = () => {
    if (!newBeat.title || !newBeat.genre || !newBeat.audioFile) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все обязательные поля и загрузите аудио',
        variant: 'destructive',
      });
      return;
    }

    const beat: Beat = {
      id: Date.now(),
      title: newBeat.title!,
      genre: newBeat.genre!,
      bpm: newBeat.bpm || 120,
      price: newBeat.price || 30,
      status: 'published',
      plays: 0,
      sales: 0,
    };

    setBeats([...beats, beat]);
    setNewBeat({
      title: '',
      genre: '',
      bpm: 120,
      price: 30,
      status: 'draft',
      audioFile: null,
      coverArt: null,
    });

    toast({
      title: 'Бит опубликован!',
      description: 'Теперь он доступен для покупки',
    });
  };

  const handleDeleteBeat = (id: number) => {
    setBeats(beats.filter((b) => b.id !== id));
    toast({
      title: 'Бит удален',
      description: 'Трек больше не доступен для продажи',
    });
  };

  const totalPlays = beats.reduce((sum, beat) => sum + beat.plays, 0);
  const totalSales = beats.reduce((sum, beat) => sum + beat.sales, 0);
  const totalRevenue = beats.reduce((sum, beat) => sum + beat.sales * beat.price, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Music" size={24} className="text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold">BeatStore</h1>
            </Link>

            <div className="flex items-center gap-4">
              <Link to={`/producer/dj-phantom`}>
                <Button variant="outline">
                  <Icon name="Eye" size={18} className="mr-2" />
                  Мой профиль
                </Button>
              </Link>
              <Button variant="ghost" size="icon">
                <Icon name="Bell" size={24} />
              </Button>
              <Avatar className="w-10 h-10 cursor-pointer">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback>{profile.name[0]}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Личный кабинет</h2>
          <p className="text-muted-foreground">Управление профилем и битами</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Всего прослушиваний</span>
              <Icon name="Play" size={20} className="text-primary" />
            </div>
            <p className="text-3xl font-bold">{totalPlays.toLocaleString()}</p>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Продаж</span>
              <Icon name="ShoppingBag" size={20} className="text-primary" />
            </div>
            <p className="text-3xl font-bold">{totalSales}</p>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Заработано</span>
              <Icon name="DollarSign" size={20} className="text-primary" />
            </div>
            <p className="text-3xl font-bold">${totalRevenue}</p>
          </Card>
        </div>

        <Tabs defaultValue="beats" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="beats">Мои биты ({beats.length})</TabsTrigger>
            <TabsTrigger value="upload">Загрузить бит</TabsTrigger>
            <TabsTrigger value="profile">Редактировать профиль</TabsTrigger>
          </TabsList>

          <TabsContent value="beats">
            <div className="space-y-4">
              {beats.map((beat) => (
                <Card key={beat.id} className="p-6 bg-card border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{beat.title}</h3>
                        <Badge variant={beat.status === 'published' ? 'default' : 'secondary'}>
                          {beat.status === 'published' ? 'Опубликован' : 'Черновик'}
                        </Badge>
                        <Badge variant="outline">{beat.genre}</Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span>{beat.bpm} BPM</span>
                        <span>${beat.price}</span>
                        <span>
                          <Icon name="Play" size={14} className="inline mr-1" />
                          {beat.plays.toLocaleString()} прослушиваний
                        </span>
                        <span>
                          <Icon name="ShoppingBag" size={14} className="inline mr-1" />
                          {beat.sales} продаж
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Icon name="Edit" size={16} className="mr-2" />
                        Редактировать
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteBeat(beat.id)}
                      >
                        <Icon name="Trash2" size={16} className="text-destructive" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              {beats.length === 0 && (
                <div className="text-center py-16 border-2 border-dashed border-border rounded-lg">
                  <Icon name="Music" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg text-muted-foreground mb-2">У вас пока нет битов</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Загрузите свой первый бит и начните продавать
                  </p>
                  <Button>Загрузить бит</Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="upload">
            <Card className="p-6 bg-card border-border max-w-2xl">
              <h3 className="text-xl font-bold mb-6">Загрузить новый бит</h3>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="title">Название трека *</Label>
                  <Input
                    id="title"
                    placeholder="Например: Midnight Dreams"
                    value={newBeat.title}
                    onChange={(e) => setNewBeat({ ...newBeat, title: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="genre">Жанр *</Label>
                    <Select
                      value={newBeat.genre}
                      onValueChange={(value) => setNewBeat({ ...newBeat, genre: value })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Выберите жанр" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hip-Hop">Hip-Hop</SelectItem>
                        <SelectItem value="Trap">Trap</SelectItem>
                        <SelectItem value="R&B">R&B</SelectItem>
                        <SelectItem value="Pop">Pop</SelectItem>
                        <SelectItem value="Electronic">Electronic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="bpm">BPM</Label>
                    <Input
                      id="bpm"
                      type="number"
                      placeholder="120"
                      value={newBeat.bpm}
                      onChange={(e) => setNewBeat({ ...newBeat, bpm: parseInt(e.target.value) })}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="price">Базовая цена (Basic лицензия)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="30"
                    value={newBeat.price}
                    onChange={(e) => setNewBeat({ ...newBeat, price: parseInt(e.target.value) })}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Premium: x3.3 (${(newBeat.price || 30) * 3.3}), Exclusive: x16.6 ($
                    {(newBeat.price || 30) * 16.6})
                  </p>
                </div>

                <div>
                  <Label htmlFor="audio">Аудио файл (MP3, WAV) *</Label>
                  <div className="mt-2">
                    <label
                      htmlFor="audio"
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                    >
                      <div className="text-center">
                        {newBeat.audioFile ? (
                          <>
                            <Icon name="CheckCircle" size={32} className="mx-auto text-primary mb-2" />
                            <p className="text-sm font-medium">{newBeat.audioFile.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(newBeat.audioFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </>
                        ) : (
                          <>
                            <Icon name="Upload" size={32} className="mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                              Нажмите для загрузки аудио
                            </p>
                          </>
                        )}
                      </div>
                    </label>
                    <input
                      id="audio"
                      type="file"
                      accept="audio/*"
                      onChange={handleAudioUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="cover">Обложка (опционально)</Label>
                  <div className="mt-2">
                    <label
                      htmlFor="cover"
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                    >
                      <div className="text-center">
                        {newBeat.coverArt ? (
                          <>
                            <Icon name="CheckCircle" size={32} className="mx-auto text-primary mb-2" />
                            <p className="text-sm font-medium">{newBeat.coverArt.name}</p>
                          </>
                        ) : (
                          <>
                            <Icon name="Image" size={32} className="mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                              Нажмите для загрузки обложки
                            </p>
                          </>
                        )}
                      </div>
                    </label>
                    <input
                      id="cover"
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handlePublishBeat} className="flex-1">
                    <Icon name="Upload" size={18} className="mr-2" />
                    Опубликовать бит
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setNewBeat({
                        title: '',
                        genre: '',
                        bpm: 120,
                        price: 30,
                        status: 'draft',
                        audioFile: null,
                        coverArt: null,
                      })
                    }
                  >
                    Очистить
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="p-6 bg-card border-border max-w-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Информация о профиле</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                >
                  <Icon name="Edit" size={16} className="mr-2" />
                  {isEditingProfile ? 'Отменить' : 'Редактировать'}
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="name">Имя продюсера</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!isEditingProfile}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">О себе</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    disabled={!isEditingProfile}
                    className="mt-2"
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Жанры</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.genres.map((genre) => (
                      <Badge key={genre} variant="secondary">
                        {genre}
                        {isEditingProfile && (
                          <Icon
                            name="X"
                            size={14}
                            className="ml-1 cursor-pointer"
                            onClick={() =>
                              setProfile({
                                ...profile,
                                genres: profile.genres.filter((g) => g !== genre),
                              })
                            }
                          />
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Социальные сети</Label>
                  <div className="space-y-3 mt-2">
                    <div className="flex items-center gap-2">
                      <Icon name="Instagram" size={20} className="text-primary" />
                      <Input
                        placeholder="Instagram username"
                        value={profile.socialLinks.instagram}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            socialLinks: { ...profile.socialLinks, instagram: e.target.value },
                          })
                        }
                        disabled={!isEditingProfile}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Twitter" size={20} className="text-primary" />
                      <Input
                        placeholder="Twitter username"
                        value={profile.socialLinks.twitter}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            socialLinks: { ...profile.socialLinks, twitter: e.target.value },
                          })
                        }
                        disabled={!isEditingProfile}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Youtube" size={20} className="text-primary" />
                      <Input
                        placeholder="YouTube channel"
                        value={profile.socialLinks.youtube}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            socialLinks: { ...profile.socialLinks, youtube: e.target.value },
                          })
                        }
                        disabled={!isEditingProfile}
                      />
                    </div>
                  </div>
                </div>

                {isEditingProfile && (
                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleProfileUpdate} className="flex-1">
                      <Icon name="Save" size={18} className="mr-2" />
                      Сохранить изменения
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProducerDashboard;

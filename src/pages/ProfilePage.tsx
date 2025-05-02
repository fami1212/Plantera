
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { UserCircle, Mail, Key, Bell, Moon, Globe, Shield, Languages, Smartphone } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAppSettings } from '@/contexts/AppSettingsContext';

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit comporter au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Adresse email invalide.",
  }),
  bio: z.string().max(500, {
    message: "La bio ne doit pas dépasser 500 caractères.",
  }).optional(),
  phone: z.string().optional(),
  enterprise: z.string().optional(),
  address: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfilePage = () => {
  const { settings, updateSettings } = useAppSettings();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: Partial<ProfileFormValues> = {
    name: "Jean Dupont",
    email: "agriculteur@example.com",
    bio: "Agriculteur passionné spécialisé dans les cultures tropicales.",
    phone: "+590 690 12 34 56",
    enterprise: "Ferme Tropicale",
    address: "Rue des Antilles, Basse-Terre, Guadeloupe",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      toast.success("Profil mis à jour avec succès!");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du profil.");
      console.error("Erreur de soumission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThemeChange = (isDark: boolean) => {
    updateSettings({ ...settings, darkMode: isDark });
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <PageLayout>
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Paramètres du profil</h1>
            <p className="text-muted-foreground">
              Gérez votre compte et vos préférences d'application
            </p>
          </div>
          <Button className="md:self-end gap-2">
            <Key size={16} />
            Se déconnecter
          </Button>
        </div>

        <Separator />

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full max-w-md mb-6 grid grid-cols-3 h-auto gap-4">
            <TabsTrigger value="profile" className="flex flex-col py-3 h-auto data-[state=active]:text-primary gap-1">
              <UserCircle className="h-5 w-5" />
              <span className="text-xs font-medium mt-1">Profil</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex flex-col py-3 h-auto data-[state=active]:text-primary gap-1">
              <Bell className="h-5 w-5" />
              <span className="text-xs font-medium mt-1">Préférences</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex flex-col py-3 h-auto data-[state=active]:text-primary gap-1">
              <Shield className="h-5 w-5" />
              <span className="text-xs font-medium mt-1">Sécurité</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Photo de profil</CardTitle>
                  <CardDescription>
                    Votre photo sera visible par les autres utilisateurs de la plateforme
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-4">
                  <Avatar className="h-24 w-24 border-2 border-border">
                    <AvatarImage src={profileImage || "/placeholder.svg"} alt="Photo de profil" />
                    <AvatarFallback className="text-lg bg-agri-primary text-white">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-center gap-2">
                    <Label htmlFor="picture" className="cursor-pointer text-sm text-muted-foreground">
                      <div className="flex items-center gap-1 underline">
                        Changer la photo
                      </div>
                      <Input
                        id="picture"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </Label>
                    {profileImage && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setProfileImage(null)}
                        className="text-xs"
                      >
                        Supprimer
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>
                    Mettez à jour vos informations personnelles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom complet</FormLabel>
                            <FormControl>
                              <Input placeholder="Votre nom" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Votre email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input placeholder="Votre numéro de téléphone" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Biographie</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Parlez un peu de vous..."
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              {500 - (field.value?.length || 0)} caractères restants
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Informations professionnelles</CardTitle>
                  <CardDescription>
                    Renseignez les informations concernant votre exploitation
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="enterprise">Nom de l'exploitation</Label>
                    <Input id="enterprise" placeholder="Nom de votre exploitation" defaultValue={defaultValues.enterprise} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="activity">Activité principale</Label>
                    <Select defaultValue="fruits">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une activité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fruits">Cultures fruitières</SelectItem>
                        <SelectItem value="vegetables">Maraîchage</SelectItem>
                        <SelectItem value="sugarcane">Canne à sucre</SelectItem>
                        <SelectItem value="banana">Banane</SelectItem>
                        <SelectItem value="livestock">Élevage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Textarea id="address" placeholder="Adresse de l'exploitation" defaultValue={defaultValues.address} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siret">Numéro SIRET</Label>
                    <Input id="siret" placeholder="Numéro SIRET" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surface">Surface exploitée (ha)</Label>
                    <Input id="surface" type="number" placeholder="Surface" defaultValue="10" />
                  </div>
                  <div className="md:col-span-2">
                    <Button className="w-full">
                      Enregistrer les informations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Préférences de l'application</CardTitle>
                <CardDescription>
                  Personnalisez l'interface selon vos besoins
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Localisation et langue
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="language">Langue de l'interface</Label>
                      <Select defaultValue="fr">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une langue" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="locale">Format de date et heure</Label>
                      <Select defaultValue="fr-GP">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr-GP">France (Guadeloupe)</SelectItem>
                          <SelectItem value="fr-MQ">France (Martinique)</SelectItem>
                          <SelectItem value="fr-GF">France (Guyane)</SelectItem>
                          <SelectItem value="fr-FR">France (Métropole)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Moon className="h-4 w-4" />
                    Apparence
                  </h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="theme">Thème sombre</Label>
                        <p className="text-xs text-muted-foreground">
                          Activer le mode sombre pour l'interface
                        </p>
                      </div>
                      <Switch 
                        id="theme" 
                        checked={settings.darkMode} 
                        onCheckedChange={handleThemeChange} 
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="animations">Animations</Label>
                        <p className="text-xs text-muted-foreground">
                          Activer les animations de l'interface
                        </p>
                      </div>
                      <Switch id="animations" defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Notifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Alertes météo</Label>
                        <p className="text-xs text-muted-foreground">
                          Recevoir des notifications pour les alertes météo
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Rappels de tâches</Label>
                        <p className="text-xs text-muted-foreground">
                          Recevoir des rappels pour les tâches à effectuer
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Mises à jour</Label>
                        <p className="text-xs text-muted-foreground">
                          Être notifié des mises à jour de l'application
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Application mobile
                  </h3>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Téléchargez notre application mobile pour accéder à vos données hors connexion 
                      et recevoir des notifications en temps réel.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="outline" className="gap-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M17.2 12.1c-.1-.3-.3-.5-.5-.7l-.5-.6c-.6-.7-1.3-1.5-2.6-1.5s-2 .8-2.6 1.5c-.2.2-.3.4-.5.6-.2.2-.3.5-.5.7-.2.4-.3.8-.3 1.1s.1.8.3 1.1c.1.3.3.5.5.7l.5.6c.7.7 1.3 1.5 2.6 1.5s2-.8 2.6-1.5c.2-.2.3-.4.5-.6.2-.2.3-.5.5-.7.2-.4.3-.8.3-1.1s-.1-.8-.3-1.1zm-6.9-5.3c.7.1 1.1-.3 1.5-.7s.6-.9.9-1.2c.4-.4.8-.9.8-1.6s-.4-1.2-.7-1.4c-.3-.2-.7-.4-1.1-.4s-.9.1-1.4.4c-.2.1-.5.3-.7.5-.3.2-.6.5-.8.9-.1.3-.3.7-.3 1.2s.1.9.4 1.2.8.4 1.4.2v-.1zm-3.8 1.3c1.3 0 1.9-1.3 2.4-2.2.6-1.1 1-1.9 2-1.9s1.4.8 2 1.9c.5.9 1.1 2.2 2.4 2.2s2.3-1.1 2.6-2.2c.1-.5-.2-.8-.4-1-.2-.1-.5-.2-.7-.2s-.5.1-.7.2c-.2.1-.4.3-.6.7-.4.9-.5 1-.8 1-.4 0-.7-.6-1.1-1.6-.4-1.2-1-2.5-2.5-2.5s-2.1 1.3-2.5 2.5c-.3 1-.7 1.6-1.1 1.6-.4 0-.4-.3-.8-1-.1-.4-.4-.6-.6-.7-.2-.1-.5-.2-.7-.2s-.5.1-.7.2c-.3.1-.5.5-.4 1 .3 1 1.3 2.2 2.6 2.2zm12 5.9c0-1.7-1.1-3.2-2.4-3.2-.9 0-1.7.6-2.3 1.3-.1.1-.2.3-.3.4-.3.5-.6.6-.7.6-.2 0-.4-.1-.7-.6-.1-.1-.2-.3-.3-.4-.6-.7-1.4-1.3-2.3-1.3-1.3 0-2.4 1.4-2.4 3.2 0 1.7 1 3.2 2.7 3.2 1 0 1.7-.6 2.1-1.3l.1-.1c.4-.7.5-.9.9-.9s.5.2.9.9l.1.1c.4.7 1.1 1.3 2.1 1.3 1.7 0 2.7-1.5 2.6-3.2zm-2.4 1.6c-.1 0-.2-.1-.3-.5l-.1-.1c-.9-1.6-1.6-1.9-2.5-1.9-.7 0-1.5.4-2.2 1.6-.3.5-.4.8-.7.8-.3 0-.3-.2-.3-.4 0-.7.4-1.4 1.3-1.4.4 0 .8.2 1.1.7.1.1.1.2.2.2s.1 0 .2-.1c.2-.2.6-.8 1.2-.8.8 0 1.2.7 1.2 1.4-.1.2-.1.5-.7.5h-.4z" />
                        </svg>
                        App Store
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M3.191 9.364c-.114.273-.191.562-.191.857V13c0 .297.077.586.191.857L8 12l-4.809-2.636zm11.932-5.063L10.955 2.45A1.95 1.95 0 0010 2.214v7.573l4.764-2.614a2.033 2.033 0 00.359-2.873zM10 14.214v7.572c.384.118.787.096 1.123-.036l4.169-1.851a2.033 2.033 0 00-.359-2.873L10 14.214zm9.81-1.636L15.682 10l4.127-2.578c.495.404.797.913.901 1.435.106.529-.02 1.093-.419 1.581a2.17 2.17 0 01-.481.426v.002a2.17 2.17 0 01.481.426c.4.488.525 1.052.419 1.581-.104.522-.406 1.031-.901 1.435z" />
                        </svg>
                        Google Play
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="default">Enregistrer les préférences</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Modifier le mot de passe</CardTitle>
                  <CardDescription>
                    Mettez à jour votre mot de passe pour sécuriser votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current">Mot de passe actuel</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new">Nouveau mot de passe</Label>
                    <Input id="new" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm">Confirmer le mot de passe</Label>
                    <Input id="confirm" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Modifier le mot de passe</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Méthodes d'authentification</CardTitle>
                  <CardDescription>
                    Configurez des méthodes d'authentification supplémentaires
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Authentification à deux facteurs</Label>
                      <p className="text-xs text-muted-foreground">
                        Utiliser votre téléphone comme deuxième facteur d'authentification
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Appareils de confiance</Label>
                      <p className="text-xs text-muted-foreground">
                        Gérer les appareils de confiance qui n'ont pas besoin d'authentification
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Gérer</Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    La dernière connexion à votre compte a été effectuée le 2 mai 2025 à 10:34
                  </p>
                </CardFooter>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Sessions actives</CardTitle>
                  <CardDescription>
                    Gérez les sessions actives sur votre compte et déconnectez-vous des appareils distants
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-medium">MacBook Pro (Actuel)</h4>
                        <div className="text-xs text-muted-foreground flex flex-wrap gap-3">
                          <span>Guadeloupe, France</span>
                          <span className="text-green-600 font-medium">Actif maintenant</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" disabled>
                        Cet appareil
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-medium">iPhone 13</h4>
                        <div className="text-xs text-muted-foreground flex flex-wrap gap-3">
                          <span>Guadeloupe, France</span>
                          <span>Dernière activité: il y a 1 heure</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Déconnecter
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-medium">Windows PC</h4>
                        <div className="text-xs text-muted-foreground flex flex-wrap gap-3">
                          <span>Guadeloupe, France</span>
                          <span>Dernière activité: il y a 3 jours</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Déconnecter
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="destructive">Se déconnecter de toutes les sessions</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default ProfilePage;

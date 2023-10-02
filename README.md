# Recipe book - projektni zadatak
Projektni zadatak predstavlja portal za deljenje recepata, koji treba biti realizovan kao fullstack web aplikacija koristeći **.NET i Angular** tehnologije.

Portal treba da podržava tri tipa prijavljenih korisnika: *admin, kuvar i običan korisnik*.

####  Admin može da: 
* pregleda sve postojeće kuvare
* dodaje nove kuvare
* pregleda, dodaje i briše sastojke
* pregleda i briše recepte

####  Kuvar može da:
* dodaje nove recepte
* briše svoje recepte
* pregleda sve recepte na platformi

####  Običan korisnik može da:
* pregleda sve recepte na platformi
* sačuva recept u svoju ličnu kolekciju recepata, koju posle može da pregleda (bookmark sistem)

####  Neulogovan korisnik može da:
* pregleda listu dostupnih recepata.

Recept sadrži listu sastojaka sa količinama potrebnim za pripremu recepta, opis pripreme jela i naziv samog recepta.

Potrebno je podržati pretragu po imenu recepta kao i filtriranje po sastojcima koje recept sadrži.

Autentifikaciju realizovati pomoću *JWT-a (JsonWebToken)*. Preporučujemo korišćenje *Identity* biblioteke u .NET Core za lakšu implementaciju sistema uloga i autorizacija.

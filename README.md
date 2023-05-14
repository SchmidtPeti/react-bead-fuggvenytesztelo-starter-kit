# Függvénytesztelő komponens készítése React-ben

_Kliensoldali webprogramozás 1. beadandó 2022-23-2_

## Nyilatkozat

Kérlek, töltsétek ki az adataitokkal beadás előtt!

```txt
Schmidt Péter Ottó
wn5n9z
Kliensoldali webprogramozás - beadandó
Ezt a megoldást a fent írt hallgató küldte be és készítette a Kliensoldali webprogramozás kurzus számonkéréséhez.
Kijelentem, hogy ez a megoldás a saját munkám. Nem másoltam vagy használtam harmadik féltől
származó megoldásokat. Nem továbbítottam megoldást hallgatótársaimnak, és nem is tettem közzé.
Az Eötvös Loránd Tudományegyetem Hallgatói Követelményrendszere
(ELTE szervezeti és működési szabályzata, II. Kötet, 74/C. §) kimondja, hogy mindaddig,
amíg egy hallgató egy másik hallgató munkáját - vagy legalábbis annak jelentős részét -
saját munkájaként mutatja be, az fegyelmi vétségnek számít.
A fegyelmi vétség legsúlyosabb következménye a hallgató elbocsátása az egyetemről.
```

## Pontozás

Kérlek, beadás előtt töltsétek ki, hogy mely részfeladatokat oldottátok meg!

```txt
[x] A [kiadott keretprogram](https://github.com/horvathgyozo/react-bead-fuggvenytesztelo-starter-kit) használata (1pt)
[x] Legalább 4 komponens (1pt)

Függvény
  [x] A függvény megjelenítésre kerül (1pt)

Előre megadott tesztek
  [x] Az előre megadott tesztek nevei felsorolásra kerülnek (1pt)
  [x] Az előre megadott tesztek egyesével futtathatók, eredményükről vizuális visszajelzést kapunk (1pt)
  [x] Az előre megadott tesztek egyszerre is futtathatók, ekkor is megfelelően változnak az egyes tesztek vizuális visszajelzései (1pt)
  [x] Egy előre megadott teszt sikeres futtatásánál megjelenítésre kerül a kapott pontszám (1pt)
  [x] Az összes előre megadott teszt futtatásánál megjelenik az elért összpontszám (1pt)

Egyedi tesztek
  [x] Az egyedi tesztek listája megjelenik, sorszámuk és neveik felsorolásával (1pt)
  [x] Új egyedi teszt hozzáadása lehetséges (1pt)
  [x] Egy egyedi teszt szerkeszthető (1pt)
  [x] Egy egyedi teszt törölhető (1pt)
  [x] Egy teszt kiválasztásakor(=szerkesztésekor) megjelennek az `input` paraméterben **legfelső szinten** megadott szerkezetleírásnak megfelelő mezők. (1pt)
  [x] Az `input` paraméterben megadott szerkezet legfelső szintjén lévő **szöveg** típus megfelelően jelenik meg (1pt)
  [x] Az `input` paraméterben megadott szerkezet legfelső szintjén lévő **szám** típus megfelelően jelenik meg (1pt)
  [x] Az `input` paraméterben megadott szerkezet legfelső szintjén lévő **logikai** típus megfelelően jelenik meg (1pt)
  [x] Az `input` paraméterben megadott szerkezet legfelső szintjén lévő **tömb** típus megfelelően jelenik meg, lehetőség van új elemeket hozzáadni, meglévőeket szerkeszteni, törölni (3pt)
  [x] Az `input` paraméterben megadott szerkezet legfelső szintjén lévő **objektum** típus megfelelően jelenik meg, látszanak az objektum mezőnevei, amelyek típusuknak megfelelően szerkeszthetők (3pt)
  [ ] A megjelenített űrlapmezők kitöltöttsége ellenőrzésre kerül, a hibák listában kiíródnak (1pt)
  [ ] A hibalista egy elemére kattintva a fólusz a megfelelő elemre ugrik (1pt)
  [ ] **Tetszőleges** `input` struktúra megjelenítésre kerül rekurzívan (+5pt)
  [x] Az egyedi tesztek egyesével futtathatók, eredményükről vizuális visszajelzést kapunk (1pt)
  [x] Az egyedi tesztek egyszerre is futtathatók, ekkor is megfelelően változnak az egyes tesztek vizuális visszajelzései (1pt)

"OK" gomb
  [x] Az "OK" gomb helyes működése (1pt)

[x] Felhasználóbarát működés (1pt)
[x] Igényes megjelenés (2pt)
[ ] 1 hét késés (-3pt)
[ ] 2 hét késés (-6pt)
```

## Telepítés

```bash
npm install
```

## Futtatás

```bash
npm run dev
```

## Tesztelés

A tesztelés a futtatással párhuzamosan is történhet. Ezt elsősorban a tanári értékelés megkönnyítésére hoztuk létre, de a hallgatók is láthatják ezt a felületet. Alapvetően a `stories` könyvtárhoz nem kell hozzányúlni. Ha azonban látod, hogyan működik, és saját tesztekkel kiegészítenéd, akkor azt nyugodtan tedd meg. A komponens interfészén azonban változtatni nem szabad!

```bash
npm run storybook
```

## Leírás

A keretprogram egy egyszerű és lecsupaszított alkalmazás Vite-tel létrehozva. A fő `App` komponens egyszerűen csak megjeleníti a `FunctionTester` komponenst. A feladatod ennek a `FunctionTester` komponensnek az elkészítése. A legjobb az lenne, ha a megoldásod a `function-tester` könyvtárba kerülne, és azon belül hoznál létre további fájlokat és könyvtárakat igény szerint.

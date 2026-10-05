# Vérification du logo Cortex.dev dans les thèmes VS Code

Date : 2026-10-05  
Commit vérifié : `97bcb0f`

## Résultat

**Le logo est compatible avec les thèmes clair, sombre et haut contraste.**

| Zone vérifiée | Résultat |
|---|---|
| Icône de l’extension dans la barre latérale | Conforme : `assets/icons/cortex.png` est un PNG RGBA 256×256 avec transparence |
| Accueil de l’agent | Conforme : `cortex-logo.svg` est appliqué comme masque avec `var(--vscode-foreground)` |
| Chat sans messages | Conforme : `cortex-agent-splash.svg` est chargé depuis le nouveau chemin |
| Thèmes sombres | Conforme : le gradient bleu/violet reste visible sur les fonds sombres |
| Thèmes clairs | Conforme : le gradient reste lisible sur les fonds blancs/clairs |
| Haut contraste noir | Conforme : le masque utilise le premier plan du thème, généralement blanc |
| Haut contraste clair | Conforme : le masque utilise le premier plan du thème, généralement noir |
| Formats desktop Linux/Windows/macOS | Conforme : PNG, ICO et ICNS valides |

## Thèmes contrôlés

Les thèmes intégrés suivants ont été inspectés :

- `dark_modern`
- `dark_plus`
- `dark_vs`
- `hc_black`
- `hc_light`
- `light_modern`
- `light_plus`
- `light_vs`

Les contrastes explicites des thèmes lisibles vont d’environ **10:1 à 21:1** entre le premier plan et l’arrière-plan, ce qui est largement suffisant pour le masque monochrome de l’accueil.

## Pourquoi le logo fonctionne dans les deux modes

Le composant d’accueil n’impose pas une couleur fixe :

```tsx
backgroundColor: "var(--vscode-foreground)"
```

Le SVG sert de masque et prend donc automatiquement la couleur de premier plan du thème VS Code. Le logo est ainsi sombre sur les thèmes clairs et clair sur les thèmes sombres/haut contraste.

L’icône de la barre latérale et le splash de l’agent utilisent le symbole gradient bleu/violet, qui conserve sa visibilité sur les deux familles de fonds.

## Correction effectuée pendant le contrôle

Deux libellés visibles restaient marqués par l’ancien branding dans l’interface de l’agent. Ils ont été remplacés par :

- `Cortex Agent`
- `Cortex Coding Agent`
- auteur de l’extension : `Cortex.dev`

## Limite du contrôle

Les dépendances Node de l’extension n’étaient pas installées dans le clone de travail (`node_modules` absent). La validation réalisée est donc une validation statique complète des chemins, formats, couleurs, thèmes et références. Un lancement interactif complet de VS Code nécessiterait d’abord l’installation des dépendances de l’extension et du webview.

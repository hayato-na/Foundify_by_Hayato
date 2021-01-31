# ***Foundify***
Spotifyで今聴いている音楽をシェアするSNSです。
<br>

## 使用技術
### フロントエンド
#### 開発環境
- Vue CLI
#### JavaScript
- Vue(2.6.11)
  - Vue Router
  - Vuex
- Moment
- Axios
#### CSS
- Tailwind CSS


### バックエンド
- Firebase

<br>

## 目的
今日聴いた音楽をシェアするSNS<br>
「最近どんな音楽聴いてるの？」というやりとりから着想を得て制作しました。
<br>

## ディレクトリ構造
~~~
.
├── README.md
├── babel.config.js
├── firebase.json
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── logo.png
│   │   ├── spotify.png
│   │   └── tailwind.css
│   ├── axios-auth.js
│   ├── axios-refresh.js
│   ├── components
│   │   └── Comment.vue
│   ├── main.js
│   ├── router
│   │   └── index.js
│   ├── spotify-api.js
│   ├── store
│   │   └── index.js
│   └── views
│       ├── Comments.vue
│       ├── Login.vue
│       ├── MyPage.vue
│       └── Register.vue
├── tailwind.config.js
└── vue.config.js
~~~

## 今後追加したい機能、改善方向性など

### リファクタリング
- ソースコードの可読性の向上

### Spotify APIと連携して音楽のシェアに特化
- 曲の検索や表示をAPIを通してリンクを生成、リンク先に飛んだらすぐ曲が聴けるような同線を作りたい。

<br>
<br>
**************************

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

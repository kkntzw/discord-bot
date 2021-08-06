# discord-bot
Discord Bot

##  前提条件
`docker`, `docker-compose`, `make` が使える環境を想定している。

## 環境構築
1. [当リポジトリを Clone する。](#当リポジトリを-clone-する)
1. [`docker-compose.example.yml` から `docker-compose.yml` に拡張子を変更する。](#docker-composeexampleyml-から-docker-composeyml-に拡張子を変更する)
1. [`docker-compose.yml` の環境変数を設定する。](#docker-composeyml-の環境変数を設定する)
1. [コンテナを構築する。](#コンテナを構築する)
1. [`package.json` を用いてモジュールをインストールする。](#packagejson-を用いてモジュールをインストールする)

### 当リポジトリを Clone する
```bash
cd ${任意のディレクトリ}
git clone https://github.com/kkntzw/discord-bot.git
cd discord-bot
```

### `docker-compose.example.yml` から `docker-compose.yml` に拡張子を変更する
```bash
mv docker-compose.example.yml docker-compose.yml
```

### `docker-compose.yml` の環境変数を設定する
```bash
vi docker-compose.yml
```

| 環境変数名 | 概要 |
| --- | --- |
| BOT_TOKEN | Bot の TOKEN |
| APPLICATION_ID | Bot のユーザID |
| GUILD_ID | サーバID |
| ADMIN_ID | サーバ管理者のユーザID |

### コンテナを構築する
```bash
make buildup
```

### `package.json` を用いてモジュールをインストールする
```bash
make install
```

## 開発
1. [コンテナを実行する。](#コンテナを実行する)
1. [コンテナを廃棄する。](#コンテナを廃棄する)
1. [デバッグモードで Bot を起動する。](#デバッグモードで-bot-を起動する)
1. [テストコードを実行する。](#テストコードを実行する)
1. [ソースをトランスパイルする。](#ソースをトランスパイルする)
1. [Bot を起動する。](#bot-を起動する)

### コンテナを実行する
```bash
make up
```

### コンテナを廃棄する
```bash
make down
```
### デバッグモードで Bot を起動する
```bash
make debug
```

### テストコードを実行する
```bash
make jest
```

### ソースをトランスパイルする
```bash
make compile
```

### Bot を起動する
```bash
make start
```

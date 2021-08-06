CONTAINER	=	discord-bot

build:
	@docker-compose build
up:
	@docker-compose up -d
buildup:
	@docker-compose up -d --build
down:
	@docker-compose down
install:
	@docker-compose exec $(CONTAINER) npm install
debug:
	@docker-compose exec $(CONTAINER) npm run debug
jest:
	@docker-compose exec $(CONTAINER) npm run test
compile:
	@docker-compose exec $(CONTAINER) npm run compile
start:
	@docker-compose exec $(CONTAINER) npm run start

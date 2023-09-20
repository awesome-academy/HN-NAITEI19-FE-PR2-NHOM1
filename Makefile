ifeq (,$(wildcard .env))
$(shell cp .env.example .env)
endif

include .env

genkey:
	node -e "console.log(require('crypto').randomBytes(128).toString('hex'))"

devclient:
	@docker exec -it $(COMPOSE_PROJECT_NAME)-client-1 yarn dev

devserver:
	@docker exec -it $(COMPOSE_PROJECT_NAME)-client-1 yarn server

devrun:
	@docker exec -it $(COMPOSE_PROJECT_NAME)-client-1 yarn dev
	@docker exec -d $(COMPOSE_PROJECT_NAME)-client-1 yarn server

devdown:
	docker compose down --remove-orphans

ifeq ($(OS),Windows_NT)
devup:
	docker compose up -d --remove-orphans

devinstall:
	@docker exec -it $(COMPOSE_PROJECT_NAME)-client-1 yarn

clientup:
	docker exec -it $(COMPOSE_PROJECT_NAME)-client-1 yarn dev
else
devup:
	USER=$$(id -u):$$(id -g) docker compose up -d --remove-orphans

devinstall:
	@docker exec -it -u $$(id -u):$$(id -g) $(COMPOSE_PROJECT_NAME)-client-1 yarn

devclean: devdown
	@docker rmi $$(docker images -a -q)
	@docker volume rm $$(docker volume ls -q)

endif

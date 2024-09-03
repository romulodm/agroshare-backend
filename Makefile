run:
	npm run dev

dropdb:
	docker exec -it agroshare dropdb agroshare

rundb:
	docker run --name agroshare -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:12-alpine

createdb:
	docker exec -it agroshare createdb --username=root --owner=root agroshare

execdb:
	docker exec -it agroshare psql -U root

logsdb:
	docker logs postgres12
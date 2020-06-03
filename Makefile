FORCE:

install:
	@npm install

test: FORCE
	@npm test

coverage: FORCE
	@npm run coverage

lint:
	@npm run lint

start:
	@npm start

start-debug:
	@npm run start:debug

clean:
	if [ -d "./dist" ]; then rm -rf ./dist/*; fi

build: clean
	@npm run build


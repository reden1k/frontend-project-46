setup:
	npm ci
gendiff:
	node bin/gendiff.js
lint:
	npx eslint .
lint-fix:
	npx eslint --fix .
test:
	npm test
	
REPORTER = spec

test:
<<<<<<< HEAD
    @NODE_ENV=test ./node_modules/.bin/mocha \
        --reporter $(REPORTER) \
        --ui tdd
=======
		@NODE_ENV=test ./node_modules/.bin/mocha \
				--reporter $(REPORTER) \
				--ui tdd
>>>>>>> dcea116d0c8c5ed76a6d2292eb95c3b5ebd24081

test-w:
    @NODE_ENV=test ./node_modules/.bin/mocha \
        --reporter $(REPORTER) \
        --growl \
        --ui tdd \
        --watch

.PHONY: test test-w

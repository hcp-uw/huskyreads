#!/bin/bash
test_dir=./tests
echo "Running tests:"
count=0
for entry in "$test_dir"/*
do
    if [[ -d $entry ]]; then
        for test in "$entry"/*
        do
            mocha $test --timeout 10000 --exit --slow 0
            ((count = count+$?))
        done
    fi
done

if [[ $count -eq 0 ]]; then
    echo "Congrats! All of the tests passed!"
else
    echo "Oh no! $count test(s) failed!"
fi
exit $count
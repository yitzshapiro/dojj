#!/bin/bash

# Find the files and loop through them
find . -type f \( -name "*.json" -o -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.html" \) ! -path "./.*" ! -path "./node_modules/*" -exec echo "{}:" \; -exec echo '```' \; -exec cat "{}" \; -exec echo '```' \; -exec echo \; | pbcopy
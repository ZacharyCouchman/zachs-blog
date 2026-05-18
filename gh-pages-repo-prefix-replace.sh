#!/bin/bash
if [[ "$OSTYPE" == "darwin"* ]]; then
  LC_ALL=C find out -type f -exec sed -i '' 's|/img/|/zachs-blog/img/|g' {} \;
else
  LC_ALL=C find out -type f -exec sed -i 's|/img/|/zachs-blog/img/|g' {} \;
fi
#!/bin/bash

if [ ! -d "src/modules" ]; then
  echo "Error: src/modules directory does not exist. Please run this script from the project root."
  exit 1
fi

# Check if the directory name is provided as an argument
if [ -z "$1" ]; then
  echo "Usage: \"$0\" <directory-name>"
  exit 1
fi


# Base directory from input
BASE_DIR="src/modules/$1"

# Create directories for the applicant
mkdir -p "$BASE_DIR/components/atoms" \
         "$BASE_DIR/components/molecules" \
         "$BASE_DIR/components/organisms" \
         "$BASE_DIR/components/templates" \
         "$BASE_DIR/components/pages" \
         "$BASE_DIR/components/layouts" \
         "$BASE_DIR/stores" \
         "$BASE_DIR/types" \
         "$BASE_DIR/constants" \
         "$BASE_DIR/hooks/examples"


touch "$BASE_DIR/components/atoms/index.ts" \
      "$BASE_DIR/components/molecules/index.ts" \
      "$BASE_DIR/components/organisms/index.ts" \
      "$BASE_DIR/components/templates/index.ts" \
      "$BASE_DIR/components/pages/index.ts" \
      "$BASE_DIR/components/layouts/index.ts" \
      "$BASE_DIR/stores/index.ts" \
      "$BASE_DIR/types/index.ts" \
      "$BASE_DIR/constants/index.ts" \
      "$BASE_DIR/constants/query-key.ts" \
      "$BASE_DIR/hooks/examples/index.d.ts" \
      "$BASE_DIR/hooks/examples/useQuery.ts" \
      "$BASE_DIR/hooks/examples/useMutation.ts"

echo "File structure created successfully under $BASE_DIR."

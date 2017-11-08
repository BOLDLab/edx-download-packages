#!/bin/bash

dir=$1
ZFILE=$2
wildcard=$3
file=null

echo "Checking ${DATA_DIR}${ZFILE}"

if [ -f ${DATA_DIR}${ZFILE} ]; then
    echo "File $ZFILE already downloaded.."
else
    aws s3 cp s3://course-data/$ZFILE ${DATA_DIR}
fi

f=$ZFILE
file=${f%????}

if [ -d ${DECRYPT_DIR}${file} ]; then
    echo "Decryption folder exists"
else
    mkdir -p ${DECRYPT_DIR}${file}
fi

if [ -d sample/${dir} ]; then
    echo "Sample folder exists"
else
    mkdir -p sample/${dir}
fi

echo "Extracting tarball"
tar xzf ${DATA_DIR}${ZFILE} -C $DATA_DIR

# only works for gpg > v2.2
gpgconf --kill gpg-agent

if [ "$(ls -A ${DATA_DIR}${file})" ]; then
  echo "Removing Edge files"
  rm -v ${DATA_DIR}${file}/*-edge*.gpg

  echo "Cleaned.. ready to decrypt"
  echo "Decrypting..."
  for FILE in ${DATA_DIR}${file}/*.*.gpg; do
      temp=$(basename $FILE)
      output=${temp%????}
      echo "Decrypting $FILE to ${DECRYPT_DIR}${file}/$output"
      echo "  gpg --no --batch --output ${DECRYPT_DIR}${file}/$output --decrypt $FILE";

      gpg --no --batch --output ${DECRYPT_DIR}${file}/$output --decrypt $FILE
  done

else
  echo  "${DATA_DIR}${file} is empty or does not exist"
fi

rsync -a -v "${DECRYPT_DIR}${file}/{$wildcard}" "${PWD}/sample/$dir"

echo "Removing decryption files"
rm -rf $DECRYPT_DIR/**

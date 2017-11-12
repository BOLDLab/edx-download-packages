#!/bin/bash

dir=$1
ZFILE=$2
wildcard=$3
file=null

stringContain() { [ -z "${2##*$1*}" ]; }

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

if [ -d ${EDI_BASE_DIR}edx-download-packages/sample ]; then
    echo "Sample folder exists"
else
    mkdir -p ${EDI_BASE_DIR}edx-download-packages/sample
fi

if [ -d ${EDI_BASE_DIR}edx-download-packages/sample/$dir ]; then
    echo "$dir exists"
else
    mkdir -p ${EDI_BASE_DIR}edx-download-packages/sample/$dir
fi

echo "Extracting tarball"
mkdir $DATA_DIR/tmp
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

      cp -v "${DECRYPT_DIR}${file}/$output" "${EDI_BASE_DIR}edx-download-packages/sample/$dir/"
  done

else
  echo  "${DATA_DIR}${file} is empty or does not exist"
fi

#echo "cp -v ${DECRYPT_DIR}${file}/{$wildcard} ${EDI_BASE_DIR}edx-download-packages/sample/$dir"

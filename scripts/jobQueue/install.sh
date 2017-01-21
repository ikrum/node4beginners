#!/bin/bash

sudo stop jobWorker

# create app directory
rm -rf /var/job-queue/
mkdir -p /var/job-queue/

# copy upstart scripts
cp jobWorker.conf /etc/init/jobWorker.conf

# copy app files
cp worker.py /var/job-queue/worker.py

echo "Install complete"
echo "Starting jobWorker!"

sudo start jobWorker

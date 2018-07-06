FROM colthreepv/node-chrome:latest


run npm install -g bower

workdir /app/webgc

run apt-get update && \
  apt-get install -y --no-install-recommends python



add dist ./
add src ./
add .gitignore ./
add *.js ./
add examples ./
add bower.json ./
add package.json ./
run bower install --allow-root

#CMD ["/app/examples/.middleware2014/./launch.sh 10 5 /home/mamane/NouveauGc/WebGC-Server 1"]
RUN ls
#RUN .middleware2014/./launch.sh 10 5 ~/ /home/mamane/NouveauGc/WebGC-Server  1

CMD ["echo", "well done Y"]

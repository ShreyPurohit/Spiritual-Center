Step 1: Understand the Basics
    What is Docker?
    Learn about containerization and how Docker differs from traditional virtualization.
    Key Concepts:
    Familiarize yourself with basic terms: images, containers, Docker Hub, Dockerfile, and volumes.

Step 2: Learn Basic Commands
    Docker Commands:
    Get comfortable with commands like:
        docker run
        docker ps
        docker stop
        docker rm
        docker images
        .....
        
Exercise:
    Run the hello-world image to confirm Docker is working.
    Pull a popular image (e.g., nginx) and run it.
    
Exercise2:
    Create a static html page that contains the one liner information of below questions:
    What is Docker? 
    What is Container? 
    What are Images? 
    What is Nginx?
    List any 10 docker commands and their uses 
    Then perform the following steps to deploy that static HTML page on docker using nginx image on port 8000. Create a Dockerfile Build Docker image Run Docker Container Access the site on port 8000.

Step 3: Work with Docker Images
    Understand Images:
    Learn how images are built and layered.
    Pull and Push Images:
    Use docker pull to get images from Docker Hub and docker push to upload your own.
Exercise:
    Pull a few different images from Docker Hub (e.g., ubuntu, alpine).
    Use docker images to list your images and then delete one using docker rmi.

Step 4: Create Your First Dockerfile
    Build Custom Images:
    Learn to write a Dockerfile to automate image creation.
    Build and Run:
    Use docker build to create an image from your Dockerfile and run it.

Step 5: Networking in Docker
    Understand Networking:
    Learn about Docker networking concepts: bridge, host, and overlay networks.
    Create Custom Networks:
    Experiment with docker network create and connect containers.

Step 6: Data Management with Volumes
    Use Volumes:
    Understand the purpose of volumes for persistent data storage.
    Create and Manage Volumes:
    Learn commands like docker volume create and how to mount volumes in containers.
Exercise: Using Docker Volume Try Implementing Live Changes in your HTML file 

Step 7: Compose Applications
    Introduction to Docker Compose:
    Learn how to define and run multi-container applications with a docker-compose.yml file.

Questions That I Got In My Exam:

Q1) Create a one vite vanilla project, modify the index.html with content in it which describe about the Docker Container and Images, then create a Dockerfile to deploy this project, then build an image with build command, and run the container with run command on docker port 5000. Also Create a one public repository on docker hub and push this Image to that repository and add that push command on one txt file that you are using.

Q2) Pull the latest nginx image with the pull command, create a one sample index.html file and deploy that index.html file to that nginx image using single docker run command. In command this much thing should include: 
  1) mention port 8000
  2) mention that file or folder you have to copy
  3) Container name, and after running container successfully, push that image on any public repository on your docker hub.
Note: remove all your existing container and images.

Q3) You got a task that you have to deploy your vite vanilla project which have simple index.html file that contain answer of this what is the difference between RUN and CMD command on Dockerfile on Docker on port 5001 with just using docker-compose file. You also have to take care that no any dependencies (node_modules) are installed before, dependencies should installed on runtime and you should able to perform live changes. 
Also push the image to docker hub new public repository where repository name is mydockerexam2

Q4) Create a one vite vanila project that contains the answer of this: What is the difference between RUN command and docker-compose. 
Deploy this project on Docker using port 8001, you must have to deploy using Dockerfile and Docker-compose file both with just command docker-compose up.
Keep note that dependencies will install on the runtime when you run docker-compose up. node_modules should not be present there before. Also you should able to perform live changes and push your repo on any public repository.

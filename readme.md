start rabbitmq using docker

1. open docker desktop

```aiignore
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```